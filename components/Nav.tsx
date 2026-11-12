'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bell, MessageSquare, Search, UserRound } from 'lucide-react'
import { Notice, seedNotices, useStored } from '../lib/store'

export default function Nav() {
  const router = useRouter()
  const [notices] = useStored<Notice[]>('notices', seedNotices)
  const unread = notices.some((n) => !n.read)

  return (
    <header className="flex items-center gap-3 px-4 md:px-6 py-3">
      <Link href="/" className="md:hidden w-9 h-9 shrink-0 rounded-xl bg-brand-orange text-white flex items-center justify-center text-lg font-bold">
        T
      </Link>
      <form
        role="search"
        className="flex-1 max-w-md flex items-center gap-2 rounded-full bg-slate-200/60 px-4 py-2 text-slate-500"
        onSubmit={(e) => {
          e.preventDefault()
          const q = new FormData(e.currentTarget).get('q')?.toString().trim()
          router.push(q ? `/explore?q=${encodeURIComponent(q)}` : '/explore')
        }}
      >
        <Search size={15} />
        <input
          name="q"
          type="search"
          aria-label="Search Tribey"
          placeholder="Search events, clubs, treks, parties..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
        />
      </form>
      <div className="ml-auto flex items-center gap-3 text-slate-700">
        <span className="hidden sm:flex items-center gap-2 rounded-full bg-slate-200/60 px-3 py-1 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
          Term: Fall &apos;26
        </span>
        <Link href="/community" aria-label="Community chats" className="hover:text-brand-orange">
          <MessageSquare size={18} />
        </Link>
        <Link href="/notifications" className="relative hover:text-brand-orange" aria-label={unread ? 'Notifications (unread)' : 'Notifications'}>
          <Bell size={18} />
          {unread && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-brand-orange ring-2 ring-brand-surface" />}
        </Link>
        <Link href="/profile" aria-label="Profile" className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center">
          <UserRound size={16} />
        </Link>
      </div>
    </header>
  )
}
