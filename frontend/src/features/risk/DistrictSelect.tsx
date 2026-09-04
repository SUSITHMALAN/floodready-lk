import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type DistrictSelectProps = {
  value: string
  onChange: (value: string) => void
}

const districts = [
  'Colombo',
  'Gampaha',
  'Kalutara',
  'Kandy',
  'Galle',
  'Matara',
  'Jaffna',
  'Kurunegala',
  'Anuradhapura',
  'Ratnapura',
]

function DistrictSelect({ value, onChange }: DistrictSelectProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="district" className="text-sm font-medium">
        Select District
      </label>

      <Select
        value={value}
        onValueChange={(newValue) => onChange(newValue ?? '')}
      >
        <SelectTrigger id="district" className="w-full">
          <SelectValue placeholder="Choose a district" />
        </SelectTrigger>

        <SelectContent>
          {districts.map((district) => (
            <SelectItem key={district} value={district}>
              {district}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default DistrictSelect