'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, CalendarDays, CalendarPlus, Check, ChevronLeft, ChevronRight, Clock, MapPin, Plus, Search, SlidersHorizontal, Trash2 } from 'lucide-react'
import { categories } from '../../lib/constants'
import { events as seedEvents, hubs, img } from '../../lib/mock'
import { downloadIcs, notify, usePlans, useStored } from '../../lib/store'
import { AvatarStack, Button, Card, Pill, SectionHeader } from '../../components/ui'
import { Field, Modal, fieldClass } from '../../components/interactive'

type Event = (typeof seedEvents)[number] & { mine?: boolean }

const PAGE = 3
const hubPhotos: Record<string, string> = {
  'Sports & Turf': img('1431324155629-1a6deb1dec8d'),
  'Travel & Treks': img('1501785888041-af3ef285b470'),
  'Run Clubs': img('1552674605-db6ffd4facb5'),
  'Party & Socials': img('1510915361894-db8b60106cb1')
}
const hubLinks: Record<string, string> = { 'Travel & Treks': '/treks', 'Run Clubs': '/sports#run-clubs', 'Party & Socials': '/parties', 'Sports & Turf': '/sports' }

const fmtWhen = (iso: string) =>
  new Date(iso).toLocaleString('en-US', { weekday: 'short', hour: '2-digit', minute: '2-digit' }).replace(',', ' •')
const matches = (q: string, ...fields: string[]) => !q || fields.some((f) => f.toLowerCase().includes(q.toLowerCase()))

function CreateEventModal({ onClose, onCreate }: { onClose: () => void; onCreate: (e: Event) => void }) {
  return (
    <Modal title="Create an event or club meetup" onClose={onClose}>
      <form
        className="space-y-3"
        onSubmit={(ev) => {
          ev.preventDefault()
          const f = new FormData(ev.currentTarget)
          const get = (k: string) => String(f.get(k) ?? '').trim()
          const hub = get('hub')
          const date = `${get('date')}T${get('time') || '18:00'}:00`
          onCreate({
            id: `mine-${crypto.randomUUID()}`,
            hub,
            date,
            hours: 2,
            tag: hub || 'Meetup',
            when: fmtWhen(date),
            where: get('where'),
            title: get('title'),
            desc: get('desc') || 'Hosted on Tribey.',
            initials: ['ME'],
            more: '',
            count: 0,
            countLabel: 'going',
            cta: 'RSVP',
            photo: hubPhotos[hub] ?? img('1522071820081-009f0129c71c'),
            mine: true
          })
        }}
      >
        <Field label="Title">
          <input name="title" required maxLength={80} className={fieldClass} placeholder="Sunday frisbee on the quad" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date">
            <input name="date" type="date" required min={new Date().toISOString().slice(0, 10)} className={fieldClass} />
          </Field>
          <Field label="Time">
            <input name="time" type="time" defaultValue="18:00" className={fieldClass} />
          </Field>
        </div>
        <Field label="Where">
          <input name="where" required maxLength={80} className={fieldClass} placeholder="North Quad lawn" />
        </Field>
        <Field label="Hub">
          <select name="hub" className={fieldClass} defaultValue="Party & Socials">
            {hubs.slice(1).map((h) => <option key={h}>{h}</option>)}
          </select>
        </Field>
        <Field label="Description">
          <textarea name="desc" rows={3} maxLength={300} className={fieldClass} />
        </Field>
        <Button variant="accent" className="w-full">Publish event</Button>
      </form>
    </Modal>
  )
}

