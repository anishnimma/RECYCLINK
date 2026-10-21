import { Button, Card, PageHeader, Pill } from '../components/ui'
import { useApp } from '../context/AppContext'

export default function Challenges() {
  const { challenges, joinChallenge } = useApp()
  return (
    <div>
      <PageHeader
        kicker="Gamification"
        title="Community challenges"
        subtitle="Join a challenge to lift circularity and RecycPoints. Progress is shared across VIT and OMR colleges."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {challenges.map((c) => (
          <Card key={c.id} className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl">{c.title}</h3>
                <p className="text-xs text-stone">{c.scope} · Ends {c.ends}</p>
              </div>
              <Pill tone="gold">+{c.reward} pts</Pill>
            </div>
            <p className="mt-3 text-sm text-stone">{c.goal}</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-sand">
              <div className="h-full bg-moss" style={{ width: `${c.progress}%` }} />
            </div>
            <p className="mt-1 text-xs text-stone">{c.progress}% complete</p>
            {c.joined ? (
              <p className="mt-4 text-sm font-medium text-moss">You’re in.</p>
            ) : (
              <Button className="mt-4" onClick={() => joinChallenge(c.id)}>
                Join challenge
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
