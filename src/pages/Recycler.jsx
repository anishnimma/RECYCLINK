import { Button, Card, PageHeader, Pill, Stat } from '../components/ui'
import { useApp } from '../context/AppContext'

export default function Recycler() {
  const { pickups, passports, advancePickup } = useApp()
  const inbound = pickups.filter((p) => ['Collected', 'Sorted'].includes(p.status))
  const closed = passports.filter((p) => p.currentStage === 'Final Product')
  return (
    <div>
      <PageHeader
        kicker="Perungudi MRF"
        title="Recycler dashboard"
        subtitle="Inbound lots, sorting and offtake. Marking Recycled closes the Waste Passport to a final product."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Inbound lots" value={inbound.length} />
        <Stat label="Closed loops" value={closed.length} />
        <Stat label="Line" value="B · NIR PET" hint="Sriperumbudur offtake ready" />
      </div>
      <div className="mt-6 space-y-3">
        {pickups
          .filter((p) => p.status !== 'Requested')
          .map((p) => (
            <Card key={p.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <p className="font-semibold">{p.passportId}</p>
                <p className="text-sm text-stone">
                  {p.category} · {p.weightKg} kg · {p.status}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Pill tone={p.status === 'Recycled' ? 'mint' : 'ink'}>{p.status}</Pill>
                {p.status !== 'Recycled' && (
                  <Button onClick={() => advancePickup(p.id)}>
                    {p.status === 'Sorted' ? 'Mark recycled' : 'Advance to sort'}
                  </Button>
                )}
              </div>
            </Card>
          ))}
      </div>
    </div>
  )
}
