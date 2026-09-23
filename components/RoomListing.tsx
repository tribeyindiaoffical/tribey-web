import React from 'react'
import IconUser from './IconUser'
import { Badge, Button } from './ui'
import type { Person } from '../lib/data'

type Props = {
  title: string
  type: 'room' | 'roommate'
  info?: string | null
  owner?: Person | null
}

export default function RoomListing({ title, type, info, owner }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge>{type === 'room' ? 'Room available' : 'Roommate wanted'}</Badge>
          <div className="mt-2 font-medium text-lg">{title}</div>
        </div>
        <span className="w-2.5 h-2.5 mt-2 rounded-full bg-emerald-400 shrink-0" title="Available" />
      </div>
      {info && <div className="text-sm text-slate-600 mt-2">{info}</div>}
      <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
        {owner ? <IconUser name={owner.name} role="Posted by · Verified" /> : <span />}
        <Button variant="primary" disabled title="Messaging coming soon">Message</Button>
      </div>
    </div>
  )
}
