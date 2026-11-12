import { supabase } from './supabaseClient'

export type Person = { id: string; name: string; role?: string }
export type Sport = { id: string; name: string; address: string; players: Person[] }
export type Run = { id: string; name: string; start: string; route: string; booked: Person[] }

export type Community = { id: string; name: string; description: string | null; created_by: string; created_at: string }
export type CommunityMember = { id: string; user_id: string; display_name: string | null; email: string }

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

export async function getCommunities() {
  const { data, error } = await supabase.from('communities').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data as Community[]
}
