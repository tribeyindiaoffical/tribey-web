'use client'

import { useState } from 'react'
import { ArrowRight, BadgeCheck, Bus, CalendarDays, Check, ChevronRight, Dumbbell, Plus, SlidersHorizontal, Star, Target, Trash2, X } from 'lucide-react'
import { disciplines, lineup, turfSlots, venues } from '../../lib/mock'
import { notify, usePlans, useStored } from '../../lib/store'
import { Badge, Button, Card } from '../../components/ui'
import { Field, fieldClass } from '../../components/interactive'

const dotTones: Record<string, string> = {
  solid: 'bg-brand-orange text-white',
  amber: 'bg-amber-500 text-slate-900',
  light: 'bg-slate-100 text-slate-800',
  open: 'border border-dashed border-white/70 text-white hover:bg-white/20',
  me: 'bg-white text-brand-orange ring-2 ring-brand-orange'
}

type Claim = { venue: string; slot: string } | null
type HostedGame = { id: string; venue: string; sport: string; time: string; players: number }

function nextShuttles(count = 3) {
  const t = new Date()
  t.setSeconds(0, 0)
  t.setMinutes(Math.ceil((t.getMinutes() + 1) / 20) * 20)
  return Array.from({ length: count }, (_, i) =>
    new Date(t.getTime() + i * 20 * 60_000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  )
}

export default function SportsView() {
  const [mode, setMode] = useState<'join' | 'host'>('join')
  const [discipline, setDiscipline] = useState(disciplines[0])
  const [byPrice, setByPrice] = useState(false)
  const [venueId, setVenueId] = useState(venues[0].id)
  const [time, setTime] = useState(turfSlots[0])
  const [showShuttle, setShowShuttle] = useState(false)
  const [claim, setClaim] = useStored<Claim>('turfClaim', null)
  const [hosted, setHosted] = useStored<HostedGame[]>('hostedGames', [])
  const { has, toggle } = usePlans()

  const shown = venues
    .filter((v) => v.sports.includes(discipline))
    .sort((a, b) => (byPrice ? a.price - b.price : a.km - b.km))
  const selected = shown.find((v) => v.id === venueId) ?? shown[0]
  const myClaim = claim && selected && claim.venue === selected.id ? claim.slot : null
  const open = lineup.filter((p) => p.tone === 'open').length - (myClaim ? 1 : 0)
  const bookingId = selected ? `turf:${selected.id}:${time}` : ''
  const booked = selected ? has(bookingId) : false
  const booking = { id: bookingId, title: `${discipline} at ${selected?.name} (${myClaim ?? 'slot'})`, kind: 'Turf booked', when: time, href: '/sports' }

  const claimSlot = (label: string) => {
    if (booked) return
    setClaim(myClaim === label ? null : { venue: selected!.id, slot: label })
  }

  const scrollToBooking = () => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-600">
            <Badge className="uppercase !rounded">Campus Athletics</Badge>
            • Inter-Collegiate League &amp; Daily Turfs
          </div>
          <h1 className="mt-1 text-3xl font-semibold text-brand-navy">Explore Sports &amp; Turfs</h1>
        </div>
        <div className="flex items-center gap-2">
          <div role="tablist" className="flex rounded-full bg-white border border-slate-200 p-0.5 text-xs font-semibold">
            {(['join', 'host'] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className={`rounded-full px-3 py-1.5 ${mode === m ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {m === 'join' ? 'Join Open Match' : 'Host a Game'}
              </button>
            ))}
          </div>
          <Button
            variant="accent"
            size="sm"
            className="!py-2"
            onClick={() => {
              setMode('join')
              setTimeout(scrollToBooking)
            }}
          >
            <Target size={14} /> Book Turf
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <h2 className="text-lg font-semibold text-slate-900">Choose Discipline</h2>
              <span className="text-[11px] text-slate-500">{disciplines.length} sports active</span>
            </div>
            <button type="button" onClick={() => setByPrice((v) => !v)} className="flex items-center gap-1.5 text-xs font-semibold text-brand-orange">
              <SlidersHorizontal size={13} /> Sort: {byPrice ? 'Lowest price' : 'Nearest'}
            </button>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {disciplines.map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={d === discipline}
                onClick={() => setDiscipline(d)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap ${
                  d === discipline ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Dumbbell size={13} /> {d}
              </button>
            ))}
          </div>
        </Card>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-brand-navy">Campus-Partnered Venues</h2>
              <Badge>Student Discounts Active</Badge>
            </div>
            <span className="text-[11px] text-slate-500">Sorted by {byPrice ? 'Price' : 'Proximity'}</span>
          </div>
          {shown.length === 0 ? (
            <Card className="p-6 text-center text-sm text-slate-500">No partnered venue offers {discipline} yet.</Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {shown.map((v) => {
                const isSel = v.id === selected?.id
                return (
                  <button
                    key={v.id}
                    type="button"
                    aria-pressed={isSel}
                    onClick={() => {
                      setVenueId(v.id)
                      setMode('join')
                    }}
                    className="text-left"
                  >
                    <Card className={`overflow-hidden h-full transition hover:shadow-md ${isSel ? '!border-brand-orange ring-1 ring-brand-orange' : ''}`}>
                      <div className="relative">
                        <img src={v.photo} alt="" loading="lazy" className="w-full h-44 object-cover bg-slate-200" />
                        {isSel && <Badge tone="solid" className="absolute top-2 left-2">Selected Pitch</Badge>}
                        <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-900">
                          <Star size={11} className="fill-brand-orange text-brand-orange" /> {v.rating}
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 leading-tight">{v.name}</h3>
                            <p className="text-[11px] text-slate-500">{v.area}</p>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-semibold ${isSel ? 'text-brand-orange' : 'text-slate-900'}`}>₹{v.price}</div>
                            <div className="text-[10px] text-slate-500">/ player</div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px]">
                          <span className="flex items-center gap-1.5 font-medium text-slate-700">
                            {isSel && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                            {v.note}
                          </span>
                          <span className={`flex items-center gap-0.5 font-semibold ${isSel ? 'text-brand-orange' : 'text-slate-900'}`}>
                            {isSel ? 'Selected' : v.cta} <ChevronRight size={12} />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <Card className="p-3">
          <div className="flex items-center gap-3">
            <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange"><Bus size={17} /></span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-900">Campus Shuttle to Turf Arenas</div>
              <div className="text-[11px] text-slate-600">Free EV transit every 20m from South Gate • 8 min ride</div>
            </div>
            <Button variant="soft" size="sm" aria-expanded={showShuttle} onClick={() => setShowShuttle((v) => !v)}>
              {showShuttle ? 'Hide' : 'Track Shuttle'} <ChevronRight size={13} className={showShuttle ? 'rotate-90' : ''} />
            </Button>
          </div>
          {showShuttle && (
            <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-3 text-xs">
              <span className="text-slate-500">Next departures from South Gate:</span>
              {nextShuttles().map((t, i) => (
                <Badge key={t} tone={i === 0 ? 'solid' : 'neutral'}>{t}</Badge>
              ))}
            </div>
          )}
        </Card>

        {mode === 'host' ? (
          <Card className="p-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900"><Plus size={18} className="text-brand-orange" /> Host a Game</h2>
            <p className="text-xs text-slate-600">Post an open match so other students can claim spots.</p>
            <form
              className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3"
              onSubmit={(e) => {
                e.preventDefault()
                const f = new FormData(e.currentTarget)
                const game: HostedGame = {
                  id: crypto.randomUUID(),
                  venue: String(f.get('venue')),
                  sport: String(f.get('sport')),
                  time: String(f.get('time')),
                  players: Number(f.get('players'))
                }
                setHosted((list) => [game, ...list])
                notify(`Game hosted: ${game.sport} at ${game.venue}`, '/sports')
                e.currentTarget.reset()
              }}
            >
              <Field label="Sport">
                <select name="sport" defaultValue={discipline} className={fieldClass}>
                  {disciplines.map((d) => <option key={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="Venue">
                <select name="venue" className={fieldClass}>
                  {venues.map((v) => <option key={v.id}>{v.name}</option>)}
                </select>
              </Field>
              <Field label="Time">
                <select name="time" className={fieldClass}>
                  {turfSlots.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Players needed">
                <input name="players" type="number" min={1} max={21} defaultValue={6} required className={fieldClass} />
              </Field>
              <Button variant="accent" className="sm:col-span-2">Post Game</Button>
            </form>
            {hosted.length > 0 && (
              <ul className="mt-4 space-y-2">
                {hosted.map((g) => (
                  <li key={g.id} className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2 text-xs">
                    <span className="flex-1 min-w-0">
                      <b className="block text-slate-900">{g.sport} • {g.venue}</b>
                      <span className="text-slate-600">{g.time} • {g.players} players needed</span>
                    </span>
                    <button type="button" aria-label="Cancel game" onClick={() => setHosted((list) => list.filter((x) => x.id !== g.id))} className="text-slate-500 hover:text-red-600">
                      <Trash2 size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        ) : (
          selected && (
            <Card className="p-4">
              <div id="booking" className="scroll-mt-4 flex items-center gap-3">
                <span className="flex w-10 h-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange text-white"><Target size={18} /></span>
                <div className="flex-1 min-w-0">
                  <h2 className="flex items-center gap-1.5 text-lg font-semibold text-slate-900 leading-tight">
                    {selected.name} <BadgeCheck size={15} className="text-brand-orange" />
                  </h2>
                  <p className="text-[11px] text-slate-600">{discipline} Match • Organized by Arjun S.</p>
                </div>
                <Badge tone="green">{open} Slots Open</Badge>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900">Live Lineup</span>
                <span className="text-[11px] text-slate-500">{booked ? 'Booked — cancel to change slot' : 'Tap an open slot to claim'}</span>
              </div>
              {discipline === 'Football 7v7' ? (
                <div className="relative mt-2 h-64 overflow-hidden rounded-xl bg-emerald-950">
                  <div className="absolute inset-2 rounded-lg border border-white/15" />
                  <div className="absolute inset-y-2 left-1/2 border-l border-white/15" />
                  <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />
                  {lineup.map((p) => {
                    const mine = myClaim === p.label
                    const tone = mine ? 'me' : p.tone
                    const dot = (
                      <span className={`mx-auto flex w-8 h-8 items-center justify-center rounded-full text-[10px] font-bold ${dotTones[tone]}`}>
                        {mine ? 'YOU' : p.initials || <Plus size={13} />}
                      </span>
                    )
                    return (
                      <div key={p.label} className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                        {p.tone === 'open' && (!myClaim || mine) ? (
                          <button type="button" onClick={() => claimSlot(p.label)} aria-label={mine ? `Release ${p.label}` : `Claim ${p.label}`} disabled={booked}>
                            {dot}
                          </button>
                        ) : (
                          dot
                        )}
                        <span className="mt-0.5 block whitespace-nowrap text-[9px] text-white/90">{mine ? 'You' : p.label}</span>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {lineup.map((p, i) => {
                    const label = `Player ${i + 1}`
                    const mine = myClaim === label
                    const isOpen = p.tone === 'open'
                    return (
                      <button
                        key={label}
                        type="button"
                        disabled={!isOpen || booked || (!!myClaim && !mine)}
                        onClick={() => claimSlot(label)}
                        className={`rounded-lg px-2 py-3 text-center text-[11px] font-semibold ${
                          mine ? 'bg-brand-orange text-white' : isOpen ? 'border border-dashed border-slate-300 text-slate-600 hover:bg-slate-50' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {mine ? 'You' : isOpen ? 'Open' : p.initials}
                      </button>
                    )
                  })}
                </div>
              )}

              <label className="mt-4 block text-[10px] font-bold uppercase tracking-wide text-slate-600" htmlFor="turf-time">Selected Schedule</label>
              <div className="mt-2 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-orange"><CalendarDays size={16} /></span>
                <div className="flex-1 min-w-0">
                  <select
                    id="turf-time"
                    value={time}
                    disabled={booked}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none"
                  >
                    {turfSlots.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <div className="text-[11px] text-slate-600">{selected.name} • Floodlit Turf</div>
                </div>
                <span className="text-sm font-semibold text-brand-orange">₹{selected.price}</span>
              </div>

              <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-4">
                <div>
                  <div className="text-[10px] text-slate-500">{booked ? 'Paid' : 'Total to pay'}</div>
                  <div className="text-2xl font-semibold text-slate-900 leading-none">
                    ₹{selected.price} <s className="text-xs font-normal text-slate-400">₹{selected.was}</s>
                  </div>
                </div>
                {booked ? (
                  <Button
                    variant="soft"
                    className="flex-1"
                    onClick={() => {
                      toggle(booking)
                      setClaim(null)
                    }}
                  >
                    <X size={15} /> Cancel booking
                  </Button>
                ) : (
                  <Button
                    variant="accent"
                    className="flex-1"
                    disabled={!myClaim}
                    title={myClaim ? undefined : 'Claim an open slot first'}
                    onClick={() => toggle(booking)}
                  >
                    {myClaim ? <>Confirm &amp; Pay <ArrowRight size={15} /></> : 'Claim a slot to book'}
                  </Button>
                )}
              </div>
              {booked && (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-700"><Check size={13} /> Booked. Payment is simulated, no money was charged.</p>
              )}
            </Card>
          )
        )}
      </div>
    </section>
  )
}
