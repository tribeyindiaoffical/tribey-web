'use client'

import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export const fieldClass = 'mt-1 w-full rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-brand-orange/40'
export const labelClass = 'block text-[10px] font-bold uppercase tracking-wide text-slate-600'

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  )
}

export function Modal({ title, onClose, wide = false, children }: { title: string; onClose: () => void; wide?: boolean; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <button type="button" aria-label="Close" className="absolute inset-0 cursor-default" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label={title} className={`relative w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} max-h-full overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl`}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-slate-500 hover:text-slate-900">
            <X size={18} />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}

export function Toaster() {
  const [text, setText] = useState<string | null>(null)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const onToast = (e: Event) => {
      setText((e as CustomEvent<string>).detail)
      clearTimeout(timer)
      timer = setTimeout(() => setText(null), 2800)
    }
    window.addEventListener('tribey:toast', onToast)
    return () => {
      window.removeEventListener('tribey:toast', onToast)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div aria-live="polite" className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
      {text && <div className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg">{text}</div>}
    </div>
  )
}
