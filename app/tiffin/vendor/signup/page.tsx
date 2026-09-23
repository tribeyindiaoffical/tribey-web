'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../../lib/supabaseClient'

export default function VendorSignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pendingConfirmation, setPendingConfirmation] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
    if (signUpError) {
      setError(signUpError.message)
      setSubmitting(false)
      return
    }

    if (!data.session) {
      setPendingConfirmation(true)
      setSubmitting(false)
      return
    }

    const { error: insertError } = await supabase
      .from('vendors')
      .insert({ user_id: data.user!.id, business_name: businessName })

    if (insertError) {
      setError(insertError.message)
      setSubmitting(false)
      return
    }

    router.push('/tiffin/vendor/dashboard')
  }

  if (pendingConfirmation) {
    return (
      <section className="py-8 max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Check your email</h2>
        <p className="text-slate-600">
          We sent a confirmation link to <strong>{email}</strong>. Confirm it, then{' '}
          <Link href="/tiffin/vendor/login" className="text-brand-navy underline">log in</Link> to set up your vendor profile.
        </p>
      </section>
    )
  }

  return (
    <section className="py-8 max-w-md">
      <h2 className="text-2xl font-semibold mb-2">Become a tiffin vendor</h2>
      <p className="text-slate-600 mb-6">Create an account to list your service and manage subscribers.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Business name</label>
          <input
            required
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Ma's Kitchen Tiffin"
          />
        </div>
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
        <button
          disabled={submitting}
          className="w-full px-5 py-3 rounded-lg bg-brand-orange text-white font-medium hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? 'Creating account…' : 'Create vendor account'}
        </button>
      </form>
      <p className="text-sm text-slate-500 mt-4">
        Already have an account? <Link href="/tiffin/vendor/login" className="text-brand-navy underline">Log in</Link>
      </p>
    </section>
  )
}
