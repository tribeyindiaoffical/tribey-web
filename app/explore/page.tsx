import Link from 'next/link'
import { getHighlights } from '../../lib/data'
import { categories } from '../../lib/constants'
import { Card, Pill, SearchBar, SectionHeader } from '../../components/ui'

export const metadata = {
  title: 'Explore | Tribey',
  description: 'Find sports, trips, rooms and tiffin near you'
}

export default async function ExplorePage() {
  const highlights = await getHighlights()

  return (
    <section className="py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-brand-navy mb-4">Explore</h1>
        <SearchBar placeholder="Search communities, events..." />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <Pill active>All</Pill>
        {categories.map((c) => (
          <Pill key={c.href}>{c.label}</Pill>
        ))}
      </div>

      <div>
        <SectionHeader title="Categories" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((c) => (
            <Link key={c.href} href={c.href}>
              <Card className="p-5 h-full hover:border-brand-orange transition">
                <div className="text-2xl">{c.emoji}</div>
                <div className="mt-3 font-medium text-sm">{c.label}</div>
                <div className="mt-1 text-xs text-slate-500">{c.desc}</div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader title="Happening near you" />
        {highlights.length === 0 ? (
          <p className="text-slate-500">Nothing posted yet — be the first.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlights.map((h) => (
              <Link key={h.href} href={h.href}>
                <Card className="p-5 h-full hover:shadow-md transition">
                  <div className="text-2xl">{h.emoji}</div>
                  <div className="mt-2 text-xs uppercase text-brand-teal font-medium">{h.label}</div>
                  <div className="mt-1 font-medium">{h.title}</div>
                  <div className="text-sm text-slate-500">{h.sub}</div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
