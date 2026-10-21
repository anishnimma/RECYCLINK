import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'
import { Card, PageHeader, ScoreRing, Stat } from '../components/ui'
import { useApp } from '../context/AppContext'
import { CATEGORY_MIX, IMPACT_TREND } from '../data/seed'

const COLORS = ['#0f5c45', '#147a56', '#5b8c7a', '#c4a574', '#334e68', '#8a948e', '#6b8f3a']

export default function Impact() {
  const { impact, circularityScore, user, scans, pickups } = useApp()
  return (
    <div>
      <PageHeader
        kicker="Proof"
        title="Eco Impact Dashboard"
        subtitle="Confirmed collection and processing weights — linked scans are not double-counted."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Stat label="Waste diverted" value={`${impact.wasteDivertedKg} kg`} />
        <Stat label="Plastic recycled" value={`${impact.plasticRecycledKg} kg`} />
        <Stat label="CO₂ avoided" value={`${impact.co2AvoidedKg} kg`} />
        <Stat label="Water saved" value={`${impact.waterSavedL} L`} />
        <Stat label="Streak" value={`${user?.streak || 0}d`} />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center p-6">
          <ScoreRing score={circularityScore} />
          <p className="mt-3 text-center text-sm text-stone">Circularity score</p>
        </Card>
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-display text-2xl">Monthly diversion</h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer>
              <BarChart data={IMPACT_TREND}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="diverted" fill="#0f5c45" radius={[8, 8, 0, 0]} />
                <Bar dataKey="co2" fill="#c4a574" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-display text-2xl">Category mix</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={CATEGORY_MIX} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90}>
                  {CATEGORY_MIX.map((e, i) => (
                    <Cell key={e.name} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-display text-2xl">This ledger</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex justify-between border-b border-line pb-2">
              <span className="text-stone">DNA profiles</span>
              <span>{scans.length}</span>
            </li>
            <li className="flex justify-between border-b border-line pb-2">
              <span className="text-stone">Pickups logged</span>
              <span>{pickups.length}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-stone">Closed loops</span>
              <span>{pickups.filter((p) => p.status === 'Recycled').length}</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
