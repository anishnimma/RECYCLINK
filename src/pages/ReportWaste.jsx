import { useState } from 'react'
import { Button, Card, Field, inputClass, Modal, PageHeader, Pill } from '../components/ui'
import { useApp } from '../context/AppContext'
import { formatDate, REPORT_FLOW } from '../lib/utils'

const TYPES = ['Illegal dumping', 'Overflowing bin', 'Open burning', 'Uncollected waste']

export default function ReportWaste() {
  const { reports, addReport, advanceReport } = useApp()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    type: TYPES[0],
    place: 'Service road, Kelambakkam',
    description: '',
    imageLabel: 'Field photo',
  })

  return (
    <div>
      <PageHeader
        kicker="Civic layer"
        title="Report waste problems"
        subtitle="Illegal dumps, burning, overflow and missed collections — with image, location and status tracking."
        action={<Button onClick={() => setOpen(true)}>New report</Button>}
      />
      <div className="space-y-3">
        {reports.map((r) => (
          <Card key={r.id} className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{r.type}</p>
                  <Pill tone={r.status === 'Resolved' ? 'mint' : 'gold'}>{r.status}</Pill>
                </div>
                <p className="text-sm text-stone">{r.place}</p>
                <p className="mt-1 text-sm">{r.description}</p>
                <p className="text-xs text-stone">{r.id} · {formatDate(r.createdAt)} · {r.imageLabel}</p>
              </div>
              {r.status !== 'Resolved' && (
                <Button variant="ghost" onClick={() => advanceReport(r.id)}>
                  Next: {REPORT_FLOW[Math.min(REPORT_FLOW.indexOf(r.status) + 1, 3)]}
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="File a report">
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            addReport(form)
            setOpen(false)
          }}
        >
          <Field label="Issue">
            <select className={inputClass} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Location">
            <input className={inputClass} value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} />
          </Field>
          <Field label="Description">
            <textarea className={inputClass} rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <p className="text-xs text-stone">Image capture is simulated for this prototype — a timestamped field photo would attach here.</p>
          <Button className="w-full" type="submit">
            Submit report
          </Button>
        </form>
      </Modal>
    </div>
  )
}
