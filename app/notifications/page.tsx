import { Bell } from 'lucide-react'

export const metadata = {
  title: 'Notifications | Tribey'
}

export default function NotificationsPage() {
  return (
    <section className="py-16 text-center text-slate-500">
      <Bell size={28} className="mx-auto text-brand-orange" />
      <h1 className="mt-3 text-xl font-semibold text-brand-navy">Notifications</h1>
      <p className="mt-1 text-sm">You&apos;re all caught up.</p>
    </section>
  )
}
