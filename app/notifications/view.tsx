'use client'

import Link from 'next/link'
import { Bell, CheckCheck, Trash2 } from 'lucide-react'
import { Notice, seedNotices, useStored } from '../../lib/store'
import { Button, Card } from '../../components/ui'

export default function NotificationsView() {
  const [notices, setNotices] = useStored<Notice[]>('notices', seedNotices)
  const unread = notices.filter((n) => !n.read).length
  const markRead = (id: string) => setNotices((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)))

  return (
    <section className="py-4 max-w-2xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-brand-navy">Notifications</h1>
          <p className="text-sm text-slate-500">{unread ? `${unread} unread` : 'You’re all caught up.'}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="soft" size="sm" disabled={!unread} onClick={() => setNotices((ns) => ns.map((n) => ({ ...n, read: true })))}>
            <CheckCheck size={14} /> Mark all read
          </Button>
          <Button variant="outline" size="sm" disabled={!notices.length} onClick={() => setNotices([])}>
            <Trash2 size={14} /> Clear
          </Button>
        </div>
      </div>

      {notices.length === 0 ? (
        <div className="py-16 text-center text-slate-500">
          <Bell size={28} className="mx-auto text-brand-orange" />
          <p className="mt-3 text-sm">Nothing here yet. RSVP to something on Explore and it’ll show up.</p>
        </div>
      ) : (
        <Card className="divide-y divide-slate-100">
          {notices.map((n) => {
            const body = (
              <>
                <span className={`mt-1.5 w-2 h-2 shrink-0 rounded-full ${n.read ? 'bg-slate-200' : 'bg-brand-orange'}`} />
                <span className="flex-1 min-w-0">
                  <span className={`block text-sm ${n.read ? 'text-slate-600' : 'font-semibold text-slate-900'}`}>{n.text}</span>
                  <span className="block text-[11px] text-slate-500" suppressHydrationWarning>{new Date(n.at).toLocaleString()}</span>
                </span>
              </>
            )
            return n.href ? (
              <Link key={n.id} href={n.href} onClick={() => markRead(n.id)} className="flex gap-3 px-4 py-3 hover:bg-slate-50">
                {body}
              </Link>
            ) : (
              <button key={n.id} type="button" onClick={() => markRead(n.id)} className="w-full text-left flex gap-3 px-4 py-3 hover:bg-slate-50">
                {body}
              </button>
            )
          })}
        </Card>
      )}
    </section>
  )
}
