'use client'

import { useState } from 'react'
import {
  BadgeCheck,
  Bookmark,
  Check,
  Clock,
  Compass,
  Download,
  Droplet,
  ExternalLink,
  Flag,
  ListChecks,
  Map,
  MapPin,
  Minus,
  Plus,
  Ruler,
  Share2,
  Star,
  Tent,
  Trash2,
  TrendingUp,
  Users,
  X
} from 'lucide-react'
import { img, trekGear, trekTabs, treks } from '../../lib/mock'
import { downloadGpx, notify, share, toast, usePlans, useStored } from '../../lib/store'
import { AreaChart, Badge, Button, Card, Pill, Stat } from '../../components/ui'
import { Field, Modal, fieldClass } from '../../components/interactive'

type MyTrek = { id: string; destination: string; date: string; group: number; notes: string }

const mapsUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

function PlanTrekModal({ onClose, onSave }: { onClose: () => void; onSave: (t: MyTrek) => void }) {
  return (
    <Modal title="Plan your own trek" onClose={onClose}>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          const f = new FormData(e.currentTarget)
          onSave({
            id: crypto.randomUUID(),
            destination: String(f.get('destination')).trim(),
            date: String(f.get('date')),
            group: Number(f.get('group')),
            notes: String(f.get('notes') ?? '').trim()
          })
        }}
      >
        <Field label="Destination">
          <input name="destination" required maxLength={80} className={fieldClass} placeholder="Kudremukh Peak" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Start date">
            <input name="date" type="date" required min={new Date().toISOString().slice(0, 10)} className={fieldClass} />
          </Field>
          <Field label="Group size">
            <input name="group" type="number" min={1} max={40} defaultValue={6} required className={fieldClass} />
          </Field>
        </div>
        <Field label="Notes for the group">
          <textarea name="notes" rows={3} maxLength={300} className={fieldClass} placeholder="Meeting point, budget, what to pack..." />
        </Field>
        <Button variant="accent" className="w-full">Save trek plan</Button>
      </form>
    </Modal>
  )
}