export default function ExploreView({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [hub, setHub] = useState(hubs[0])
  const [goingOnly, setGoingOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [creating, setCreating] = useState(false)
  const [start, setStart] = useState(0)
  const [myEvents, setMyEvents] = useStored<Event[]>('myEvents', [])
  const { has, toggle } = usePlans()

  const all: Event[] = [...myEvents, ...seedEvents].sort((a, b) => a.date.localeCompare(b.date))
  const shown = all.filter(
    (e) =>
      (hub === hubs[0] || e.hub === hub) &&
      (!goingOnly || has(`event:${e.id}`)) &&
      matches(query, e.title, e.desc, e.tag, e.where, e.hub)
  )
  const page = shown.slice(start, start + PAGE)
  const cats = categories.filter((c) => matches(query, c.label, c.desc, ...c.links))
  const resetPage = () => setStart(0)

  return (
    <section className="py-4 space-y-8">
      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-wide text-brand-orange">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              DISCOVER CAMPUS LIFE
            </div>
            <h1 className="text-3xl font-semibold text-brand-navy">Explore &amp; Connect</h1>
            <p className="text-sm text-slate-500">Find active campus clubs, curated weekend expeditions, and university gatherings.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="soft" aria-expanded={showFilters} onClick={() => setShowFilters((v) => !v)}>
              <SlidersHorizontal size={14} /> Filters{goingOnly ? ' (1)' : ''}
            </Button>
            <Button variant="accent" onClick={() => setCreating(true)}><Plus size={16} /> Create Event or Club</Button>
          </div>
        </div>

        <label className="flex items-center gap-3 rounded-xl bg-white border border-slate-100 px-4 py-3 text-slate-500">
          <Search size={16} />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              resetPage()
            }}
            placeholder="Search by activity, club name, sport, or keyword (e.g. 'marathon', 'trek', 'football')..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
          />
        </label>

        {showFilters && (
          <Card className="p-3 flex flex-wrap items-center gap-4 text-sm">
            <label className="flex items-center gap-2 text-slate-700">
              <input
                type="checkbox"
                checked={goingOnly}
                onChange={(e) => {
                  setGoingOnly(e.target.checked)
                  resetPage()
                }}
                className="accent-brand-orange"
              />
              Only events I&apos;m going to
            </label>
            <button
              type="button"
              className="text-xs font-semibold text-brand-orange"
              onClick={() => {
                setGoingOnly(false)
                setHub(hubs[0])
                setQuery('')
                resetPage()
              }}
            >
              Reset all
            </button>
          </Card>
        )}

        <div className="flex gap-2 overflow-x-auto pb-1">
          {hubs.map((h) => (
            <Pill
              key={h}
              active={h === hub}
              onClick={() => {
                setHub(h)
                resetPage()
              }}
            >
              {h}
            </Pill>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader
          title="Upcoming Campus Events"
          sub={`${shown.length} event${shown.length === 1 ? '' : 's'}${hub === hubs[0] ? '' : ` in ${hub}`}`}
          icon={<span className="flex w-9 h-9 items-center justify-center rounded-lg bg-brand-orange/10"><CalendarDays size={18} /></span>}
          action={
            <div className="flex gap-2 text-slate-600">
              <button
                type="button"
                aria-label="Previous events"
                disabled={start === 0}
                onClick={() => setStart((s) => Math.max(0, s - PAGE))}
                className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Next events"
                disabled={start + PAGE >= shown.length}
                onClick={() => setStart((s) => s + PAGE)}
                className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          }
        />
        {page.length === 0 ? (
          <Card className="p-8 text-center text-sm text-slate-500">
            No events match.{' '}
            {hubLinks[hub] && (
              <Link href={hubLinks[hub]} className="font-semibold text-brand-orange">Browse {hub} instead →</Link>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {page.map((e) => {
              const id = `event:${e.id}`
              const going = has(id)
              const d = new Date(e.date)
              return (
                <Card key={e.id} className="p-3 flex flex-col">
                  <div className="relative">
                    <img src={e.photo} alt="" loading="lazy" className="w-full h-40 object-cover rounded-xl bg-slate-200" />
                    <div className="absolute top-2 left-2 rounded-lg bg-white px-2.5 py-1 text-center leading-none shadow-sm">
                      <div className="text-[9px] font-bold text-brand-orange">{d.toLocaleString('en-US', { month: 'short' }).toUpperCase()}</div>
                      <div className="text-lg font-bold text-slate-900">{d.getDate()}</div>
                    </div>
                    <span className="absolute top-2 right-2 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white">{e.tag}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1"><Clock size={12} /> {e.when}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {e.where}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900 leading-snug">{e.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 flex-1">{e.desc}</p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <AvatarStack initials={e.initials} more={e.more} />
                      {e.count + (going ? 1 : 0)} {e.countLabel}
                    </div>
                    <div className="flex gap-1.5">
                      {e.mine && (
                        <Button
                          variant="soft"
                          size="sm"
                          aria-label="Delete event"
                          onClick={() => {
                            setMyEvents((list) => list.filter((x) => x.id !== e.id))
                            if (going) toggle({ id, title: e.title, kind: 'RSVP', href: '/explore' })
                          }}
                        >
                          <Trash2 size={13} />
                        </Button>
                      )}
                      <Button variant="soft" size="sm" aria-label="Add to calendar" onClick={() => downloadIcs(e.title, d, e.hours, e.where)}>
                        <CalendarPlus size={13} />
                      </Button>
                      <Button
                        size="sm"
                        variant={going ? 'accent' : 'primary'}
                        aria-pressed={going}
                        onClick={() => toggle({ id, title: e.title, kind: 'RSVP', when: e.when, href: '/explore' })}
                      >
                        {going ? <><Check size={13} /> Going</> : e.cta}
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      <div>
        <SectionHeader title="Explore Activity Categories" sub="Find communities organized by your passion & recreational needs" />
        {cats.length === 0 ? (
          <p className="text-sm text-slate-500">No categories match &ldquo;{query}&rdquo;.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {cats.map((c) => (
              <Card key={c.href} className="p-4 flex flex-col">
                <span className="flex w-10 h-10 items-center justify-center rounded-xl bg-slate-100 text-brand-orange">
                  <c.icon size={20} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{c.label}</h3>
                <p className="mt-1 text-sm text-slate-600 flex-1">{c.desc}</p>
                <div className="mt-3 space-y-2">
                  {c.links.map((l) => (
                    <Link key={l} href={c.href} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
                      {l}
                      <ArrowRight size={13} className="text-brand-orange" />
                    </Link>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">{c.stat}</span>
                  <Link href={c.href} className="font-semibold text-brand-orange">{c.cta}</Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {creating && (
        <CreateEventModal
          onClose={() => setCreating(false)}
          onCreate={(e) => {
            setMyEvents((list) => [e, ...list])
            setCreating(false)
            setHub(hubs[0])
            setStart(0)
            notify(`Event published: ${e.title}`, '/explore')
          }}
        />
      )}
    </section>
  )
}
