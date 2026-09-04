import { useState } from 'react'
import { Search, RefreshCw, FilterX, Loader2, FileText, AlertTriangle } from 'lucide-react'
import ReportCard from './ReportCard'
import useReports from './useReports'
import { fallbackDistricts } from '../risk/DistrictSelect'

function ReportsDashboardPage() {
  const { reports, loading, refetch } = useReports()

  const [search, setSearch] = useState('')
  const [district, setDistrict] = useState('')
  const [severity, setSeverity] = useState('')

  const filteredReports = reports.filter((report) => {
    const districtName = report.districtName || report.district || ''
    const location = report.location || ''

    const matchesSearch =
      search === '' ||
      report.description.toLowerCase().includes(search.toLowerCase()) ||
      districtName.toLowerCase().includes(search.toLowerCase()) ||
      location.toLowerCase().includes(search.toLowerCase())

    const matchesDistrict =
      district === '' || districtName.toLowerCase() === district.toLowerCase()

    const matchesSeverity =
      severity === '' || report.severity.toLowerCase() === severity.toLowerCase()

    return matchesSearch && matchesDistrict && matchesSeverity
  })

  const clearFilters = () => {
    setSearch('')
    setDistrict('')
    setSeverity('')
  }

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4 text-sky-700" />
              Community Updates
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Live Community Reports
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Explore crowdsourced flood reports, water levels, and road conditions across Sri Lanka.
            </p>
          </div>

          <button
            onClick={() => refetch()}
            disabled={loading}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 text-teal-600 ${loading ? 'animate-spin' : ''}`} />
            Refresh Feed
          </button>
        </div>

        {/* Filter Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Filter Incident Feed</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search location, district..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              />
            </div>

            {/* District Select */}
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value === 'ALL' ? '' : e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            >
              <option value="ALL">All Districts</option>
              {fallbackDistricts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* Severity Select */}
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value === 'ALL' ? '' : e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            >
              <option value="ALL">All Severity Levels</option>
              <option value="Minor">Minor</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>
          </div>

          {(search || district || severity) && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-rose-600 font-semibold hover:underline cursor-pointer pt-1"
            >
              <FilterX className="w-3.5 h-3.5" />
              Clear Active Filters
            </button>
          )}
        </div>

        {/* Reports Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Active Reports ({filteredReports.length})
            </h3>
            {loading && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-teal-700">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Fetching updates...
              </span>
            )}
          </div>

          {filteredReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-2">
              <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
              <p className="font-bold text-slate-800">No reports matched your filters.</p>
              <p className="text-xs text-slate-500">Try clearing filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReportsDashboardPage