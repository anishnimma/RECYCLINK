import { Button, Card, PageHeader, Pill } from '../components/ui'
import { useApp } from '../context/AppContext'

export default function Rewards() {
  const { rewards, points, redeem } = useApp()
  return (
    <div>
      <PageHeader
        kicker="RecycPoints"
        title="Rewards catalogue"
        subtitle={`You have ${points} points. Redemptions write to the wallet and slightly reshape circularity.`}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rewards.map((r) => (
          <Card key={r.id} className="flex flex-col p-6" hover>
            <div className="flex items-start justify-between">
              <Pill>{r.type}</Pill>
              <p className="text-sm font-semibold text-moss">{r.cost} pts</p>
            </div>
            <h3 className="mt-4 font-display text-2xl">{r.name}</h3>
            <p className="mt-2 flex-1 text-sm text-stone">{r.blurb}</p>
            <p className="mt-3 text-xs text-stone">{r.stock} in partner stock</p>
            <Button className="mt-4" disabled={points < r.cost} onClick={() => redeem(r)}>
              Redeem
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
