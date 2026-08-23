import React from 'react'
import BookingCard from '../../components/BookingCard'
import { getSports } from '../../lib/data'

export const metadata = {
  title: 'Sports Booking | Tribey',
  description: 'Book a turf or join a game nearby'
}

export default async function SportsPage() {
  const sports = await getSports()

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-4">Sports Booking</h2>
      {sports.length === 0 ? (
        <p className="text-slate-500">No turfs listed yet.</p>
      ) : (
        <div className="space-y-4">
          {sports.map((s) => (
            <BookingCard key={s.id} id={s.id} name={s.name} address={s.address} players={s.players} />
          ))}
        </div>
      )}
    </section>
  )
}
