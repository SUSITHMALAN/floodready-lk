import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { fetchApi } from '@/lib/apiClient'

type DistrictSelectProps = {
  value: string
  onChange: (value: string) => void
}

export type DistrictItem = {
  id: number
  name: string
  riskLevel: string
  recommendation: string
}

const fallbackDistricts: DistrictItem[] = [
  { id: 1, name: 'Colombo', riskLevel: 'High', recommendation: 'Stay alert near Kelani river low-lying areas.' },
  { id: 2, name: 'Gampaha', riskLevel: 'High', recommendation: 'Prepare emergency supplies near Ja-Ela.' },
  { id: 3, name: 'Kalutara', riskLevel: 'Severe', recommendation: 'High flood alert near Kalu Ganga.' },
  { id: 4, name: 'Ratnapura', riskLevel: 'Severe', recommendation: 'Severe landslide and flood warning.' },
  { id: 5, name: 'Galle', riskLevel: 'Moderate', recommendation: 'Caution near Gin Ganga basin.' },
  { id: 6, name: 'Matara', riskLevel: 'Moderate', recommendation: 'Monitor Nilwala Ganga water levels.' },
  { id: 7, name: 'Hambantota', riskLevel: 'Low', recommendation: 'Normal precautions.' },
  { id: 8, name: 'Kandy', riskLevel: 'Moderate', recommendation: 'Caution for localized flash floods.' },
  { id: 9, name: 'Matale', riskLevel: 'Low', recommendation: 'Standard monsoon preparedness.' },
  { id: 10, name: 'Nuwara Eliya', riskLevel: 'Moderate', recommendation: 'High landslide risk during intense showers.' },
  { id: 11, name: 'Kegalle', riskLevel: 'High', recommendation: 'High risk of earth slips.' },
  { id: 12, name: 'Badulla', riskLevel: 'Moderate', recommendation: 'Landslide watch in effect.' },
  { id: 13, name: 'Monaragala', riskLevel: 'Low', recommendation: 'Low flood risk currently.' },
  { id: 14, name: 'Jaffna', riskLevel: 'Low', recommendation: 'Clear urban drainage lines.' },
  { id: 15, name: 'Kilinochchi', riskLevel: 'Low', recommendation: 'Monitor tank water release warnings.' },
  { id: 16, name: 'Mannar', riskLevel: 'Low', recommendation: 'Coastal weather advisories.' },
  { id: 17, name: 'Vavuniya', riskLevel: 'Low', recommendation: 'Normal precautions.' },
  { id: 18, name: 'Mullaitivu', riskLevel: 'Low', recommendation: 'Monitor reservoir spills.' },
  { id: 19, name: 'Batticaloa', riskLevel: 'Moderate', recommendation: 'Lagoon water levels may rise.' },
  { id: 20, name: 'Ampara', riskLevel: 'Moderate', recommendation: 'Caution in paddy farming regions.' },
  { id: 21, name: 'Trincomalee', riskLevel: 'Low', recommendation: 'Standard weather advisories apply.' },
  { id: 22, name: 'Kurunegala', riskLevel: 'Moderate', recommendation: 'Watch for Deduru Oya water flow.' },
  { id: 23, name: 'Puttalam', riskLevel: 'Moderate', recommendation: 'Caution in coastal lagoon zones.' },
  { id: 24, name: 'Anuradhapura', riskLevel: 'Low', recommendation: 'Check sluice gate notices.' },
  { id: 25, name: 'Polonnaruwa', riskLevel: 'Low', recommendation: 'Stay updated on Mahaweli river alerts.' },
]

function DistrictSelect({ value, onChange }: DistrictSelectProps) {
  const [districts, setDistricts] = useState<DistrictItem[]>(fallbackDistricts)

  useEffect(() => {
    fetchApi<DistrictItem[]>('/api/districts')
      .then((data: DistrictItem[]) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setDistricts(data)
        }
      })
      .catch(() => {
        setDistricts(fallbackDistricts)
      })
  }, [])

  return (
    <div className="space-y-2">
      <label htmlFor="district" className="text-sm font-medium">
        Select District
      </label>

      <Select
        value={value}
        onValueChange={(newValue: string | null) => onChange(newValue ?? '')}
      >
        <SelectTrigger id="district" className="w-full">
          <SelectValue placeholder="Choose a district" />
        </SelectTrigger>

        <SelectContent>
          {districts.map((district) => (
            <SelectItem key={district.id || district.name} value={district.name}>
              {district.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default DistrictSelect
export { fallbackDistricts }