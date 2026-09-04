import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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

  const clearFilters = () => {
    setSearch('')
    setDistrict('')
    setSeverity('')
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Flood Reports
        </h1>

        <p className="mt-2 text-muted-foreground">
          View and search flood reports from different districts.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Reports</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Search by district or description..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              value={district}
              onValueChange={(value) => setDistrict(value ?? '')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Districts" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Colombo">Colombo</SelectItem>
                <SelectItem value="Gampaha">Gampaha</SelectItem>
                <SelectItem value="Kandy">Kandy</SelectItem>
                <SelectItem value="Galle">Galle</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={severity}
              onValueChange={(value) => setSeverity(value ?? '')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Severities" />
              </SelectTrigger>

              <SelectContent>
              <SelectItem value="Colombo">Colombo</SelectItem>
              <SelectItem value="Gampaha">Gampaha</SelectItem>
              <SelectItem value="Kalutara">Kalutara</SelectItem>
              <SelectItem value="Kandy">Kandy</SelectItem>
              <SelectItem value="Galle">Galle</SelectItem>
              <SelectItem value="Matara">Matara</SelectItem>
              <SelectItem value="Jaffna">Jaffna</SelectItem>
              <SelectItem value="Kurunegala">Kurunegala</SelectItem>
              <SelectItem value="Anuradhapura">Anuradhapura</SelectItem>
              <SelectItem value="Ratnapura">Ratnapura</SelectItem>
            </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Reports ({filteredReports.length})
        </h2>

        {filteredReports.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No reports found.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ReportsDashboardPage