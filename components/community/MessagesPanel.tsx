'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Card, Button } from '../ui'

type Message = { id: string; community_id: string; user_id: string; body: string; created_at: string }

type Props = {
  communityId: string
  currentUserId: string
  nameMap: Record<string, string>
}

export default function MessagesPanel({ communityId, currentUserId, nameMap }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    let active = true

    async function load() {
      const { data } = await supabase
        .from('community_messages')
        .select('*')
        .eq('community_id', communityId)
        .order('created_at', { ascending: true })
        .limit(200)
      if (active) {
        setMessages((data as Message[]) ?? [])
        setLoading(false)
      }
    }
    load()

    const channel = supabase
      .channel(`community_messages_${communityId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'community_messages', filter: `community_id=eq.${communityId}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    return () => {
      active = false
      supabase.removeChannel(channel)
    }
  }, [communityId])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) return
    setSending(true)
    const { error } = await supabase
      .from('community_messages')
      .insert({ community_id: communityId, user_id: currentUserId, body: body.trim() })
    setSending(false)
    if (!error) setBody('')
  }

  return (
    <Card className="p-5 flex flex-col h-[28rem]">
      <h3 className="font-medium mb-4">Messages</h3>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {loading ? (
          <p className="text-sm text-slate-500">Loading…</p>
        ) : messages.length === 0 ? (
          <p className="text-sm text-slate-500">No messages yet — say hello.</p>
        ) : (
          messages.map((m) => {
            const isOwn = m.user_id === currentUserId
            return (
              <div key={m.id} className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                <div className="text-xs text-slate-400 mb-0.5">{isOwn ? 'You' : nameMap[m.user_id] ?? 'Someone'}</div>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${isOwn ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  {m.body}
                </div>
              </div>
            )
          })
        )}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Message the community…"
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <Button variant="primary" disabled={sending}>
          Send
        </Button>
      </form>
    </Card>
  )
}
