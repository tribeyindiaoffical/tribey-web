'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import type { Order, Subscriber } from '../../lib/data'

type OrderRow = Order & { subscriber: { name: string } | null }

function today() {
  return new Date().toISOString().slice(0, 10)
}

export default function OrdersPanel({ vendorId }: { vendorId: string }) {
  const [orders, setOrders] = useState<OrderRow[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  async function load() {
    const { data } = await supabase
      .from('orders')
      .select('*, subscriber:subscribers(name)')
      .eq('vendor_id', vendorId)
      .eq('delivery_date', today())
      .order('created_at', { ascending: true })
    setOrders((data as OrderRow[]) ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [vendorId])

  async function generateToday() {
    setGenerating(true)
    const { data: activeSubs } = await supabase
      .from('subscribers')
      .select('id')
      .eq('vendor_id', vendorId)
      .eq('status', 'active')

    const { data: existing } = await supabase
      .from('orders')
      .select('subscriber_id')
      .eq('vendor_id', vendorId)
      .eq('delivery_date', today())

    const existingIds = new Set((existing ?? []).map((o) => o.subscriber_id))
    const toCreate = ((activeSubs as Pick<Subscriber, 'id'>[]) ?? [])
      .filter((s) => !existingIds.has(s.id))
      .map((s) => ({ vendor_id: vendorId, subscriber_id: s.id, delivery_date: today() }))

    if (toCreate.length > 0) {
      await supabase.from('orders').insert(toCreate)
    }
    setGenerating(false)
    load()
  }

  async function updateStatus(id: string, status: Order['status']) {
    await supabase.from('orders').update({ status }).eq('id', id)
    load()
  }

  return (
    <div className="border rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Today's Orders</h3>
        <button
          onClick={generateToday}
          disabled={generating}
          className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
        >
          {generating ? 'Generating…' : "Generate today's orders"}
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : orders.length === 0 ? (
        <p className="text-sm text-slate-500">No orders for today yet. Generate them from your active subscribers.</p>
      ) : (
        <div className="space-y-2">
          {orders.map((o) => (
            <div key={o.id} className="flex items-center gap-3 border rounded-lg px-3 py-2">
              <div className="flex-1 text-sm font-medium">{o.subscriber?.name ?? 'Unknown subscriber'}</div>
              <select
                value={o.status}
                onChange={(e) => updateStatus(o.id, e.target.value as Order['status'])}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="pending">Pending</option>
                <option value="delivered">Delivered</option>
                <option value="skipped">Skipped</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
