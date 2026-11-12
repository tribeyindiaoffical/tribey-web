'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AtSign, BadgeCheck, CalendarCheck, GraduationCap, Heart, Pencil, Reply, Send, Share2, Sparkles, Trash2, X } from 'lucide-react'
import { me } from '../../lib/mock'
import { share, toast, usePlans, useStored } from '../../lib/store'
import { Badge, Button, Card } from '../../components/ui'
import { Field, fieldClass } from '../../components/interactive'

type Profile = typeof me
type ReplyNote = { id: string; text: string; at: string }

const promptLabel = 'text-[11px] font-bold uppercase tracking-wide text-brand-orange'
const MAX_AVATAR_BYTES = 1_500_000 // localStorage holds ~5 MB in total.

function LikeButton({ id }: { id: string }) {
  const [likes, setLikes] = useStored<string[]>('likes', [])
  const liked = likes.includes(id)
  return (
    <button
      type="button"
      aria-label={liked ? 'Unlike' : 'Like'}
      aria-pressed={liked}
      onClick={() => setLikes((l) => (liked ? l.filter((x) => x !== id) : [...l, id]))}
      className={`flex w-8 h-8 items-center justify-center rounded-full transition ${liked ? 'bg-brand-orange text-white' : 'bg-slate-100 text-brand-orange hover:bg-brand-orange/10'}`}
    >
      <Heart size={14} className={liked ? 'fill-current' : ''} />
    </button>
  )
}

function EditProfile({ profile, onSave, onCancel }: { profile: Profile; onSave: (p: Profile) => void; onCancel: () => void }) {
  const [avatar, setAvatar] = useState(profile.avatar)
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        const f = new FormData(e.currentTarget)
        const get = (k: keyof Profile) => String(f.get(k) ?? '').trim() || profile[k]
        onSave({
          name: get('name'),
          role: get('role'),
          classOf: get('classOf'),
          major: get('major'),
          university: get('university'),
          handle: get('handle').replace(/^@/, ''),
          bio: String(f.get('bio') ?? '').trim(),
          avatar
        })
      }}
    >
      <div className="flex items-center gap-3">
        <img src={avatar} alt="" className="w-14 h-14 rounded-xl object-cover bg-slate-200" />
        <label className="text-xs font-semibold text-brand-orange cursor-pointer">
          Change photo
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (!file) return
              if (file.size > MAX_AVATAR_BYTES) return toast('Photo too large — pick one under 1.5 MB')
              const reader = new FileReader()
              reader.onload = () => setAvatar(String(reader.result))
              reader.readAsDataURL(file)
            }}
          />
        </label>
      </div>
      <Field label="Name"><input name="name" required maxLength={50} defaultValue={profile.name} className={fieldClass} /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Role"><input name="role" maxLength={30} defaultValue={profile.role} className={fieldClass} /></Field>
        <Field label="Class of"><input name="classOf" maxLength={20} defaultValue={profile.classOf} className={fieldClass} /></Field>
      </div>
      <Field label="Major"><input name="major" maxLength={60} defaultValue={profile.major} className={fieldClass} /></Field>
      <Field label="University"><input name="university" maxLength={60} defaultValue={profile.university} className={fieldClass} /></Field>
      <Field label="Handle"><input name="handle" maxLength={30} pattern="@?[A-Za-z0-9_.]+" defaultValue={profile.handle} className={fieldClass} /></Field>
      <Field label="Bio"><textarea name="bio" rows={2} maxLength={160} defaultValue={profile.bio} className={fieldClass} /></Field>
      <div className="flex gap-2">
        <Button className="flex-1">Save</Button>
        <Button type="button" variant="soft" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}

