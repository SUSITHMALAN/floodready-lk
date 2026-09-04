import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const safetyTips = {
  Before: [
    'Keep important documents in a safe place.',
    'Prepare an emergency bag.',
    'Know the safest route to higher ground.',
  ],
  During: [
    'Move to a safe and higher location.',
    'Avoid walking or driving through flood water.',
    'Follow official emergency instructions.',
  ],
  After: [
    'Return home only when authorities say it is safe.',
    'Avoid damaged electrical equipment.',
    'Report any dangerous conditions to authorities.',
  ],
}

function SafetyGuidePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Flood Safety Guide
        </h1>

        <p className="mt-2 text-muted-foreground">
          Important safety information before, during, and after a flood.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stay Safe During Floods</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="Before" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="Before">Before</TabsTrigger>
              <TabsTrigger value="During">During</TabsTrigger>
              <TabsTrigger value="After">After</TabsTrigger>
            </TabsList>

            <TabsContent value="Before">
              <div className="mt-4">
                <h2 className="mb-3 text-lg font-semibold">
                  Before a Flood
                </h2>

                <ul className="list-disc space-y-2 pl-5 text-sm">
                  {safetyTips.Before.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="During">
              <div className="mt-4">
                <h2 className="mb-3 text-lg font-semibold">
                  During a Flood
                </h2>

                <ul className="list-disc space-y-2 pl-5 text-sm">
                  {safetyTips.During.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="After">
              <div className="mt-4">
                <h2 className="mb-3 text-lg font-semibold">
                  After a Flood
                </h2>

                <ul className="list-disc space-y-2 pl-5 text-sm">
                  {safetyTips.After.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default SafetyGuidePage