export default function TreksView({ initialTrek }: { initialTrek?: string }) {
  const [trekId, setTrekId] = useState(treks.find((t) => t.id === initialTrek)?.id ?? treks[0].id)
  const [tab, setTab] = useState(trekTabs[0])
  const [planning, setPlanning] = useState(false)
  const [rentalInfo, setRentalInfo] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [saved, setSaved] = useStored<string[]>('savedTreks', [])
  const [myTreks, setMyTreks] = useStored<MyTrek[]>('myTreks', [])
  const [packed, setPacked] = useStored<string[]>(`gear:${trekId}`, [])
  const { has, toggle } = usePlans()

  const trek = treks.find((t) => t.id === trekId)!
  const list = treks.filter((t) => tab === trekTabs[0] || t.cats.includes(tab))
  const isSaved = saved.includes(trek.id)
  const joinPlan = { id: `trek:${trek.id}`, title: trek.name, kind: 'Joined trek batch', when: trek.footer, href: `/treks?trek=${trek.id}` }
  const rentalPlan = { id: `rental:${trek.id}`, title: `Gear rental for ${trek.name}`, kind: 'Gear reserved', when: 'Pick up at Student Rec Center', href: `/treks?trek=${trek.id}` }
  const joined = has(joinPlan.id)
  const rented = has(rentalPlan.id)

  const select = (id: string) => {
    setTrekId(id)
    setZoom(1)
    window.history.replaceState(null, '', `/treks?trek=${id}`)
    if (window.innerWidth < 1280) document.getElementById('trek-detail')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-4 space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="font-bold tracking-wide text-brand-orange">TRIBEY OUTDOOR COLLECTIVE</span>
            <span className="text-slate-500">• 18 Active Campus Expeditions</span>
          </div>
          <h1 className="text-3xl font-semibold text-brand-navy">Travel &amp; Treks</h1>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {trekTabs.map((t) => (
            <Pill key={t} active={t === tab} onClick={() => setTab(t)}>{t}</Pill>
          ))}
          <Button variant="accent" size="sm" className="!py-2" onClick={() => setPlanning(true)}><Compass size={14} /> Plan Your Own Trek</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-4 items-start">
        <div className="space-y-3">
          {list.length === 0 && <Card className="p-6 text-center text-sm text-slate-500">No routes in {tab} right now.</Card>}
          {list.map((t) => {
            const active = t.id === trek.id
            return (
              <button key={t.id} type="button" onClick={() => select(t.id)} aria-pressed={active} className="block w-full text-left">
                <Card className={`p-3 transition hover:shadow-md ${active ? 'border-l-4 !border-l-brand-orange' : ''}`}>
                  <div className="flex gap-3">
                    <div className="relative shrink-0">
                      <img src={img(t.photo, 240)} alt="" loading="lazy" className="w-24 h-24 object-cover rounded-lg bg-slate-200" />
                      <span className="absolute top-1.5 left-1.5 rounded bg-brand-orange px-1.5 py-0.5 text-[8px] font-bold uppercase text-white">{t.tag}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wide text-brand-orange truncate">{t.region}</span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-slate-900 shrink-0">
                          {saved.includes(t.id) && <Bookmark size={11} className="fill-brand-orange text-brand-orange" />}
                          <Star size={11} className="fill-brand-orange text-brand-orange" />
                          {t.rating} <span className="font-normal text-slate-500">({t.reviews})</span>
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 leading-snug">{t.name}</h3>
                      <p className="text-xs text-slate-600">{t.desc}</p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-600">
                          <span className="flex items-center gap-1"><Ruler size={11} /> {t.dist} mi</span>
                          <span className="flex items-center gap-1"><TrendingUp size={11} /> {t.gain} ft</span>
                          <span className="flex items-center gap-1"><Clock size={11} /> {t.time}</span>
                        </div>
                        {active ? <Badge>Selected</Badge> : <span className="text-sm font-semibold text-slate-900 shrink-0">{t.price}</span>}
                      </div>
                    </div>
                  </div>
                  <div className={`mt-3 flex items-center justify-between text-[11px] ${active ? 'rounded-lg bg-slate-50 px-3 py-2' : ''}`}>
                    <span className="flex items-center gap-2 font-medium text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                      {t.footer}
                    </span>
                    <span className="font-semibold text-brand-orange">{has(`trek:${t.id}`) ? 'Joined ✓' : t.footerRight}</span>
                  </div>
                </Card>
              </button>
            )
          })}

          {myTreks.length > 0 && (
            <Card className="p-4">
              <h3 className="text-sm font-semibold text-slate-900">Your trek plans</h3>
              <ul className="mt-3 space-y-2">
                {myTreks.map((t) => (
                  <li key={t.id} className="flex items-start gap-3 rounded-lg bg-slate-50 px-3 py-2 text-xs">
                    <span className="flex-1 min-w-0">
                      <b className="block text-slate-900">{t.destination}</b>
                      <span className="text-slate-600">{new Date(t.date).toLocaleDateString()} • {t.group} people</span>
                      {t.notes && <span className="block text-slate-500">{t.notes}</span>}
                    </span>
                    <a href={mapsUrl(t.destination)} target="_blank" rel="noreferrer" aria-label="Open in Maps" className="text-slate-500 hover:text-slate-900"><MapPin size={14} /></a>
                    <button type="button" aria-label="Delete plan" onClick={() => setMyTreks((l) => l.filter((x) => x.id !== t.id))} className="text-slate-500 hover:text-red-600"><Trash2 size={14} /></button>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <div className="rounded-2xl bg-slate-200/60 p-4">
            <div className="flex items-center gap-3">
              <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-orange"><Tent size={18} /></span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-900">Free Outdoor Gear Rental Available</div>
                <div className="text-[11px] text-slate-600">Show student ID at Student Rec Center for free trekking poles &amp; packs.</div>
              </div>
              <Button variant="outline" size="sm" className="bg-white !rounded-lg" aria-expanded={rentalInfo} onClick={() => setRentalInfo((v) => !v)}>
                {rentalInfo ? 'Hide' : 'Details'}
              </Button>
            </div>
            {rentalInfo && (
              <ul className="mt-3 list-disc pl-5 text-xs text-slate-700 space-y-1">
                <li>Open Mon–Sat, 8 AM – 8 PM at the Student Rec Center front desk.</li>
                <li>Free for 4 days: trekking poles, 40L packs, headlamps, rain shells.</li>
                <li>Tents and sleeping bags need a ₹500 refundable deposit.</li>
                <li>Reserve from any trek below so your kit is ready at pickup.</li>
              </ul>
            )}
          </div>
        </div>

        <Card className="overflow-hidden scroll-mt-4">
          <div id="trek-detail" className="relative h-56 scroll-mt-4">
            <img src={img(trek.photo, 1200)} alt="" className="w-full h-full object-cover bg-slate-200" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-900">
              <BadgeCheck size={13} className="text-brand-orange" /> Campus Verified Route
            </span>
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                type="button"
                aria-label={isSaved ? 'Remove bookmark' : 'Bookmark trek'}
                aria-pressed={isSaved}
                onClick={() => {
                  setSaved((s) => (isSaved ? s.filter((x) => x !== trek.id) : [...s, trek.id]))
                  toast(isSaved ? 'Bookmark removed' : 'Trek bookmarked')
                }}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-800 hover:text-brand-orange"
              >
                <Bookmark size={15} className={isSaved ? 'fill-brand-orange text-brand-orange' : ''} />
              </button>
              <button
                type="button"
                aria-label="Share trek"
                onClick={() => share(`/treks?trek=${trek.id}`, trek.name)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-800 hover:text-brand-orange"
              >
                <Share2 size={15} />
              </button>
            </div>
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <div className="flex items-center gap-2 text-[11px]">
                <span className="rounded bg-brand-orange px-1.5 py-0.5 font-bold uppercase">Hard / Moderate</span>
                {trek.region}
              </div>
              <h2 className="text-3xl font-semibold">{trek.name}</h2>
            </div>
          </div>

          <div className="p-3 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-brand-orange/10 px-4 py-3">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
                <Users size={15} className="text-brand-orange" /> {trek.footer}
                {trek.price && <span className="text-slate-500">• {trek.price}</span>}
              </span>
              <Button variant={joined ? 'soft' : 'accent'} size="sm" onClick={() => toggle(joinPlan)}>
                {joined ? <><X size={13} /> Leave batch</> : <><Check size={13} /> Join this batch</>}
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              <Stat label="Distance" value={trek.dist} unit="mi" sub="Out & back" />
              <Stat label="Elevation Gain" value={trek.gain} unit="ft" sub="Total ascent" />
              <Stat label="Est. Duration" value={trek.time} sub="Avg student pace" />
              <Stat label="Trail Type" value="Alpine" sub="Granite & Scree" />
              <Stat accent label="Student Score" value={`★ ${trek.rating}`} sub={`${trek.reviews} university reviews`} />
            </div>

            <div>
              <div className="flex flex-wrap items-end justify-between gap-2 px-1">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900"><Map size={17} className="text-brand-orange" /> Interactive Route &amp; Elevation Profile</h3>
                  <p className="text-xs text-slate-500">Includes offline waypoints, water filtration springs, and cellular blindspots.</p>
                </div>
                <div className="flex gap-2">
                  <a href={mapsUrl(`${trek.name}, ${trek.region}`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200">
                    <ExternalLink size={13} /> Open in Maps
                  </a>
                  <Button size="sm" className="!rounded-lg" onClick={() => downloadGpx(trek.name, Number(trek.dist) * 1.609)}><Download size={13} /> Download GPX</Button>
                </div>
              </div>

              <div className="relative mt-3 h-44 rounded-xl bg-slate-100 overflow-hidden">
                <div className="absolute inset-0 origin-center transition-transform" style={{ transform: `scale(${zoom})` }}>
                  <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden>
                    <path d="M0,6 C25,2 55,12 100,8" fill="none" stroke="#cbd5e1" strokeDasharray="1.5 1.5" vectorEffect="non-scaling-stroke" />
                    <path d="M0,22 C30,16 70,30 100,20" fill="none" stroke="#cbd5e1" strokeDasharray="1.5 1.5" vectorEffect="non-scaling-stroke" />
                    <path d="M0,36 C35,40 65,30 100,34" fill="none" stroke="#cbd5e1" vectorEffect="non-scaling-stroke" />
                    <path d="M6,32 C22,30 30,20 46,17 C62,14 70,18 86,7" fill="none" stroke="#C2410C" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  </svg>
                  <span className="absolute left-[4%] bottom-[10%] flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 text-[10px] shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-brand-orange/60" />
                    <span><b className="block text-slate-900">TRAILHEAD</b><span className="text-slate-500">6,200 ft • Restrooms</span></span>
                  </span>
                  <span className="absolute left-[44%] top-[36%] flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-slate-800 shadow-sm">
                    <Droplet size={11} className="text-brand-orange" /> Cold Spring (Mile 2.1)
                  </span>
                  <span className="absolute right-[3%] top-[8%] flex items-center gap-2 rounded-lg bg-brand-orange px-2.5 py-1.5 text-[10px] text-white shadow-sm">
                    <Flag size={12} />
                    <span><b className="block uppercase">{trek.name.split(' ').slice(0, 2).join(' ')} Destination</b>Summit viewpoint</span>
                  </span>
                </div>
                <div className="absolute right-3 bottom-3 flex items-center gap-2 rounded-lg bg-white px-2 py-1.5 text-slate-700 shadow-sm">
                  <button type="button" aria-label="Zoom in" disabled={zoom >= 2} onClick={() => setZoom((z) => Math.min(2, z + 0.25))} className="disabled:opacity-40"><Plus size={14} /></button>
                  <button type="button" aria-label="Zoom out" disabled={zoom <= 1} onClick={() => setZoom((z) => Math.max(1, z - 0.25))} className="disabled:opacity-40"><Minus size={14} /></button>
                  <a href={mapsUrl(`${trek.name}, ${trek.region}`)} target="_blank" rel="noreferrer" aria-label="Show trailhead in Maps"><MapPin size={14} /></a>
                </div>
              </div>

              <div className="mt-3 rounded-xl bg-slate-50 p-3">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold uppercase text-slate-900">Elevation Cross-Section</span>
                  <span className="text-slate-600">
                    <span className="text-brand-orange">—</span> Ascent: +{trek.gain} ft&nbsp;&nbsp;— Descent: -{trek.gain} ft
                  </span>
                </div>
                <AreaChart points={[12, 16, 22, 30, 36, 40, 46, 52, 58, 68, 78, 86]} className="mt-2 h-20" />
                <div className="mt-1 flex justify-between text-[10px] text-slate-500">
                  <span>Trailhead (0.0 mi)</span>
                  <span>Oak Grove</span>
                  <span>Switchbacks</span>
                  <span>Crest ({(Number(trek.dist) / 2).toFixed(1)} mi)</span>
                </div>
              </div>
            </div>

            <div className="px-1 pb-1">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900"><ListChecks size={15} className="text-brand-orange" /> Trail Essentials Checklist</h3>
                <span className="text-[11px] text-slate-500">{packed.length} / {trekGear.length} packed</span>
              </div>
              <p className="mt-2 text-xs text-slate-600">Tap items as you pack them. Recommended for the current summit forecast (42°F):</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {trekGear.map((g) => {
                  const done = packed.includes(g)
                  return (
                    <button
                      key={g}
                      type="button"
                      aria-pressed={done}
                      onClick={() => setPacked((p) => (done ? p.filter((x) => x !== g) : [...p, g]))}
                      className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium ${done ? 'bg-brand-orange/10 text-brand-orange line-through' : 'bg-slate-50 text-slate-800 hover:bg-slate-100'}`}
                    >
                      <Check size={12} className={done ? 'text-brand-orange' : 'text-slate-300'} /> {g}
                    </button>
                  )
                })}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 text-xs">
                <span className="flex items-center gap-2 text-slate-700">
                  <Tent size={14} className="text-brand-orange" /> {rented ? 'Club rental reserved for pickup' : 'Missing gear? Book free club rental'}
                </span>
                <button type="button" onClick={() => toggle(rentalPlan)} className="font-semibold text-brand-orange">
                  {rented ? 'Cancel' : 'Reserve'}
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {planning && (
        <PlanTrekModal
          onClose={() => setPlanning(false)}
          onSave={(t) => {
            setMyTreks((l) => [t, ...l])
            setPlanning(false)
            notify(`Trek planned: ${t.destination}`, '/treks')
          }}
        />
      )}
    </section>
  )
}
