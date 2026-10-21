export const uid = (prefix = 'RL') =>
  `${prefix}-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`

export const nowIso = () => new Date().toISOString()

export const formatDate = (iso) =>
  new Date(iso).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

export const formatDay = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

export const inr = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)

export const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

export const computeCircularity = ({
  scans = [],
  pickups = [],
  donations = [],
  joinedChallenges = [],
  gameHistory = [],
  streak = 0,
} = {}) => {
  const scanPts = Math.min(16, scans.length * 1.8)
  const pickupPts = Math.min(16, pickups.filter((p) => p.status !== 'Requested').length * 3.2)
  const recyclePts = Math.min(12, pickups.filter((p) => p.status === 'Recycled').length * 4)
  const donationPts = Math.min(10, donations.length * 3.5)
  const challengePts = Math.min(10, joinedChallenges.length * 3)
  const gameAcc =
    gameHistory.length === 0
      ? 4
      : gameHistory.reduce((s, g) => s + g.accuracy, 0) / gameHistory.length / 12
  const streakPts = Math.min(10, streak * 0.8)
  const segregation = Math.min(12, scans.filter((s) => s.recyclable).length * 1.2)
  return Math.round(
    clamp(28 + scanPts + pickupPts + recyclePts + donationPts + challengePts + gameAcc + streakPts + segregation, 12, 99),
  )
}

export const impactFromActions = (pickups) => {
  const collected = pickups.filter((pickup) => ['Collected', 'Sorted', 'Recycled'].includes(pickup.status))
  const kg = collected.reduce((sum, pickup) => sum + (pickup.weightKg || 2), 0)
  const plastic = collected
    .filter((pickup) => pickup.category === 'Plastic')
    .reduce((sum, pickup) => sum + (pickup.weightKg || 1.5), 0)
  return {
    wasteDivertedKg: Number(kg.toFixed(1)),
    plasticRecycledKg: Number(plastic.toFixed(1)),
    co2AvoidedKg: Number((kg * 1.7).toFixed(1)),
    waterSavedL: Math.round(kg * 42),
  }
}

export const PICKUP_FLOW = ['Requested', 'Assigned', 'En Route', 'Collected', 'Sorted', 'Recycled']
export const PASSPORT_FLOW = ['User', 'Collection', 'Sorting', 'Recycling', 'Final Product']
export const REPORT_FLOW = ['Submitted', 'Acknowledged', 'In Progress', 'Resolved']
