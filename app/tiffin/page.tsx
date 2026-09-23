import React from 'react'
import Link from 'next/link'
import { getVendors } from '../../lib/data'
import { Badge, Button, Card, SearchBar, SectionHeader } from '../../components/ui'

export const metadata = {
  title: 'Tiffin Services | Tribey',
  description: 'Home-style meals delivered daily'
}

export default async function TiffinPage() {
  const vendors = await getVendors()

  return (
    <section className="py-8 space-y-6">
      <SectionHeader
        title="Tiffin Services"
        action={
          <Link href="/tiffin/vendor/signup">
            <Button variant="primary">Become a vendor</Button>
          </Link>
        }
      />
      <SearchBar placeholder="Search vendors, areas..." />
      {vendors.length === 0 ? (
        <p className="text-slate-500">No tiffin vendors yet — be the first to sign up.</p>
      ) : (
        <div className="space-y-4">
          {vendors.map((v) => (
            <Card key={v.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge>Tiffin</Badge>
                  <h3 className="mt-2 font-medium text-lg">{v.business_name}</h3>
                  <p className="text-sm text-slate-600">{v.area}</p>
                  <p className="text-xs text-slate-500 mt-1">{v.info}</p>
                  {v.delivery_days.length > 0 && (
                    <p className="text-xs text-slate-500 mt-2">Delivers: {v.delivery_days.join(', ')}</p>
                  )}
                  {v.delivery_areas.length > 0 && (
                    <p className="text-xs text-slate-500">Areas: {v.delivery_areas.join(', ')}</p>
                  )}
                </div>
                <div className="text-sm font-medium text-brand-navy whitespace-nowrap">{v.price}</div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
