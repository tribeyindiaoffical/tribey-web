import React from 'react'
import MapPlaceholder from './MapPlaceholder'
import { AvatarStack, Badge, Button } from './ui'
import type { Person } from '../lib/data'

type Props = {
  id: string
  name: string
  address: string
  players: Person[]
}

export default function BookingCard({ name, address, players }: Props) {
  return (
    <article className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <div className="flex items-start gap-5">
        <div className="w-24 h-24 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-2xl">⚽</div>
        <div className="flex-1 min-w-0">
          <Badge>Sports</Badge>
          <h3 className="mt-2 text-lg font-medium truncate">{name}</h3>
          <p className="text-sm text-slate-500 truncate">{address}</p>
          <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
            <AvatarStack people={players} />
            <div className="flex gap-2">
              <Button variant="primary" disabled title="Booking coming soon">Join a game</Button>
              <Button variant="outline" disabled title="Booking coming soon">Book whole turf</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <MapPlaceholder address={address} className="rounded-xl" />
      </div>
    </article>
  )
}
