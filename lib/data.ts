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

export async function getHighlights() {
  const [sports, runs] = await Promise.all([getSports(), getRuns()])

  return [
    { href: '/sports', label: 'Sports', emoji: '⚽', title: sports[0]?.name, sub: sports[0]?.address },
    { href: '/runs', label: 'Runs & Rides', emoji: '🏃', title: runs[0]?.name, sub: runs[0]?.route }
  ].filter((h): h is typeof h & { title: string } => Boolean(h.title))
}
