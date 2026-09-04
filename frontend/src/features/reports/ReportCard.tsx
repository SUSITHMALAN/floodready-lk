import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Report } from './useReports'

type ReportCardProps = {
  report: Report
}

function ReportCard({ report }: ReportCardProps) {
  const severityStyle = {
    Low: 'bg-green-100 text-green-800',
    Moderate: 'bg-yellow-100 text-yellow-800',
    High: 'bg-orange-100 text-orange-800',
    Critical: 'bg-red-100 text-red-800',
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>{report.district}</CardTitle>

          <Badge className={severityStyle[report.severity as keyof typeof severityStyle]}>
            {report.severity}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          {report.description}
        </p>
      </CardContent>
    </Card>
  )
}

export default ReportCard