export default function ProfileView({ startEditing = false }: { startEditing?: boolean }) {
  const [profile, setProfile] = useStored<Profile>('profile', me)
  const [editing, setEditing] = useState(startEditing)
  const [replying, setReplying] = useState(false)
  const [replies, setReplies] = useStored<ReplyNote[]>('promptReplies', [])
  const { plans, toggle } = usePlans()

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
              <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white bg-slate-200" />
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-brand-orange ring-2 ring-white" />
            </div>
            {editing ? (
              <div className="mt-3">
                <EditProfile
                  profile={profile}
                  onCancel={() => setEditing(false)}
                  onSave={(p) => {
                    setProfile(p)
                    setEditing(false)
                    toast('Profile saved')
                  }}
                />
              </div>
            ) : (
              <>
                <h1 className="mt-3 flex items-center gap-2 text-2xl font-semibold text-slate-900">
                  {profile.name} <BadgeCheck size={20} className="text-brand-orange" />
                </h1>
                <p className="text-sm font-medium text-brand-orange">{profile.major}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge tone="neutral"><GraduationCap size={12} /> {profile.university}</Badge>
                  <Badge tone="neutral"><AtSign size={12} /> {profile.handle}</Badge>
                </div>
                {profile.bio && <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2.5 text-sm italic text-slate-600">&ldquo;{profile.bio}&rdquo;</p>}
                <div className="mt-4 flex gap-2">
                  <Button className="flex-1" onClick={() => setEditing(true)}><Pencil size={14} /> Edit Profile</Button>
                  <Button variant="soft" className="!px-3" aria-label="Share profile" onClick={() => share('/profile', `${profile.name} on Tribey`)}>
                    <Share2 size={15} />
                  </Button>
                </div>
              </>
            )}
          </Card>

          <Card className="p-5 scroll-mt-4">
            <h2 id="plans" className="scroll-mt-4 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <CalendarCheck size={16} className="text-brand-orange" /> My Plans ({plans.length})
            </h2>
            {plans.length === 0 ? (
              <p className="mt-2 text-xs text-slate-500">
                Nothing yet. RSVPs, club joins, turf bookings and passes show up here. <Link href="/explore" className="font-semibold text-brand-orange">Find something →</Link>
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {plans.map((p) => (
                  <li key={p.id} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs">
                    <Link href={p.href} className="flex-1 min-w-0 hover:underline">
                      <b className="block text-slate-900 truncate">{p.title}</b>
                      <span className="text-slate-600">{p.kind}{p.when ? ` • ${p.when}` : ''}</span>
                    </Link>
                    <button type="button" aria-label={`Cancel ${p.title}`} onClick={() => toggle(p)} className="text-slate-500 hover:text-red-600"><X size={14} /></button>
                  </li>
                ))}
              </ul>
            )}
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
                Spontaneous energy only ✈️ <LikeButton id="prompt-win-me-over" />
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
                Low maintenance lifestyle ☀️ <LikeButton id="prompt-simple-pleasures" />
              </div>
            </Card>
            <Card className="p-5 md:col-span-2">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className={promptLabel}>Together, we could</div>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">&ldquo;not get married but like&hellip; talk about it for funsies&rdquo;</p>
                </div>
                <div className="flex items-center gap-3 text-xs italic text-slate-600">
                  ironic domesticity 💍
                  <Button variant="soft" size="sm" className="not-italic" aria-expanded={replying} onClick={() => setReplying((v) => !v)}>
                    <Reply size={13} /> {replying ? 'Close' : 'Reply to Prompt'}
                  </Button>
                </div>
              </div>
              {replying && (
                <form
                  className="mt-4 flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const input = e.currentTarget.elements.namedItem('reply') as HTMLInputElement
                    const text = input.value.trim()
                    if (!text) return
                    setReplies((r) => [{ id: crypto.randomUUID(), text, at: new Date().toISOString() }, ...r])
                    input.value = ''
                    toast('Reply sent')
                  }}
                >
                  <input name="reply" required maxLength={200} autoFocus placeholder="Write a reply…" className={`${fieldClass} !mt-0 flex-1`} />
                  <Button size="sm" aria-label="Send reply"><Send size={13} /></Button>
                </form>
              )}
              {replies.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {replies.map((r) => (
                    <li key={r.id} className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm">
                      <span className="flex-1 text-slate-800">{r.text}<span className="block text-[11px] text-slate-500">{new Date(r.at).toLocaleString()}</span></span>
                      <button type="button" aria-label="Delete reply" onClick={() => setReplies((l) => l.filter((x) => x.id !== r.id))} className="text-slate-500 hover:text-red-600"><Trash2 size={14} /></button>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
