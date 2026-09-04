import { useState } from 'react'
import DistrictSelect from './DistrictSelect'
import useDistrictRisk from './useDistrictRisk'
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  ShieldAlert,
  Loader2,
  MapPin,
  Search,
  Check
} from 'lucide-react'

function getRiskBadge(level: string) {
  switch (level.toLowerCase()) {
    case 'severe':
      return <span className="bg-rose-100 text-rose-800 border border-rose-300 font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider">Severe Risk</span>
    case 'high':
      return <span className="bg-orange-100 text-orange-800 border border-orange-300 font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider">High Risk</span>
    case 'moderate':
      return <span className="bg-amber-100 text-amber-800 border border-amber-300 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">Moderate Risk</span>
    case 'low':
    default:
      return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">Low Risk</span>
  }
}

function getRiskIcon(level: string) {
  switch (level.toLowerCase()) {
    case 'severe':
      return <ShieldAlert className="w-8 h-8 text-rose-600 animate-bounce" />
    case 'high':
      return <AlertTriangle className="w-8 h-8 text-orange-500" />
    case 'moderate':
      return <Info className="w-8 h-8 text-amber-500" />
    case 'low':
    default:
      return <CheckCircle2 className="w-8 h-8 text-emerald-500" />
  }
}

function RiskCheckerPage() {
  const [district, setDistrict] = useState('')
  const { risk, loading, checkRisk } = useDistrictRisk()

  const handleCheckRisk = () => {
    if (district) {
      checkRisk(district)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-teal-700" />
            District Alert System
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            District Flood Risk Checker
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Select any of Sri Lanka's 25 districts to check live flood warning levels, river basin advisories, and safety recommendations.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6">
          <DistrictSelect value={district} onChange={setDistrict} />

          <button
            type="button"
            onClick={handleCheckRisk}
            disabled={!district || loading}
            className="w-full h-12 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-lg shadow-teal-700/20 hover:shadow-teal-700/30 text-base flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing District Data...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Check Flood Risk Status
              </>
            )}
          </button>
        </div>

        {/* Initial Prompt Banner */}
        {!risk && !loading && (
          <div className="bg-slate-100 rounded-2xl border border-slate-200 p-8 text-center text-slate-600 space-y-2">
            <Info className="w-8 h-8 text-teal-600 mx-auto" />
            <p className="font-semibold text-slate-800">Select a district above to view safety warnings.</p>
            <p className="text-xs text-slate-500">Live data includes weather alerts, river water levels, and emergency recommendations.</p>
          </div>
        )}

        {/* Risk Result Card */}
        {risk && (
          <div className="bg-white rounded-2xl border-2 border-teal-600 shadow-xl overflow-hidden animate-fade-in">
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  {getRiskIcon(risk.riskLevel)}
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">{risk.district} District</h3>
                    <p className="text-xs text-slate-500 font-medium">Sri Lanka Disaster Readiness Advisory</p>
                  </div>
                </div>
                {getRiskBadge(risk.riskLevel)}
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Current Situation</h4>
                  <p className="text-slate-800 text-base font-semibold leading-relaxed">{risk.message}</p>
                </div>

                <div className="bg-teal-50 border border-teal-200/80 rounded-xl p-5 space-y-2">
                  <h4 className="text-xs font-extrabold text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-teal-700" />
                    Recommended Safety Actions
                  </h4>
                  <p className="text-slate-800 text-sm leading-relaxed font-medium">
                    {risk.recommendation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RiskCheckerPage