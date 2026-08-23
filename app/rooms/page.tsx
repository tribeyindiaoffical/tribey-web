import React from 'react'
import { getRooms } from '../../lib/data'
import genZ from '../../data/genZQuestions.json'
import RoomListing from '../../components/RoomListing'

export const metadata = {
  title: 'Rooms & Roommates | Tribey',
  description: 'Find a place, find your people'
}

export default async function RoomsPage() {
  const rooms = await getRooms()

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-4">Rooms & Roommates</h2>
      {rooms.length === 0 ? (
        <p className="text-slate-500">No listings yet.</p>
      ) : (
        <div className="space-y-4">
          {rooms.map((r) => (
            <RoomListing key={r.id} title={r.title} type={r.type} info={r.info} owner={r.owner} />
          ))}
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-2">Gen-Z Quick Prompts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {genZ.map((q: string, i: number) => (
            <div key={i} className="p-3 border rounded text-sm text-slate-600">{q}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
