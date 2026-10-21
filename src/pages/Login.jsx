import { Recycle } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Field, inputClass } from '../components/ui'
import { useApp } from '../context/AppContext'

const ROLES = [
  { role: 'citizen', email: 'anish@vitstudent.ac.in', label: 'Citizen' },
  { role: 'collector', email: 'collector@recyclink.in', label: 'Collector' },
  { role: 'recycler', email: 'recycler@recyclink.in', label: 'Recycler' },
  { role: 'admin', email: 'admin@recyclink.in', label: 'Admin' },
]

export default function Login() {
  const { login } = useApp()
  const nav = useNavigate()
  const [email, setEmail] = useState('anish@vitstudent.ac.in')
  const [password, setPassword] = useState('demo')
  const [role, setRole] = useState('citizen')

  const submit = (e) => {
    e.preventDefault()
    const user = login(email, password, role)
    const dest = user.role === 'admin' ? '/admin' : user.role === 'collector' ? '/collector' : user.role === 'recycler' ? '/recycler' : '/dashboard'
    nav(dest)
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-forest p-10 text-white lg:flex">
        <Link to="/" className="flex items-center gap-2 text-sm">
          <Recycle size={18} /> RecycLink
        </Link>
        <div>
          <p className="font-display text-5xl leading-tight">Turn Waste Into Impact.</p>
          <p className="mt-4 max-w-sm text-white/70">
            Role-based access for citizens, collectors, recyclers and operators — one circular ledger.
          </p>
        </div>
        <p className="text-xs text-white/50">VIT Chennai · 24BCE5180 · 24BCE5177</p>
      </div>
      <div className="flex items-center justify-center bg-sand p-6">
        <Card className="w-full max-w-md p-8">
          <h1 className="font-display text-3xl">Sign in</h1>
          <p className="mt-1 text-sm text-stone">Password for all demo accounts is <strong>demo</strong>.</p>
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <Field label="Email">
              <input className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
            <Field label="Password">
              <input type="password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((r) => (
                <button
                  type="button"
                  key={r.role}
                  onClick={() => {
                    setRole(r.role)
                    setEmail(r.email)
                    setPassword('demo')
                  }}
                  className={`rounded-2xl border px-3 py-2 text-left text-xs ${role === r.role ? 'border-moss bg-mint text-moss' : 'border-line'}`}
                >
                  <p className="font-semibold">{r.label}</p>
                  <p className="text-stone">{r.email.split('@')[0]}</p>
                </button>
              ))}
            </div>
            <Button className="w-full" type="submit">
              Continue
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
