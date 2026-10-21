import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell,
  Boxes,
  Cpu,
  Fingerprint,
  Gamepad2,
  Gift,
  LayoutDashboard,
  Leaf,
  MapPinned,
  Menu,
  MessageSquareWarning,
  Recycle,
  ScanLine,
  Store,
  Trophy,
  Truck,
  UserRound,
  Wallet,
  Wrench,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import RecyBot from './RecyBot'

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/scan', label: 'RecycVision', icon: ScanLine },
  { to: '/dna', label: 'Waste DNA', icon: Fingerprint },
  { to: '/pickup', label: 'Smart Pickup', icon: Truck },
  { to: '/passport', label: 'Waste Passport', icon: Recycle },
  { to: '/impact', label: 'Eco Impact', icon: Leaf },
  { to: '/rewards', label: 'Rewards', icon: Gift },
  { to: '/wallet', label: 'Wallet', icon: Wallet },
  { to: '/challenges', label: 'Challenges', icon: Trophy },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/community', label: 'Community', icon: UserRound },
  { to: '/report', label: 'Report Waste', icon: MessageSquareWarning },
  { to: '/bins', label: 'Smart Bins', icon: Cpu },
  { to: '/facilities', label: 'Facilities', icon: MapPinned },
  { to: '/market', label: 'RecycMarket', icon: Store },
  { to: '/upcycle', label: 'Upcycle Lab', icon: Spark },
  { to: '/repair', label: 'Repair Hub', icon: Wrench },
  { to: '/donations', label: 'Donations', icon: Gift },
  { to: '/exchange', label: 'Material Exchange', icon: Boxes },
  { to: '/knowledge', label: 'Knowledge Hub', icon: Leaf },
  { to: '/game', label: 'Segregation Game', icon: Gamepad2 },
  { to: '/profile', label: 'Profile', icon: UserRound },
]

function Spark(props) {
  return <Leaf {...props} />
}

export default function Layout() {
  const { user, points, circularityScore, toast, logout } = useApp()
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  const roleLinks = []
  if (user?.role === 'admin' || user?.role === 'citizen') roleLinks.push({ to: '/admin', label: 'Admin' })
  if (user?.role === 'collector' || user?.role === 'admin') roleLinks.push({ to: '/collector', label: 'Collector' })
  if (user?.role === 'recycler' || user?.role === 'admin') roleLinks.push({ to: '/recycler', label: 'Recycler' })
  if (user?.role === 'citizen') {
    roleLinks.push({ to: '/admin', label: 'Admin demo' }, { to: '/collector', label: 'Collector demo' }, { to: '/recycler', label: 'Recycler demo' })
  }

  return (
    <div className="min-h-screen bg-sand text-ink">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line bg-cream/90 backdrop-blur lg:flex">
        <Brand />
        <nav className="no-scrollbar flex-1 space-y-0.5 overflow-y-auto px-3 pb-8">
          {NAV.map((item) => (
            <Item key={item.to} {...item} />
          ))}
          <p className="px-3 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone">Roles</p>
          {roleLinks.map((r) => (
            <Item key={r.to + r.label} to={r.to} label={r.label} icon={LayoutDashboard} />
          ))}
        </nav>
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-cream p-2">
            <div className="flex items-center justify-between px-2">
              <Brand compact />
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>
            {NAV.map((item) => (
              <div key={item.to} onClick={() => setOpen(false)}>
                <Item {...item} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-cream/80 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <button className="rounded-full border border-line p-2 lg:hidden" onClick={() => setOpen(true)}>
              <Menu size={18} />
            </button>
            <p className="hidden text-sm text-stone sm:block">Turn Waste Into Impact.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-line bg-white px-3 py-1.5 text-xs sm:block">
              Circularity <span className="font-semibold text-moss">{circularityScore}</span>
            </div>
            <div className="rounded-full bg-mint px-3 py-1.5 text-xs font-semibold text-moss">{points} pts</div>
            <Bell size={16} className="text-stone" />
            <Link to="/profile" className="flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-moss text-xs text-white">
                {user?.short?.[0] || 'R'}
              </span>
              <span className="hidden text-xs font-medium sm:block">{user?.short}</span>
            </Link>
            <button onClick={logout} className="text-xs text-stone hover:text-ink">
              Sign out
            </button>
          </div>
        </header>
        <main className="px-4 py-8 sm:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={loc.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <RecyBot />
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-forest px-4 py-2 text-sm text-white shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Brand({ compact }) {
  return (
    <Link to="/" className={`flex items-center gap-2 px-5 ${compact ? 'py-3' : 'py-6'}`}>
      <span className="grid h-9 w-9 place-items-center rounded-2xl bg-moss text-white">
        <Recycle size={18} />
      </span>
      <div>
        <p className="text-sm font-semibold tracking-tight">RecycLink</p>
        {!compact && <p className="text-[10px] uppercase tracking-[0.16em] text-stone">Circular OS</p>}
      </div>
    </Link>
  )
}

function Item({ to, label, icon: Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-2xl px-3 py-2 text-sm transition ${
          isActive ? 'bg-mint text-moss' : 'text-stone hover:bg-white hover:text-ink'
        }`
      }
    >
      <Icon size={16} />
      {label}
    </NavLink>
  )
}
