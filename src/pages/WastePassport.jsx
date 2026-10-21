import { useState } from 'react'
import { Card, PageHeader, Pill } from '../components/ui'
import { useApp } from '../context/AppContext'
import { formatDate } from '../lib/utils'

export default function WastePassport() {
  const { passports } = useApp()
  const [id, setId] = useState(passports[0]?.id)
  const pp = passports.find((p) => p.id === id) || passports[0]

  return (
    <div>
      <PageHeader
        kicker="Traceability"
        title="Waste Passport"
        subtitle="A unique identity that follows material from a student on OMR to a finished secondary product."
      />
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {passports.map((p) => (
          <button
            key={p.id}
            onClick={() => setId(p.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs ${p.id === pp?.id ? 'bg-moss text-white' : 'border border-line bg-white'}`}
          >
            {p.id}
          </button>
        ))}
      </div>
      {pp && (
        <Card className="p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone">Passport</p>
              <h2 className="font-display text-4xl">{pp.id}</h2>
              <p className="mt-1 text-sm text-stone">
                {pp.material} · Origin {pp.originUser} · {pp.originPlace}
              </p>
            </div>
            <div className="text-right">
              <Pill tone="mint">{pp.currentStage}</Pill>
              {pp.finalProduct && <p className="mt-2 text-sm text-moss">{pp.finalProduct}</p>}
            </div>
          </div>
          <ol className="mt-10 space-y-0">
            {pp.stages.map((st, i) => (
              <li key={st.name} className="grid grid-cols-[20px_1fr] gap-4">
                <div className="flex flex-col items-center">
                  <span className={`mt-1 h-3 w-3 rounded-full ${st.done ? 'bg-moss' : 'bg-line'}`} />
                  {i < pp.stages.length - 1 && <span className={`w-px flex-1 ${st.done ? 'bg-moss/40' : 'bg-line'}`} />}
                </div>
                <div className="pb-8">
                  <p className="font-semibold">{st.name}</p>
                  <p className="text-sm text-stone">{st.note}</p>
                  <p className="text-xs text-stone">{st.at ? formatDate(st.at) : 'Pending'}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      )}
    </div>
  )
}
