import Link from 'next/link'
import { getHighlights } from '../lib/data'
import { categories } from '../lib/constants'
import { Card, SearchBar, SectionHeader, Button } from '../components/ui'

export const dynamic = 'force-dynamic'

const pillars = [
  { title: 'Belonging', desc: 'A new city can feel unfamiliar. Tribey gives you a community from day one.' },
  { title: 'Connectivity', desc: 'Forums and events that connect you to people who get where you are.' },
  { title: 'Local knowledge', desc: 'The city info and businesses you need, without the guesswork.' }
]

export default async function Home() {
  const highlights = await getHighlights()

  return (
    <>
      <section className="rounded-2xl bg-brand-orange/10 px-6 py-14 sm:py-20 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-brand-navy">
          Your new city, your new tribe.
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-slate-600">
          Tribey helps you settle into a new city for work, study, or a fresh start — with people to meet, places to explore, and everyday needs sorted.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/rooms"><Button variant="primary">Get started</Button></Link>
          <Link href="/explore"><Button variant="outline" className="bg-white">Explore Tribey</Button></Link>
        </div>
      </section>

      <section className="py-10">
        <SearchBar placeholder="Search communities, events..." />
      </section>

      <section className="py-2">
        <SectionHeader title="What are you here for?" />
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
      </section>

      <section className="py-12">
        <SectionHeader title="Why Tribey" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pillars.map((p) => (
            <Card key={p.title} className="p-6 text-center">
              <div className="mx-auto w-10 h-10 rounded-full bg-brand-orange" />
              <div className="mt-3 font-medium text-brand-navy">{p.title}</div>
              <div className="mt-1 text-sm text-slate-600">{p.desc}</div>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12">
        <SectionHeader title="Happening near you" action={<Link href="/explore" className="text-sm font-medium text-brand-orange">View all</Link>} />
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
      </section>

      <section className="py-14 text-center">
        <h2 className="text-2xl font-semibold text-brand-navy">Ready to feel at home?</h2>
        <p className="mt-2 text-slate-600">Join Tribey and start exploring your new city today.</p>
        <Link href="/rooms" className="inline-block mt-6"><Button variant="primary">Join Tribey</Button></Link>
      </section>
    </>
  )
}
