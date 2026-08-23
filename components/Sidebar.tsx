import Link from 'next/link'

export default function Sidebar() {
  const items = [
    { href: '/', label: 'Home', icon: '/icons/map.svg' },
    { href: '/sports', label: 'Sports', icon: '/icons/map.svg' },
    { href: '/runs', label: 'Runs & Rides', icon: '/icons/map.svg' },
    { href: '/treks', label: 'Treks', icon: '/icons/map.svg' },
    { href: '/rooms', label: 'Rooms', icon: '/icons/map.svg' },
    { href: '/tiffin', label: 'Tiffin', icon: '/icons/map.svg' }
  ]

  return (
    <aside className="hidden md:block w-64 pr-6">
      <div className="sticky top-6">
        <div className="mb-6">
          <img src="/logo.svg" alt="Tribey" className="h-7 w-auto" />
          <div className="text-sm text-slate-500 mt-1">Connect · Book · Explore</div>
        </div>
        <nav className="flex flex-col gap-2">
          {items.map((it) => (
            <Link key={it.href} href={it.href} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-50">
              <img src={it.icon} alt="" className="w-5 h-5 text-slate-400" />
              <span className="text-sm text-slate-700">{it.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
