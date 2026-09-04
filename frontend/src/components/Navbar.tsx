import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { MapPin, AlertTriangle, FileText, BookOpen, LogIn, LogOut, User } from 'lucide-react'
import { supabase } from '../lib/supabase'

export function Navbar() {
  const { session } = useAuth()
  const location = useLocation()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 glass-nav text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-xl bg-amber-400 text-teal-950 font-black text-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              FR
            </span>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-amber-300 transition-colors">
                FloodReady <span className="text-amber-400">LK</span>
              </span>
              <span className="text-[10px] text-teal-200 uppercase tracking-widest font-semibold">
                Sri Lanka Preparedness
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            <Link
              to="/risk"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/risk')
                  ? 'bg-white/15 text-amber-300 font-semibold'
                  : 'text-teal-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              Risk Checker
            </Link>
            <Link
              to="/report"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/report')
                  ? 'bg-white/15 text-amber-300 font-semibold'
                  : 'text-teal-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Report Flood
            </Link>
            <Link
              to="/reports"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/reports')
                  ? 'bg-white/15 text-amber-300 font-semibold'
                  : 'text-teal-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 text-teal-300" />
              Flood Reports
            </Link>
            <Link
              to="/safety"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/safety')
                  ? 'bg-white/15 text-amber-300 font-semibold'
                  : 'text-teal-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4 text-teal-300" />
              Safety Guide
            </Link>
          </nav>

          {/* User Auth Section */}
          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                <span className="hidden lg:flex items-center gap-2 text-xs font-medium text-teal-100 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  {session.user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-rose-600/80 text-white transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-teal-100 hover:text-white hover:bg-white/10 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-amber-400 hover:bg-amber-300 text-teal-950 shadow-md transition-all hover:scale-105"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
