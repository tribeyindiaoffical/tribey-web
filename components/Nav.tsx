import Link from 'next/link'
import { Bell, MessageSquare, Search, UserRound } from 'lucide-react'

export default function Nav() {
  return (
    <header className="flex items-center gap-3 px-4 md:px-6 py-3">
      <Link href="/" className="md:hidden w-9 h-9 shrink-0 rounded-xl bg-brand-orange text-white flex items-center justify-center text-lg font-bold">
        T
      </Link>
      <label className="flex-1 max-w-md flex items-center gap-2 rounded-full bg-slate-200/60 px-4 py-2 text-slate-500">
        <Search size={15} />
        <input
          type="search"
          placeholder="Search discussions, study groups, projects..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
        />
      </label>
      <div className="ml-auto flex items-center gap-3 text-slate-700">
        <span className="hidden sm:flex items-center gap-2 rounded-full bg-slate-200/60 px-3 py-1 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
          Term: Spring &apos;25
        </span>
        <MessageSquare size={18} />
        <Link href="/notifications" className="relative" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-brand-orange ring-2 ring-brand-surface" />
        </Link>
        <Link href="/profile" aria-label="Profile" className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center">
          <UserRound size={16} />
        </Link>
      </div>
    </header>
  )
}
