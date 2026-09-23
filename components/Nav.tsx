import Link from 'next/link'

export default function Nav() {
  return (
    <div className="flex items-center justify-between">
      <Link href="/">
        <img src="/logo.svg" alt="Tribey" className="h-7 w-auto" />
      </Link>
      <div className="w-9 h-9 rounded-full bg-brand-orange/15 flex items-center justify-center text-brand-orange">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </div>
    </div>
  )
}
