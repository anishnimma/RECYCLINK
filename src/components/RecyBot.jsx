import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { recyReply } from '../lib/vision'

const SUGGESTIONS = [
  'Can I recycle this?',
  'How should I dispose of batteries?',
  'What can I do with cardboard?',
  'How do Waste Passports work?',
]

export default function RecyBot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'I’m RecyBot. Ask about materials, pickups, passports or RecycPoints — I’ll keep answers local to Chennai’s circular system.',
    },
  ])

  const send = (text) => {
    const q = (text || input).trim()
    if (!q) return
    setMessages((m) => [...m, { from: 'you', text: q }, { from: 'bot', text: recyReply(q) }])
    setInput('')
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-moss text-white shadow-xl shadow-moss/30"
        aria-label="Open RecyBot"
      >
        <Sparkles size={20} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-24 right-5 z-40 flex h-[480px] w-[min(100%-2rem,380px)] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between bg-forest px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <Bot size={18} />
                <div>
                  <p className="text-sm font-semibold">RecyBot · EcoAI</p>
                  <p className="text-[11px] text-white/70">Simulated circularity assistant</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'you' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                      m.from === 'you' ? 'bg-moss text-white' : 'bg-sand text-ink'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 px-3 pb-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-line px-2.5 py-1 text-[11px] text-stone hover:border-moss hover:text-moss"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              className="flex gap-2 border-t border-line p-3"
              onSubmit={(e) => {
                e.preventDefault()
                send()
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask RecyBot…"
                className="flex-1 rounded-full bg-sand px-3 py-2 text-sm outline-none"
              />
              <button type="submit" className="rounded-full bg-moss p-2 text-white">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
