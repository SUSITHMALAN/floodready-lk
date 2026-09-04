import { useState } from 'react'
import ReportCard from './ReportCard'
import useReports from './useReports'

function ReportsDashboardPage() {
  const { reports } = useReports()

  const [search, setSearch] = useState('')
  const [district, setDistrict] = useState('')
  const [severity, setSeverity] = useState('')

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.description.toLowerCase().includes(search.toLowerCase()) ||
      report.district.toLowerCase().includes(search.toLowerCase())

    const matchesDistrict =
      district === '' || report.district === district

    const matchesSeverity =
      severity === '' || report.severity === severity

    return matchesSearch && matchesDistrict && matchesSeverity
  })

  return (
    <div>
      <h1>Flood Reports</h1>

      <div>
        <input
          type="text"
          placeholder="Search reports"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={district}
          onChange={(event) => setDistrict(event.target.value)}
        >
          <option value="">All Districts</option>
          <option value="Colombo">Colombo</option>
          <option value="Gampaha">Gampaha</option>
          <option value="Kandy">Kandy</option>
          <option value="Galle">Galle</option>
        </select>

        <select
          value={severity}
          onChange={(event) => setSeverity(event.target.value)}
        >
          <option value="">All Severities</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      <div>
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
            />
          ))
        ) : (
          <p>No reports found.</p>
        )}
      </div>
    </div>
  )
}

export default ReportsDashboardPage