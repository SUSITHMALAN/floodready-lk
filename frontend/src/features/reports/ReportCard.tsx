import type { Report } from './useReports'

type ReportCardProps = {
  report: Report
}

function ReportCard({ report }: ReportCardProps) {
  return (
    <div>
      <h3>{report.district}</h3>

      <p>
        Severity: {report.severity}
      </p>

      <p>{report.description}</p>
    </div>
  )
}

export default ReportCard