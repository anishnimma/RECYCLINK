import { Card, PageHeader, Pill, Stat } from '../components/ui'
import { useApp } from '../context/AppContext'
import { formatDate } from '../lib/utils'

export default function Wallet() {
  const { transactions, points } = useApp()
  const earned = transactions.filter((t) => t.points > 0).reduce((s, t) => s + t.points, 0)
  const spent = transactions.filter((t) => t.points < 0).reduce((s, t) => s + t.points, 0)
  return (
    <div>
      <PageHeader kicker="Ledger" title="RecycPoints wallet" subtitle="Every scan, pickup, report, game and redemption lands here." />
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Balance" value={points} />
        <Stat label="Lifetime earned" value={earned} />
        <Stat label="Redeemed" value={Math.abs(spent)} />
      </div>
      <Card className="mt-6 divide-y divide-line">
        {transactions.map((t) => (
          <div key={t.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-medium">{t.label}</p>
              <p className="text-xs text-stone">{formatDate(t.at)} · {t.id}</p>
            </div>
            <Pill tone={t.points > 0 ? 'mint' : 'gold'}>
              {t.points > 0 ? '+' : ''}
              {t.points}
            </Pill>
          </div>
        ))}
      </Card>
    </div>
  )
}
