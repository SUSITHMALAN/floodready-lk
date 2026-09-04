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
    <div>
      <label htmlFor="district">Select District</label>

      <select
        id="district"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Choose a district</option>

        {districts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DistrictSelect