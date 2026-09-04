import { Button } from '@/components/ui/button'
import { useState } from 'react'
import RiskCheckerPage from './features/risk/RiskCheckerPage'
import ReportFormPage from './features/reports/ReportFormPage'
import ReportsDashboardPage from './features/reports/ReportsDashboardPage'
import SafetyGuidePage from './features/safety/SafetyGuidePage'
import { ShieldAlert, AlertTriangle, ListFilter, BookOpen, Waves } from 'lucide-react'

function App() {
  const [page, setPage] = useState('risk')

  return (
    <div className="min-h-screen bg-muted/30 text-foreground flex flex-col justify-between">
      <div>
        {/* Emergency Alert Bar */}
        <div className="bg-red-600 text-white text-xs font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2">
          <ShieldAlert className="h-3.5 w-3.5 animate-pulse" />
          <span>Disaster Management Center Alert: Monsoon weather active. Emergency Hotline: DMC 117 | Suwa Seriya 1990</span>
        </div>

        {/* Main Application Header */}
        <header className="border-b bg-background shadow-xs sticky top-0 z-50">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => setPage('risk')}
                className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-primary transition-opacity hover:opacity-80"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Waves className="h-5 w-5" />
                </div>
                <span>FloodReady <span className="text-red-500 font-extrabold">LK</span></span>
              </button>

              <nav className="flex flex-wrap justify-center gap-2">
                <Button
                  size="sm"
                  variant={page === 'risk' ? 'default' : 'outline'}
                  onClick={() => setPage('risk')}
                  className="flex items-center gap-1.5"
                >
                  <ShieldAlert className="h-4 w-4" />
                  <span>Risk Checker</span>
                </Button>

                <Button
                  size="sm"
                  variant={page === 'report' ? 'default' : 'outline'}
                  onClick={() => setPage('report')}
                  className="flex items-center gap-1.5"
                >
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span>Report Flood</span>
                </Button>

                <Button
                  size="sm"
                  variant={page === 'reports' ? 'default' : 'outline'}
                  onClick={() => setPage('reports')}
                  className="flex items-center gap-1.5"
                >
                  <ListFilter className="h-4 w-4" />
                  <span>Flood Reports</span>
                </Button>

                <Button
                  size="sm"
                  variant={page === 'safety' ? 'default' : 'outline'}
                  onClick={() => setPage('safety')}
                  className="flex items-center gap-1.5"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Safety Guide</span>
                </Button>
              </nav>
            </div>
          </div>
        </header>

        <main className="py-6">
          {page === 'risk' && <RiskCheckerPage />}
          {page === 'report' && <ReportFormPage />}
          {page === 'reports' && <ReportsDashboardPage />}
          {page === 'safety' && <SafetyGuidePage />}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t bg-background py-6 mt-12">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-muted-foreground sm:px-6">
          <p className="font-medium">FloodReady LK — Sri Lanka Emergency Flood Monitoring Platform</p>
          <p className="mt-1">In collaboration with Disaster Management Center (DMC) & Sri Lanka Red Cross</p>
        </div>
      </footer>
    </div>
  )
}

export default App