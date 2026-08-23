import React from 'react'
import { getTiffin } from '../../lib/data'
import IconUser from '../../components/IconUser'

export const metadata = {
  title: 'Tiffin Services | Tribey',
  description: 'Home-style meals delivered daily'
}

export default async function TiffinPage() {
  const tiffin = await getTiffin()

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-4">Tiffin Services</h2>
      {tiffin.length === 0 ? (
        <p className="text-slate-500">No tiffin services listed yet.</p>
      ) : (
        <div className="space-y-4">
          {tiffin.map((t) => (
            <div key={t.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium">{t.name}</h3>
                  <p className="text-sm text-slate-600">{t.area}</p>
                  <p className="text-xs text-slate-500 mt-1">{t.info}</p>
                </div>
                <div className="text-sm font-medium text-brand-navy whitespace-nowrap">{t.price}</div>
              </div>
              {t.provider && (
                <div className="mt-3">
                  <IconUser name={t.provider.name} role="Provider" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
