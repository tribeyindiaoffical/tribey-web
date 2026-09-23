'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../../lib/supabaseClient'
import type { Vendor } from '../../../../lib/data'
import MenuPanel from '../../../../components/vendor/MenuPanel'
import DeliveryPanel from '../../../../components/vendor/DeliveryPanel'
import SubscribersPanel from '../../../../components/vendor/SubscribersPanel'
import OrdersPanel from '../../../../components/vendor/OrdersPanel'

export default function VendorDashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [businessName, setBusinessName] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/tiffin/vendor/login')
        return
      }
      setUserId(session.user.id)

      const { data } = await supabase.from('vendors').select('*').eq('user_id', session.user.id).maybeSingle()
      setVendor(data as Vendor | null)
      setLoading(false)
    }
    init()
  }, [router])

  async function handleCreateProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!userId) return
    setCreating(true)
    const { data, error } = await supabase
      .from('vendors')
      .insert({ user_id: userId, business_name: businessName })
      .select()
      .single()
    setCreating(false)
    if (!error) setVendor(data as Vendor)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/tiffin')
  }

  if (loading) {
    return <section className="py-8 text-slate-500">Loading…</section>
  }

  if (!vendor) {
    return (
      <section className="py-8 max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Set up your vendor profile</h2>
        <p className="text-slate-600 mb-6">Your account is confirmed — now list your business.</p>
        <form onSubmit={handleCreateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Business name</label>
            <input
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <button
            disabled={creating}
            className="px-5 py-3 rounded-lg bg-brand-orange text-white font-medium hover:opacity-90 disabled:opacity-50"
          >
            {creating ? 'Saving…' : 'Create listing'}
          </button>
        </form>
      </section>
    )
  }

  return (
    <section className="py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{vendor.business_name} — Dashboard</h2>
        <button onClick={handleLogout} className="text-sm text-slate-500 hover:underline">Log out</button>
      </div>

      <MenuPanel vendor={vendor} onSaved={setVendor} />
      <DeliveryPanel vendor={vendor} onSaved={setVendor} />
      <SubscribersPanel vendorId={vendor.id} />
      <OrdersPanel vendorId={vendor.id} />
    </section>
  )
}
