import React from 'react'
import { getRuns } from '../../lib/data'
import MapPlaceholder from '../../components/MapPlaceholder'
import { AvatarStack, Badge, Button, Card, SearchBar, SectionHeader } from '../../components/ui'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Runs & Rides | Tribey',
  description: 'Group runs and rides around the city'
}

export default async function RunsPage() {
  const runs = await getRuns()

  return (
    <section className="py-8 space-y-6">
      <SectionHeader title="Run & Ride Clubs" />
      <SearchBar placeholder="Search clubs, routes, runners..." />
      {runs.length === 0 ? (
        <p className="text-slate-500">No runs scheduled yet.</p>
      ) : (
        <div className="space-y-4">
          {runs.map((r) => (
            <Card key={r.id} className="p-5">
              <div className="flex items-start gap-5">
                <div className="flex-1 min-w-0">
                  <Badge>Run Club</Badge>
                  <h3 className="mt-2 font-medium text-lg">{r.name}</h3>
                  <p className="text-sm text-slate-600">Start: {r.start}</p>
                  <p className="text-xs text-slate-500 mt-1">{r.route}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
                    <AvatarStack people={r.booked} />
                    <Button variant="primary" disabled title="Booking coming soon">Join Club</Button>
                  </div>
                </div>
                <div className="w-40 shrink-0 hidden sm:block">
                  <MapPlaceholder address={r.start} className="rounded-xl" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
