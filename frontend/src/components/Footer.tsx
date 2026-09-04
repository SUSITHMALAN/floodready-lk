import { PhoneCall, ShieldAlert } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-teal-950 text-teal-100 border-t border-teal-800/50 mt-auto">
      {/* Emergency Hotline Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-850 to-teal-900 border-b border-teal-800/40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-rose-500/20 text-rose-400 rounded-lg animate-pulse">
              <PhoneCall className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs text-teal-300 font-semibold uppercase tracking-wider">Emergency Contacts - Sri Lanka</p>
              <p className="text-sm font-bold text-white">Disaster Management Centre: <span className="text-amber-400">117</span></p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-semibold">
            <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-teal-200">
              📞 Suwa Seriya Ambulance: <strong className="text-white">1990</strong>
            </span>
            <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-teal-200">
              ⚡ CEB Electricity: <strong className="text-white">1987</strong>
            </span>
            <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-teal-200">
              💧 Water Board: <strong className="text-white">1939</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 font-bold text-white text-lg">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              FloodReady LK
            </div>
            <p className="text-xs text-teal-300/80 mt-1 max-w-md">
              Providing real-time flood risk insights, community reporting, and safety guidelines across 25 Sri Lankan districts.
            </p>
          </div>
          <div className="text-xs text-teal-400 flex flex-col items-center md:items-end gap-1">
            <p>© {new Date().getFullYear()} FloodReady LK. Built for Sri Lanka Emergency Readiness.</p>
            <p className="flex items-center gap-1 text-teal-400/70">
              Stay Alert • Stay Prepared • Stay Safe
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
