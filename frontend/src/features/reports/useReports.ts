import { useState } from 'react'

export type Report = {
  id: number
  district: string
  severity: string
  description: string
}

function useReports() {
  const [reports] = useState<Report[]>([
    {
      id: 1,
      district: 'Colombo',
      severity: 'High',
      description: 'Water level is rising near the main road.',
    },
    {
      id: 2,
      district: 'Gampaha',
      severity: 'Moderate',
      description: 'Several areas have minor flooding.',
    },
    {
      id: 3,
      district: 'Kandy',
      severity: 'Low',
      description: 'Heavy rain reported in the area.',
    },
    {
      id: 4,
      district: 'Galle',
      severity: 'Critical',
      description: 'Severe flooding reported near residential areas.',
    },
  ])

  return {
    reports,
  }
}

export default useReports