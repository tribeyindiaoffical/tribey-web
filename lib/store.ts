'use client'

// Browser-only state for the campus screens: everything lives in localStorage on this device.
// ponytail: single-device persistence, move these keys to Supabase tables when actions must be shared between users.

import { useCallback, useEffect, useRef, useState } from 'react'

const PREFIX = 'tribey:'
const CHANGE = 'tribey:change'

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(PREFIX + key, JSON.stringify(value))
  window.dispatchEvent(new CustomEvent(CHANGE, { detail: key }))
}

/** useState that persists to localStorage and stays in sync across components and tabs. */
export function useStored<T>(key: string, fallback: T) {
  const fallbackRef = useRef(fallback)
  const [value, setValue] = useState<T>(fallback)

  useEffect(() => {
    const sync = () => setValue(read(key, fallbackRef.current))
    const onChange = (e: Event) => (e as CustomEvent).detail === key && sync()
    const onStorage = (e: StorageEvent) => e.key === PREFIX + key && sync()
    sync()
    window.addEventListener(CHANGE, onChange)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(CHANGE, onChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [key])

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = read(key, fallbackRef.current)
      write(key, typeof next === 'function' ? (next as (p: T) => T)(prev) : next)
    },
    [key]
  )

  return [value, set] as const
}

// ---------- Toasts & notifications ----------

export function toast(text: string) {
  window.dispatchEvent(new CustomEvent('tribey:toast', { detail: text }))
}

export type Notice = { id: string; text: string; href?: string; at: string; read: boolean }

export const seedNotices: Notice[] = [
  { id: 'seed-1', text: 'Maya Lin invited you to the Sunrise 5K tomorrow.', href: '/sports#run-clubs', at: '2026-11-12T07:10:00', read: false },
  { id: 'seed-2', text: 'Lake Blanche Trail batch has 4 spots left.', href: '/treks', at: '2026-11-11T18:30:00', read: false },
  { id: 'seed-3', text: 'Neon Rave & Rooftop Mixer passes are now open.', href: '/parties?type=headliners', at: '2026-11-11T12:00:00', read: false }
]

export function notify(text: string, href?: string) {
  const notices = read<Notice[]>('notices', seedNotices)
  write('notices', [{ id: crypto.randomUUID(), text, href, at: new Date().toISOString(), read: false }, ...notices])
  toast(text)
}

// ---------- Plans: everything you RSVP'd, joined, booked or registered for ----------

export type Plan = { id: string; title: string; kind: string; when?: string; href: string }

export function usePlans() {
  const [plans, setPlans] = useStored<Plan[]>('plans', [])
  const has = (id: string) => plans.some((p) => p.id === id)

  const toggle = (plan: Plan) => {
    if (has(plan.id)) {
      setPlans((ps) => ps.filter((p) => p.id !== plan.id))
      toast(`Removed: ${plan.title}`)
    } else {
      setPlans((ps) => [...ps, plan])
      notify(`${plan.kind}: ${plan.title}`, plan.href)
    }
  }

  return { plans, has, toggle }
}

// ---------- Files ----------

export function download(filename: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }))
  const a = Object.assign(document.createElement('a'), { href: url, download: filename })
  a.click()
  URL.revokeObjectURL(url)
}

// ponytail: synthetic loop around a start point, swap for recorded GPS traces once routes are real.
export function downloadGpx(name: string, km: number, lat = 12.9352, lon = 77.6245) {
  const r = km / (2 * Math.PI) / 111 // loop radius in degrees
  const pts = Array.from({ length: 37 }, (_, i) => {
    const a = (i / 36) * 2 * Math.PI
    return `<trkpt lat="${(lat + r * Math.sin(a)).toFixed(6)}" lon="${(lon + r * (1 - Math.cos(a))).toFixed(6)}"/>`
  })
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Tribey" xmlns="http://www.topografix.com/GPX/1/1">
<trk><name>${name.replace(/[<&]/g, '')}</name><trkseg>
${pts.join('\n')}
</trkseg></trk>
</gpx>`
  download(`${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.gpx`, xml, 'application/gpx+xml')
  toast(`Downloaded ${name} route`)
}

export function downloadIcs(title: string, start: Date, hours: number, location: string) {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const end = new Date(start.getTime() + hours * 3600_000)
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tribey//EN',
    'BEGIN:VEVENT',
    `UID:${crypto.randomUUID()}@tribey`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')
  download(`${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`, ics, 'text/calendar')
  toast('Added to calendar file')
}

export async function share(path: string, title: string) {
  const url = new URL(path, window.location.origin).toString()
  if (navigator.share) {
    try {
      await navigator.share({ title, url })
      return
    } catch {
      // Cancelled or unsupported: fall back to copying.
    }
  }
  await navigator.clipboard.writeText(url)
  toast('Link copied')
}
