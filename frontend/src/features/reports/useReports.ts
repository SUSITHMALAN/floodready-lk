import { useEffect, useState, useCallback } from 'react'
import { fetchApi } from '@/lib/apiClient'

export type Report = {
  id: string | number
  districtId?: number
  districtName?: string
  district?: string
  location?: string
  severity: string
  description: string
  createdAt?: string
}

const fallbackReports: Report[] = [
  {
    id: '1',
    district: 'Colombo',
    districtName: 'Colombo',
    location: 'Wellawatte',
    severity: 'Severe',
    description: 'Water level is rising rapidly near the main High Level road.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    district: 'Gampaha',
    districtName: 'Gampaha',
    location: 'Ja-Ela',
    severity: 'Moderate',
    description: 'Several low-lying residential areas have standing flood water.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    district: 'Kalutara',
    districtName: 'Kalutara',
    location: 'Bulathsinhala',
    severity: 'Severe',
    description: 'Kalu Ganga overflow warning issued by authorities.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    district: 'Ratnapura',
    districtName: 'Ratnapura',
    location: 'Pelmadulla',
    severity: 'Severe',
    description: 'Landslide watch and heavy inundation on main access roads.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    district: 'Kandy',
    districtName: 'Kandy',
    location: 'Peradeniya',
    severity: 'Minor',
    description: 'Heavy rain reported in the area. Minor drainage overflow.',
    createdAt: new Date().toISOString(),
  },
]

function useReports() {
  const [reports, setReports] = useState<Report[]>(fallbackReports)
  const [loading, setLoading] = useState(false)

  const fetchReports = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchApi<Report[]>('/api/reports')
      if (Array.isArray(data)) {
        const formatted = data.map((r) => ({
          ...r,
          district: r.districtName || r.district || 'General',
        }))
        setReports(formatted.length > 0 ? formatted : fallbackReports)
      }
    } catch {
      setReports(fallbackReports)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReports()
  }, [fetchReports])

  return {
    reports,
    loading,
    refetch: fetchReports,
  }
}

export default useReports