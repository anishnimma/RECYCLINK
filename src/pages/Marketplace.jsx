import { useState } from 'react'
import { Button, Card, Field, inputClass, Modal, PageHeader, Pill } from '../components/ui'
import { useApp } from '../context/AppContext'

export default function Marketplace() {
  const { listings, addListing } = useApp()
  const [kind, setKind] = useState('All')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', kind: 'Sell', category: 'Clothes', price: 0, place: 'VIT Chennai', blurb: '' })
  const rows = listings.filter((l) => kind === 'All' || l.kind === kind)

  return (
    <div>
      <PageHeader
        kicker="RecycMarket"
        title="Sell, donate, exchange"
        subtitle="Reusable inventory that should never hit a landfill — lamps, lab coats, jars, paper."
        action={<Button onClick={() => setOpen(true)}>New listing</Button>}
      />
      <div className="mb-5 flex gap-2">
        {['All', 'Sell', 'Donate', 'Exchange'].map((k) => (
          <button key={k} onClick={() => setKind(k)} className={`rounded-full px-3 py-1.5 text-xs ${kind === k ? 'bg-moss text-white' : 'border border-line'}`}>
            {k}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {rows.map((l) => (
          <Card key={l.id} className="p-5" hover>
            <div className="flex items-center justify-between">
              <Pill>{l.kind}</Pill>
              <p className="text-sm font-semibold">{l.price ? `₹${l.price}` : 'Free'}</p>
            </div>
            <h3 className="mt-3 font-display text-2xl">{l.title}</h3>
            <p className="mt-1 text-sm text-stone">{l.blurb}</p>
            <p className="mt-3 text-xs text-stone">{l.category} · {l.place} · {l.owner}</p>
          </Card>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="List an item">
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            addListing({ ...form, price: Number(form.price) })
            setOpen(false)
          }}
        >
          <Field label="Title">
            <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </Field>
          <Field label="Type">
            <select className={inputClass} value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })}>
              <option>Sell</option>
              <option>Donate</option>
              <option>Exchange</option>
            </select>
          </Field>
          <Field label="Price (₹)">
            <input className={inputClass} type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </Field>
          <Field label="Notes">
            <textarea className={inputClass} rows={3} value={form.blurb} onChange={(e) => setForm({ ...form, blurb: e.target.value })} />
          </Field>
          <Button className="w-full" type="submit">
            Publish
          </Button>
        </form>
      </Modal>
    </div>
  )
}
