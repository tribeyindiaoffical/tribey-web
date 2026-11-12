'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  Disc3,
  Flame,
  GlassWater,
  Home,
  MapPin,
  Palette,
  Plus,
  ShieldCheck,
  Star,
  Ticket,
  Trash2,
  Users,
  Wine,
  X
} from 'lucide-react'
import { clubNights, headliner, houseParties, img, me, partyDates, partyModes } from '../../lib/mock'
import { notify, usePlans, useStored } from '../../lib/store'
import { Badge, Button, Card, Pill, SectionHeader } from '../../components/ui'
import { Field, Modal, fieldClass } from '../../components/interactive'

type Mode = keyof typeof partyModes
type MyParty = { id: string; mode: Mode; title: string; place: string; day: string; kind: string; desc: string; capacity: number }

const safety = [
  'Only verified students can see entry codes. Never share yours publicly.',
  'Go with a buddy and agree on a time and way to get home before you leave.',
  'Keep an eye on your drink. Every Tribey-listed event has a free water and mocktail station.',
  'Campus Safe Ride runs 10 PM – 3 AM from all listed venues. Call 080-4000-1234.',
  'Feel unsafe or see something wrong? Tell a host, or call campus security at 080-4000-0000.'
]

function ProposePartyModal({ mode, onClose, onSave }: { mode: Mode; onClose: () => void; onSave: (p: MyParty) => void }) {
  const [m, setM] = useState<Mode>(mode)
  return (
    <Modal title="Propose a party plan" onClose={onClose}>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          const f = new FormData(e.currentTarget)
          const get = (k: string) => String(f.get(k) ?? '').trim()
          onSave({ id: `mine-${crypto.randomUUID()}`, mode: m, title: get('title'), place: get('place'), day: get('day'), kind: get('kind'), desc: get('desc'), capacity: Number(get('capacity')) })
        }}
      >
        <Field label="Type">
          <select value={m} onChange={(e) => setM(e.target.value as Mode)} className={fieldClass}>
            {(Object.keys(partyModes) as Mode[]).map((k) => (
              <option key={k} value={k}>{partyModes[k].label} — {partyModes[k].sub}</option>
            ))}
          </select>
        </Field>
        <Field label="Title">
          <input name="title" required maxLength={80} className={fieldClass} placeholder="Friday board games & pizza" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="When">
            <select name="day" className={fieldClass}>
              {partyDates.map((d) => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Category">
            <select name="kind" key={m} className={fieldClass}>
              {partyModes[m].tabs.slice(1).map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Place">
            <input name="place" required maxLength={60} className={fieldClass} placeholder="Block C common room" />
          </Field>
          <Field label="Capacity">
            <input name="capacity" type="number" min={2} max={2000} defaultValue={20} required className={fieldClass} />
          </Field>
        </div>
        <Field label="Description">
          <textarea name="desc" rows={3} maxLength={300} className={fieldClass} />
        </Field>
        <Button variant="accent" className="w-full">Publish plan</Button>
      </form>
    </Modal>
  )
}

export default function PartiesView({ initialMode }: { initialMode: Mode }) {
  const [mode, setModeState] = useState<Mode>(initialMode)
  const [tab, setTab] = useState(partyModes[initialMode].tabs[0])
  const [day, setDay] = useState<string | null>(null)
  const [dialog, setDialog] = useState<'propose' | 'rsvps' | 'safety' | null>(null)
  const [showGoing, setShowGoing] = useState(false)
  const [myParties, setMyParties] = useStored<MyParty[]>('myParties', [])
  const { plans, has, toggle } = usePlans()
  const [profile] = useStored('profile', me)

  const setMode = (m: Mode) => {
    setModeState(m)
    setTab(partyModes[m].tabs[0])
    window.history.replaceState(null, '', `/parties?type=${m}`)
  }
  const fits = (kinds: string[], d: string) => (tab === partyModes[mode].tabs[0] || kinds.includes(tab)) && (!day || d === day)
  const plan = (id: string, title: string, kind: string, when: string, m: Mode) => ({ id: `party:${id}`, title, kind, when, href: `/parties?type=${m}` })

  const mine = myParties.filter((p) => p.mode === mode && fits([p.kind], p.day))
  const kick = houseParties.filter((p) => fits(p.kinds, p.day))
  const nights = clubNights.filter((n) => fits(n.kinds, n.day))
  const showHero = mode === 'headliners' && fits(headliner.kinds, headliner.day)
  const heroPlan = plan(headliner.id, headliner.title, 'Pass claimed', headliner.when, 'headliners')
  const heroGoing = has(heroPlan.id)
  const partyPlans = plans.filter((p) => p.id.startsWith('party:'))
  const nothing = mine.length + (mode === 'kickbacks' ? kick.length : nights.length + (showHero ? 1 : 0)) === 0

  return (
    <section className="py-4 space-y-5">
      <div className="space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="font-bold tracking-wide text-brand-orange">CAMPUS NIGHTLIFE &amp; SOCIALS</span>
              <span className="text-slate-500">• Bookings &amp; Student Plans</span>
            </div>
            <h1 className="text-3xl font-semibold text-brand-navy">Campus Parties, Mixers &amp; Live Gigs</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="accent" size="sm" className="!py-2" onClick={() => setDialog('propose')}><Plus size={14} /> Propose a Party Plan</Button>
            <Button variant="soft" size="sm" className="!py-2" onClick={() => setDialog('rsvps')}>
              <Ticket size={14} /> My RSVPs &amp; Tickets{partyPlans.length ? ` (${partyPlans.length})` : ''}
            </Button>
            <Button variant="outline" size="sm" className="bg-white !py-2" onClick={() => setDialog('safety')}><ShieldCheck size={14} /> Safety Guidelines</Button>
          </div>
        </div>

        <div role="tablist" className="grid grid-cols-2 gap-2 rounded-2xl bg-white border border-slate-100 p-1.5 max-w-xl">
          {(Object.keys(partyModes) as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={m === mode}
              onClick={() => setMode(m)}
              className={`text-left rounded-xl px-4 py-2.5 transition ${m === mode ? 'bg-brand-orange text-white shadow-sm' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              <span className="flex items-center gap-2 text-sm font-semibold">
                {m === 'kickbacks' ? <Home size={15} /> : <Ticket size={15} />} {partyModes[m].label}
              </span>
              <span className={`block text-[11px] ${m === mode ? 'text-orange-100' : 'text-slate-500'}`}>{partyModes[m].sub}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {partyModes[mode].tabs.map((t) => (
            <Pill key={t} active={t === tab} onClick={() => setTab(t)}>{t}</Pill>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2 overflow-x-auto">
            {partyDates.map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={d === day}
                onClick={() => setDay(d === day ? null : d)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold whitespace-nowrap ${
                  d === day ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {d === 'Tonight' && <Flame size={11} />}
                {d}
              </button>
            ))}
          </div>
          <span className="flex items-center gap-1.5 text-[11px] text-slate-600"><BadgeCheck size={13} className="text-brand-orange" /> Only University Verified Badges</span>
        </div>
      </div>

      {mine.length > 0 && (
        <div>
          <SectionHeader title="Hosted by you" sub="Plans you proposed, saved on this device" icon={<Plus size={18} />} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mine.map((p) => (
              <Card key={p.id} className="p-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <Badge>{p.kind}</Badge>
                  <span className="text-[11px] text-slate-500">{p.day}</span>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-brand-orange"><MapPin size={12} /> {p.place}</div>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 leading-snug">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-600 flex-1">{p.desc || 'No description yet.'}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
                  <span>Capacity {p.capacity} • Host: {profile.name.split(' ')[0]}</span>
                  <Button variant="soft" size="sm" aria-label="Delete plan" onClick={() => setMyParties((l) => l.filter((x) => x.id !== p.id))}>
                    <Trash2 size={13} /> Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {nothing && (
        <Card className="p-8 text-center text-sm text-slate-500">
          Nothing matches these filters.{' '}
          <button type="button" className="font-semibold text-brand-orange" onClick={() => { setTab(partyModes[mode].tabs[0]); setDay(null) }}>Clear filters</button>
        </Card>
      )}

      {mode === 'kickbacks' ? (
        kick.length > 0 && (
          <div>
            <SectionHeader
              title="Kickbacks: House Parties & Dorm Mixers"
              sub="Strictly campus-verified peers, safe entry codes, & student hosts"
              icon={<Home size={18} />}
              action={<span className="text-xs font-semibold text-slate-500">{kick.length} plans</span>}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {kick.map((p) => {
                const pl = plan(p.id, p.title, 'Joined kickback', p.day, 'kickbacks')
                const going = has(pl.id)
                return (
                  <Card key={p.id} className="p-3 flex flex-col">
                    <div className="relative">
                      <img src={p.photo} alt="" loading="lazy" className="w-full h-40 object-cover rounded-xl bg-slate-200" />
                      <span className="absolute top-2 left-2 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white">{p.status}</span>
                      <span className="absolute bottom-2 right-2 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-900">{p.tag}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-brand-orange"><MapPin size={12} /> {p.place} • {p.day}</div>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900 leading-snug">{p.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 flex-1">{p.desc}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-xs text-slate-700">
                        <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center text-[9px] font-bold">{p.hostInitials}</span>
                        {p.host}
                      </span>
                      <Button size="sm" variant={going ? 'accent' : 'primary'} aria-pressed={going} onClick={() => toggle(pl)}>
                        {going ? <><Check size={13} /> You&apos;re in</> : p.cta}
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )
      ) : (
        <>
          {showHero && (
            <div className="relative overflow-hidden rounded-2xl bg-zinc-900 text-white">
              <img src={img('1516450360452-9312f5e86fc7', 1600)} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
              <div className="relative max-w-xl p-6 md:p-8">
                <div className="flex flex-wrap gap-2">
                  <Badge tone="solid"><Flame size={11} /> TRENDING HEADLINER</Badge>
                  <Badge tone="neutral" className="!bg-white/20 !text-white">Campus Official Collaboration</Badge>
                  <Badge tone="neutral" className="!bg-white/20 !text-white"><Users size={11} /> {headliner.going + (heroGoing ? 1 : 0)} Going</Badge>
                </div>
                <div className="mt-4 text-[11px] font-bold tracking-wide text-zinc-300">THE SKY DECK • CAMPUS CENTRAL</div>
                <h2 className="mt-1 text-3xl md:text-4xl font-semibold leading-tight">{headliner.title}</h2>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-zinc-200">
                  <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {headliner.when}</span>
                  <span className="flex items-center gap-1.5"><Disc3 size={13} /> 3 Student DJs</span>
                  <span className="flex items-center gap-1.5"><GlassWater size={13} /> Free Mocktail Bar</span>
                  <span className="flex items-center gap-1.5"><Palette size={13} /> Neon Face Paint Stalls</span>
                </div>
                <div className="mt-6 text-[10px] font-bold tracking-wide text-zinc-300">ACCESS TIER</div>
                <div className="text-sm"><b className="text-lg">FREE</b> with Tribey Pass <span className="text-zinc-400">/ ₹250 Guest</span></div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant={heroGoing ? 'soft' : 'accent'} onClick={() => toggle(heroPlan)}>
                    {heroGoing ? <><Check size={15} /> Pass claimed (tap to cancel)</> : <>RSVP &amp; Claim Pass <ArrowRight size={15} /></>}
                  </Button>
                  <Button variant="soft" className="!bg-white/20 !text-white" aria-expanded={showGoing} onClick={() => setShowGoing((v) => !v)}>
                    <Users size={15} /> {showGoing ? 'Hide' : 'See'} Who&apos;s Going ({headliner.friends.length} batchmates)
                  </Button>
                </div>
                {showGoing && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {(heroGoing ? [`${profile.name} (you)`, ...headliner.friends] : headliner.friends).map((n) => (
                      <li key={n} className="rounded-full bg-white/15 px-3 py-1 text-xs">{n}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {nights.length > 0 && (
            <div>
              <SectionHeader
                title="Headliners: Club & Venue Nights"
                sub="Official student partnerships with exclusive discounts & fast-track entry"
                icon={<Wine size={18} />}
                action={<Badge>Up to 40% Off Drinks &amp; Entry</Badge>}
              />
              <div className="space-y-3">
                {nights.map((n, i) => {
                  const pl = plan(n.id, n.title, 'Pass booked', n.when, 'headliners')
                  const booked = has(pl.id)
                  return (
                    <Card key={n.id} className="p-3 flex flex-wrap items-center gap-4">
                      <img src={n.photo} alt="" loading="lazy" className="w-24 h-24 shrink-0 object-cover rounded-xl bg-slate-200" />
                      <div className="flex-1 min-w-56">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600">
                          <Badge tone={i === 1 ? 'neutral' : 'solid'} className="uppercase !rounded">{n.badge}</Badge>
                          <span>{n.venue}</span>
                          <span>• {n.when}</span>
                        </div>
                        <h3 className="mt-1 text-lg font-semibold text-slate-900 leading-snug">{n.title}</h3>
                        <p className="text-sm text-slate-600">{n.desc}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
                          <Badge className="!rounded">{n.offer}</Badge>
                          {n.entry}
                        </div>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="flex items-center justify-end gap-1 text-xs font-semibold text-slate-900">
                          <Star size={12} className="fill-brand-orange text-brand-orange" /> {n.rating} <span className="font-normal text-slate-500">/ 5</span>
                        </div>
                        <Button variant={booked ? 'soft' : 'accent'} size="sm" className="mt-2 !py-2" aria-pressed={booked} onClick={() => toggle(pl)}>
                          {booked ? <><Check size={13} /> Booked</> : 'Book Pass'}
                        </Button>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}

      {dialog === 'propose' && (
        <ProposePartyModal
          mode={mode}
          onClose={() => setDialog(null)}
          onSave={(p) => {
            setMyParties((l) => [p, ...l])
            setDialog(null)
            if (p.mode !== mode) setMode(p.mode)
            notify(`Party plan published: ${p.title}`, `/parties?type=${p.mode}`)
          }}
        />
      )}

      {dialog === 'rsvps' && (
        <Modal title="My RSVPs & Tickets" onClose={() => setDialog(null)}>
          {partyPlans.length === 0 ? (
            <p className="text-sm text-slate-500">No RSVPs yet. Join a kickback or book a headliner pass and it&apos;ll show up here.</p>
          ) : (
            <ul className="space-y-2">
              {partyPlans.map((p) => (
                <li key={p.id} className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2 text-sm">
                  <Ticket size={16} className="shrink-0 text-brand-orange" />
                  <span className="flex-1 min-w-0">
                    <b className="block text-slate-900 truncate">{p.title}</b>
                    <span className="text-xs text-slate-600">{p.kind}{p.when ? ` • ${p.when}` : ''}</span>
                  </span>
                  <button type="button" aria-label={`Cancel ${p.title}`} onClick={() => toggle(p)} className="text-slate-500 hover:text-red-600"><X size={15} /></button>
                </li>
              ))}
            </ul>
          )}
          <Link href="/profile#plans" className="mt-4 inline-block text-xs font-semibold text-brand-orange">See all my plans on Profile →</Link>
        </Modal>
      )}

      {dialog === 'safety' && (
        <Modal title="Safety Guidelines" onClose={() => setDialog(null)}>
          <ul className="space-y-2">
            {safety.map((s) => (
              <li key={s} className="flex gap-2 text-sm text-slate-700"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-brand-orange" /> {s}</li>
            ))}
          </ul>
          <Button variant="accent" className="mt-4 w-full" onClick={() => setDialog(null)}>Got it</Button>
        </Modal>
      )}
    </section>
  )
}
