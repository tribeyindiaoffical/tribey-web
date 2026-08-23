import React from 'react'
import IconUser from './IconUser'
import MapPlaceholder from './MapPlaceholder'
import type { Person } from '../lib/data'

type Props = {
  id: string
  name: string
  address: string
  players: Person[]
}

export default function BookingCard({ name, address, players }: Props) {
  return (
    <article className="border rounded-lg p-6">
      <div className="flex items-start gap-6">
        <div className="w-40 h-28 bg-slate-100 rounded-md flex items-center justify-center text-slate-400">Image</div>
        <div className="flex-1">
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-sm text-slate-600">{address}</p>
          <div className="mt-3 flex items-center gap-4 flex-wrap">
            {players.length > 0 ? (
              players.map((p) => <IconUser key={p.id} name={p.name} role={p.role} />)
            ) : (
              <span className="text-sm text-slate-400">No players yet</span>
            )}
            <div className="ml-auto flex gap-2">
              <button disabled title="Booking coming soon" className="px-3 py-1 bg-black text-white rounded opacity-50 cursor-not-allowed">Book whole turf</button>
              <button disabled title="Booking coming soon" className="px-3 py-1 border rounded opacity-50 cursor-not-allowed">Random players</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <MapPlaceholder address={address} />
      </div>
    </article>
  )
}
