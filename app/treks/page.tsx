import Link from 'next/link'
import {
  BadgeCheck,
  Bookmark,
  Box,
  Car,
  Check,
  Clock,
  Compass,
  Download,
  Droplet,
  Flag,
  ListChecks,
  Map,
  MapPin,
  MessageSquare,
  Minus,
  Plus,
  Ruler,
  Share2,
  SlidersHorizontal,
  Smartphone,
  Star,
  Tent,
  Timer,
  TrendingUp
} from 'lucide-react'
import { img, trekGear, trekTabs, treks } from '../../lib/mock'
import { AreaChart, Badge, Button, Card, Pill, Stat } from '../../components/ui'

export const metadata = {
  title: 'Travel & Treks | Tribey',
  description: 'Campus expeditions, weekend treks, and carpool rides'
}

const selectClass = 'w-full bg-transparent text-sm font-semibold text-slate-900 outline-none'

export default function TreksPage({ searchParams }: { searchParams: { trek?: string } }) {
  const trek = treks.find((t) => t.id === searchParams.trek) ?? treks[0]

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
          {trekTabs.map((t, i) => (
            <Pill key={t} active={i === 0}>{t}</Pill>
          ))}
          <Button variant="accent" size="sm" className="!py-2"><Compass size={14} /> Plan Your Own Trek</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-4 items-start">
        <div className="space-y-3">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-900"><SlidersHorizontal size={15} /> Filter Expeditions</span>
              <span className="text-xs font-semibold text-brand-orange">Reset Filters</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <label className="rounded-lg bg-slate-50 px-3 py-2">
                <span className="block text-[10px] font-semibold uppercase text-slate-500">Difficulty</span>
                <select defaultValue="Moderate" className={selectClass}>
                  <option>Easy</option>
                  <option>Moderate</option>
                  <option>Hard</option>
                </select>
              </label>
              <label className="rounded-lg bg-slate-50 px-3 py-2">
                <span className="block text-[10px] font-semibold uppercase text-slate-500">Duration</span>
                <select defaultValue="Weekend" className={selectClass}>
                  <option>Day trip</option>
                  <option>Weekend</option>
                  <option>Multi-day</option>
                </select>
              </label>
              <div className="rounded-lg bg-brand-orange/10 px-3 py-2">
                <span className="block text-[10px] font-semibold uppercase text-brand-orange">Carpool Status</span>
                <span className="flex items-center justify-between text-sm font-semibold text-brand-orange">Seats Open <Car size={14} /></span>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              Popular:
              {['High Altitude', 'Campfire Allowed', 'Beginner Friendly'].map((p) => (
                <Badge key={p} tone="neutral">{p}</Badge>
              ))}
            </div>
          </Card>

          {treks.map((t) => {
            const active = t.id === trek.id
            return (
              <Link key={t.id} href={`/treks?trek=${t.id}`} scroll={false} className="block">
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
                      {active ? <Car size={13} className="text-brand-orange" /> : <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />}
                      {t.footer}
                    </span>
                    <span className="font-semibold text-brand-orange">{t.footerRight}</span>
                  </div>
                </Card>
              </Link>
            )
          })}

          <div className="flex items-center gap-3 rounded-2xl bg-slate-200/60 p-4">
            <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-orange"><Tent size={18} /></span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-900">Free Outdoor Gear Rental Available</div>
              <div className="text-[11px] text-slate-600">Show student ID at Student Rec Center for free trekking poles &amp; packs.</div>
            </div>
            <Button variant="outline" size="sm" className="bg-white !rounded-lg">Details</Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="relative h-56">
            <img src={img(trek.photo, 1200)} alt="" className="w-full h-full object-cover bg-slate-200" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-900">
              <BadgeCheck size={13} className="text-brand-orange" /> Campus Verified Route
            </span>
            <div className="absolute top-3 right-3 flex gap-2">
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-800"><Bookmark size={15} /></span>
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-800"><Share2 size={15} /></span>
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
                  <Button variant="soft" size="sm" className="!rounded-lg"><Box size={13} /> 3D Preview</Button>
                  <Button size="sm" className="!rounded-lg"><Download size={13} /> Download GPX</Button>
                </div>
              </div>

              <div className="relative mt-3 h-44 rounded-xl bg-slate-100 overflow-hidden">
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
                <div className="absolute right-3 bottom-3 flex items-center gap-2 rounded-lg bg-white px-2 py-1.5 text-slate-700 shadow-sm">
                  <Plus size={14} /><Minus size={14} /><MapPin size={14} />
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-1 pb-1">
              <div>
                <div className="flex items-center justify-between">
                  <Badge><Car size={12} /> Active Campus Carpool</Badge>
                  <span className="text-[11px] font-semibold text-brand-orange">4 Seats Left</span>
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <span className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm font-bold">MR</span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center gap-1 text-sm font-semibold text-slate-900">Maya Rodriguez <BadgeCheck size={13} className="text-brand-orange" /></span>
                    <span className="block text-[11px] text-slate-500">Biology Jr • Outing Club Leader</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-900">$8<span className="font-normal text-slate-500">/gas</span></span>
                </div>
                <ul className="mt-3 space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2"><MapPin size={13} /> Pick-up: <b className="text-slate-900">Campus Gate 2 (Rec Center)</b></li>
                  <li className="flex items-center gap-2"><Timer size={13} /> Departure: <b className="text-slate-900">Saturday Oct 18 • 6:30 AM</b></li>
                  <li className="flex items-center gap-2"><Car size={13} /> Vehicle: <b className="text-slate-900">Subaru Outback AWD (Rack mounted)</b></li>
                </ul>
                <div className="mt-4 flex gap-2">
                  <Button variant="accent" className="flex-1 !rounded-lg">Join Carpool</Button>
                  <Button variant="soft" className="!rounded-lg !px-3" aria-label="Message driver"><MessageSquare size={16} /></Button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900"><ListChecks size={15} className="text-brand-orange" /> Trail Essentials Checklist</h3>
                  <span className="text-[11px] text-slate-500">Alpine Grade</span>
                </div>
                <p className="mt-2 text-xs text-slate-600">Recommended gear based on October elevation forecast (42°F at summit):</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {trekGear.map((g) => (
                    <span key={g} className="flex items-center gap-1.5 rounded-md bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-800">
                      <Check size={12} className="text-brand-orange" /> {g}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 text-xs">
                  <span className="flex items-center gap-2 text-slate-700"><Tent size={14} className="text-brand-orange" /> Missing gear? Book free club rental</span>
                  <span className="font-semibold text-brand-orange">Reserve</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-slate-100 bg-slate-50 px-4 py-3">
            <Smartphone size={22} className="shrink-0 text-brand-orange" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-900">Sync with Tribey TrekMate Mobile</div>
              <div className="text-[11px] text-slate-600">Track your group live via campus Bluetooth mesh beacon even without cellular signal.</div>
            </div>
            <Button size="sm" className="!rounded-lg">Sync to Mobile</Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
