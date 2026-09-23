'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'
import type { Community, CommunityMember } from '../../../lib/data'
import MembersPanel from '../../../components/community/MembersPanel'
import MessagesPanel from '../../../components/community/MessagesPanel'
import { Card, Button, SectionHeader } from '../../../components/ui'

export default function CommunityDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [community, setCommunity] = useState<Community | null>(null)
  const [isMember, setIsMember] = useState(false)
  const [joining, setJoining] = useState(false)
  const [nameMap, setNameMap] = useState<Record<string, string>>({})

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace(`/community/login?next=/community/${id}`)
        return
      }
      setUserId(session.user.id)

      const { data: communityRow } = await supabase.from('communities').select('*').eq('id', id).maybeSingle()
      setCommunity(communityRow as Community | null)

      const { data: membership } = await supabase
        .from('community_members')
        .select('id')
        .eq('community_id', id)
        .eq('user_id', session.user.id)
        .maybeSingle()
      setIsMember(Boolean(membership))
      setLoading(false)
    }
    init()
  }, [id, router])

  async function handleJoin() {
    if (!userId) return
    setJoining(true)
    const { error } = await supabase.from('community_members').insert({ community_id: id, user_id: userId })
    setJoining(false)
    if (!error) setIsMember(true)
  }

  function handleMembersLoaded(members: CommunityMember[]) {
    const map: Record<string, string> = {}
    for (const m of members) map[m.user_id] = m.display_name || m.email
    setNameMap(map)
  }

  if (loading) {
    return <section className="py-8 text-slate-500">Loading…</section>
  }

  if (!community) {
    return <section className="py-8 text-slate-500">Community not found.</section>
  }

  return (
    <section className="py-8 space-y-6">
      <SectionHeader title={community.name} />
      {community.description && <p className="text-slate-600 -mt-4">{community.description}</p>}

      {!isMember ? (
        <Card className="p-6">
          <p className="text-slate-600 mb-4">Join this community to see members and chat.</p>
          <Button variant="primary" disabled={joining} onClick={handleJoin}>
            {joining ? 'Joining…' : 'Join community'}
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {userId && <MembersPanel communityId={id} currentUserId={userId} onMembersLoaded={handleMembersLoaded} />}
          {userId && <MessagesPanel communityId={id} currentUserId={userId} nameMap={nameMap} />}
        </div>
      )}
    </section>
  )
}
