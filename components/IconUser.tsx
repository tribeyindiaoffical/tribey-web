import React from 'react'

type Props = {
  name: string
  role?: string
}

export default function IconUser({ name, role }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-yellow-300 flex items-center justify-center text-white font-semibold">{name.charAt(0)}</div>
      <div>
        <div className="text-sm font-medium">{name}</div>
        {role && <div className="text-xs text-slate-500">{role}</div>}
      </div>
    </div>
  )
}
