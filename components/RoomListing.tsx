import React from 'react'
import IconUser from './IconUser'
import type { Person } from '../lib/data'

type Props = {
  title: string
  type: 'room' | 'roommate'
  info?: string | null
  owner?: Person | null
}

export default function RoomListing({ title, type, info, owner }: Props) {
  return (
    <div className="border rounded-lg p-4 flex items-center gap-4">
      <div className="flex-1">
        <div className="text-sm text-slate-500 uppercase">{type === 'room' ? 'Room available' : 'Roommate wanted'}</div>
        <div className="font-medium">{title}</div>
        {info && <div className="text-xs text-slate-600 mt-1">{info}</div>}
      </div>
      {owner && (
        <div className="flex items-center gap-3">
          <IconUser name={owner.name} role="Verified" />
        </div>
      )}
    </div>
  )
}
