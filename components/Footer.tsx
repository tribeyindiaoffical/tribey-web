import Link from 'next/link'

const links = [
  { href: '/explore', label: 'Explore' },
  { href: '/sports', label: 'Sports' },
  { href: '/runs', label: 'Runs & Rides' },
  { href: '/treks', label: 'Treks' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/tiffin', label: 'Tiffin' }
]

export default function Footer() {
  return (
    <footer className="mt-12 border-t py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <img src="/logo.svg" alt="Tribey" className="h-6 w-auto" />
          <div className="text-sm text-slate-500 mt-1">Connect · Book · Explore</div>
        </div>
        <nav className="flex flex-wrap gap-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-slate-600 hover:text-brand-navy hover:underline">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-6 text-xs text-slate-400 text-center sm:text-left">© {new Date().getFullYear()} Tribey. All rights reserved.</div>
    </footer>
  )
}
