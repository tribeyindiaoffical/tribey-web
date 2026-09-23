import React from 'react'
import { getRooms } from '../../lib/data'
import genZ from '../../data/genZQuestions.json'
import RoomListing from '../../components/RoomListing'
import { SectionHeader, SearchBar, Card } from '../../components/ui'

export const metadata = {
  title: 'Rooms & Roommates | Tribey',
  description: 'Find a place, find your people'
}

export default async function RoomsPage() {
  const rooms = await getRooms()

  return (
    <section className="py-8 space-y-6">
      <SectionHeader title="Rooms & Roommates" />
      <SearchBar placeholder="Search by area, rent, roommates..." />
      {rooms.length === 0 ? (
        <p className="text-slate-500">No listings yet.</p>
      ) : (
        <div className="space-y-4">
          {rooms.map((r) => (
            <RoomListing key={r.id} title={r.title} type={r.type} info={r.info} owner={r.owner} />
          ))}
        </div>
      )}

      <div>
        <SectionHeader title="Gen-Z Quick Prompts" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {genZ.map((q: string, i: number) => (
            <Card key={i} className="p-3 text-sm text-slate-600">{q}</Card>
          ))}
        </div>
      </div>
    </section>
  )
}
