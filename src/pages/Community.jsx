import { Card, PageHeader, Pill } from '../components/ui'
import { useApp } from '../context/AppContext'
import { BADGES } from '../data/seed'

export default function Community() {
  const { user, challenges, gameHistory } = useApp()
  return (
    <div>
      <PageHeader
        kicker="Together"
        title="Community"
        subtitle="Badges, streaks and the people closing loops with you at VIT Chennai."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-display text-2xl">Badge wall</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {BADGES.map((b) => (
              <div key={b.id} className={`rounded-2xl border p-4 ${b.earned ? 'border-moss bg-mint' : 'border-line opacity-60'}`}>
                <p className="text-sm font-semibold">{b.name}</p>
                <p className="mt-1 text-[11px] text-stone">{b.hint}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-display text-2xl">Your pulse</h3>
          <p className="mt-3 text-sm">{user?.name}</p>
          <p className="text-xs text-stone">{user?.reg} · {user?.className}</p>
          <div className="mt-4 space-y-2 text-sm">
            <p className="flex justify-between"><span className="text-stone">Streak</span>{user?.streak} days</p>
            <p className="flex justify-between"><span className="text-stone">Challenges</span>{challenges.filter((c) => c.joined).length}</p>
            <p className="flex justify-between"><span className="text-stone">Games played</span>{gameHistory.length}</p>
          </div>
          <div className="mt-4">
            <Pill>OMR circle</Pill>
          </div>
        </Card>
      </div>
    </div>
  )
}
