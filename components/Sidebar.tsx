'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, CircleUser, Compass, House, Settings, UserRound, Users } from 'lucide-react'
import { me } from '../lib/mock'

const items = [
  { href: '/', label: 'Home', icon: House },
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/notifications', label: 'Notification', icon: Bell, count: 3 },
  { href: '/profile', label: 'Profile', icon: CircleUser }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-56 shrink-0 sticky top-0 h-screen flex-col p-3 border-r border-slate-200/70">
      <Link href="/" className="flex items-center gap-2.5 px-2 py-2">
        <span className="w-9 h-9 rounded-xl bg-brand-orange text-white flex items-center justify-center text-lg font-bold">T</span>
        <span>
          <span className="block text-xl font-semibold text-brand-navy leading-none">Tribey</span>
          <span className="block text-[10px] font-semibold tracking-wide text-brand-orange mt-0.5">CAMPUS NETWORK</span>
        </span>
      </Link>

      <Link href="/profile" className="mt-2 flex items-center gap-2.5 rounded-xl bg-white shadow-sm px-3 py-2.5">
        <span className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center">
          <UserRound size={16} />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-semibold text-slate-900 truncate">{me.name}</span>
          <span className="block text-[11px] text-slate-500 truncate">{me.role} • {me.classOf}</span>
        </span>
        <span className="w-2 h-2 rounded-full bg-brand-orange" />
      </Link>

      <nav className="mt-3 flex flex-col gap-1">
        {items.map((it) => {
          const active = it.href === '/' ? pathname === '/' : pathname.startsWith(it.href)
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                active ? 'bg-brand-orange text-white shadow-sm' : 'text-slate-600 hover:bg-white'
              }`}
            >
              <it.icon size={18} />
              <span className="flex-1">{it.label}</span>
              {it.count && (
                <span className={`min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold flex items-center justify-center ${active ? 'bg-white text-brand-orange' : 'bg-brand-orange text-white'}`}>
                  {it.count}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto">
        <div className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2 text-xs">
          <span className="flex items-center gap-2 font-medium text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            Online Campus
          </span>
          <span className="text-brand-orange">4.2k active</span>
        </div>
        <div className="flex items-center justify-between px-2 pt-3 text-[11px] text-slate-500">
          <span>© {new Date().getFullYear()} Tribey</span>
          <Settings size={15} />
        </div>
      </div>
    </aside>
  )
}
