import { useState } from 'react'
import RiskCheckerPage from './features/risk/RiskCheckerPage'
import ReportFormPage from './features/reports/ReportFormPage'
import ReportsDashboardPage from './features/reports/ReportsDashboardPage'
import SafetyGuidePage from './features/safety/SafetyGuidePage'
import './App.css'

function App() {
  const [page, setPage] = useState('risk')

  return (
    <div>
      <header>
        <h1>FloodReady LK</h1>

        <nav>
          <button onClick={() => setPage('risk')}>
            Risk Checker
          </button>

          <button onClick={() => setPage('report')}>
            Report Flood
          </button>

          <button onClick={() => setPage('reports')}>
            Flood Reports
          </button>

          <button onClick={() => setPage('safety')}>
            Safety Guide
          </button>
        </nav>
      </header>

      <main>
        {page === 'risk' && <RiskCheckerPage />}
        {page === 'report' && <ReportFormPage />}
        {page === 'reports' && <ReportsDashboardPage />}
        {page === 'safety' && <SafetyGuidePage />}
      </main>
    </div>
  )
}

export default App