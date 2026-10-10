import { ArrowRight, BadgeCheck, Bus, CalendarDays, ChevronRight, Dumbbell, Plus, SlidersHorizontal, Star, Target } from 'lucide-react'
import { disciplines, lineup, venues } from '../../lib/mock'
import { Badge, Button, Card } from '../../components/ui'

export const metadata = {
  title: 'Sports & Turfs | Tribey',
  description: 'Book a turf or join a game nearby'
}

const dotTones: Record<string, string> = {
  solid: 'bg-brand-orange text-white',
  amber: 'bg-amber-500 text-slate-900',
  light: 'bg-slate-100 text-slate-800',
  open: 'border border-dashed border-white/70 text-white'
}

export default function SportsPage() {
  const selected = venues.find((v) => v.selected) ?? venues[0]

  return (
    <section className="py-4 space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-600">
            <Badge className="uppercase !rounded">Campus Athletics</Badge>
            • Inter-Collegiate League &amp; Daily Turfs
          </div>
          <h1 className="mt-1 text-3xl font-semibold text-brand-navy">Explore Sports &amp; Turfs</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full bg-white border border-slate-200 p-0.5 text-xs font-semibold">
            <span className="rounded-full bg-slate-900 px-3 py-1.5 text-white">Join Open Match</span>
            <span className="px-3 py-1.5 text-slate-600">Host a Game</span>
          </div>
          <Button variant="accent" size="sm" className="!py-2"><Target size={14} /> Book Turf</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-4 items-start">
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <h2 className="text-lg font-semibold text-slate-900">Choose Discipline</h2>
                <span className="text-[11px] text-slate-500">14 sports active</span>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-orange"><SlidersHorizontal size={13} /> Filters</span>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {disciplines.map((d, i) => (
                <span
                  key={d}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap ${
                    i === 0 ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Dumbbell size={13} /> {d}
                </span>
              ))}
            </div>
          </Card>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-brand-navy">Campus-Partnered Venues</h2>
                <Badge>Student Discounts Active</Badge>
              </div>
              <span className="text-[11px] text-slate-500">Sorted by Proximity</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {venues.map((v) => (
                <Card key={v.name} className={`overflow-hidden ${v.selected ? '!border-brand-orange ring-1 ring-brand-orange' : ''}`}>
                  <div className="relative">
                    <img src={v.photo} alt="" loading="lazy" className="w-full h-44 object-cover bg-slate-200" />
                    {v.selected && <Badge tone="solid" className="absolute top-2 left-2">Selected Pitch</Badge>}
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
                        <div className={`text-lg font-semibold ${v.selected ? 'text-brand-orange' : 'text-slate-900'}`}>{v.price}</div>
                        <div className="text-[10px] text-slate-500">/ player</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px]">
                      <span className="flex items-center gap-1.5 font-medium text-slate-700">
                        {v.selected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                        {v.note}
                      </span>
                      <span className={`flex items-center gap-0.5 font-semibold ${v.selected ? 'text-brand-orange' : 'text-slate-900'}`}>
                        {v.cta} {v.selected && <ChevronRight size={12} />}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-3 flex items-center gap-3">
            <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange"><Bus size={17} /></span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-900">Campus Shuttle to Turf Arenas</div>
              <div className="text-[11px] text-slate-600">Free EV transit every 20m from South Gate • 8 min ride</div>
            </div>
            <Button variant="soft" size="sm">Track Shuttle <ChevronRight size={13} /></Button>
          </Card>
        </div>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <span className="flex w-10 h-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange text-white"><Target size={18} /></span>
            <div className="flex-1 min-w-0">
              <h2 className="flex items-center gap-1.5 text-lg font-semibold text-slate-900 leading-tight">
                {selected.name} <BadgeCheck size={15} className="text-brand-orange" />
              </h2>
              <p className="text-[11px] text-slate-600">7v7 Match • Organized by Arjun S.</p>
            </div>
            <Badge tone="green">6 Slots Open</Badge>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-900">Live Formation (7 v 7)</span>
            <span className="text-[11px] text-slate-500">Tap open slot to claim</span>
          </div>
          <div className="relative mt-2 h-64 overflow-hidden rounded-xl bg-emerald-950">
            <div className="absolute inset-2 rounded-lg border border-white/15" />
            <div className="absolute inset-y-2 left-1/2 border-l border-white/15" />
            <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />
            {lineup.map((p) => (
              <div
                key={p.label}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <span className={`mx-auto flex w-8 h-8 items-center justify-center rounded-full text-[10px] font-bold ${dotTones[p.tone]}`}>
                  {p.initials || <Plus size={13} />}
                </span>
                <span className="mt-0.5 block whitespace-nowrap text-[9px] text-white/90">{p.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 text-[10px] font-bold uppercase tracking-wide text-slate-600">Selected Schedule</div>
          <div className="mt-2 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-orange"><CalendarDays size={16} /></span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-900">Today, 07:00 PM – 08:30 PM</div>
              <div className="text-[11px] text-slate-600">KickOff Arena • Floodlit Turf</div>
            </div>
            <span className="text-sm font-semibold text-brand-orange">{selected.price}</span>
          </div>

          <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-4">
            <div>
              <div className="text-[10px] text-slate-500">Total to pay</div>
              <div className="text-2xl font-semibold text-slate-900 leading-none">
                {selected.price} <s className="text-xs font-normal text-slate-400">₹320</s>
              </div>
            </div>
            <Button variant="accent" className="flex-1">Confirm &amp; Pay <ArrowRight size={15} /></Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
