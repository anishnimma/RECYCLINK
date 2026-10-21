import { useState } from 'react'
import { Card, PageHeader, Pill } from '../components/ui'
import { useApp } from '../context/AppContext'

export default function Facilities() {
  const { facilities } = useApp()
  const [active, setActive] = useState(facilities[0].id)
  const f = facilities.find((x) => x.id === active)
  const [q, setQ] = useState('')
  const rows = facilities.filter(
    (x) =>
      x.name.toLowerCase().includes(q.toLowerCase()) ||
      x.accepts.join(' ').toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <div>
      <PageHeader
        kicker="Infrastructure"
        title="Find recycling facilities"
        subtitle="Interactive map-style view of partners that accept PET, fibre, e-waste and textiles around Chennai."
      />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter by material or name…"
        className="mb-5 w-full rounded-full border border-line bg-white px-4 py-3 text-sm outline-none"
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="relative min-h-[380px] overflow-hidden">
          <div className="grid-map absolute inset-0" />
          {rows.map((x) => (
            <button
              key={x.id}
              onClick={() => setActive(x.id)}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-2 py-1 text-[10px] shadow"
              style={{ top: `${x.lat}%`, left: `${x.lng}%` }}
            >
              {x.name.split(' ')[0]}
            </button>
          ))}
        </Card>
        <div className="space-y-3">
          {rows.map((x) => (
            <Card key={x.id} className={`p-5 ${x.id === f.id ? 'ring-2 ring-moss' : ''}`}>
              <button className="w-full text-left" onClick={() => setActive(x.id)}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{x.name}</p>
                    <p className="text-xs text-stone">{x.kind} · {x.distance} · {x.hours}</p>
                  </div>
                  <Pill>{x.accepts.length} streams</Pill>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {x.accepts.map((a) => (
                    <span key={a} className="rounded-full bg-sand px-2 py-0.5 text-[11px]">
                      {a}
                    </span>
                  ))}
                </div>
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
