import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './auth/AuthContext.tsx'
import { Navbar } from './components/Navbar.tsx'
import { Footer } from './components/Footer.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { SignupPage } from './pages/SignupPage.tsx'
import RiskCheckerPage from './features/risk/RiskCheckerPage'
import ReportFormPage from './features/reports/ReportFormPage'
import ReportsDashboardPage from './features/reports/ReportsDashboardPage'
import SafetyGuidePage from './features/safety/SafetyGuidePage'
import {
  MapPin,
  AlertTriangle,
  FileText,
  BookOpen,
  ShieldAlert,
  ArrowRight,
  PhoneCall,
  Activity,
  UserCheck
} from 'lucide-react'
import './App.css'

function HomePage() {
  const { session, loading } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Decorative Background Accents */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 top-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>🇱🇰 Active Readiness System • 25 Districts Monitored</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Be ready before the <span className="text-amber-400 underline decoration-amber-400/40 underline-offset-8">water rises</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-teal-100/90 leading-relaxed font-normal">
              Reliable flood preparedness, district risk assessment, community incident reports, and emergency safety guidelines for Sri Lanka.
            </p>

            {/* CTA Button Group */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/risk"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-teal-950 bg-amber-400 hover:bg-amber-300 shadow-xl shadow-amber-400/20 hover:scale-105 transition-all text-base"
              >
                <MapPin className="w-5 h-5" />
                Check District Risk
              </Link>
              <Link
                to="/report"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-xl shadow-rose-600/20 hover:scale-105 transition-all text-base"
              >
                <AlertTriangle className="w-5 h-5" />
                Report Flood Incident
              </Link>
              <Link
                to="/reports"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all text-base"
              >
                <FileText className="w-5 h-5 text-teal-300" />
                View Incident Reports
              </Link>
            </div>

            {/* Auth Status Banner */}
            {!loading && session && (
              <div className="pt-2 inline-flex items-center gap-2 text-sm text-teal-200 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <UserCheck className="w-4 h-4 text-amber-400" />
                Signed in as <strong className="text-white">{session.user.email}</strong>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Risk Checker */}
          <Link
            to="/risk"
            className="group glass-card p-6 rounded-2xl border border-slate-200/80 shadow-lg hover:shadow-2xl hover:border-teal-500/40 card-hover-effect flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-teal-700 group-hover:text-white transition-all">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                District Risk Checker
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Select your district to view official flood risk warnings, river basin levels, and official recommendations.
              </p>
            </div>
            <div className="flex items-center text-sm font-semibold text-teal-700 group-hover:text-teal-800 gap-1 mt-2">
              Check Risk Status <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Report Flood */}
          <Link
            to="/report"
            className="group glass-card p-6 rounded-2xl border border-slate-200/80 shadow-lg hover:shadow-2xl hover:border-rose-500/40 card-hover-effect flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-rose-700 transition-colors">
                Report Incident
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Submit community flood reports, road blockages, rising water levels, and emergency assistance requests.
              </p>
            </div>
            <div className="flex items-center text-sm font-semibold text-rose-700 group-hover:text-rose-800 gap-1 mt-2">
              Submit Report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Flood Reports Dashboard */}
          <Link
            to="/reports"
            className="group glass-card p-6 rounded-2xl border border-slate-200/80 shadow-lg hover:shadow-2xl hover:border-sky-500/40 card-hover-effect flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                Live Reports
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Browse crowdsourced reports across Sri Lanka filtered by district and severity level in real-time.
              </p>
            </div>
            <div className="flex items-center text-sm font-semibold text-sky-700 group-hover:text-sky-800 gap-1 mt-2">
              View All Reports <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Safety Guide */}
          <Link
            to="/safety"
            className="group glass-card p-6 rounded-2xl border border-slate-200/80 shadow-lg hover:shadow-2xl hover:border-amber-500/40 card-hover-effect flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-800 transition-colors">
                Safety Guide
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Essential emergency steps to take before, during, and after flood events to protect lives and property.
              </p>
            </div>
            <div className="flex items-center text-sm font-semibold text-amber-800 group-hover:text-amber-900 gap-1 mt-2">
              Read Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Info Stats Banner */}
      <section className="bg-slate-100 py-12 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="inline-flex p-3 rounded-xl bg-teal-50 text-teal-700 mb-3">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="text-3xl font-extrabold text-slate-900">25 Districts</h4>
              <p className="text-sm text-slate-600 mt-1 font-medium">Coverage across Western, Sabaragamuwa, Southern & Northern provinces</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="inline-flex p-3 rounded-xl bg-amber-50 text-amber-700 mb-3">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h4 className="text-3xl font-extrabold text-slate-900">Instant Alerts</h4>
              <p className="text-sm text-slate-600 mt-1 font-medium">Severity classifications from Minor to Severe flood warnings</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="inline-flex p-3 rounded-xl bg-rose-50 text-rose-700 mb-3">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h4 className="text-3xl font-extrabold text-slate-900">Hotline 117</h4>
              <p className="text-sm text-slate-600 mt-1 font-medium">Direct connection to Sri Lanka Disaster Management Centre</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <LayoutWrapper>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/risk" element={<RiskCheckerPage />} />
        <Route path="/report" element={<ReportFormPage />} />
        <Route path="/reports" element={<ReportsDashboardPage />} />
        <Route path="/safety" element={<SafetyGuidePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LayoutWrapper>
  )
}

export default App
