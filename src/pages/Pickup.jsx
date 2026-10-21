import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Field, inputClass, Modal, PageHeader, Pill } from '../components/ui'
import { useApp } from '../context/AppContext'
import { formatDate, PICKUP_FLOW } from '../lib/utils'

const CATS = ['Plastic', 'Paper', 'Glass', 'Metal', 'E-waste', 'Clothes', 'Batteries', 'Organic']

export default function Pickup() {
  const { pickups, scans, schedulePickup, advancePickup } = useApp()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    category: 'Plastic',
    weightKg: 3,
    address: 'MH-1, VIT Chennai, Kelambakkam',
    slot: 'Tomorrow, 4:00–6:00 PM',
    notes: '',
    dnaIds: [],
  })
  const [filter, setFilter] = useState('All')

  const rows = pickups.filter((p) => filter === 'All' || p.status === filter)

  return (
    <div>
      <PageHeader
        kicker="Logistics"
        title="Smart Pickup"
        subtitle="Schedule multi-stream collection around OMR. Status writes through to Waste Passport, points and impact."
        action={<Button onClick={() => setOpen(true)}>Request pickup</Button>}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {['All', ...PICKUP_FLOW].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-3 py-1.5 text-xs ${filter === s ? 'bg-moss text-white' : 'border border-line bg-white'}`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {rows.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{p.id}</p>
                  <Pill>{p.category}</Pill>
                  <Pill tone={p.status === 'Recycled' ? 'mint' : p.status === 'Requested' ? 'gold' : 'ink'}>{p.status}</Pill>
                </div>
                <p className="mt-1 text-sm text-stone">
                  {p.weightKg} kg · {p.address} · {p.slot}
                </p>
                <p className="text-xs text-stone">{formatDate(p.createdAt)} · {p.assignee || 'Unassigned'}</p>
                <div className="mt-3 flex max-w-xl gap-1">
                  {PICKUP_FLOW.map((step) => (
                    <div
                      key={step}
                      className={`h-1.5 flex-1 rounded-full ${PICKUP_FLOW.indexOf(step) <= PICKUP_FLOW.indexOf(p.status) ? 'bg-moss' : 'bg-line'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link to="/passport" className="rounded-full border border-line px-3 py-2 text-xs">
                  {p.passportId}
                </Link>
                {p.status !== 'Recycled' && (
                  <Button variant="ghost" onClick={() => advancePickup(p.id)}>
                    Advance status
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Schedule a pickup">
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            schedulePickup({ ...form, weightKg: Number(form.weightKg), dnaIds: form.dnaIds.filter(Boolean) })
            setOpen(false)
          }}
        >
          <Field label="Stream">
            <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Estimated kg">
            <input className={inputClass} type="number" min="0.5" step="0.1" value={form.weightKg} onChange={(e) => setForm({ ...form, weightKg: e.target.value })} />
          </Field>
          <Field label="Address">
            <input className={inputClass} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </Field>
          <Field label="Slot">
            <input className={inputClass} value={form.slot} onChange={(e) => setForm({ ...form, slot: e.target.value })} />
          </Field>
          <Field label="Link Waste DNA (optional)">
            <select className={inputClass} onChange={(e) => setForm({ ...form, dnaIds: e.target.value ? [e.target.value] : [] })}>
              <option value="">None</option>
              {scans.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id} · {s.material}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Notes">
            <textarea className={inputClass} rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </Field>
          <Button className="w-full" type="submit">
            Mint pickup & passport
          </Button>
        </form>
      </Modal>
    </div>
  )
}
