import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import DistrictSelect from '../risk/DistrictSelect'

function ReportFormPage() {
  const [district, setDistrict] = useState('')
  const [description, setDescription] = useState('')
  const [severity, setSeverity] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!district || !description || !severity) {
      setMessage('Please fill in all fields.')
      return
    }

    setMessage('Report submitted successfully.')

    setDistrict('')
    setDescription('')
    setSeverity('')
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Report a Flood
        </h1>

        <p className="mt-2 text-muted-foreground">
          Submit information about flooding in your area.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Flood Report</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <DistrictSelect
              value={district}
              onChange={setDistrict}
            />

            <div className="space-y-2">
              <label htmlFor="severity" className="text-sm font-medium">
                Severity
              </label>

              <Select
                value={severity}
                onValueChange={(value) => setSeverity(value ?? '')}
              >
                <SelectTrigger id="severity" className="w-full">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>

              <Textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the flooding situation"
                rows={5}
              />
            </div>

            <Button type="submit" className="w-full">
              Submit Report
            </Button>

            {message && (
              <p className="rounded-md bg-muted p-3 text-center text-sm">
                {message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ReportFormPage