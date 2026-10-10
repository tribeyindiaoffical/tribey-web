import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  CalendarPlus,
  Check,
  CircleCheck,
  Clock,
  Download,
  Flag,
  Footprints,
  Maximize2,
  Medal,
  Mountain,
  Route,
  Share2,
  Sunrise,
  Timer,
  TrendingUp,
  Trophy,
  Users,
  X
} from 'lucide-react'
import { img, paceBoard, runClubs, runTabs } from '../../lib/mock'
import { AreaChart, AvatarStack, Badge, Button, Card, Pill, SectionHeader, Stat, btn } from '../../components/ui'

export const metadata = {
  title: 'Run Clubs | Tribey',
  description: 'Run clubs, campus routes, and marathons'
}

type Club = (typeof runClubs)[number]

const clubIcons = [Sunrise, Mountain, Timer]
const fieldClass = 'mt-1 w-full rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none'
const labelClass = 'block text-[10px] font-bold uppercase tracking-wide text-slate-600'

function ClubModal({ club }: { club: Club }) {
  const lead = club.facts[2][1]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <Link href="/runs" scroll={false} aria-label="Close" className="absolute inset-0" />
      <div role="dialog" aria-modal="true" aria-label={club.name} className="relative w-full max-w-3xl max-h-full overflow-y-auto rounded-2xl bg-orange-50 shadow-2xl">
        <div className="flex items-start gap-3 bg-white p-4">
          <span className="flex w-10 h-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Mountain size={18} /></span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-slate-900">{club.name} · Arboretum Loop</h2>
              <Badge tone="green">Nature &amp; Hills</Badge>
              <Badge tone="neutral">Moderate</Badge>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-slate-600"><CalendarDays size={12} /> {club.when} · Lead: {lead}</p>
          </div>
          <Share2 size={16} className="mt-1 text-slate-500" />
          <Link href="/runs" scroll={false} aria-label="Close" className="mt-1 text-slate-600"><X size={16} /></Link>
        </div>

        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat label="Total Distance" value="6.50" unit="km" sub="+0.5km cooldown walk" />
            <Stat label="Target Pace" value="5:26" unit="/km" sub="Conversational & steady" />
            <Stat label="Avg Duration" value="35:18" sub="Stops at Lookout included" />
            <Stat accent label="Elevation Gain" value="+142" unit="m" sub="Peak at km 3.4 (Ridge)" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="md:col-span-3 rounded-xl bg-white border border-slate-100 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">Elevation Cross-Section</h3>
                    <Badge>SOFT INCLINE</Badge>
                  </div>
                  <p className="text-[11px] text-slate-500">Topographic elevation profile across 6.5km trail loop</p>
                </div>
                <span className="text-[11px] text-slate-500 shrink-0">Max Grade <b className="text-brand-orange">6.8%</b></span>
              </div>
              <div className="relative mt-3 rounded-lg bg-orange-50/60 px-2 pt-6">
                <span className="absolute left-1/2 top-1 -translate-x-1/2 rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-white">Arboretum Ridge · 142m</span>
                <AreaChart points={[28, 32, 40, 52, 68, 84, 92, 84, 66, 46, 30, 20, 14]} className="h-28" />
                <div className="flex justify-between py-1.5 text-[10px] text-slate-500">
                  <span>0 km</span><span>1.5 km</span><span>3.4 km (Crest)</span><span>6.5 km</span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-600">
                <span className="font-medium text-slate-800">Trail Surface Breakdown</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-700" /> 68% Packed Dirt Singletrack</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-300" /> 32% Paved Park Promenade</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-slate-200">
                <div className="h-full w-[68%] rounded-full bg-amber-700/70" />
              </div>
            </div>

            <div className="md:col-span-2 rounded-xl bg-white border border-slate-100 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">GPS Route Blueprint</h3>
                <Badge tone="neutral">GPX v1.1</Badge>
              </div>
              <p className="text-[11px] text-slate-500">North Gate Arboretum Loop</p>
              <svg viewBox="0 0 100 60" className="mt-3 w-full rounded-lg bg-orange-50" aria-hidden>
                <path d="M0,40 C30,32 70,46 100,36" fill="none" stroke="#bfdbfe" strokeWidth="5" />
                <path d="M26,36 C24,14 52,6 70,14 C88,22 82,44 58,44 C44,44 34,42 26,36 Z" fill="none" stroke="#C2410C" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="26" cy="36" r="2.5" fill="#fff" stroke="#18181B" strokeWidth="1.5" />
                <circle cx="62" cy="11" r="2" fill="#C2410C" />
                <circle cx="48" cy="44" r="2.5" fill="#fff" stroke="#C2410C" strokeWidth="1.5" />
                <text x="3" y="30" fontSize="4" fontWeight="700" fill="#18181B">North Gate</text>
                <text x="54" y="7" fontSize="3.5" fill="#C2410C">Ridge Vista</text>
              </svg>
              <ul className="mt-3 space-y-1.5 text-[11px] text-slate-700">
                <li className="flex justify-between"><span>● Meet: North Gate Stone Arch</span><span className="text-slate-500">0.0 km</span></li>
                <li className="flex justify-between"><span><span className="text-brand-orange">●</span> Regroup: Arboretum Summit</span><span className="text-slate-500">3.4 km</span></li>
                <li className="flex justify-between"><span><span className="text-emerald-600">●</span> Finish: Park Matcha Pavilion</span><span className="text-slate-500">6.5 km</span></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-xl bg-orange-100/60 p-4">
            <span className="flex w-10 h-10 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-800">{club.initials[0]}</span>
            <div className="flex-1 min-w-48">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">Led by {lead} <Badge tone="neutral">Club Captain</Badge></div>
              <p className="text-xs italic text-slate-600">
                &ldquo;We run conversationally in two pace pods (5:15 &amp; 5:45). No runner gets dropped. First round of iced matcha is on us!&rdquo;
              </p>
            </div>
            <AvatarStack initials={club.initials} more={club.more} />
            <span className="text-[11px] text-slate-600"><b className="block text-slate-900">26 Confirmed</b>6 spots left</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3">
          <span className="flex items-center gap-2 text-xs text-slate-600"><CircleCheck size={14} className="text-emerald-600" /> Syncs with Apple Watch, Strava &amp; Garmin</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download size={13} /> Export .GPX</Button>
            <Button variant="accent" size="sm"><CircleCheck size={13} /> Join Run Circle &amp; Sync Route</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RunsPage({ searchParams }: { searchParams: { club?: string } }) {
  const openClub = runClubs.find((c) => c.id === searchParams.club)

  return (
    <>
    <section className="py-4 space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="font-bold tracking-wide text-brand-orange">STUDENT ATHLETES &amp; FITNESS HUB</span>
            <span className="text-slate-500">• Outdoor Athletics</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold text-brand-navy">Run Clubs &amp; Campus Marathons</h1>
            <Badge>◉ Live Campus Pulse</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="soft" size="sm" className="!py-2"><Route size={14} /> Propose Route</Button>
          <Button variant="accent" size="sm" className="!py-2"><Footprints size={14} /> Join Active Group</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-slate-600">Campus Total Pace</div>
            <div className="text-3xl font-semibold text-slate-900">340.8 <span className="text-sm font-medium">km logged</span></div>
            <div className="flex items-center gap-1 text-[11px] text-brand-orange"><TrendingUp size={12} /> +18% higher than last week</div>
          </div>
          <span className="flex w-11 h-11 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange"><Footprints size={20} /></span>
        </Card>
        <Card className="p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-slate-600">Community Circles</div>
            <div className="text-3xl font-semibold text-slate-900">12 <span className="text-sm font-medium">active run clubs</span></div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> 3 groups meeting before sundown</div>
          </div>
          <span className="flex w-11 h-11 items-center justify-center rounded-full bg-slate-100 text-slate-600"><Users size={20} /></span>
        </Card>
        <div className="rounded-2xl bg-brand-orange p-4 text-white flex items-center justify-between">
          <div>
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-brand-orange">Major Campus Event</span>
            <div className="mt-2 text-2xl font-semibold">Fall 10K &amp; Half</div>
            <div className="flex items-center gap-1.5 text-[11px] text-orange-100"><Clock size={12} /> Gun time in 14 days • 840 registered</div>
          </div>
          <span className="flex w-11 h-11 items-center justify-center rounded-xl bg-white/15"><Trophy size={20} /></span>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {runTabs.map((t, i) => (
          <Pill key={t} active={i === 0}>{t}</Pill>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-4 items-start">
        <div className="space-y-6">
          <div>
            <SectionHeader
              title="Featured Run Clubs"
              icon={<Medal size={18} />}
              action={<span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Showing {runClubs.length} campus chapters</span>}
            />
            <div className="space-y-3">
              {runClubs.map((c, i) => {
                const Icon = clubIcons[i]
                return (
                  <Card key={c.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex w-10 h-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange"><Icon size={18} /></span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-slate-900 leading-tight">{c.name}</h3>
                          <Badge tone={i === 1 ? 'neutral' : 'soft'}>{c.badge}</Badge>
                        </div>
                        <p className="text-xs text-slate-600">{c.when}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-2xl font-semibold text-slate-900 leading-none">{c.count}</div>
                        <div className="text-[11px] text-slate-500">{c.countLabel}</div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-slate-700">{c.desc}</p>
                    <div className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-slate-50 px-3 py-2">
                      {c.facts.map(([label, value], j) => (
                        <div key={label}>
                          <div className="text-[10px] text-slate-500">{label}</div>
                          <div className={`text-xs font-semibold ${c.joined && j === 1 ? 'text-brand-orange' : 'text-slate-900'}`}>{value}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-[11px] text-slate-600">
                        <AvatarStack initials={c.initials} more={c.more} />
                        {c.note}
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/runs?club=${c.id}`} scroll={false} className={btn('soft', 'sm')}>{c.secondary}</Link>
                        <Button variant={c.joined ? 'accent' : 'primary'} size="sm">
                          {c.joined && <Check size={13} />}
                          {c.cta}
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          <div>
            <SectionHeader
              title="Upcoming Marathons & Campus Races"
              icon={<Flag size={18} />}
              action={<span className="text-xs font-semibold text-brand-orange">Race Calendar</span>}
            />
            <Card className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-slate-600">
                    <Badge tone="solid">Major Championship</Badge>
                    Sanctioned Collegiate Event
                  </div>
                  <h3 className="mt-1 text-2xl font-semibold text-slate-900">Annual Campus 10K &amp; Half-Marathon</h3>
                  <p className="text-sm text-slate-600">Scenic autumn route looping the entire campus perimeter, riverfront parkway, and finishing inside the central Memorial Stadium.</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-600">Entry Status</div>
                  <div className="text-xl font-semibold text-brand-orange">Free for Students</div>
                  <div className="text-[11px] text-slate-500">Sponsored by Campus Rec</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-4 rounded-xl bg-slate-50 py-3 text-center">
                {[['14', 'Days'], ['08', 'Hours'], ['42', 'Minutes'], ['19', 'Seconds']].map(([n, l], i) => (
                  <div key={l}>
                    <div className={`text-3xl font-semibold ${i === 3 ? 'text-brand-orange' : 'text-slate-900'}`}>{n}</div>
                    <div className="text-[10px] font-semibold uppercase text-slate-500">{l}</div>
                  </div>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { icon: Route, label: 'Course Distance', value: '10.0K & 21.1K Options' },
                  { icon: Medal, label: 'Finisher Perquisite', value: 'Medal + Tech T-Shirt' },
                  { icon: Flag, label: 'Start Line', value: 'West Gate Oval, 7:30 AM' }
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-3 rounded-lg bg-slate-100 px-3 py-2.5">
                    <f.icon size={18} className="shrink-0 text-brand-orange" />
                    <span>
                      <span className="block text-[10px] text-slate-500">{f.label}</span>
                      <span className="block text-xs font-semibold text-slate-900">{f.value}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-[11px] text-slate-600">
                  <CircleCheck size={14} className="text-brand-orange" /> 840 / 1,000 slots filled • Bib distribution begins Friday before race
                </span>
                <div className="flex gap-2">
                  <Button variant="soft" size="sm" className="!py-2">Download GPX Route</Button>
                  <Button variant="accent" size="sm" className="!py-2">Register Race <ArrowRight size={13} /></Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-semibold text-slate-900"><Route size={16} className="text-brand-orange" /> Popular Campus Routes</h3>
              <span className="text-[10px] font-bold uppercase text-brand-orange">GPS Active</span>
            </div>
            <div className="relative mt-3">
              <img src={img('1552674605-db6ffd4facb5', 900)} alt="" loading="lazy" className="w-full h-40 object-cover rounded-xl bg-slate-200" />
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-lg bg-white px-3 py-2">
                <span>
                  <span className="block text-[10px] text-slate-500">Route Selection</span>
                  <span className="block text-xs font-semibold text-slate-900">Campus Botanical Loop #04</span>
                </span>
                <span className="flex items-center gap-2 text-slate-600">
                  <Badge tone="solid">5.2 km</Badge>
                  <Maximize2 size={13} />
                </span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Stat label="Distance" value="5.20" unit="km" />
              <Stat label="Avg Time" value="28:15" />
              <Stat accent label="Avg Pace" value="5:26" unit="/km" />
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] text-slate-600">
              <span>Elevation &amp; Pace Profile</span>
              <b>Gain: +42m • Loss: -38m</b>
            </div>
            <AreaChart points={[48, 40, 36, 38, 44, 40, 34, 30, 42, 62, 70, 52, 40, 54]} className="mt-1 h-16" />
            <div className="mt-1 flex justify-between text-[10px] text-slate-500">
              <span>0 km (Quad)</span><span>2.5 km (Lake)</span><span>5.2 km (Finish)</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-semibold text-slate-900"><Trophy size={16} className="text-brand-orange" /> Weekly Campus Pace Board</h3>
              <span className="text-[10px] text-slate-500">Updated 10m ago</span>
            </div>
            <ol className="mt-3 space-y-2">
              {paceBoard.map((r, i) => (
                <li key={r.name} className="flex items-center gap-3">
                  <span className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-600'}`}>{i + 1}</span>
                  <span className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? 'bg-brand-orange/15 text-brand-orange' : 'bg-slate-100 text-slate-600'}`}>{r.initials}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-xs font-semibold text-slate-900 truncate">{r.name}</span>
                    <span className={`block text-[10px] ${r.you ? 'text-brand-orange' : 'text-slate-500'}`}>{r.sub}</span>
                  </span>
                  <span className="text-right">
                    <span className={`block text-xs font-bold ${i === 0 || r.you ? 'text-brand-orange' : 'text-slate-900'}`}>{r.km} km</span>
                    <span className="block text-[10px] text-slate-500">Pace: {r.pace}/km</span>
                  </span>
                </li>
              ))}
            </ol>
            <Button variant="soft" size="sm" className="mt-4 w-full !py-2">View Complete 120-Runner Board</Button>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-semibold text-slate-900"><CalendarPlus size={16} className="text-brand-orange" /> Schedule a Run</h3>
              <Badge>Host Jog</Badge>
            </div>
            <p className="mt-2 text-xs text-slate-600">Heading out for a quick recovery or tempo loop? Post a meet point to invite dorm mates and campus runners nearby.</p>
            <div className="mt-3 space-y-3">
              <label className="block">
                <span className={labelClass}>Session Title</span>
                <input defaultValue="Sunset 5K Chill Recovery Pace" className={fieldClass} />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className={labelClass}>Meet Point</span>
                  <select className={fieldClass}>
                    <option>North Quad Bell Tower</option>
                    <option>University Main Quad</option>
                    <option>Botanical Gardens North Gate</option>
                  </select>
                </label>
                <label className="block">
                  <span className={labelClass}>Time &amp; Pace</span>
                  <input defaultValue="Today 5:30 PM" className={fieldClass} />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-slate-700">
                  <input type="checkbox" defaultChecked className="accent-brand-orange" /> Publish to Campus Feed
                </label>
                <Button type="button" size="sm" className="!py-2"><Footprints size={13} /> Post Run</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
    {/* Outside the section so its space-y margin doesn't offset the fixed overlay. */}
    {openClub && <ClubModal club={openClub} />}
    </>
  )
}
