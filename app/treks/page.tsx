import React from 'react'
import { getTreks } from '../../lib/data'
import MapPlaceholder from '../../components/MapPlaceholder'
import { AvatarStack, Badge, Button, Card, SearchBar, SectionHeader } from '../../components/ui'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Treks & Camping | Tribey',
  description: 'Weekend treks with your new tribe'
}

export default async function TreksPage() {
  const treks = await getTreks()

  return (
    <section className="py-8 space-y-6">
      <SectionHeader title="Treks & Camping" />
      <SearchBar placeholder="Find trails, parks, or cities..." />
      {treks.length === 0 ? (
        <p className="text-slate-500">No treks planned yet.</p>
      ) : (
        <div className="space-y-4">
          {treks.map((t) => (
            <Card key={t.id} className="p-5">
              <div className="flex items-start gap-5">
                <div className="flex-1 min-w-0">
                  <Badge>Trek</Badge>
                  <h3 className="mt-2 font-medium text-lg">{t.name}</h3>
                  <p className="text-sm text-slate-600">Start: {t.start}</p>
                  <p className="text-xs text-slate-500 mt-1">{t.info}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
                    <AvatarStack people={t.booked} />
                    <Button variant="primary" disabled title="Booking coming soon">Plan Trek</Button>
                  </div>
                </div>
                <div className="w-40 shrink-0 hidden sm:block">
                  <MapPlaceholder address={t.start} className="rounded-xl" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
