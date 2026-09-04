import { Button } from '@/components/ui/button'
import { useState } from 'react'
import RiskCheckerPage from './features/risk/RiskCheckerPage'
import ReportFormPage from './features/reports/ReportFormPage'
import ReportsDashboardPage from './features/reports/ReportsDashboardPage'
import SafetyGuidePage from './features/safety/SafetyGuidePage'

function App() {
  const [page, setPage] = useState('risk')

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => setPage('risk')}
              className="text-2xl font-bold tracking-tight"
            >
              FloodReady LK
            </button>

            <nav className="flex flex-wrap justify-center gap-2">
              <Button
                variant={page === 'risk' ? 'default' : 'outline'}
                onClick={() => setPage('risk')}
              >
                Risk Checker
              </Button>

              <Button
                variant={page === 'report' ? 'default' : 'outline'}
                onClick={() => setPage('report')}
              >
                Report Flood
              </Button>

              <Button
                variant={page === 'reports' ? 'default' : 'outline'}
                onClick={() => setPage('reports')}
              >
                Flood Reports
              </Button>

              <Button
                variant={page === 'safety' ? 'default' : 'outline'}
                onClick={() => setPage('safety')}
              >
                Safety Guide
              </Button>
            </nav>
          </div>
        </div>
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