'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'
import { Button } from '../../../components/ui'

export default function CommunityLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/community'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    setSubmitting(false)
    if (signInError) {
      setError(signInError.message)
      return
    }

    router.replace(next)
  }

  return (
    <section className="py-8 max-w-md">
      <h2 className="text-2xl font-semibold mb-2">Log in</h2>
      <p className="text-slate-600 mb-6">Log in to create, join, and chat in communities.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button variant="primary" disabled={submitting} className="w-full">
          {submitting ? 'Logging in…' : 'Log in'}
        </Button>
      </form>
      <p className="text-sm text-slate-500 mt-4">
        Don&apos;t have an account?{' '}
        <Link href={`/community/signup?next=${encodeURIComponent(next)}`} className="text-brand-navy underline">
          Sign up
        </Link>
      </p>
    </section>
  )
}
