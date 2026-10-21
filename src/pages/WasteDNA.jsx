import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Empty, PageHeader, Pill } from '../components/ui'
import { useApp } from '../context/AppContext'
import { formatDate } from '../lib/utils'

export default function WasteDNA() {
  const { scans, schedulePickup } = useApp()
  const [active, setActive] = useState(scans[0]?.id)
  const dna = scans.find((s) => s.id === active) || scans[0]

  if (!scans.length) {
    return (
      <div>
        <PageHeader kicker="Profiles" title="Waste DNA" />
        <Empty title="No profiles yet" body="Run RecycVision to mint a digital identity for waste." />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        kicker="Material genome"
        title="Waste DNA"
        subtitle="A persistent profile for every scanned item — the bridge between RecycVision, pickup and passport."
      />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-2">
          {scans.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`w-full rounded-2xl border px-4 py-3 text-left ${s.id === dna.id ? 'border-moss bg-mint' : 'border-line bg-white'}`}
            >
              <p className="text-sm font-medium">{s.material}</p>
              <p className="text-[11px] text-stone">{s.id}</p>
            </button>
          ))}
        </div>
        {dna && (
          <Card className="p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs text-stone">{dna.id} · {formatDate(dna.createdAt)}</p>
                <h2 className="font-display text-4xl">{dna.material}</h2>
              </div>
              <Pill tone={dna.recyclable ? 'mint' : 'warn'}>{dna.recyclable ? 'Recyclable' : 'Restricted stream'}</Pill>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Gene label="Material" value={dna.material} />
              <Gene label="Recyclability" value={dna.recyclable ? 'High — accepted in Chennai MRF' : 'Limited / specialist'} />
              <Gene label="Reuse potential" value={dna.reusePotential} />
              <Gene label="Recovery value" value={`₹${dna.recoveryValue} per kg`} />
              <Gene label="Environmental risk" value={dna.environmentalRisk} />
              <Gene label="AI confidence" value={`${dna.confidence}%`} />
            </div>
            <div className="mt-6 rounded-3xl bg-sand p-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-stone">Recommended pathway</p>
              <p className="mt-2 text-sm leading-6">{dna.pathway}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                onClick={() =>
                  schedulePickup({
                    category: dna.category,
                    weightKg: 2,
                    address: dna.location,
                    slot: 'Tomorrow, 4:00–6:00 PM',
                    notes: `DNA ${dna.id}`,
                    dnaIds: [dna.id],
                  })
                }
              >
                Convert to pickup + passport
              </Button>
              <Link to="/upcycle">
                <Button variant="ghost">Upcycle ideas</Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

function Gene({ label, value }) {
  return (
    <div className="rounded-2xl border border-line p-4">
      <p className="text-[10px] uppercase tracking-wider text-stone">{label}</p>
      <p className="mt-1 text-sm leading-6">{value}</p>
    </div>
  )
}
