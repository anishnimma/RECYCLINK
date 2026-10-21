import { useMemo, useState } from 'react'
import { Button, Card, PageHeader } from '../components/ui'
import { useApp } from '../context/AppContext'
import { BINS_GAME, GAME_ITEMS } from '../data/seed'

export default function Game() {
  const { logGame } = useApp()
  const [placed, setPlaced] = useState({})
  const [selected, setSelected] = useState(null)
  const [done, setDone] = useState(null)

  const items = useMemo(() => GAME_ITEMS, [])
  const remaining = items.filter((i) => !placed[i.id])

  const placeItem = (bin, itemId) => {
    if (!itemId) return
    setPlaced((p) => ({ ...p, [itemId]: bin }))
    setSelected(null)
  }

  const onDrop = (bin, itemId) => placeItem(bin, itemId)

  const score = () => {
    const total = items.length
    const correct = items.filter((i) => placed[i.id] === i.bin).length
    const accuracy = Math.round((correct / total) * 100)
    const result = { at: new Date().toISOString(), accuracy, correct, total }
    setDone(result)
    logGame(result)
  }

  const reset = () => {
    setPlaced({})
    setSelected(null)
    setDone(null)
  }

  return (
    <div>
      <PageHeader
        kicker="Play"
        title="Waste segregation game"
        subtitle="Drag each item into the correct stream. Accuracy feeds RecycPoints and circularity."
        action={
          remaining.length === 0 && !done ? (
            <Button onClick={score}>Score round</Button>
          ) : (
            <Button variant="ghost" onClick={reset}>
              Reset
            </Button>
          )
        }
      />
      {done && (
        <Card className="mb-6 p-5">
          <p className="font-display text-3xl">{done.accuracy}%</p>
          <p className="text-sm text-stone">
            {done.correct}/{done.total} correct — logged to wallet.
          </p>
        </Card>
      )}
      <div className="mb-6 flex flex-wrap gap-2">
        {remaining.map((item) => (
          <button
            key={item.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', item.id)}
            onClick={() => setSelected(item.id)}
            className={`cursor-grab rounded-full border px-4 py-2 text-sm ${
              selected === item.id ? 'border-moss bg-mint text-moss' : 'border-line bg-white'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {BINS_GAME.map((bin) => (
          <div
            key={bin}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => placeItem(bin, selected)}
            onDrop={(e) => {
              e.preventDefault()
              onDrop(bin, e.dataTransfer.getData('text/plain'))
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                placeItem(bin, selected)
              }
            }}
            className={`min-h-[120px] rounded-3xl border border-dashed p-4 ${
              selected ? 'border-moss bg-foam' : 'border-line bg-white'
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-stone">{bin}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {items
                .filter((i) => placed[i.id] === bin)
                .map((i) => (
                  <span
                    key={i.id}
                    className={`rounded-full px-2 py-1 text-[11px] ${
                      done ? (placed[i.id] === i.bin ? 'bg-mint text-moss' : 'bg-[#fde8e4] text-[#9a3412]') : 'bg-sand'
                    }`}
                  >
                    {i.name}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
