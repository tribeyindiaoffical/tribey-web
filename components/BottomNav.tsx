'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/', label: 'Home', icon: 'M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z' },
  { href: '/explore', label: 'Explore', icon: 'M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm3.5 5.5-1.8 5.2-5.2 1.8 1.8-5.2z' },
  { href: '/community', label: 'Community', icon: 'M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 0a3.5 3.5 0 0 0 0-7m2 12v-1a4 4 0 0 0-2.5-3.7' }
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-100 px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around">
        {tabs.map((t) => {
          const active = t.href === '/' ? pathname === '/' : pathname.startsWith(t.href)
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex flex-col items-center gap-1 py-2.5 px-3 text-xs font-medium ${active ? 'text-brand-orange' : 'text-slate-400'}`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={t.icon} />
              </svg>
              {t.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
