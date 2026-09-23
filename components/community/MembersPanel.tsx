'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import type { CommunityMember } from '../../lib/data'
import { Card, Button } from '../ui'

type Row = { id: string; user_id: string; profiles: { display_name: string | null; email: string } | null }

type Props = {
  communityId: string
  currentUserId: string
  onMembersLoaded?: (members: CommunityMember[]) => void
}

export default function MembersPanel({ communityId, currentUserId, onMembersLoaded }: Props) {
  const [members, setMembers] = useState<CommunityMember[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    const { data } = await supabase
      .from('community_members')
      .select('id, user_id, profiles(display_name, email)')
      .eq('community_id', communityId)

    const list: CommunityMember[] = ((data as unknown as Row[]) ?? []).map((row) => ({
      id: row.id,
      user_id: row.user_id,
      display_name: row.profiles?.display_name ?? null,
      email: row.profiles?.email ?? ''
    }))
    setMembers(list)
    setLoading(false)
    onMembersLoaded?.(list)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityId])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setAdding(true)

    const { data: foundId, error: rpcError } = await supabase.rpc('find_member_id_by_email', { p_email: email })

    if (rpcError) {
      setAdding(false)
      setError(rpcError.message)
      return
    }
    if (!foundId) {
      setAdding(false)
      setError('No Tribey account with that email yet.')
      return
    }

    const { error: insertError } = await supabase
      .from('community_members')
      .insert({ community_id: communityId, user_id: foundId })

    setAdding(false)
    if (insertError) {
      setError(insertError.code === '23505' ? 'Already a member.' : insertError.message)
      return
    }

    setEmail('')
    load()
  }

  return (
    <Card className="p-5">
      <h3 className="font-medium mb-4">Members</h3>

      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Add someone by email"
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <Button variant="primary" disabled={adding}>
          {adding ? 'Adding…' : 'Add'}
        </Button>
      </form>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <div className="space-y-2">
          {members.map((m) => (
            <div key={m.id} className="flex items-center gap-3 border rounded-lg px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-yellow-300 flex items-center justify-center text-white text-xs font-semibold">
                {(m.display_name || m.email).charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{m.display_name || m.email}</div>
                {m.user_id === currentUserId && <div className="text-xs text-slate-400">You</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
