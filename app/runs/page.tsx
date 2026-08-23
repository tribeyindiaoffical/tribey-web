import React from 'react'
import { getRuns } from '../../lib/data'
import MapPlaceholder from '../../components/MapPlaceholder'
import IconUser from '../../components/IconUser'

export const metadata = {
  title: 'Runs & Rides | Tribey',
  description: 'Group runs and rides around the city'
}

export default async function RunsPage() {
  const runs = await getRuns()

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-4">Run & Ride Clubs</h2>
      {runs.length === 0 ? (
        <p className="text-slate-500">No runs scheduled yet.</p>
      ) : (
        <div className="space-y-4">
          {runs.map((r) => (
            <div key={r.id} className="border rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-medium">{r.name}</h3>
                  <p className="text-sm text-slate-600">Start: {r.start}</p>
                  <p className="text-xs text-slate-500 mt-1">{r.route}</p>
                  <div className="mt-3 flex items-center gap-3 flex-wrap">
                    {r.booked.length > 0 ? (
                      r.booked.map((u) => <IconUser key={u.id} name={u.name} />)
                    ) : (
                      <span className="text-sm text-slate-400">No one booked yet</span>
                    )}
                  </div>
                </div>
                <div className="w-40">
                  <MapPlaceholder address={r.start} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
