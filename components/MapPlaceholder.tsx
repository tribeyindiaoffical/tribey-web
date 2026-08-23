import React from 'react'

export default function MapPlaceholder({ address, className = '' }: { address?: string; className?: string }) {
  if (!address) {
    return (
      <div className={`w-full h-48 bg-slate-50 border border-dashed rounded-md flex items-center justify-center text-slate-400 text-sm ${className}`}>
        Location not available
      </div>
    )
  }

  return (
    <iframe
      title={`Map showing ${address}`}
      className={`w-full h-48 rounded-md border-0 ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
    />
  )
}
