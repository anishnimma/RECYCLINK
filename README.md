# RecycLink — Turn Waste Into Impact.

Smart recycling and circular-economy platform. Scan waste, mint Waste DNA, schedule pickups, follow Waste Passports, earn RecycPoints, and operate bins, reports and marketplaces as one connected loop.

**Team**
- 24BCE5180 — Boina Soham
- 24BCE5177 — Nimma Anishvaraya Sai Ganesh

## Stack
React + Vite, Tailwind CSS, React Router, Framer Motion, Recharts, Lucide. State is a client-side circular ledger (localStorage) shaped for a future Node/Express or FastAPI + PostgreSQL backend.

## Requirements
- Git
- Node.js 20.19+ or 22.12+
- npm (included with Node.js)

## Clone and run
```bash
git clone https://github.com/anishnimma/RECYCLINK.git
cd RECYCLINK
npm ci
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). `package-lock.json` is committed, so `npm ci` installs the locked dependency versions.

## Demo accounts (password: `demo`)
| Role | Email |
| --- | --- |
| Citizen | anish@vitstudent.ac.in |
| Citizen | soham@vitstudent.ac.in |
| Collector | collector@recyclink.in |
| Recycler | recycler@recyclink.in |
| Admin | admin@recyclink.in |

## Checks
```bash
npm run build
npm run lint
```

## Loop
RecycVision scan → Waste DNA → Smart Pickup → Waste Passport → RecycPoints → Circularity Score → Eco Impact → Leaderboard.
Collector and recycler status changes write back into the same passport and wallet.

## Prototype notes
- This is a frontend prototype: accounts, AI scan results, collections, rewards, and other data are simulated; there is no backend or real authentication.
- Demo changes are saved in this browser's local storage. Other users and browsers have separate demo data.
- Image scans use simulated classification; no image is sent to an AI service.
- For static hosting, configure the host to serve `index.html` for application routes so direct links such as `/dashboard` work after refresh.
