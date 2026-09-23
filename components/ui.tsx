import React from 'react'
import type { Person } from '../lib/data'

export function Card({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm ${className}`}>{children}</div>
}

export function Pill({ active = false, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap ${
        active ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
      }`}
    >
      {children}
    </span>
  )
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-semibold px-2.5 py-1">
      {children}
    </span>
  )
}

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' }) {
  const base = 'rounded-full px-5 py-2.5 text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed'
  const styles =
    variant === 'primary'
      ? 'bg-slate-900 text-white hover:opacity-90'
      : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
  return <button className={`${base} ${styles} ${className}`} {...props} />
}

export function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-400">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span className="text-sm">{placeholder}</span>
    </div>
  )
}

export function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold text-brand-navy">{title}</h2>
      {action}
    </div>
  )
}

const avatarColors = ['from-pink-300 to-yellow-300', 'from-sky-300 to-indigo-300', 'from-emerald-300 to-teal-300', 'from-orange-300 to-rose-300']

export function AvatarStack({ people, max = 4 }: { people: Person[]; max?: number }) {
  if (people.length === 0) return <span className="text-sm text-slate-400">No one joined yet</span>

  const shown = people.slice(0, max)
  const overflow = people.length - shown.length

  return (
    <div className="flex items-center -space-x-2">
      {shown.map((p, i) => (
        <div
          key={p.id}
          title={p.name}
          className={`w-8 h-8 rounded-full ring-2 ring-white bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-semibold`}
        >
          {p.name.charAt(0)}
        </div>
      ))}
      {overflow > 0 && (
        <div className="w-8 h-8 rounded-full ring-2 ring-white bg-slate-900 flex items-center justify-center text-white text-xs font-semibold">
          +{overflow}
        </div>
      )}
    </div>
  )
}
