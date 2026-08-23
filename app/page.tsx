import Link from 'next/link'
import { getSports, getRuns, getTreks, getRooms, getTiffin } from '../lib/data'

const categories = [
  { href: '/sports', label: 'Sports Booking', desc: 'Book a turf or join a game nearby', emoji: '⚽' },
  { href: '/runs', label: 'Runs & Rides', desc: 'Group runs and rides around the city', emoji: '🏃' },
  { href: '/treks', label: 'Treks & Camping', desc: 'Weekend treks with your new tribe', emoji: '🏕️' },
  { href: '/rooms', label: 'Rooms & Roommates', desc: 'Find a place, find your people', emoji: '🏠' },
  { href: '/tiffin', label: 'Tiffin Services', desc: 'Home-style meals delivered daily', emoji: '🍱' }
]

const pillars = [
  { title: 'Belonging', desc: 'A new city can feel unfamiliar. Tribey gives you a community from day one.' },
  { title: 'Connectivity', desc: 'Forums and events that connect you to people who get where you are.' },
  { title: 'Local knowledge', desc: 'The city info and businesses you need, without the guesswork.' }
]

export default async function Home() {
  const [sports, runs, treks, rooms, tiffin] = await Promise.all([getSports(), getRuns(), getTreks(), getRooms(), getTiffin()])

  const highlights = [
    { href: '/sports', label: 'Sports', title: sports[0]?.name, sub: sports[0]?.address },
    { href: '/runs', label: 'Runs & Rides', title: runs[0]?.name, sub: runs[0]?.route },
    { href: '/treks', label: 'Treks', title: treks[0]?.name, sub: treks[0]?.info },
    { href: '/rooms', label: 'Rooms', title: rooms[0]?.title, sub: rooms[0]?.info },
    { href: '/tiffin', label: 'Tiffin', title: tiffin[0]?.name, sub: tiffin[0]?.area }
  ].filter((h): h is typeof h & { title: string } => Boolean(h.title))

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
          <Link href="/rooms" className="px-5 py-3 rounded-lg bg-brand-orange text-white font-medium hover:opacity-90">
            Get started
          </Link>
          <Link href="/sports" className="px-5 py-3 rounded-lg border border-slate-300 font-medium hover:bg-white">
            Explore Tribey
          </Link>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-semibold mb-6">What are you here for?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((c) => (
            <Link key={c.href} href={c.href} className="p-6 border rounded-lg hover:shadow hover:border-brand-orange transition">
              <div className="text-3xl">{c.emoji}</div>
              <div className="mt-3 font-medium">{c.label}</div>
              <div className="mt-1 text-sm text-slate-500">{c.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12 bg-brand-surface rounded-2xl px-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Why Tribey</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {pillars.map((p) => (
            <div key={p.title} className="text-center">
              <div className="mx-auto w-10 h-10 rounded-full bg-brand-orange" />
              <div className="mt-3 font-medium text-brand-navy">{p.title}</div>
              <div className="mt-1 text-sm text-slate-600">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Happening near you</h2>
        </div>
        {highlights.length === 0 ? (
          <p className="text-slate-500">Nothing posted yet — be the first.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlights.map((h) => (
              <Link key={h.href} href={h.href} className="p-5 border rounded-lg hover:shadow block">
                <div className="text-xs uppercase text-brand-teal">{h.label}</div>
                <div className="mt-1 font-medium">{h.title}</div>
                <div className="text-sm text-slate-500">{h.sub}</div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="py-14 text-center">
        <h2 className="text-2xl font-semibold text-brand-navy">Ready to feel at home?</h2>
        <p className="mt-2 text-slate-600">Join Tribey and start exploring your new city today.</p>
        <Link href="/rooms" className="mt-6 inline-block px-6 py-3 rounded-lg bg-brand-orange text-white font-medium hover:opacity-90">
          Join Tribey
        </Link>
      </section>
    </>
  )
}
