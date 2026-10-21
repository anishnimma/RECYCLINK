import { useState } from 'react'
import { Button, Card, Field, inputClass, Modal, PageHeader, Pill } from '../components/ui'
import { useApp } from '../context/AppContext'
import { NGOS } from '../data/seed'
import { formatDay } from '../lib/utils'

export default function Donations() {
  const { donations, addDonation } = useApp()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ item: 'Clean cotton tees × 3', ngo: NGOS[0].name })

  return (
    <div>
      <PageHeader
        kicker="Matching"
        title="Donation matching"
        subtitle="Usable items routed to NGOs around OMR. Matches add RecycPoints and circularity."
        action={<Button onClick={() => setOpen(true)}>Offer an item</Button>}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          {donations.map((d) => (
            <Card key={d.id} className="p-5">
              <div className="flex justify-between">
                <p className="font-medium">{d.item}</p>
                <Pill>{d.status}</Pill>
              </div>
              <p className="text-sm text-stone">{d.ngo} · {formatDay(d.createdAt)}</p>
            </Card>
          ))}
        </div>
        <Card className="p-6">
          <h3 className="font-display text-2xl">Partner needs</h3>
          <ul className="mt-4 space-y-3">
            {NGOS.map((n) => (
              <li key={n.name} className="rounded-2xl bg-sand p-4">
                <p className="font-medium">{n.name}</p>
                <p className="text-sm text-stone">{n.need} · {n.area}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Match a donation">
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            addDonation(form)
            setOpen(false)
          }}
        >
          <Field label="Item">
            <input className={inputClass} value={form.item} onChange={(e) => setForm({ ...form, item: e.target.value })} />
          </Field>
          <Field label="NGO">
            <select className={inputClass} value={form.ngo} onChange={(e) => setForm({ ...form, ngo: e.target.value })}>
              {NGOS.map((n) => (
                <option key={n.name}>{n.name}</option>
              ))}
            </select>
          </Field>
          <Button className="w-full" type="submit">
            Match
          </Button>
        </form>
      </Modal>
    </div>
  )
}
