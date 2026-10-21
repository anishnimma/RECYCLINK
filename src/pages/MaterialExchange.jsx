import { useState } from 'react'
import { Button, Card, Field, inputClass, Modal, PageHeader, Pill } from '../components/ui'
import { useApp } from '../context/AppContext'

export default function MaterialExchange() {
  const { materials, addMaterial } = useApp()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ material: 'Clear PET flakes', qty: '200 kg', side: 'Offer', price: '₹16/kg' })

  return (
    <div>
      <PageHeader
        kicker="B2B loop"
        title="Material Exchange"
        subtitle="Recyclers and campus aggregators post offtake and demand. Built to sit on top of a future PostgreSQL ledger."
        action={<Button onClick={() => setOpen(true)}>Post lot</Button>}
      />
      <div className="overflow-hidden rounded-3xl border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-sand text-xs uppercase tracking-wider text-stone">
            <tr>
              <th className="px-4 py-3">Side</th>
              <th className="px-4 py-3">Material</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Party</th>
              <th className="px-4 py-3">Indicative</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((m) => (
              <tr key={m.id} className="border-t border-line">
                <td className="px-4 py-3">
                  <Pill tone={m.side === 'Offer' ? 'mint' : 'gold'}>{m.side}</Pill>
                </td>
                <td className="px-4 py-3 font-medium">{m.material}</td>
                <td className="px-4 py-3">{m.qty}</td>
                <td className="px-4 py-3 text-stone">{m.party}</td>
                <td className="px-4 py-3">{m.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Post to exchange">
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            addMaterial(form)
            setOpen(false)
          }}
        >
          <Field label="Side">
            <select className={inputClass} value={form.side} onChange={(e) => setForm({ ...form, side: e.target.value })}>
              <option>Offer</option>
              <option>Want</option>
            </select>
          </Field>
          <Field label="Material">
            <input className={inputClass} value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} />
          </Field>
          <Field label="Quantity">
            <input className={inputClass} value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} />
          </Field>
          <Field label="Price">
            <input className={inputClass} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </Field>
          <Button className="w-full" type="submit">
            Post
          </Button>
        </form>
      </Modal>
    </div>
  )
}
