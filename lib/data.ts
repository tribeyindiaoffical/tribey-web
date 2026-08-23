import { supabase } from './supabaseClient'

export type Person = { id: string; name: string; role?: string }
export type Sport = { id: string; name: string; address: string; players: Person[] }
export type Run = { id: string; name: string; start: string; route: string; booked: Person[] }
export type Trek = { id: string; name: string; start: string; info: string; booked: Person[] }
export type Room = { id: string; type: 'room' | 'roommate'; title: string; info: string | null; owner: Person | null }
export type Tiffin = { id: string; name: string; area: string | null; price: string | null; info: string | null; provider: Person | null }

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

export async function getTiffin() {
  const { data, error } = await supabase.from('tiffin').select('*')
  if (error) throw error
  return data as Tiffin[]
}
