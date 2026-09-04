import { MapPin, Clock } from 'lucide-react'
import type { Report } from './useReports'

type ReportCardProps = {
  report: Report
}

function getBadge(severity: string) {
  switch (severity?.toLowerCase()) {
    case 'severe':
    case 'critical':
    case 'high':
      return <span className="bg-rose-100 text-rose-800 border border-rose-300 font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider">Severe</span>
    case 'moderate':
      return <span className="bg-amber-100 text-amber-800 border border-amber-300 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">Moderate</span>
    case 'minor':
    case 'low':
    default:
      return <span className="bg-teal-100 text-teal-800 border border-teal-300 font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wider">Minor</span>
  }
}

function ReportCard({ report }: ReportCardProps) {
  const districtDisplay = report.districtName || report.district || 'General'

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all p-6 space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{districtDisplay}</h3>
            {report.location && (
              <div className="flex items-center gap-1.5 text-xs text-teal-700 font-medium mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{report.location}</span>
              </div>
            )}
          </div>
          {getBadge(report.severity)}
        </div>

        <p className="text-slate-700 text-sm leading-relaxed font-normal">
          {report.description}
        </p>
      </div>

      {report.createdAt && (
        <div className="flex items-center gap-1.5 pt-3 text-xs text-slate-400 font-medium border-t border-slate-100">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{new Date(report.createdAt).toLocaleString()}</span>
        </div>
      )}
    </div>
  )
}

export default ReportCard