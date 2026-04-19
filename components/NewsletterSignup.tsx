'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function NewsletterSignup() {
  const [email, setEmail]     = useState('')
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus('error')
      setMessage('That doesn\'t look like a valid email.')
      return
    }

    setStatus('loading')
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('leads')
        .insert({ email: email.toLowerCase().trim(), source: 'homepage_newsletter' })

      if (error && error.code !== '23505') { // 23505 = unique violation (already subscribed)
        throw error
      }

      setStatus('success')
      setMessage('Signal received. The Monk will be in touch.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Try again.')
    }
  }

  return (
    <section className="border-t border-monk-border px-6 md:px-16 lg:px-24 py-section text-center">
      <div className="max-w-lg mx-auto">
        <h2 className="text-h2 font-medium text-monk-white mb-4">THE MONK<br />SENDS SIGNALS.</h2>
        <p className="text-body text-monk-dim font-light mb-10">
          Signals from the Hud. Field notes, new Companions, nothing else.
        </p>

        {status === 'success' ? (
          <p className="text-body text-gold font-light">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex border border-monk-border">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-transparent px-5 py-4 text-body text-monk-white placeholder:text-monk-faint focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-gold text-forest-dark text-micro tracking-widest px-6 py-4 font-medium hover:opacity-90 transition-opacity disabled:opacity-60 whitespace-nowrap"
            >
              {status === 'loading' ? '…' : 'Receive the Signal →'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-small text-monk-error mt-3">{message}</p>
        )}
      </div>
    </section>
  )
}