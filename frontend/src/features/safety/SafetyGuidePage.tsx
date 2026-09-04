import { useEffect, useState } from 'react'
import { PhoneCall, ShieldAlert, CheckCircle2, AlertOctagon, Info, BookOpen } from 'lucide-react'
import { fetchApi } from '@/lib/apiClient'

export type SafetyGuideItem = {
  id: number
  phase: string
  tip: string
}

const fallbackTips: Record<string, string[]> = {
  Before: [
    'Prepare an emergency kit with canned food, clean drinking water, flashlight, batteries, and medicines.',
    'Keep family identification and property documents sealed in waterproof bags on elevated shelves.',
    'Know your local Grama Niladhari division evacuation routes and designated safe centers.',
    'Clear household gutters and drainage channels around your property before heavy monsoons.',
  ],
  During: [
    'Move immediately to higher ground or upper floors if water levels begin to rise rapidly.',
    'Never walk, swim, or drive through moving flood waters. Turn around, don\'t drown!',
    'Disconnect main electrical power switches and LPG gas valves before evacuating your home.',
    'Listen continuously to Sri Lanka Meteorological Department and DMC official radio/TV broadcasts.',
  ],
  After: [
    'Avoid contact with flood water as it may be contaminated with sewage, leptospirosis (rat fever), or chemicals.',
    'Boil or chlorinate all drinking water until local health inspectors confirm tap water safety.',
    'Inspect home foundation walls and roof beams for structural cracks before re-entering.',
    'Report fallen power lines or broken water mains immediately to CEB (1987) or Water Board (1939).',
  ],
}

function SafetyGuidePage() {
  const [tips, setTips] = useState<Record<string, string[]>>(fallbackTips)
  const [activeTab, setActiveTab] = useState<'Before' | 'During' | 'After'>('Before')

  useEffect(() => {
    fetchApi<SafetyGuideItem[]>('/api/safety-guides')
      .then((data: SafetyGuideItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const grouped: Record<string, string[]> = { Before: [], During: [], After: [] }
          data.forEach((item) => {
            const phaseKey = item.phase.charAt(0).toUpperCase() + item.phase.slice(1).toLowerCase()
            if (!grouped[phaseKey]) grouped[phaseKey] = []
            grouped[phaseKey].push(item.tip)
          })
          setTips(grouped)
        }
      })
      .catch(() => {
        setTips(fallbackTips)
      })
  }, [])

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-700" />
            Emergency Protocols
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sri Lanka Flood Safety Guide
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Essential emergency steps and health precautions before, during, and after flood inundations.
          </p>
        </div>

        {/* Emergency Helplines Card */}
        <div className="bg-gradient-to-r from-rose-900 to-teal-950 text-white rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-lg">
            <PhoneCall className="w-5 h-5 animate-pulse text-rose-400" />
            <span>Emergency Helplines - Sri Lanka</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="bg-white/10 border border-white/15 backdrop-blur-md rounded-xl p-3.5 space-y-0.5">
              <div className="flex items-center gap-2 text-rose-400 font-extrabold text-lg">
                <ShieldAlert className="w-4 h-4" /> 117
              </div>
              <p className="text-xs text-teal-200 font-medium">Disaster Management (DMC)</p>
            </div>

            <div className="bg-white/10 border border-white/15 backdrop-blur-md rounded-xl p-3.5 space-y-0.5">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-lg">
                <PhoneCall className="w-4 h-4" /> 1990
              </div>
              <p className="text-xs text-teal-200 font-medium">Suwa Seriya Emergency Ambulance</p>
            </div>

            <div className="bg-white/10 border border-white/15 backdrop-blur-md rounded-xl p-3.5 space-y-0.5">
              <div className="flex items-center gap-2 text-sky-400 font-extrabold text-lg">
                <AlertOctagon className="w-4 h-4" /> 119
              </div>
              <p className="text-xs text-teal-200 font-medium">Sri Lanka Police Hotline</p>
            </div>
          </div>
        </div>

        {/* Action Guidelines Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Tab Headers */}
          <div className="grid grid-cols-3 bg-slate-100 p-1.5 gap-1.5 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('Before')}
              className={`py-3 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'Before'
                  ? 'bg-white text-teal-800 shadow-md'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              Before Flood
            </button>
            <button
              onClick={() => setActiveTab('During')}
              className={`py-3 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'During'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              During Flood
            </button>
            <button
              onClick={() => setActiveTab('After')}
              className={`py-3 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'After'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              After Flood
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 sm:p-8 space-y-4">
            {activeTab === 'Before' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-teal-800 font-bold text-base">
                  <Info className="w-5 h-5 text-teal-600" />
                  Pre-Monsoon Preparation & Evacuation Measures
                </div>
                <ul className="space-y-3">
                  {(tips.Before || fallbackTips.Before).map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-teal-50/60 border border-teal-100 rounded-xl p-4 text-sm font-medium text-slate-800 leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'During' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  Active Inundation Survival Protocol
                </div>
                <ul className="space-y-3">
                  {(tips.During || fallbackTips.During).map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-rose-50 border border-rose-100 rounded-xl p-4 text-sm font-medium text-slate-800 leading-relaxed">
                      <AlertOctagon className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'After' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-base">
                  <Info className="w-5 h-5 text-amber-600" />
                  Post-Flood Recovery & Leptospirosis Health Measures
                </div>
                <ul className="space-y-3">
                  {(tips.After || fallbackTips.After).map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-amber-50/60 border border-amber-100 rounded-xl p-4 text-sm font-medium text-slate-800 leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SafetyGuidePage