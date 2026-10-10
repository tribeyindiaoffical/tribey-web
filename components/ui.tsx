import React from 'react'

export function Card({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm ${className}`}>{children}</div>
}

export function Pill({ active = false, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap ${
        active ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
      }`}
    >
      {children}
    </span>
  )
}

const badgeTones = {
  soft: 'bg-brand-orange/10 text-brand-orange',
  solid: 'bg-brand-orange text-white',
  neutral: 'bg-slate-100 text-slate-600',
  green: 'bg-emerald-50 text-emerald-700'
}

export function Badge({
  tone = 'soft',
  className = '',
  children
}: {
  tone?: keyof typeof badgeTones
  className?: string
  children: React.ReactNode
}) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full text-[11px] font-semibold px-2 py-0.5 whitespace-nowrap ${badgeTones[tone]} ${className}`}>
      {children}
    </span>
  )
}

const buttonVariants = {
  primary: 'bg-slate-900 text-white hover:opacity-90',
  accent: 'bg-brand-orange text-white hover:opacity-90',
  outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50',
  soft: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
}

const buttonSizes = {
  md: 'px-5 py-2.5 text-sm',
  sm: 'px-3.5 py-1.5 text-xs'
}

type ButtonVariant = keyof typeof buttonVariants
type ButtonSize = keyof typeof buttonSizes

// Shared with <Link>s that need to look like buttons.
export function btn(variant: ButtonVariant = 'primary', size: ButtonSize = 'md') {
  return `inline-flex items-center justify-center gap-1.5 rounded-full font-semibold whitespace-nowrap transition disabled:opacity-40 disabled:cursor-not-allowed ${buttonSizes[size]} ${buttonVariants[variant]}`
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <button className={`${btn(variant, size)} ${className}`} {...props} />
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

export function SectionHeader({
  title,
  sub,
  icon,
  action
}: {
  title: string
  sub?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-end justify-between gap-3 mb-4">
      <div className="flex items-center gap-2.5 min-w-0">
        {icon && <span className="text-brand-orange shrink-0">{icon}</span>}
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-brand-navy leading-tight">{title}</h2>
          {sub && <p className="text-xs text-slate-500">{sub}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}

export function Stat({
  label,
  value,
  unit,
  sub,
  accent = false
}: {
  label: string
  value: string
  unit?: string
  sub?: string
  accent?: boolean
}) {
  return (
    <div className={`rounded-xl border p-3 ${accent ? 'bg-brand-orange/10 border-brand-orange/10' : 'bg-white border-slate-100'}`}>
      <div className={`text-[10px] font-semibold uppercase tracking-wide ${accent ? 'text-brand-orange' : 'text-slate-500'}`}>{label}</div>
      <div className={`mt-1 text-2xl font-semibold leading-tight ${accent ? 'text-brand-orange' : 'text-slate-900'}`}>
        {value}
        {unit && <span className="ml-1 text-xs font-normal text-slate-500">{unit}</span>}
      </div>
      {sub && <div className="text-[11px] text-slate-500">{sub}</div>}
    </div>
  )
}

const avatarColors = ['bg-brand-orange text-white', 'bg-slate-700 text-white', 'bg-orange-200 text-brand-orange', 'bg-slate-200 text-slate-600']

export function AvatarStack({ initials, more }: { initials: string[]; more?: string }) {
  return (
    <div className="flex items-center -space-x-1">
      {initials.map((label, i) => (
        <div
          key={label}
          className={`w-6 h-6 rounded-full ring-2 ring-white flex items-center justify-center text-[9px] font-bold ${avatarColors[i % avatarColors.length]}`}
        >
          {label}
        </div>
      ))}
      {more && (
        <div className="h-6 px-1.5 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-600">
          {more}
        </div>
      )}
    </div>
  )
}

// points are heights 0–100, evenly spaced along the x axis.
export function AreaChart({ points, className = 'h-24' }: { points: number[]; className?: string }) {
  const step = 100 / (points.length - 1)
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${(i * step).toFixed(2)},${100 - p}`).join(' ')
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={`w-full text-brand-orange ${className}`} aria-hidden>
      <path d={`${line} L100,100 L0,100 Z`} fill="currentColor" fillOpacity=".12" />
      <path d={line} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}
