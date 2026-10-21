import { useState } from 'react'
import { Card, PageHeader, Pill } from '../components/ui'
import { useApp } from '../context/AppContext'
import { CLASS_BOARD, COLLEGE_BOARD, LEADERBOARD_PEOPLE } from '../data/seed'

export default function Leaderboard() {
  const { points, circularityScore, user } = useApp()
  const [tab, setTab] = useState('people')
  const people = LEADERBOARD_PEOPLE.map((p) =>
    p.id === user?.id || (user?.email?.includes('anish') && p.id === 'u-anish')
      ? { ...p, points, score: circularityScore, name: user.name }
      : p,
  ).sort((a, b) => b.points - a.points)

  return (
    <div>
      <PageHeader kicker="Campus pulse" title="Leaderboard" subtitle="Individuals, classes and colleges — live with your current RecycPoints." />
      <div className="mb-5 flex gap-2">
        {[
          ['people', 'Individual'],
          ['class', 'Class'],
          ['college', 'College'],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-2 text-sm ${tab === id ? 'bg-moss text-white' : 'border border-line bg-white'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <Card className="divide-y divide-line overflow-hidden">
        {tab === 'people' &&
          people.map((p, i) => (
            <Row key={p.id} rank={i + 1} title={p.name} meta={`${p.className} · ${p.college}`} value={`${p.points} pts`} extra={`Score ${p.score}`} highlight={p.id === user?.id || p.name === user?.name} />
          ))}
        {tab === 'class' &&
          CLASS_BOARD.map((p, i) => (
            <Row key={p.name} rank={i + 1} title={p.name} meta={p.college} value={`${p.points} pts`} extra={`${p.diverted} kg`} />
          ))}
        {tab === 'college' &&
          COLLEGE_BOARD.map((p, i) => (
            <Row key={p.name} rank={i + 1} title={p.name} meta="Tamil Nadu" value={`${p.points} pts`} extra={`${p.diverted} kg diverted`} />
          ))}
      </Card>
    </div>
  )
}

function Row({ rank, title, meta, value, extra, highlight }) {
  return (
    <div className={`flex items-center gap-4 px-5 py-4 ${highlight ? 'bg-mint/60' : ''}`}>
      <span className="w-8 font-display text-2xl text-moss">{rank}</span>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-xs text-stone">{meta}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">{value}</p>
        <Pill>{extra}</Pill>
      </div>
    </div>
  )
}
