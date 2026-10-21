import { Button, Card, PageHeader, Pill } from '../components/ui'
import { useApp } from '../context/AppContext'

export default function SmartBins() {
  const { bins, collectBin } = useApp()
  return (
    <div>
      <PageHeader
        kicker="Network"
        title="Smart Bin Network"
        subtitle="Fill sensors plus a simulated predictive model for when a bin on OMR will overflow."
      />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="relative min-h-[420px] overflow-hidden p-0">
          <div className="grid-map absolute inset-0" />
          <p className="relative z-10 px-5 pt-5 text-xs uppercase tracking-widest text-stone">Chennai · OMR schematic</p>
          {bins.map((b) => (
            <button
              key={b.id}
              onClick={() => collectBin(b.id)}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${b.lat}%`, left: `${b.lng}%` }}
              title={`${b.id} · ${b.fill}%`}
            >
              <span
                className={`block h-3.5 w-3.5 rounded-full ring-4 ring-white ${
                  b.fill > 80 ? 'bg-[#9a3412]' : b.fill > 60 ? 'bg-gold' : 'bg-moss'
                }`}
              />
            </button>
          ))}
        </Card>
        <div className="space-y-3">
          {bins.map((b) => (
            <Card key={b.id} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">{b.place}</p>
                  <p className="text-xs text-stone">
                    {b.id} · {b.area} · {b.type}
                  </p>
                </div>
                <Pill tone={b.fill > 80 ? 'warn' : b.fill > 60 ? 'gold' : 'mint'}>{b.status}</Pill>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-sand">
                <div
                  className={`h-full ${b.fill > 80 ? 'bg-[#9a3412]' : 'bg-moss'}`}
                  style={{ width: `${b.fill}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-stone">
                {b.fill}% full · predicted full in {b.etaFull}
              </p>
              <Button variant="ghost" className="mt-3" onClick={() => collectBin(b.id)}>
                Simulate collection
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
