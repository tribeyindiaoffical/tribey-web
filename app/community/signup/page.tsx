'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'
import { Button } from '../../../components/ui'

export default function CommunitySignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/community'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pendingConfirmation, setPendingConfirmation] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
    setSubmitting(false)
    if (signUpError) {
      setError(signUpError.message)
      return
    }

    if (!data.session) {
      setPendingConfirmation(true)
      return
    }

    router.replace(next)
  }

  if (pendingConfirmation) {
    return (
      <section className="py-8 max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Check your email</h2>
        <p className="text-slate-600">
          We sent a confirmation link to <strong>{email}</strong>. Confirm it, then{' '}
          <Link href={`/community/login?next=${encodeURIComponent(next)}`} className="text-brand-navy underline">
            log in
          </Link>
          .
        </p>
      </section>
    )
  }

  return (
    <section className="py-8 max-w-md">
      <h2 className="text-2xl font-semibold mb-2">Sign up</h2>
      <p className="text-slate-600 mb-6">Create an account to build and join communities.</p>
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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button variant="primary" disabled={submitting} className="w-full">
          {submitting ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
      <p className="text-sm text-slate-500 mt-4">
        Already have an account?{' '}
        <Link href={`/community/login?next=${encodeURIComponent(next)}`} className="text-brand-navy underline">
          Log in
        </Link>
      </p>
    </section>
  )
}
