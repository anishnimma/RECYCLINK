import { motion } from 'framer-motion'

export function PageHeader({ kicker, title, subtitle, action }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {kicker && (
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-moss">{kicker}</p>
        )}
        <h1 className="font-display text-3xl text-ink sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-xl text-sm leading-6 text-stone">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`rounded-3xl border border-line bg-white/90 shadow-[var(--shadow-card)] ${hover ? 'transition hover:-translate-y-0.5 hover:shadow-lg' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-moss text-white hover:bg-forest',
    ghost: 'bg-white text-ink border border-line hover:bg-sand',
    mint: 'bg-mint text-moss hover:bg-foam',
    danger: 'bg-[#9a3412] text-white',
  }
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Pill({ children, tone = 'mint' }) {
  const tones = {
    mint: 'bg-mint text-moss',
    gold: 'bg-[#f4ead8] text-[#7a5a2b]',
    warn: 'bg-[#fde8e4] text-[#9a3412]',
    ink: 'bg-ink/5 text-ink',
    white: 'bg-white text-stone border border-line',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  )
}

export function Stat({ label, value, hint }) {
  return (
    <Card className="p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone">{label}</p>
      <p className="mt-2 font-display text-3xl text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-stone">{hint}</p>}
    </Card>
  )
}

export function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/30 p-4 sm:items-center" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-h-[86vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-2xl">{title}</h3>
          <button onClick={onClose} className="text-stone hover:text-ink">
            Close
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  )
}

export function ScoreRing({ score, size = 132 }) {
  const r = 54
  const c = 2 * Math.PI * r
  const offset = c - (score / 100) * c
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 132 132" className="h-full w-full -rotate-90">
        <circle cx="66" cy="66" r={r} fill="none" stroke="#e8f4ee" strokeWidth="10" />
        <circle
          cx="66"
          cy="66"
          r={r}
          fill="none"
          stroke="#0f5c45"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl text-ink">{score}</span>
        <span className="text-[10px] uppercase tracking-widest text-stone">Score</span>
      </div>
    </div>
  )
}

export function Field({ label, children }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone">{label}</span>
      {children}
    </label>
  )
}

export const inputClass =
  'w-full rounded-2xl border border-line bg-cream px-3 py-2.5 text-sm outline-none ring-moss/20 focus:ring-4'

export function Empty({ title, body }) {
  return (
    <div className="rounded-3xl border border-dashed border-line p-10 text-center">
      <p className="font-medium text-ink">{title}</p>
      <p className="mt-1 text-sm text-stone">{body}</p>
    </div>
  )
}
