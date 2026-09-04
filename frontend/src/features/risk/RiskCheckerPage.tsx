import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AlertTriangle, CheckCircle2, Info, ShieldAlert, Loader2 } from 'lucide-react'
import { useState } from 'react'
import DistrictSelect from './DistrictSelect'
import useDistrictRisk from './useDistrictRisk'

function getRiskBadgeVariant(level: string) {
  switch (level.toLowerCase()) {
    case 'severe':
      return 'destructive'
    case 'high':
      return 'destructive'
    case 'moderate':
      return 'secondary'
    case 'low':
    default:
      return 'outline'
  }
}

function getRiskIcon(level: string) {
  switch (level.toLowerCase()) {
    case 'severe':
      return <ShieldAlert className="h-6 w-6 text-red-600 animate-pulse" />
    case 'high':
      return <AlertTriangle className="h-6 w-6 text-orange-500" />
    case 'moderate':
      return <Info className="h-6 w-6 text-yellow-500" />
    case 'low':
    default:
      return <CheckCircle2 className="h-6 w-6 text-emerald-500" />
  }
}

function RiskCheckerPage() {
  const [district, setDistrict] = useState('')
  const { risk, loading, checkRisk } = useDistrictRisk()

  const handleCheckRisk = () => {
    checkRisk(district)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Flood Risk Checker
        </h1>

        <p className="mt-2 text-muted-foreground">
          Select your Sri Lankan district to check live flood warnings and safety advisories.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Check Your District</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <DistrictSelect
            value={district}
            onChange={setDistrict}
          />

          <Button
            type="button"
            onClick={handleCheckRisk}
            disabled={!district || loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking Risk...
              </>
            ) : (
              'Check Risk'
            )}
          </Button>
        </CardContent>
      </Card>

      {!risk && !loading && (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            Select a district above and click "Check Risk" to view current weather and flood advisories.
          </CardContent>
        </Card>
      )}

      {risk && (
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {getRiskIcon(risk.riskLevel)}
                <CardTitle className="text-xl">{risk.district} District</CardTitle>
              </div>

              <Badge variant={getRiskBadgeVariant(risk.riskLevel)}>
                {risk.riskLevel.toUpperCase()} RISK
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="font-medium text-foreground">
              {risk.message}
            </p>

            <div className="rounded-lg bg-muted p-4 space-y-1">
              <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                Safety Recommendation
              </span>
              <p className="text-sm leading-relaxed">
                {risk.recommendation}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default RiskCheckerPage