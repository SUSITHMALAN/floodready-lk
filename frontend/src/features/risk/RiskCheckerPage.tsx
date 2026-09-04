import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useState } from 'react'
import DistrictSelect from './DistrictSelect'
import useDistrictRisk from './useDistrictRisk'

function RiskCheckerPage() {
  const [district, setDistrict] = useState('')
  const { risk, checkRisk } = useDistrictRisk()

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
          Select your district to check the current flood risk.
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
            disabled={!district}
            className="w-full"
          >
            Check Risk
          </Button>
        </CardContent>
      </Card>

      {!risk && (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            Select a district and click "Check Risk" to see the flood risk.
          </CardContent>
        </Card>
      )}

      {risk && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <CardTitle>{risk.district}</CardTitle>

              <Badge>{risk.riskLevel}</Badge>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground">
              {risk.message}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default RiskCheckerPage