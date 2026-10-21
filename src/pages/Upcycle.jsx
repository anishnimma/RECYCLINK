import { useMemo, useState } from 'react'
import { Button, Card, PageHeader } from '../components/ui'
import { useApp } from '../context/AppContext'
import { UPCYCLE_IDEAS } from '../data/seed'

export default function Upcycle() {
  const { scans } = useApp()
  const cats = Object.keys(UPCYCLE_IDEAS)
  const [cat, setCat] = useState(scans[0]?.category && UPCYCLE_IDEAS[scans[0].category] ? scans[0].category : 'Plastic')
  const [seed, setSeed] = useState(0)
  const ideas = useMemo(() => {
    const list = UPCYCLE_IDEAS[cat]
    return list.map((idea, i) => list[(i + seed) % list.length])
  }, [cat, seed])

  return (
    <div>
      <PageHeader
        kicker="Upcycle Lab"
        title="Creative reuse"
        subtitle="Ideas biased by your latest Waste DNA. Generate another set when you want a new brief."
      />
      <div className="mb-5 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`rounded-full px-3 py-1.5 text-xs ${cat === c ? 'bg-moss text-white' : 'border border-line'}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {ideas.map((idea) => (
          <Card key={idea} className="p-6">
            <p className="text-[11px] uppercase tracking-widest text-stone">{cat}</p>
            <h3 className="mt-3 font-display text-2xl">{idea}</h3>
          </Card>
        ))}
      </div>
      <Button className="mt-6" variant="ghost" onClick={() => setSeed((s) => s + 1)}>
        Generate another set
      </Button>
    </div>
  )
}
