'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import type { Vendor } from '../../lib/data'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function DeliveryPanel({ vendor, onSaved }: { vendor: Vendor; onSaved: (v: Vendor) => void }) {
  const [days, setDays] = useState<string[]>(vendor.delivery_days)
  const [areasText, setAreasText] = useState(vendor.delivery_areas.join(', '))
  const [saving, setSaving] = useState(false)

  function toggleDay(day: string) {
    setDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const delivery_areas = areasText.split(',').map((a) => a.trim()).filter(Boolean)
    const { data, error } = await supabase
      .from('vendors')
      .update({ delivery_days: days, delivery_areas })
      .eq('id', vendor.id)
      .select()
      .single()
    setSaving(false)
    if (!error) onSaved(data as Vendor)
  }

  return (
    <div className="border rounded-lg p-5">
      <h3 className="font-medium mb-4">Delivery Schedule & Areas</h3>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Delivery days</label>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((day) => (
              <button
                type="button"
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-3 py-1 rounded-full text-sm border ${days.includes(day) ? 'bg-brand-orange text-white border-brand-orange' : 'text-slate-600'}`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Delivery areas</label>
          <input
            value={areasText}
            onChange={(e) => setAreasText(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Comma-separated, e.g. Koramangala, HSR Layout"
          />
        </div>
        <button disabled={saving} className="px-4 py-2 rounded-lg bg-brand-orange text-white text-sm font-medium hover:opacity-90 disabled:opacity-50">
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}
