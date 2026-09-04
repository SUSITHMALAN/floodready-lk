import { useState } from 'react'

type RiskData = {
  district: string
  riskLevel: string
  message: string
}

function useDistrictRisk() {
  const [risk, setRisk] = useState<RiskData | null>(null)

  const checkRisk = (district: string) => {
    if (!district) {
      setRisk(null)
      return
    }

    // Temporary data for frontend development
    const riskData: RiskData = {
      district,
      riskLevel: 'Moderate',
      message: `The current flood risk in ${district} is moderate.`,
    }

    setRisk(riskData)
  }

  return {
    risk,
    checkRisk,
  }
}

export default useDistrictRisk