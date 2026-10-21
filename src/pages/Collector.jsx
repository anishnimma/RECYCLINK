import { Button, Card, PageHeader, Pill, Stat } from '../components/ui'
import { useApp } from '../context/AppContext'

export default function Collector() {
  const { pickups, advancePickup, bins, collectBin } = useApp()
  const mine = pickups.filter((p) => p.status !== 'Recycled')
  return (
    <div>
      <PageHeader
        kicker="Fleet"
        title="Collector dashboard"
        subtitle="OMR Route 04 — advancing a ticket updates the citizen passport, points and bin predictions."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Assigned" value={pickups.filter((p) => p.assignee).length} />
        <Stat label="En route / collected" value={pickups.filter((p) => ['En Route', 'Collected'].includes(p.status)).length} />
        <Stat label="Urgent bins" value={bins.filter((b) => b.fill > 80).length} />
      </div>
      <h3 className="mt-8 font-display text-2xl">Pickup tickets</h3>
      <div className="mt-3 space-y-3">
        {mine.map((p) => (
          <Card key={p.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="font-semibold">
                {p.id} · {p.category}
              </p>
              <p className="text-sm text-stone">{p.address} · {p.weightKg} kg</p>
            </div>
            <div className="flex items-center gap-2">
              <Pill>{p.status}</Pill>
              <Button onClick={() => advancePickup(p.id)}>Advance</Button>
            </div>
          </Card>
        ))}
      </div>
      <h3 className="mt-8 font-display text-2xl">Bin run</h3>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {bins
          .filter((b) => b.fill > 50)
          .map((b) => (
            <Card key={b.id} className="p-4">
              <p className="font-medium">{b.place}</p>
              <p className="text-xs text-stone">{b.fill}% · full in {b.etaFull}</p>
              <Button variant="ghost" className="mt-2" onClick={() => collectBin(b.id)}>
                Collect bin
              </Button>
            </Card>
          ))}
      </div>
    </div>
  )
}
