import { supabase } from './supabaseClient'

export type Person = { id: string; name: string; role?: string }
export type Sport = { id: string; name: string; address: string; players: Person[] }
export type Run = { id: string; name: string; start: string; route: string; booked: Person[] }
export type Trek = { id: string; name: string; start: string; info: string; booked: Person[] }
export type Room = { id: string; type: 'room' | 'roommate'; title: string; info: string | null; owner: Person | null }

export type Vendor = {
  id: string
  user_id: string
  business_name: string
  area: string | null
  price: string | null
  info: string | null
  delivery_days: string[]
  delivery_areas: string[]
  created_at: string
}

export type Subscriber = {
  id: string
  vendor_id: string
  name: string
  plan: string | null
  status: 'active' | 'paused' | 'cancelled'
  created_at: string
}

export type Order = {
  id: string
  vendor_id: string
  subscriber_id: string | null
  delivery_date: string
  status: 'pending' | 'delivered' | 'skipped'
  created_at: string
}

export async function getSports() {
  const { data, error } = await supabase.from('sports').select('*')
  if (error) throw error
  return data as Sport[]
}

export async function getRuns() {
  const { data, error } = await supabase.from('runs').select('*')
  if (error) throw error
  return data as Run[]
}

export async function getTreks() {
  const { data, error } = await supabase.from('treks').select('*')
  if (error) throw error
  return data as Trek[]
}

export async function getRooms() {
  const { data, error } = await supabase.from('rooms').select('*')
  if (error) throw error
  return data as Room[]
}

export async function getVendors() {
  const { data, error } = await supabase.from('vendors').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data as Vendor[]
}

export async function getHighlights() {
  const [sports, runs, treks, rooms, vendors] = await Promise.all([
    getSports(), getRuns(), getTreks(), getRooms(), getVendors()
  ])

  return [
    { href: '/sports', label: 'Sports', emoji: '⚽', title: sports[0]?.name, sub: sports[0]?.address },
    { href: '/runs', label: 'Runs & Rides', emoji: '🏃', title: runs[0]?.name, sub: runs[0]?.route },
    { href: '/treks', label: 'Treks', emoji: '🏕️', title: treks[0]?.name, sub: treks[0]?.info },
    { href: '/rooms', label: 'Rooms', emoji: '🏠', title: rooms[0]?.title, sub: rooms[0]?.info },
    { href: '/tiffin', label: 'Tiffin', emoji: '🍱', title: vendors[0]?.business_name, sub: vendors[0]?.area }
  ].filter((h): h is typeof h & { title: string } => Boolean(h.title))
}
