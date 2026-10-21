import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  ACCOUNTS,
  BADGES,
  BINS,
  CHALLENGES,
  FACILITIES,
  REWARDS,
  seedDonations,
  seedListings,
  seedMaterials,
  seedPassports,
  seedPickups,
  seedReports,
  seedScans,
  seedTransactions,
} from '../data/seed'
import { analyzeFile, matchWaste } from '../lib/vision'
import { computeCircularity, impactFromActions, nowIso, PICKUP_FLOW, uid } from '../lib/utils'

const KEY = 'recyclink-state-v1'
const AppContext = createContext(null)

const defaultState = () => ({
  user: null,
  scans: seedScans(),
  pickups: seedPickups(),
  passports: seedPassports(),
  transactions: seedTransactions(),
  reports: seedReports(),
  listings: seedListings(),
  donations: seedDonations(),
  materials: seedMaterials(),
  challenges: CHALLENGES,
  gameHistory: [],
  bins: BINS,
  toast: null,
})

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultState()
    const saved = JSON.parse(raw)
    const state = { ...defaultState(), ...saved, toast: null }
    const openingAward = seedTransactions().find((transaction) => transaction.id === 'TX-1008')
    if (openingAward && !state.transactions.some((transaction) => transaction.id === openingAward.id)) {
      state.transactions = [...state.transactions, openingAward]
    }
    return state
  } catch {
    return defaultState()
  }
}

