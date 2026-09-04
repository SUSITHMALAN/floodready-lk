import { useState } from 'react'
import DistrictSelect from '../components/DistrictSelect'
import useDistrictRisk from '../hooks/useDistrictRisk'

function RiskCheckerPage() {
  const [district, setDistrict] = useState('')
  const { risk, checkRisk } = useDistrictRisk()

  const handleCheckRisk = () => {
    checkRisk(district)
  }

  return (
    <div>
      <h1>Flood Risk Checker</h1>

      <p>Select your district to check the flood risk.</p>

      <DistrictSelect
        value={district}
        onChange={setDistrict}
      />

      <button
        type="button"
        onClick={handleCheckRisk}
        disabled={!district}
      >
        Check Risk
      </button>

      {risk && (
        <div>
          <h2>{risk.district}</h2>
          <p>Risk Level: {risk.riskLevel}</p>
          <p>{risk.message}</p>
        </div>
      )}
    </div>
  )
}

export default RiskCheckerPage