import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { useApp } from './context/AppContext'
import Admin from './pages/Admin'
import Challenges from './pages/Challenges'
import Collector from './pages/Collector'
import Community from './pages/Community'
import Dashboard from './pages/Dashboard'
import Donations from './pages/Donations'
import Facilities from './pages/Facilities'
import Game from './pages/Game'
import Home from './pages/Home'
import Impact from './pages/Impact'
import KnowledgeHub from './pages/KnowledgeHub'
import Leaderboard from './pages/Leaderboard'
import Login from './pages/Login'
import Marketplace from './pages/Marketplace'
import MaterialExchange from './pages/MaterialExchange'
import Pickup from './pages/Pickup'
import Profile from './pages/Profile'
import Recycler from './pages/Recycler'
import Repair from './pages/Repair'
import ReportWaste from './pages/ReportWaste'
import Rewards from './pages/Rewards'
import SmartBins from './pages/SmartBins'
import SmartScan from './pages/SmartScan'
import Upcycle from './pages/Upcycle'
import Wallet from './pages/Wallet'
import WasteDNA from './pages/WasteDNA'
import WastePassport from './pages/WastePassport'

function Guard({ children }) {
  const { user } = useApp()
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <Guard>
              <Layout />
            </Guard>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<SmartScan />} />
          <Route path="/dna" element={<WasteDNA />} />
          <Route path="/pickup" element={<Pickup />} />
          <Route path="/passport" element={<WastePassport />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/community" element={<Community />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/report" element={<ReportWaste />} />
          <Route path="/bins" element={<SmartBins />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/market" element={<Marketplace />} />
          <Route path="/upcycle" element={<Upcycle />} />
          <Route path="/repair" element={<Repair />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/exchange" element={<MaterialExchange />} />
          <Route path="/knowledge" element={<KnowledgeHub />} />
          <Route path="/game" element={<Game />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/collector" element={<Collector />} />
          <Route path="/recycler" element={<Recycler />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
