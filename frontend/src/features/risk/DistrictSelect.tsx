import { useEffect, useState } from 'react'
import { fetchApi } from '@/lib/apiClient'
import { MapPin } from 'lucide-react'

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
    <div className="space-y-1.5">
      <label htmlFor="district" className="block text-sm font-semibold text-slate-800 flex items-center gap-1.5">
        <MapPin className="w-4 h-4 text-teal-600" />
        Select Affected District <span className="text-rose-500">*</span>
      </label>

      <div className="relative">
        <select
          id="district"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent shadow-sm transition-all appearance-none cursor-pointer pr-10"
        >
          <option value="" disabled>
            -- Choose a district --
          </option>
          {districts.map((district) => (
            <option key={district.id || district.name} value={district.name}>
              {district.name} {district.riskLevel ? `(${district.riskLevel} Risk)` : ''}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default DistrictSelect
export { fallbackDistricts }