import { Card, PageHeader, Pill } from '../components/ui'
import { KNOWLEDGE } from '../data/seed'

export default function KnowledgeHub() {
  return (
    <div>
      <PageHeader
        kicker="Playbooks"
        title="Knowledge Hub"
        subtitle="Short briefs for operators and students — how Chennai’s system actually behaves."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {KNOWLEDGE.map((k) => (
          <Card key={k.id} className="p-6" hover>
            <Pill>{k.tag}</Pill>
            <h3 className="mt-3 font-display text-2xl">{k.title}</h3>
            <p className="mt-2 text-sm text-stone">{k.read} read · RecycLink editorial</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
