import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './auth/AuthContext.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { SignupPage } from './pages/SignupPage.tsx'
import RiskCheckerPage from './features/risk/RiskCheckerPage'
import ReportFormPage from './features/reports/ReportFormPage'
import ReportsDashboardPage from './features/reports/ReportsDashboardPage'
import SafetyGuidePage from './features/safety/SafetyGuidePage'
import './App.css'

function HomePage() {
  const { session, loading } = useAuth()
  return (
    <main className="home-page"><div className="home-content">
      <span className="brand-mark" aria-hidden="true">FR</span>
      <p className="eyebrow">FloodReady LK</p>
      <h1>Be ready before the water rises.</h1>
      <p className="home-copy">Reliable flood preparedness information for communities across Sri Lanka.</p>
      {!loading && !session && <a className="primary-link" href="/login">Sign in to continue</a>}
      {!loading && session && <>
        <p className="signed-in">Signed in as <strong>{session.user.email}</strong></p>
        <nav className="feature-nav" aria-label="FloodReady tools">
          <Link to="/risk">Risk Checker</Link>
          <Link to="/report">Report Flood</Link>
          <Link to="/reports">Flood Reports</Link>
          <Link to="/safety">Safety Guide</Link>
        </nav>
      </>}
    </div></main>
  )
}

function App() {
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/risk" element={<RiskCheckerPage />} />
    <Route path="/report" element={<ReportFormPage />} />
    <Route path="/reports" element={<ReportsDashboardPage />} />
    <Route path="/safety" element={<SafetyGuidePage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}

export default App

