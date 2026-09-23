'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { categories } from '../lib/constants'

const items = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/community', label: 'Community' },
  ...categories.map((c) => ({ href: c.href, label: c.label }))
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:block w-64 pr-6">
      <div className="sticky top-6">
        <div className="mb-6">
          <img src="/logo.svg" alt="Tribey" className="h-7 w-auto" />
          <div className="text-sm text-slate-500 mt-1">Connect · Book · Explore</div>
        </div>
        <nav className="flex flex-col gap-1">
          {items.map((it) => {
            const active = it.href === '/' ? pathname === '/' : pathname.startsWith(it.href)
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition ${
                  active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {it.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
