import { Link } from 'react-router-dom'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { Button, Card, PageHeader, Pill, ScoreRing, Stat } from '../components/ui'
import { useApp } from '../context/AppContext'
import { IMPACT_TREND } from '../data/seed'
import { formatDay } from '../lib/utils'

export default function Dashboard() {
  const { user, scans, pickups, passports, circularityScore, points, impact } = useApp()
  const latest = scans[0]
  const livePassport = passports[0]

  return (
    <div>
      <PageHeader
        kicker="Citizen OS"
        title={`Good day, ${user?.short || 'there'}.`}
        subtitle={`${user?.college} · ${user?.className}. Your loop is live across OMR.`}
        action={
          <Link to="/scan">
            <Button>Open RecycVision</Button>
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat label="Circularity" value={circularityScore} hint="Compounded from every action" />
        <Stat label="RecycPoints" value={points} hint="Wallet + redemptions" />
        <Stat label="Diverted" value={`${impact.wasteDivertedKg} kg`} hint="Collected and processed pickups" />
        <Stat label="Streak" value={`${user?.streak || 9} days`} hint="Keep a daily scan or drop" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="p-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Impact trajectory</h2>
            <Pill>Chennai demo</Pill>
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={IMPACT_TREND}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#147a56" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#147a56" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6f7b74', fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="diverted" stroke="#0f5c45" fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="flex flex-col items-center justify-center p-6">
          <ScoreRing score={circularityScore} />
          <p className="mt-4 text-center text-sm text-stone">
            Score moves when you scan, pickup, donate, play or close a passport.
          </p>
          <Link to="/impact" className="mt-3 text-sm font-medium text-moss">
            Open Eco Impact →
          </Link>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-display text-2xl">Latest Waste DNA</h2>
          {latest ? (
            <div className="mt-4 rounded-2xl bg-sand p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{latest.material}</p>
                <Pill tone={latest.recyclable ? 'mint' : 'warn'}>{latest.recyclable ? 'Recyclable' : 'Limit'}</Pill>
              </div>
              <p className="mt-1 text-xs text-stone">
                {latest.id} · {formatDay(latest.createdAt)} · AI {latest.confidence}%
              </p>
              <p className="mt-3 text-sm text-stone">{latest.pathway}</p>
              <Link to="/dna" className="mt-3 inline-block text-sm text-moss">
                View all profiles →
              </Link>
            </div>
          ) : (
            <p className="mt-4 text-sm text-stone">Scan an item to mint DNA.</p>
          )}
        </Card>
        <Card className="p-6">
          <h2 className="font-display text-2xl">Active passport</h2>
          <p className="mt-3 text-sm font-medium">{livePassport?.id}</p>
          <p className="text-xs text-stone">{livePassport?.material}</p>
          <div className="mt-4 flex gap-1">
            {livePassport?.stages.map((st) => (
              <div key={st.name} className={`h-1.5 flex-1 rounded-full ${st.done ? 'bg-moss' : 'bg-line'}`} title={st.name} />
            ))}
          </div>
          <p className="mt-2 text-xs text-stone">Stage · {livePassport?.currentStage}</p>
          <div className="mt-4 flex gap-2">
            <Link to="/passport" className="text-sm text-moss">
              Timeline →
            </Link>
            <Link to="/pickup" className="text-sm text-moss">
              Pickups ({pickups.length}) →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
