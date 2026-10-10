import { AtSign, BadgeCheck, ChevronRight, GraduationCap, Heart, Pencil, Plus, Quote, Reply, Share2, Sparkles, Star } from 'lucide-react'
import { me, myCommunities, reviews } from '../../lib/mock'
import { Badge, Button, Card } from '../../components/ui'

export const metadata = {
  title: 'Profile | Tribey',
  description: 'Your campus profile'
}

const promptLabel = 'text-[11px] font-bold uppercase tracking-wide text-brand-orange'

function LikeButton() {
  return (
    <span className="flex w-8 h-8 items-center justify-center rounded-full bg-slate-100 text-brand-orange">
      <Heart size={14} />
    </span>
  )
}

export default function ProfilePage() {
  return (
    <section className="py-4">
      <div className="relative h-36 rounded-2xl bg-gradient-to-br from-brand-orange via-orange-600 to-orange-800">
        <span className="absolute top-3 right-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-800">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> Active on Campus
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,9fr)] gap-4 items-start">
        <div className="space-y-4 -mt-12 px-2 lg:pl-2 lg:pr-0 relative">
          <Card className="p-5">
            <div className="relative -mt-14 w-24 h-24">
              <img src={me.avatar} alt={me.name} className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white bg-slate-200" />
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-brand-orange ring-2 ring-white" />
            </div>
            <h1 className="mt-3 flex items-center gap-2 text-2xl font-semibold text-slate-900">
              {me.name} <BadgeCheck size={20} className="text-brand-orange" />
            </h1>
            <p className="text-sm font-medium text-brand-orange">{me.major}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge tone="neutral"><GraduationCap size={12} /> {me.university}</Badge>
              <Badge tone="neutral"><AtSign size={12} /> {me.handle}</Badge>
            </div>
            <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2.5 text-sm italic text-slate-600">&ldquo;{me.bio}&rdquo;</p>
            <div className="mt-4 flex gap-2">
              <Button className="flex-1"><Pencil size={14} /> Edit Profile</Button>
              <Button variant="soft" className="!px-3" aria-label="Share profile"><Share2 size={15} /></Button>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wide text-slate-700">Campus Engagement</span>
              <Badge>Top 5%</Badge>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { value: '14', label: 'Events Attended', accent: true },
                { value: '3', label: 'Communities' },
                { value: '4.9', label: 'Peer Rating', star: true }
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-slate-50 px-2 py-3">
                  <div className={`flex items-center justify-center gap-1 text-2xl font-semibold ${s.accent ? 'text-brand-orange' : 'text-slate-900'}`}>
                    {s.value}
                    {s.star && <Star size={14} className="fill-brand-orange text-brand-orange" />}
                  </div>
                  <div className="text-[11px] text-slate-600">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-700">Collaboration Index</span>
                <b className="text-brand-orange">98 / 100</b>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-slate-200">
                <div className="h-full w-[98%] rounded-full bg-brand-orange" />
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-sm font-semibold text-slate-900">Member of Communities</h2>
            <ul className="mt-3 space-y-3">
              {myCommunities.map((c) => (
                <li key={c.name} className="flex items-center gap-3">
                  <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[10px] font-bold text-brand-orange">{c.initials}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-slate-900 truncate">{c.name}</span>
                    <span className="block text-[11px] text-slate-500">{c.sub}</span>
                  </span>
                  <ChevronRight size={15} className="text-slate-500" />
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-4 pt-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900"><Sparkles size={17} className="text-brand-orange" /> Vibe Check &amp; Prompts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Card className="p-5 flex flex-col">
              <div className={promptLabel}>The way to win me over is</div>
              <p className="mt-2 flex-1 text-lg font-semibold text-slate-900 leading-snug">
                &ldquo;you text me &apos;let&apos;s get drunk and go watch the sunset&apos; and actually follow through&rdquo;
              </p>
              <div className="mt-6 flex items-center justify-between text-xs text-slate-600">
                Spontaneous energy only ✈️ <LikeButton />
              </div>
            </Card>
            <Card className="p-5 flex flex-col">
              <div className={promptLabel}>My simple pleasures</div>
              <ul className="mt-2 flex-1 space-y-2 text-base font-semibold text-slate-900 list-disc pl-4 marker:text-brand-orange">
                <li>The walk home after a good workout</li>
                <li>Driving with the windows down</li>
                <li>Reading a book in the sun</li>
              </ul>
              <div className="mt-6 flex items-center justify-between text-xs text-slate-600">
                Low maintenance lifestyle ☀️ <LikeButton />
              </div>
            </Card>
            <Card className="p-5 md:col-span-2 flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className={promptLabel}>Together, we could</div>
                <p className="mt-1 text-2xl font-semibold text-slate-900">&ldquo;not get married but like&hellip; talk about it for funsies&rdquo;</p>
              </div>
              <div className="flex items-center gap-3 text-xs italic text-slate-600">
                ironic domesticity 💍
                <Button variant="soft" size="sm" className="not-italic"><Reply size={13} /> Reply to Prompt</Button>
              </div>
            </Card>
          </div>

          <div className="flex items-center justify-between pt-2">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900"><Quote size={16} className="text-brand-orange" /> Reviews from Friends &amp; Peers</h2>
            <span className="flex items-center gap-1 text-xs font-semibold text-brand-orange">Leave a Review <Plus size={13} /></span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reviews.map((r) => (
              <Card key={r.name} className="p-5">
                <div className="flex items-center justify-between">
                  <span className="flex gap-1 text-brand-orange" aria-label="5 out of 5 stars">
                    {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={14} className="fill-current" />)}
                  </span>
                  <Quote size={18} className="text-slate-200" />
                </div>
                <p className="mt-3 text-sm text-slate-800">&ldquo;{r.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={r.avatar} alt="" loading="lazy" className="w-9 h-9 rounded-full object-cover bg-slate-200" />
                  <span>
                    <span className="block text-sm font-semibold text-slate-900">{r.name}</span>
                    <span className="block text-[11px] text-slate-600">{r.role}</span>
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
