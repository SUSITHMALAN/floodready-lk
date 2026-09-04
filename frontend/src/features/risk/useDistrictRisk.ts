import { useState } from 'react'
import { fetchApi } from '@/lib/apiClient'
import { fallbackDistricts } from './DistrictSelect'
import type { DistrictItem } from './DistrictSelect'

export type RiskData = {
  id?: number
  district: string
  riskLevel: string
  message: string
  recommendation: string
}

function useDistrictRisk() {
  const [risk, setRisk] = useState<RiskData | null>(null)
  const [loading, setLoading] = useState(false)

  const applyFallbackRisk = (districtName: string) => {
    const found = fallbackDistricts.find(
      (d) => d.name.toLowerCase() === districtName.toLowerCase()
    )

    if (found) {
      setRisk({
        id: found.id,
        district: found.name,
        riskLevel: found.riskLevel,
        message: `The current flood risk in ${found.name} is ${found.riskLevel.toLowerCase()}.`,
        recommendation: found.recommendation,
      })
    } else {
      setRisk({
        district: districtName,
        riskLevel: 'Moderate',
        message: `The current flood risk in ${districtName} is moderate.`,
        recommendation: 'Exercise general flood precautions and monitor weather alerts.',
      })
    }
  }

  const checkRisk = async (districtName: string) => {
    if (!districtName) {
      setRisk(null)
      return
    }

    setLoading(true)
    try {
      const districts = await fetchApi<DistrictItem[]>('/api/districts')
      const found = districts.find(
        (d: DistrictItem) => d.name.toLowerCase() === districtName.toLowerCase()
      )

      if (found) {
        setRisk({
          id: found.id,
          district: found.name,
          riskLevel: found.riskLevel,
          message: `The current flood risk in ${found.name} is ${found.riskLevel.toLowerCase()}.`,
          recommendation: found.recommendation,
        })
      } else {
        applyFallbackRisk(districtName)
      }
    } catch {
      applyFallbackRisk(districtName)
    } finally {
      setLoading(false)
    }
  }

  return {
    risk,
    loading,
    checkRisk,
  }
}

export default useDistrictRisk