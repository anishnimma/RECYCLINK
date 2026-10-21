import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { Card, PageHeader, Stat } from '../components/ui'
import { useApp } from '../context/AppContext'
import { CATEGORY_MIX, IMPACT_TREND } from '../data/seed'

const COLORS = ['#0f5c45', '#147a56', '#5b8c7a', '#c4a574', '#334e68', '#8a948e', '#6b8f3a']

export default function Admin() {
  const { pickups, reports, bins, challenges, scans, passports } = useApp()
  const recyclingRate = pickups.length
    ? Math.round((pickups.filter((p) => p.status === 'Recycled' || p.status === 'Sorted').length / pickups.length) * 100)
    : 0

  return (
    <div>
      <PageHeader
        kicker="Control tower"
        title="Admin dashboard"
        subtitle="City-scale operators view — users, mass, rate, bins, reports and waste flow across the RecycLink graph."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat label="Active users" value="1,284" hint="Campus + OMR citizens" />
        <Stat
          label="Waste collected"
          value={`${pickups
            .filter((pickup) => ['Collected', 'Sorted', 'Recycled'].includes(pickup.status))
            .reduce((sum, pickup) => sum + pickup.weightKg, 0)
            .toFixed(1)} kg`}
        />
        <Stat label="Recycling rate" value={`${recyclingRate}%`} />
        <Stat label="Active pickups" value={pickups.filter((p) => p.status !== 'Recycled').length} />
        <Stat label="Smart bins" value={bins.length} hint={`${bins.filter((b) => b.fill > 80).length} urgent`} />
        <Stat label="Open reports" value={reports.filter((r) => r.status !== 'Resolved').length} />
        <Stat label="Challenges" value={challenges.length} />
        <Stat label="Passports" value={passports.length} />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-display text-2xl">Category trend</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={IMPACT_TREND}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="diverted" fill="#0f5c45" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-display text-2xl">Waste mix</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={CATEGORY_MIX} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                  {CATEGORY_MIX.map((e, i) => (
                    <Cell key={e.name} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <Card className="mt-6 p-6">
        <h3 className="font-display text-2xl">Waste flow</h3>
        <p className="text-sm text-stone">Citizen scans → pickup tickets → MRF sort → recycler offtake → passports closed</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-5">
          {[
            ['Scans', scans.length],
            ['Pickups', pickups.length],
            ['Sorted', pickups.filter((p) => ['Sorted', 'Recycled'].includes(p.status)).length],
            ['Recycled', pickups.filter((p) => p.status === 'Recycled').length],
            ['Passports', passports.filter((p) => p.currentStage === 'Final Product').length],
          ].map(([label, n], i) => (
            <div key={label} className="rounded-2xl bg-sand p-4 text-center">
              <p className="text-[11px] uppercase tracking-wider text-stone">
                {i + 1}. {label}
              </p>
              <p className="font-display text-3xl">{n}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
