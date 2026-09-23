'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import type { Subscriber } from '../../lib/data'

export default function SubscribersPanel({ vendorId }: { vendorId: string }) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [plan, setPlan] = useState('')
  const [adding, setAdding] = useState(false)

  async function load() {
    const { data } = await supabase
      .from('subscribers')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false })
    setSubscribers((data as Subscriber[]) ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [vendorId])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setAdding(true)
    const { error } = await supabase.from('subscribers').insert({ vendor_id: vendorId, name, plan })
    setAdding(false)
    if (!error) {
      setName('')
      setPlan('')
      load()
    }
  }

  async function updateStatus(id: string, status: Subscriber['status']) {
    await supabase.from('subscribers').update({ status }).eq('id', id)
    load()
  }

  async function remove(id: string) {
    await supabase.from('subscribers').delete().eq('id', id)
    load()
  }

  return (
    <div className="border rounded-lg p-5">
      <h3 className="font-medium mb-4">Subscribers</h3>

      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2 mb-4">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="flex-1 border rounded-lg px-3 py-2" />
        <input value={plan} onChange={(e) => setPlan(e.target.value)} placeholder="Plan (e.g. Monthly - Veg)" className="flex-1 border rounded-lg px-3 py-2" />
        <button disabled={adding} className="px-4 py-2 rounded-lg bg-brand-orange text-white text-sm font-medium hover:opacity-90 disabled:opacity-50">
          Add
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : subscribers.length === 0 ? (
        <p className="text-sm text-slate-500">No subscribers yet.</p>
      ) : (
        <div className="space-y-2">
          {subscribers.map((s) => (
            <div key={s.id} className="flex items-center gap-3 border rounded-lg px-3 py-2">
              <div className="flex-1">
                <div className="text-sm font-medium">{s.name}</div>
                {s.plan && <div className="text-xs text-slate-500">{s.plan}</div>}
              </div>
              <select
                value={s.status}
                onChange={(e) => updateStatus(s.id, e.target.value as Subscriber['status'])}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button onClick={() => remove(s.id)} className="text-sm text-slate-400 hover:text-red-600">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
