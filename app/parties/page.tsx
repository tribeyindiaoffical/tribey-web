import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
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
  Users,
  Wine
} from 'lucide-react'
import { clubNights, houseParties, img, partyDates, partyTabs } from '../../lib/mock'
import { Badge, Button, Card, Pill, SectionHeader } from '../../components/ui'

export const metadata = {
  title: 'Parties & Gigs | Tribey',
  description: 'Campus parties, mixers, and live gigs'
}

export default function PartiesPage() {
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
            <Button variant="accent" size="sm" className="!py-2"><Plus size={14} /> Propose a Party Plan</Button>
            <Button variant="soft" size="sm" className="!py-2"><Ticket size={14} /> My RSVPs &amp; Tickets</Button>
            <Button variant="outline" size="sm" className="bg-white !py-2"><ShieldCheck size={14} /> Safety Guidelines</Button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {partyTabs.map((t, i) => (
            <Pill key={t} active={i === 0}>{t}</Pill>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2 overflow-x-auto">
            {partyDates.map((d, i) => (
              <Badge key={d} tone={i === 0 ? 'soft' : 'neutral'} className="!px-3 !py-1">
                {i === 0 && <Flame size={11} />}
                {d}
              </Badge>
            ))}
          </div>
          <span className="flex items-center gap-1.5 text-[11px] text-slate-600"><BadgeCheck size={13} className="text-brand-orange" /> Only University Verified Badges</span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 text-white">
        <img src={img('1516450360452-9312f5e86fc7', 1600)} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        <div className="relative max-w-xl p-6 md:p-8">
          <div className="flex flex-wrap gap-2">
            <Badge tone="solid"><Flame size={11} /> TRENDING HEADLINER</Badge>
            <Badge tone="neutral" className="!bg-white/20 !text-white">Campus Official Collaboration</Badge>
            <Badge tone="neutral" className="!bg-white/20 !text-white"><Users size={11} /> 380 Going</Badge>
          </div>
          <div className="mt-4 text-[11px] font-bold tracking-wide text-zinc-300">THE SKY DECK • CAMPUS CENTRAL</div>
          <h2 className="mt-1 text-3xl md:text-4xl font-semibold leading-tight">Annual Fall Semester Neon Rave &amp; Rooftop Mixer</h2>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-zinc-200">
            <span className="flex items-center gap-1.5"><CalendarDays size={13} /> Saturday, Oct 25 • 8:00 PM Onwards</span>
            <span className="flex items-center gap-1.5"><Disc3 size={13} /> 3 Student DJs</span>
            <span className="flex items-center gap-1.5"><GlassWater size={13} /> Free Mocktail Bar</span>
            <span className="flex items-center gap-1.5"><Palette size={13} /> Neon Face Paint Stalls</span>
          </div>
          <div className="mt-6 text-[10px] font-bold tracking-wide text-zinc-300">ACCESS TIER</div>
          <div className="text-sm"><b className="text-lg">FREE</b> with Tribey Pass <span className="text-zinc-400">/ ₹250 Guest</span></div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="accent">RSVP &amp; Claim Pass <ArrowRight size={15} /></Button>
            <Button variant="soft" className="!bg-white/20 !text-white"><Users size={15} /> See Who&apos;s Going (42 batchmates)</Button>
          </div>
        </div>
      </div>

      <div>
        <SectionHeader
          title="Verified Student House Parties & Dorm Mixers"
          sub="Strictly campus-verified peers, safe entry codes, & student hosts"
          icon={<Home size={18} />}
          action={<span className="flex items-center gap-1 text-xs font-semibold text-brand-orange">View all 14 <ArrowRight size={13} /></span>}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {houseParties.map((p) => (
            <Card key={p.title} className="p-3 flex flex-col">
              <div className="relative">
                <img src={p.photo} alt="" loading="lazy" className="w-full h-40 object-cover rounded-xl bg-slate-200" />
                <span className="absolute top-2 left-2 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white">{p.status}</span>
                <span className="absolute bottom-2 right-2 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-900">{p.tag}</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-brand-orange"><MapPin size={12} /> {p.place}</div>
              <h3 className="mt-1 text-lg font-semibold text-slate-900 leading-snug">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-600 flex-1">{p.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center text-[9px] font-bold">{p.hostInitials}</span>
                  {p.host}
                </span>
                <Button size="sm">{p.cta}</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader
          title="Campus-Partnered Club & Venue Nights"
          sub="Official student partnerships with exclusive discounts & fast-track entry"
          icon={<Wine size={18} />}
          action={<Badge>Up to 40% Off Drinks &amp; Entry</Badge>}
        />
        <div className="space-y-3">
          {clubNights.map((n, i) => (
            <Card key={n.title} className="p-3 flex flex-wrap items-center gap-4">
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
                <Button variant="accent" size="sm" className="mt-2 !py-2">Book Pass</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
