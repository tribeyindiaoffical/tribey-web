import Link from 'next/link'
import {
  ArrowRight,
  AudioLines,
  BadgeCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Command,
  Flame,
  Footprints,
  MapPin,
  PenTool,
  Plus,
  Search,
  SlidersHorizontal,
  Trophy
} from 'lucide-react'
import { categories } from '../../lib/constants'
import { events, hubs, organizers, trending } from '../../lib/mock'
import { AvatarStack, Badge, Button, Card, Pill, SectionHeader } from '../../components/ui'

export const metadata = {
  title: 'Explore | Tribey',
  description: 'Find active campus clubs, weekend expeditions, and gatherings'
}

const trendingIcons = [Trophy, PenTool, AudioLines, Footprints]

export default function ExplorePage() {
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
            <Button variant="soft"><SlidersHorizontal size={14} /> Filters</Button>
            <Button variant="accent"><Plus size={16} /> Create Event or Club</Button>
          </div>
        </div>

        <label className="flex items-center gap-3 rounded-xl bg-white border border-slate-100 px-4 py-3 text-slate-500">
          <Search size={16} />
          <input
            type="search"
            placeholder="Search by activity, club name, sport, or keyword (e.g. 'marathon', 'hackathon', 'bouldering')..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
          />
          <span className="hidden sm:flex items-center gap-0.5 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
            <Command size={10} />K
          </span>
        </label>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {hubs.map((h, i) => (
            <Pill key={h} active={i === 0}>{h}</Pill>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader
          title="Upcoming Campus Events"
          sub="Confirmed bookings and officially endorsed union gatherings"
          icon={<span className="flex w-9 h-9 items-center justify-center rounded-lg bg-brand-orange/10"><CalendarDays size={18} /></span>}
          action={
            <div className="flex gap-2 text-slate-600">
              <span className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center"><ChevronLeft size={16} /></span>
              <span className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center"><ChevronRight size={16} /></span>
            </div>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {events.map((e) => (
            <Card key={e.title} className="p-3 flex flex-col">
              <div className="relative">
                <img src={e.photo} alt="" loading="lazy" className="w-full h-40 object-cover rounded-xl bg-slate-200" />
                <div className="absolute top-2 left-2 rounded-lg bg-white px-2.5 py-1 text-center leading-none shadow-sm">
                  <div className="text-[9px] font-bold text-brand-orange">{e.month}</div>
                  <div className="text-lg font-bold text-slate-900">{e.day}</div>
                </div>
                <span className="absolute top-2 right-2 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white">{e.tag}</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1"><Clock size={12} /> {e.when}</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> {e.where}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-slate-900 leading-snug">{e.title}</h3>
              <p className="mt-1 text-sm text-slate-600 flex-1">{e.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <AvatarStack initials={e.initials} more={e.more} />
                  {e.count}
                </div>
                <Button size="sm">{e.cta}</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader
          title="Trending Communities"
          sub="Campus micro-networks gaining members rapidly this semester"
          action={
            <Link href="/community" className="flex items-center gap-1 text-xs font-semibold text-brand-orange">
              View all 64 clubs <ArrowRight size={13} />
            </Link>
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {trending.map((c, i) => {
            const Icon = trendingIcons[i]
            return (
              <Card key={c.name} className="p-4 flex flex-col">
                <div className="flex items-start justify-between">
                  <span className={`flex w-10 h-10 items-center justify-center rounded-xl ${i % 2 ? 'bg-slate-100 text-slate-700' : 'bg-brand-orange/10 text-brand-orange'}`}>
                    <Icon size={20} />
                  </span>
                  <Badge tone={i === 1 ? 'neutral' : 'soft'}>
                    {(i === 0 || i === 3) && <Flame size={11} />}
                    {c.badge}
                  </Badge>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{c.name}</h3>
                <p className="mt-1 text-sm text-slate-600 flex-1">{c.desc}</p>
                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                    {c.members}
                  </span>
                  {c.note}
                </div>
                <Button variant={c.joined ? 'soft' : 'accent'} size="sm" className="mt-2 w-full !rounded-lg !py-2">
                  {c.joined ? 'Joined' : 'Join Club'}
                </Button>
              </Card>
            )
          })}
        </div>
      </div>

      <div>
        <SectionHeader title="Explore Activity Categories" sub="Find communities organized by your passion & recreational needs" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {categories.map((c) => (
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
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-zinc-800 via-zinc-800 to-stone-600 p-6 md:p-8 text-white flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-md">
          <Badge tone="soft" className="!bg-brand-orange/25 !text-orange-200">
            <BadgeCheck size={12} /> TOP CAMPUS ORGANIZERS
          </Badge>
          <h2 className="mt-3 text-2xl font-semibold leading-tight">Empowering Student Leaders &amp; Community Catalysts</h2>
          <p className="mt-2 text-sm text-zinc-300">
            Meet the students behind this term&apos;s most active sports tournaments, outdoor expeditions, and innovation jams.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {organizers.map((o) => (
              <div key={o.name} className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5">
                <span className="w-9 h-9 rounded-full bg-brand-orange flex items-center justify-center text-xs font-bold">{o.initials}</span>
                <span>
                  <span className="block text-sm font-semibold">{o.name}</span>
                  <span className="block text-[11px] text-zinc-300">{o.role}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-right">
          <Button variant="accent">Apply as an Organizer <BadgeCheck size={16} /></Button>
          <div className="mt-2 text-[11px] text-zinc-300">Earn activity credits &amp; official Union perks</div>
        </div>
      </div>
    </section>
  )
}
