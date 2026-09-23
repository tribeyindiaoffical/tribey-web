'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'
import { Button } from '../../../components/ui'

export default function CreateCommunityPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/community/login?next=/community/create')
        return
      }
      setUserId(session.user.id)
      setLoading(false)
    }
    init()
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!userId) return
    setError(null)
    setCreating(true)

    const { data: community, error: insertError } = await supabase
      .from('communities')
      .insert({ name, description: description || null, created_by: userId })
      .select()
      .single()

    if (insertError) {
      setCreating(false)
      setError(insertError.message)
      return
    }

    const { error: memberError } = await supabase
      .from('community_members')
      .insert({ community_id: community.id, user_id: userId })

    setCreating(false)
    if (memberError) {
      setError(memberError.message)
      return
    }

    router.push(`/community/${community.id}`)
  }

  if (loading) {
    return <section className="py-8 text-slate-500">Loading…</section>
  }

  return (
    <section className="py-8 max-w-md">
      <h2 className="text-2xl font-semibold mb-2">Create a community</h2>
      <p className="text-slate-600 mb-6">Give it a name and description — you can add people once it exists.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Design Chat"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
            placeholder="What's this community about?"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button variant="primary" disabled={creating} className="w-full">
          {creating ? 'Creating…' : 'Create community'}
        </Button>
      </form>
    </section>
  )
}
