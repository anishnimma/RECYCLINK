import { Button, Card, PageHeader, ScoreRing } from '../components/ui'
import { useApp } from '../context/AppContext'

const ROLES = ['citizen', 'collector', 'recycler', 'admin']

export default function Profile() {
  const { user, circularityScore, points, switchRole, impact } = useApp()
  return (
    <div>
      <PageHeader kicker="Account" title={user?.name || 'Profile'} subtitle={`${user?.reg} · ${user?.email}`} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center p-8">
          <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-moss text-xl text-white">
            {user?.short?.[0]}
          </div>
          <ScoreRing score={circularityScore} />
          <p className="mt-3 text-sm text-stone">{points} RecycPoints</p>
        </Card>
        <Card className="p-6 lg:col-span-2">
          <dl className="grid gap-4 sm:grid-cols-2 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wider text-stone">College</dt>
              <dd>{user?.college}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-stone">Class</dt>
              <dd>{user?.className}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-stone">Location</dt>
              <dd>{user?.location}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-stone">Role</dt>
              <dd className="capitalize">{user?.role}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-stone">CO₂ avoided</dt>
              <dd>{impact.co2AvoidedKg} kg</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-stone">Streak</dt>
              <dd>{user?.streak} days</dd>
            </div>
          </dl>
          <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-stone">Demo role switch</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {ROLES.map((r) => (
              <Button key={r} variant={user?.role === r ? 'primary' : 'ghost'} onClick={() => switchRole(r)}>
                {r}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
