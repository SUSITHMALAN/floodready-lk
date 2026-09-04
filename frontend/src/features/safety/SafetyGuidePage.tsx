import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PhoneCall, ShieldAlert, CheckCircle2, AlertOctagon, Info } from 'lucide-react'
import { fetchApi } from '@/lib/apiClient'

export type SafetyGuideItem = {
  id: number
  phase: string
  tip: string
}

const fallbackTips: Record<string, string[]> = {
  Before: [
    'Prepare an emergency kit with canned food, clean drinking water, flashlight, batteries, and medicines.',
    'Keep family identification and property documents sealed in waterproof bags on elevated shelves.',
    'Know your local Grama Niladhari division evacuation routes and designated safe centers.',
    'Clear household gutters and drainage channels around your property before heavy monsoons.',
  ],
  During: [
    'Move immediately to higher ground or upper floors if water levels begin to rise rapidly.',
    'Never walk, swim, or drive through moving flood waters. Turn around, don\'t drown!',
    'Disconnect main electrical power switches and LPG gas valves before evacuating your home.',
    'Listen continuously to Sri Lanka Meteorological Department and DMC official radio/TV broadcasts.',
  ],
  After: [
    'Avoid contact with flood water as it may be contaminated with sewage, leptospirosis (rat fever), or chemicals.',
    'Boil or chlorinate all drinking water until local health inspectors confirm tap water safety.',
    'Inspect home foundation walls and roof beams for structural cracks before re-entering.',
    'Report fallen power lines or broken water mains immediately to CEB (1987) or Water Board (1939).',
  ],
}

function SafetyGuidePage() {
  const [tips, setTips] = useState<Record<string, string[]>>(fallbackTips)

  useEffect(() => {
    fetchApi<SafetyGuideItem[]>('/api/safety-guides')
      .then((data: SafetyGuideItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const grouped: Record<string, string[]> = { Before: [], During: [], After: [] }
          data.forEach((item) => {
            const phaseKey = item.phase.charAt(0).toUpperCase() + item.phase.slice(1).toLowerCase()
            if (!grouped[phaseKey]) grouped[phaseKey] = []
            grouped[phaseKey].push(item.tip)
          })
          setTips(grouped)
        }
      })
      .catch(() => {
        setTips(fallbackTips)
      })
  }, [])

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Sri Lanka Flood Safety Guide
        </h1>

        <p className="mt-2 text-muted-foreground">
          Essential safety instructions and emergency protocols before, during, and after flood events.
        </p>
      </div>

      {/* Emergency Hotlines Banner */}
      <Card className="border-l-4 border-l-red-500 bg-red-500/5">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-lg">
            <PhoneCall className="h-5 w-5 animate-pulse" />
            <span>Emergency Helplines Sri Lanka</span>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3 pt-1 text-sm font-medium">
            <div className="flex items-center gap-2 rounded-md bg-background p-2.5 shadow-sm">
              <ShieldAlert className="h-4 w-4 text-red-500" />
              <div>
                <p className="font-bold">117</p>
                <p className="text-xs text-muted-foreground">Disaster Management (DMC)</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-md bg-background p-2.5 shadow-sm">
              <PhoneCall className="h-4 w-4 text-blue-500" />
              <div>
                <p className="font-bold">1990</p>
                <p className="text-xs text-muted-foreground">Suwa Seriya Ambulance</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-md bg-background p-2.5 shadow-sm">
              <AlertOctagon className="h-4 w-4 text-orange-500" />
              <div>
                <p className="font-bold">119</p>
                <p className="text-xs text-muted-foreground">Police Emergency</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Disaster Preparedness & Action Guidelines</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="Before" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="Before">Before Flood</TabsTrigger>
              <TabsTrigger value="During">During Flood</TabsTrigger>
              <TabsTrigger value="After">After Flood</TabsTrigger>
            </TabsList>

            <TabsContent value="Before" className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-primary font-semibold text-base">
                <Info className="h-5 w-5" />
                <span>Pre-Monsoon Preparation & Measures</span>
              </div>

              <ul className="space-y-2.5">
                {(tips.Before || fallbackTips.Before).map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed rounded-md bg-muted/50 p-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="During" className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-red-500 font-semibold text-base">
                <ShieldAlert className="h-5 w-5" />
                <span>Active Inundation Survival Protocol</span>
              </div>

              <ul className="space-y-2.5">
                {(tips.During || fallbackTips.During).map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed rounded-md bg-red-500/10 p-3">
                    <AlertOctagon className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="After" className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-amber-500 font-semibold text-base">
                <Info className="h-5 w-5" />
                <span>Post-Flood Recovery & Health Protection</span>
              </div>

              <ul className="space-y-2.5">
                {(tips.After || fallbackTips.After).map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed rounded-md bg-muted/50 p-3">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default SafetyGuidePage