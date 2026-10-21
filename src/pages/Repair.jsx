import { Card, PageHeader, Pill } from '../components/ui'
import { REPAIR_GUIDES } from '../data/seed'

export default function Repair() {
  return (
    <div>
      <PageHeader
        kicker="Repair Hub"
        title="Repair before replace"
        subtitle="High-leverage fixes for campus life. Lithium packs are flagged as do-not-open — those route to e-waste passports."
      />
      <div className="space-y-3">
        {REPAIR_GUIDES.map((g) => (
          <Card key={g.item} className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-2xl">{g.item}</h3>
              <Pill tone={g.difficulty === 'Do not DIY' ? 'warn' : 'mint'}>{g.difficulty}</Pill>
            </div>
            <p className="mt-1 text-sm font-medium">{g.issue}</p>
            <p className="mt-2 text-sm text-stone">{g.fix}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
