import React from 'react'
import { getTreks } from '../../lib/data'
import MapPlaceholder from '../../components/MapPlaceholder'
import IconUser from '../../components/IconUser'

export const metadata = {
  title: 'Treks & Camping | Tribey',
  description: 'Weekend treks with your new tribe'
}

export default async function TreksPage() {
  const treks = await getTreks()

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-4">Treks & Camping</h2>
      {treks.length === 0 ? (
        <p className="text-slate-500">No treks planned yet.</p>
      ) : (
        <div className="space-y-4">
          {treks.map((t) => (
            <div key={t.id} className="border rounded-lg p-4">
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <h3 className="font-medium">{t.name}</h3>
                  <p className="text-sm text-slate-600">Start: {t.start}</p>
                  <p className="text-xs text-slate-500 mt-1">{t.info}</p>
                  <div className="mt-3 flex gap-3 flex-wrap">
                    {t.booked.length > 0 ? (
                      t.booked.map((u) => <IconUser key={u.id} name={u.name} />)
                    ) : (
                      <span className="text-sm text-slate-400">No one booked yet</span>
                    )}
                  </div>
                </div>
                <div className="w-40">
                  <MapPlaceholder address={t.start} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
