import { motion } from 'framer-motion'
import { ArrowRight, Fingerprint, Recycle, ScanLine, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui'

const pillars = [
  { icon: ScanLine, title: 'RecycVision', body: 'Photograph waste. Get material ID, confidence, value and a disposal pathway in seconds.' },
  { icon: Fingerprint, title: 'Waste DNA', body: 'Every item becomes a digital profile — recyclability, reuse potential, risk and recovery value.' },
  { icon: Recycle, title: 'Waste Passport', body: 'Track User → Collection → Sorting → Recycling → Final Product across Chennai’s loop.' },
  { icon: Sparkles, title: 'Circularity Score', body: 'One number that compounds scans, pickups, donations, games and civic reports.' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-moss text-white">
            <Recycle size={18} />
          </span>
          <span className="font-semibold">RecycLink</span>
        </div>
        <div className="hidden items-center gap-6 text-sm text-stone md:flex">
          <a href="#product">Product</a>
          <a href="#loop">The loop</a>
          <a href="#team">Team</a>
        </div>
        <Link to="/login" className="rounded-full bg-moss px-4 py-2 text-sm text-white">
          Launch app
        </Link>
      </nav>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-8 lg:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-moss">Chennai · Circular OS</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-ink sm:text-6xl">
            Turn Waste Into Impact.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-stone">
            RecycLink is an intelligent recycling operating system — not a pickup form. Scan, score, passport, reward and close the loop from VIT Chennai to Perungudi MRF.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/login" className="inline-flex items-center gap-2 rounded-full bg-moss px-5 py-3 text-sm text-white">
              Enter the platform <ArrowRight size={16} />
            </Link>
            <a href="#product" className="rounded-full border border-line px-5 py-3 text-sm">
              See differentiators
            </a>
          </div>
          <p className="mt-6 text-xs text-stone">Demo logins · anish@vitstudent.ac.in / demo</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="rounded-[2rem] border border-line bg-white p-6 shadow-[var(--shadow-card)]">
            <p className="text-xs uppercase tracking-widest text-stone">Live loop · OMR</p>
            <div className="mt-4 space-y-3">
              {['RecycVision identified PET #1 · 94%', 'Waste DNA DNA-7K2A minted', 'Pickup PK-4412 recycled', 'Passport closed → rPET resin', '+120 RecycPoints · score 86'].map((row, i) => (
                <div key={row} className="flex items-center gap-3 rounded-2xl bg-sand px-4 py-3 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-moss" />
                  <span className="text-stone">{String(i + 1).padStart(2, '0')}</span>
                  {row}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section id="product" className="border-t border-line bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
          {pillars.map((p) => (
            <Card key={p.title} className="p-8">
              <p.icon className="text-moss" size={22} />
              <h3 className="mt-4 font-display text-2xl">{p.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone">{p.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="loop" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-moss">Connected, not siloed</p>
        <h2 className="mt-3 font-display text-4xl">Scan → DNA → Pickup → Passport → Points → Score → Leaderboard</h2>
        <p className="mt-4 max-w-2xl text-stone">
          Actions write into a shared state. A battery scan raises hazardous-waste credits, a collector advancing status moves the passport, and RecycPoints hit both wallet and circularity.
        </p>
      </section>

      <section id="team" className="border-t border-line py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-moss">Built at VIT Chennai</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card className="p-6">
              <p className="text-xs text-stone">24BCE5180</p>
              <p className="font-display text-2xl">Boina Soham</p>
            </Card>
            <Card className="p-6">
              <p className="text-xs text-stone">24BCE5177</p>
              <p className="font-display text-2xl">Nimma Anishvaraya Sai Ganesh</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