export function AppProvider({ children }) {
  const [state, setState] = useState(load)

  useEffect(() => {
    const { toast, ...persist } = state
    localStorage.setItem(KEY, JSON.stringify(persist))
  }, [state])

  const notify = (message) => {
    setState((s) => ({ ...s, toast: message }))
    setTimeout(() => setState((s) => ({ ...s, toast: null })), 2800)
  }

  const circularityScore = useMemo(
    () =>
      computeCircularity({
        scans: state.scans,
        pickups: state.pickups,
        donations: state.donations,
        joinedChallenges: state.challenges.filter((c) => c.joined),
        gameHistory: state.gameHistory,
        streak: state.user?.streak || 9,
      }),
    [state],
  )

  const points = useMemo(
    () => state.transactions.reduce((sum, t) => sum + t.points, 0),
    [state.transactions],
  )

  const impact = useMemo(() => impactFromActions(state.pickups), [state.pickups])

  const login = (email, password, roleHint) => {
    const account = ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password,
    )
    if (account) {
      setState((s) => ({ ...s, user: account }))
      notify(`Welcome back, ${account.short}.`)
      return account
    }
    const role = roleHint || 'citizen'
    const guest = {
      id: uid('U'),
      name: email.split('@')[0].replace(/\./g, ' '),
      short: email.split('@')[0],
      email,
      role,
      college: 'VIT Chennai',
      className: '24BCE — Batch 2024',
      reg: 'GUEST',
      location: 'Kelambakkam, OMR',
      streak: 1,
    }
    setState((s) => ({ ...s, user: guest }))
    notify('Session started as demo user.')
    return guest
  }

  const logout = () => setState((s) => ({ ...s, user: null }))

  const switchRole = (role) => {
    const account = ACCOUNTS.find((a) => a.role === role)
    if (account) {
      setState((s) => ({ ...s, user: account }))
      notify(`Switched to ${role} view.`)
    }
  }

  const addScan = async (fileOrKey, extra = {}) => {
    await wait(900)
    const analyzed = extra.demoKey ? matchWaste(extra.demoKey) : analyzeFile(fileOrKey)
    const scan = {
      id: uid('DNA'),
      createdAt: nowIso(),
      ...analyzed,
      location: extra.location || state.user?.location || 'VIT Chennai',
      imageLabel: extra.label || analyzed.sourceName || analyzed.material,
    }
    const tx = {
      id: uid('TX'),
      at: nowIso(),
      type: 'earn',
      label: `RecycVision scan · ${scan.category}`,
      points: scan.recyclable ? 40 : 20,
    }
    setState((s) => ({ ...s, scans: [scan, ...s.scans], transactions: [tx, ...s.transactions] }))
    notify(`Waste DNA ${scan.id} created. +${tx.points} pts`)
    return scan
  }

  const schedulePickup = (payload) => {
    const id = uid('PK')
    const passportId = `WP-CHN-${id.slice(-4)}`
    const pickup = {
      id,
      createdAt: nowIso(),
      status: 'Requested',
      assignee: null,
      dnaIds: payload.dnaIds || [],
      passportId,
      ...payload,
    }
    const linked = state.scans.find((s) => pickup.dnaIds.includes(s.id))
    const passport = {
      id: passportId,
      pickupId: id,
      material: linked?.material || payload.category,
      category: payload.category,
      originUser: state.user?.name || 'Citizen',
      originPlace: payload.address,
      createdAt: nowIso(),
      currentStage: 'User',
      stages: [
        { name: 'User', at: nowIso(), note: linked ? `Linked ${linked.id}` : 'Pickup requested', done: true },
        { name: 'Collection', at: null, note: 'Awaiting collector', done: false },
        { name: 'Sorting', at: null, note: 'MRF inbound', done: false },
        { name: 'Recycling', at: null, note: 'Processing', done: false },
        { name: 'Final Product', at: null, note: 'Loop not yet closed', done: false },
      ],
      finalProduct: null,
    }
    const tx = { id: uid('TX'), at: nowIso(), type: 'earn', label: `Pickup requested · ${payload.category}`, points: 25 }
    setState((s) => ({
      ...s,
      pickups: [pickup, ...s.pickups],
      passports: [passport, ...s.passports],
      transactions: [tx, ...s.transactions],
    }))
    notify(`Pickup ${id} scheduled. Passport ${passportId} minted.`)
    return pickup
  }

  const advancePickup = (pickupId) => {
    setState((s) => {
      const pickups = s.pickups.map((p) => {
        if (p.id !== pickupId) return p
        const i = PICKUP_FLOW.indexOf(p.status)
        const next = PICKUP_FLOW[Math.min(i + 1, PICKUP_FLOW.length - 1)]
        return {
          ...p,
          status: next,
          assignee: p.assignee || 'Karthik Collector',
        }
      })
      const pickup = pickups.find((p) => p.id === pickupId)
      const stageMap = {
        Assigned: 'User',
        'En Route': 'Collection',
        Collected: 'Collection',
        Sorted: 'Sorting',
        Recycled: 'Recycling',
      }
      const passports = s.passports.map((pp) => {
        if (pp.pickupId !== pickupId) return pp
        const focus = pickup.status === 'Recycled' ? 'Final Product' : stageMap[pickup.status] || pp.currentStage
        const stages = pp.stages.map((st) => {
          const order = ['User', 'Collection', 'Sorting', 'Recycling', 'Final Product']
          const done = order.indexOf(st.name) <= order.indexOf(focus)
          if (st.name === focus && !st.at) {
            return {
              ...st,
              done: true,
              at: nowIso(),
              note:
                pickup.status === 'Recycled'
                  ? `Closed loop · ${pp.category} offtake`
                  : `${pickup.status} by ${pickup.assignee}`,
            }
          }
          return { ...st, done: done || st.done }
        })
        return {
          ...pp,
          currentStage: focus,
          stages,
          finalProduct:
            pickup.status === 'Recycled' ? guessProduct(pp.category) : pp.finalProduct,
        }
      })
      const bonus =
        pickup.status === 'Collected' ? 80 : pickup.status === 'Recycled' ? 120 : pickup.status === 'Assigned' ? 15 : 20
      const tx = {
        id: uid('TX'),
        at: nowIso(),
        type: 'earn',
        label: `Pickup ${pickup.status} · ${pickup.category}`,
        points: bonus,
      }
      return { ...s, pickups, passports, transactions: [tx, ...s.transactions] }
    })
    notify('Chain updated — passport, points and impact synced.')
  }

  const redeem = (reward) => {
    if (points < reward.cost) {
      notify('Not enough RecycPoints.')
      return false
    }
    const tx = { id: uid('TX'), at: nowIso(), type: 'redeem', label: reward.name, points: -reward.cost }
    setState((s) => ({ ...s, transactions: [tx, ...s.transactions] }))
    notify(`Redeemed ${reward.name}.`)
    return true
  }

  const addReport = (payload) => {
    const report = { id: uid('RP'), createdAt: nowIso(), status: 'Submitted', ...payload }
    const tx = { id: uid('TX'), at: nowIso(), type: 'earn', label: `Civic report · ${payload.type}`, points: 30 }
    setState((s) => ({ ...s, reports: [report, ...s.reports], transactions: [tx, ...s.transactions] }))
    notify('Report filed. Ops has been pinged.')
    return report
  }

  const advanceReport = (id) => {
    const flow = ['Submitted', 'Acknowledged', 'In Progress', 'Resolved']
    setState((s) => ({
      ...s,
      reports: s.reports.map((r) => {
        if (r.id !== id) return r
        const i = flow.indexOf(r.status)
        return { ...r, status: flow[Math.min(i + 1, flow.length - 1)] }
      }),
    }))
  }

  const joinChallenge = (id) => {
    setState((s) => ({
      ...s,
      challenges: s.challenges.map((c) => (c.id === id ? { ...c, joined: true, progress: Math.max(c.progress, 8) } : c)),
      transactions: [
        { id: uid('TX'), at: nowIso(), type: 'earn', label: 'Joined community challenge', points: 20 },
        ...s.transactions,
      ],
    }))
    notify('Challenge joined. Circularity score will tick up.')
  }

  const addListing = (payload) => {
    const listing = { id: uid('MK'), owner: state.user?.short || 'You', ...payload }
    setState((s) => ({ ...s, listings: [listing, ...s.listings] }))
    notify('Listed on RecycMarket.')
  }

  const addDonation = (payload) => {
    const donation = { id: uid('DN'), createdAt: nowIso(), status: 'Matched', ...payload }
    const tx = { id: uid('TX'), at: nowIso(), type: 'earn', label: `Donation · ${payload.item}`, points: 70 }
    setState((s) => ({
      ...s,
      donations: [donation, ...s.donations],
      transactions: [tx, ...s.transactions],
    }))
    notify('Matched with an NGO partner.')
  }

  const addMaterial = (payload) => {
    const row = { id: uid('MX'), party: state.user?.college || 'Campus hub', ...payload }
    setState((s) => ({ ...s, materials: [row, ...s.materials] }))
    notify('Posted to Material Exchange.')
  }

  const logGame = (result) => {
    const tx = {
      id: uid('TX'),
      at: nowIso(),
      type: 'earn',
      label: `Segregation game · ${result.accuracy}%`,
      points: Math.round(result.accuracy / 4),
    }
    setState((s) => ({
      ...s,
      gameHistory: [result, ...s.gameHistory],
      transactions: [tx, ...s.transactions],
    }))
    notify(`Game logged. Accuracy ${result.accuracy}%.`)
  }

  const collectBin = (id) => {
    setState((s) => ({
      ...s,
      bins: s.bins.map((b) =>
        b.id === id ? { ...b, fill: 8, status: 'Healthy', etaFull: '3 days' } : b,
      ),
    }))
    notify('Bin collected. Predictive fill reset.')
  }

  const value = {
    ...state,
    circularityScore,
    points,
    impact,
    rewards: REWARDS,
    facilities: FACILITIES,
    badges: BADGES,
    login,
    logout,
    switchRole,
    addScan,
    schedulePickup,
    advancePickup,
    redeem,
    addReport,
    advanceReport,
    joinChallenge,
    addListing,
    addDonation,
    addMaterial,
    logGame,
    collectBin,
    notify,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function guessProduct(category) {
  const map = {
    Plastic: 'rPET / HDPE pellets',
    Paper: 'Recycled kraft liner',
    Glass: 'Furnace-ready cullet',
    Metal: 'Aluminium ingot feedstock',
    'E-waste': 'Recovered copper & gold dore',
    Clothes: 'Shoddy fibre / upcycled textile',
    Batteries: 'Black mass for lithium recovery',
    Organic: 'Compost / biomethane',
  }
  return map[category] || 'Secondary raw material'
}
