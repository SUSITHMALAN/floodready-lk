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
import { Search, RefreshCw, FilterX, Loader2 } from 'lucide-react'
import { useState } from 'react'
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
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Community Flood Reports
          </h1>

          <p className="mt-1 text-muted-foreground">
            Live crowd-sourced flood reports across Sri Lanka.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={loading}
          className="self-start sm:self-auto"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter Reports</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by location, district, or keyword..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-9"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              value={district}
              onValueChange={(value: string | null) => setDistrict(value === 'ALL' ? '' : (value ?? ''))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Districts" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All Districts</SelectItem>
                {fallbackDistricts.map((d) => (
                  <SelectItem key={d.id} value={d.name}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={severity}
              onValueChange={(value: string | null) => setSeverity(value === 'ALL' ? '' : (value ?? ''))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Severities" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All Severities</SelectItem>
                <SelectItem value="Minor">Minor</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Severe">Severe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(search || district || severity) && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <FilterX className="mr-1.5 h-3.5 w-3.5" />
              Clear Active Filters
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Active Reports ({filteredReports.length})
          </h2>

          {loading && (
            <span className="flex items-center text-xs text-muted-foreground">
              <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
              Updating...
            </span>
          )}
        </div>

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
              No flood reports matched your search criteria.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ReportsDashboardPage