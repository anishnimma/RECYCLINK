import { Camera, ImagePlus, Loader2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, PageHeader, Pill } from '../components/ui'
import { useApp } from '../context/AppContext'
import { DEMO_SCANS } from '../lib/vision'

export default function SmartScan() {
  const { addScan, schedulePickup, notify } = useApp()
  const nav = useNavigate()
  const fileRef = useRef()
  const cameraRef = useRef()
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const run = async (file, demo) => {
    setLoading(true)
    setResult(null)
    if (file) setPreview(URL.createObjectURL(file))
    else setPreview(null)
    try {
      const scan = await addScan(file, demo)
      setResult(scan)
    } catch (error) {
      notify(error instanceof Error ? `Scan failed: ${error.message}` : 'Scan failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        kicker="RecycVision"
        title="AI Smart Waste Scanner"
        subtitle="Upload or capture waste. RecycVision returns material, recyclability, value, impact and a confidence score — then writes Waste DNA."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-sand">
            {preview ? (
              <img src={preview} alt="upload" className="h-full w-full object-cover" />
            ) : (
              <div className="text-center text-stone">
                <Camera className="mx-auto mb-2" />
                <p className="text-sm">Drop an image or use a demo material</p>
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => fileRef.current.click()}>
              <ImagePlus size={16} /> Upload
            </Button>
            <Button variant="ghost" onClick={() => cameraRef.current.click()}>
              <Camera size={16} /> Camera
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && run(e.target.files[0])}
            />
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && run(e.target.files[0])}
            />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-stone">Demo materials</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {DEMO_SCANS.map((d) => (
              <button
                key={d.id}
                onClick={() => run(null, { demoKey: d.key, label: d.label })}
                className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-moss"
              >
                {d.label}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          {loading && (
            <div className="flex h-full flex-col items-center justify-center text-moss">
              <Loader2 className="animate-spin" />
              <p className="mt-3 text-sm">RecycVision is reading material signatures…</p>
            </div>
          )}
          {!loading && !result && (
            <div className="flex h-full items-center text-sm text-stone">
              Results appear here. Simulated computer vision — ready to swap for a vision API.
            </div>
          )}
          {result && (
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-stone">{result.id}</p>
                  <h2 className="font-display text-3xl">{result.material}</h2>
                </div>
                <Pill tone={result.recyclable ? 'mint' : 'warn'}>
                  {result.recyclable ? 'Recyclable' : 'Restricted'}
                </Pill>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-sand">
                <div className="h-full bg-moss" style={{ width: `${result.confidence}%` }} />
              </div>
              <p className="mt-1 text-xs text-stone">AI confidence {result.confidence}%</p>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <Row k="Category" v={result.category} />
                <Row k="Est. value" v={`₹${result.recoveryValue}/kg`} />
                <Row k="Mass" v={`${result.weightKg} kg`} />
                <Row k="Risk" v={result.environmentalRisk.split('—')[0]} />
              </dl>
              <p className="mt-4 text-sm leading-6 text-stone">{result.instructions}</p>
              <p className="mt-2 text-sm text-moss">{result.impact}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link to="/dna">
                  <Button variant="mint">Open Waste DNA</Button>
                </Link>
                <Button
                  onClick={() => {
                    schedulePickup({
                      category: result.category,
                      weightKg: Math.max(1, result.weightKg * 8),
                      address: result.location,
                      slot: 'Tomorrow, 4:00–6:00 PM',
                      notes: `From scan ${result.id}`,
                      dnaIds: [result.id],
                    })
                    nav('/pickup')
                  }}
                >
                  Schedule pickup
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

function Row({ k, v }) {
  return (
    <div className="rounded-2xl bg-sand px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-stone">{k}</p>
      <p className="font-medium">{v}</p>
    </div>
  )
}
