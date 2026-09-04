import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MapPin, Clock } from 'lucide-react'
import type { Report } from './useReports'

type ReportCardProps = {
  report: Report
}

function getBadgeVariant(severity: string) {
  switch (severity?.toLowerCase()) {
    case 'severe':
    case 'critical':
    case 'high':
      return 'destructive'
    case 'moderate':
      return 'secondary'
    case 'minor':
    case 'low':
    default:
      return 'outline'
  }
}

function ReportCard({ report }: ReportCardProps) {
  const districtDisplay = report.districtName || report.district || 'General'

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-bold">{districtDisplay}</CardTitle>
            {report.location && (
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>{report.location}</span>
              </div>
            )}
          </div>

          <Badge variant={getBadgeVariant(report.severity)}>
            {report.severity}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm leading-relaxed text-foreground">
          {report.description}
        </p>

        {report.createdAt && (
          <div className="flex items-center gap-1.5 pt-2 text-xs text-muted-foreground border-t border-border/50">
            <Clock className="h-3 w-3" />
            <span>{new Date(report.createdAt).toLocaleString()}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ReportCard