'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import type { Vendor } from '../../lib/data'

export default function MenuPanel({ vendor, onSaved }: { vendor: Vendor; onSaved: (v: Vendor) => void }) {
  const [businessName, setBusinessName] = useState(vendor.business_name)
  const [area, setArea] = useState(vendor.area ?? '')
  const [price, setPrice] = useState(vendor.price ?? '')
  const [info, setInfo] = useState(vendor.info ?? '')
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { data, error } = await supabase
      .from('vendors')
      .update({ business_name: businessName, area, price, info })
      .eq('id', vendor.id)
      .select()
      .single()
    setSaving(false)
    if (!error) {
      onSaved(data as Vendor)
      setSavedAt(Date.now())
    }
  }

  return (
    <div className="border rounded-lg p-5">
      <h3 className="font-medium mb-4">Menu & Pricing</h3>
      <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Business name</label>
          <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full border rounded-lg px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Area</label>
          <input value={area} onChange={(e) => setArea(e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="Near Central Park" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="₹120/meal" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Menu info</label>
          <textarea value={info} onChange={(e) => setInfo(e.target.value)} className="w-full border rounded-lg px-3 py-2" rows={2} placeholder="Home-style North Indian, veg & non-veg options" />
        </div>
        <div className="sm:col-span-2 flex items-center gap-3">
          <button disabled={saving} className="px-4 py-2 rounded-lg bg-brand-orange text-white text-sm font-medium hover:opacity-90 disabled:opacity-50">
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          {savedAt && <span className="text-sm text-slate-500">Saved</span>}
        </div>
      </form>
    </div>
  )
}
