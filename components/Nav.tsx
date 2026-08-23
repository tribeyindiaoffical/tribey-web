import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="flex gap-4 py-4">
      <Link href="/" className="text-slate-700 hover:underline">Home</Link>
      <Link href="/sports" className="text-slate-700 hover:underline">Sports</Link>
      <Link href="/runs" className="text-slate-700 hover:underline">Runs</Link>
      <Link href="/treks" className="text-slate-700 hover:underline">Treks</Link>
      <Link href="/rooms" className="text-slate-700 hover:underline">Rooms</Link>
      <Link href="/tiffin" className="text-slate-700 hover:underline">Tiffin</Link>
    </nav>
  )
}
