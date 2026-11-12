'use client'

import { useState } from 'react'
import { Check, Trash2, UserPlus } from 'lucide-react'
import { disciplines, me, skillLevels, sportPositions, squadPosts } from '../lib/mock'
import { notify, toast, useStored } from '../lib/store'
import { Badge, Button, Pill } from './ui'
import { Field, Modal, fieldClass } from './interactive'

export type PositionPost = { position: string; level: string; note: string; at: string }
type Posts = Record<string, PositionPost>

const initialsOf = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join('')

/** Your posted positions, keyed by "<context>|<sport>" (context = event id, or "open" for a general squad search). */
export function usePositions() {
  const [posts, setPosts] = useStored<Posts>('positions', {})
  return {
    get: (context: string, sport: string) => posts[`${context}|${sport}`],
    set: (context: string, sport: string, post: PositionPost | null) =>
      setPosts((all) => {
        const next = { ...all }
        if (post) next[`${context}|${sport}`] = post
        else delete next[`${context}|${sport}`]
        return next
      })
  }
}

/**
 * Squad board for one sport: who plays which position, plus a form to post (or change / withdraw) yours.
 * `context` scopes the post: an event id, or "open" when you're just looking for a team.
 */
export function PositionSection({
  sport,
  context,
  label,
  href,
  onPosted,
  onWithdrawn
}: {
  sport: string
  context: string
  label: string
  href: string
  onPosted?: () => void
  onWithdrawn?: () => void
}) {
  const [profile] = useStored('profile', me)
  const { get, set } = usePositions()
  const mine = get(context, sport)
  const positions = sportPositions[sport] ?? []
  const [editing, setEditing] = useState(false)
  const showForm = !mine || editing
  const others = squadPosts.filter((p) => p.sport === sport)

  return (
    <div className="space-y-4">
      <ul className="divide-y divide-slate-100 rounded-xl border border-slate-100">
        {positions.map((pos) => {
          const players = others.filter((p) => p.position === pos)
          const youHere = mine?.position === pos
          return (
            <li key={pos} className="flex items-center gap-3 px-3 py-2.5">
              <span className="w-40 shrink-0 text-sm font-semibold text-slate-900">{pos}</span>
              <span className="flex flex-1 flex-wrap items-center gap-1.5">
                {players.map((p) => (
                  <span key={p.name} className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 py-0.5 pl-0.5 pr-2 text-[11px] text-slate-700">
                    <span className="flex w-5 h-5 items-center justify-center rounded-full bg-slate-700 text-[8px] font-bold text-white">{p.initials}</span>
                    {p.name} · {p.level}
                  </span>
                ))}
                {youHere && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/10 py-0.5 pl-0.5 pr-2 text-[11px] font-semibold text-brand-orange">
                    <span className="flex w-5 h-5 items-center justify-center rounded-full bg-brand-orange text-[8px] font-bold text-white">{initialsOf(profile.name)}</span>
                    You · {mine.level}
                  </span>
                )}
                {!players.length && !youHere && <span className="text-[11px] font-medium text-emerald-700">Open — needed</span>}
              </span>
            </li>
          )
        })}
      </ul>

      {showForm ? (
        <form
          className="space-y-3 rounded-xl bg-slate-50 p-3"
          onSubmit={(e) => {
            e.preventDefault()
            const f = new FormData(e.currentTarget)
            const post = {
              position: String(f.get('position')),
              level: String(f.get('level')),
              note: String(f.get('note') ?? '').trim(),
              at: new Date().toISOString()
            }
            set(context, sport, post)
            setEditing(false)
            notify(`Position posted: ${post.position} (${sport}) — ${label}`, href)
            onPosted?.()
          }}
        >
          <fieldset>
            <legend className="text-[10px] font-bold uppercase tracking-wide text-slate-600">Your position</legend>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {positions.map((pos, i) => (
                <label key={pos} className="cursor-pointer">
                  <input type="radio" name="position" value={pos} required defaultChecked={mine ? mine.position === pos : i === 0} className="peer sr-only" />
                  <span className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 peer-checked:border-brand-orange peer-checked:bg-brand-orange peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand-orange/40">
                    {pos}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="Skill level">
              <select name="level" defaultValue={mine?.level ?? skillLevels[1]} className={fieldClass}>
                {skillLevels.map((l) => <option key={l}>{l}</option>)}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Note (optional)">
                <input name="note" maxLength={100} defaultValue={mine?.note} placeholder="Left-footed, free after 5 PM" className={fieldClass} />
              </Field>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="accent" className="flex-1"><UserPlus size={15} /> {mine ? 'Update position' : 'Post my position'}</Button>
            {editing && <Button type="button" variant="soft" onClick={() => setEditing(false)}>Cancel</Button>}
          </div>
        </form>
      ) : (
        <div className="flex flex-wrap items-center gap-3 rounded-xl bg-brand-orange/10 p-3">
          <Check size={18} className="text-brand-orange" />
          <span className="flex-1 min-w-0 text-sm text-slate-800">
            You&apos;re posted as <b>{mine.position}</b> <Badge tone="neutral">{mine.level}</Badge>
            {mine.note && <span className="block text-xs text-slate-600">&ldquo;{mine.note}&rdquo;</span>}
          </span>
          <Button variant="soft" size="sm" onClick={() => setEditing(true)}>Change</Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              set(context, sport, null)
              toast(`Withdrew from ${sport}`)
              onWithdrawn?.()
            }}
          >
            <Trash2 size={13} /> Withdraw
          </Button>
        </div>
      )}
    </div>
  )
}

/** General "looking for a team" board with a picker for every sport. */
export function PositionModal({ initialSport = disciplines[0], onClose }: { initialSport?: string; onClose: () => void }) {
  const [sport, setSport] = useState(initialSport)
  const { get } = usePositions()

  return (
    <Modal title="Post your position" onClose={onClose} wide>
      <p className="-mt-2 mb-3 text-xs text-slate-500">Pick a sport, see which positions are open, and post where you play so captains can find you.</p>
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {disciplines.map((d) => (
          <Pill key={d} active={d === sport} onClick={() => setSport(d)}>
            {d}
            {get('open', d) && <Check size={12} />}
          </Pill>
        ))}
      </div>
      {/* key remounts the form so its defaults follow the selected sport. */}
      <PositionSection key={sport} sport={sport} context="open" label="Open squads" href="/sports" />
    </Modal>
  )
}
