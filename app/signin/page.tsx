'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Nav } from '@/components/Nav'
import type { Provider } from '@supabase/supabase-js'

const PROVIDERS: { id: Provider; label: string; icon: React.ReactNode }[] = [
  {
    id: 'google',
    label: 'Continue with Google',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'Continue with GitHub',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    id: 'discord',
    label: 'Continue with Discord',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#5865F2">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
      </svg>
    ),
  },
  {
    id: 'facebook',
    label: 'Continue with Facebook',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
]

function SignInContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<'signin' | 'register'>('signin')
  const [loading, setLoading] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const next = searchParams.get('next') ?? '/'
  const urlError = searchParams.get('error')

  useEffect(() => {
    if (urlError === 'auth_failed') setError('Authentication failed. Please try again.')
  }, [urlError])

  const supabase = createClient()

  async function handleOAuth(provider: Provider) {
    setLoading(provider)
    setError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(null)
    }
  }

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading('email')
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(null)
    } else {
      router.push(next)
    }
  }

  async function handleEmailRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading('email')
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName },
        emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(null)
    } else {
      setSuccess('Check your email to confirm your account.')
      setLoading(null)
    }
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-forest flex items-center justify-center px-6 pt-24 pb-16">

        {/* Background grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(196,148,60,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(196,148,60,0.04) 1px,transparent 1px)',
          backgroundSize: '52px 52px',
        }} />

        <div className="relative z-10 w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-semibold text-monk-white mb-2"
                style={{ fontSize: 'clamp(36px,5vw,52px)', letterSpacing: '-0.02em', lineHeight: '1' }}>
              {mode === 'signin' ? 'ENTER THE HUD.' : 'JOIN THE ORDER.'}
            </h1>
            <p className="text-body text-monk-dim font-light">
              {mode === 'signin'
                ? 'The clearing remembers you.'
                : 'The Monk welcomes the intentional.'}
            </p>
          </div>

          {/* Card */}
          <div className="border border-monk-border bg-forest-dark p-8">

            {/* Mode toggle */}
            <div className="grid grid-cols-2 border border-monk-border mb-8">
              <button
                onClick={() => { setMode('signin'); setError(''); setSuccess('') }}
                className={`py-3 text-micro tracking-widest transition-colors ${
                  mode === 'signin'
                    ? 'bg-gold text-forest-dark font-medium'
                    : 'text-monk-dim hover:text-monk-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setMode('register'); setError(''); setSuccess('') }}
                className={`py-3 text-micro tracking-widest transition-colors ${
                  mode === 'register'
                    ? 'bg-gold text-forest-dark font-medium'
                    : 'text-monk-dim hover:text-monk-white'
                }`}
              >
                Register
              </button>
            </div>

            {/* Error / success */}
            {error && (
              <div className="border border-monk-error/40 bg-monk-error/10 px-4 py-3 mb-6">
                <p className="text-small text-monk-error">{error}</p>
              </div>
            )}
            {success && (
              <div className="border border-gold/40 bg-gold/10 px-4 py-3 mb-6">
                <p className="text-small text-gold">{success}</p>
              </div>
            )}

            {/* Social providers */}
            <div className="flex flex-col gap-2 mb-6">
              {PROVIDERS.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleOAuth(p.id)}
                  disabled={loading !== null}
                  className="flex items-center gap-3 px-5 py-3 border border-monk-border text-monk-dim hover:border-gold hover:text-monk-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
                >
                  <span className="flex-shrink-0 w-5 flex items-center justify-center">{p.icon}</span>
                  <span className="text-small tracking-wide">
                    {loading === p.id ? 'Redirecting…' : p.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-monk-border" />
              <span className="text-micro text-monk-faint tracking-widest">OR</span>
              <div className="flex-1 h-px bg-monk-border" />
            </div>

            {/* Email form */}
            <form onSubmit={mode === 'signin' ? handleEmailSignIn : handleEmailRegister} className="flex flex-col gap-4">

              {mode === 'register' && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="text-micro text-monk-faint tracking-widest">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="Arjun"
                      required
                      className="bg-forest border border-monk-border px-4 py-3 text-small text-monk-white placeholder:text-monk-faint focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-micro text-monk-faint tracking-widest">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      placeholder="Sharma"
                      required
                      className="bg-forest border border-monk-border px-4 py-3 text-small text-monk-white placeholder:text-monk-faint focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-micro text-monk-faint tracking-widest">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="bg-forest border border-monk-border px-4 py-3 text-small text-monk-white placeholder:text-monk-faint focus:border-gold focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-micro text-monk-faint tracking-widest">Password</label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      className="text-micro text-monk-faint hover:text-gold transition-colors tracking-widest"
                      onClick={async () => {
                        if (!email) { setError('Enter your email first.'); return }
                        setLoading('reset')
                        await supabase.auth.resetPasswordForEmail(email, {
                          redirectTo: `${window.location.origin}/api/auth/callback`,
                        })
                        setSuccess('Password reset email sent.')
                        setLoading(null)
                      }}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="bg-forest border border-monk-border px-4 py-3 text-small text-monk-white placeholder:text-monk-faint focus:border-gold focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading !== null}
                className="bg-gold text-forest-dark text-micro tracking-widest py-4 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading === 'email'
                  ? '…'
                  : mode === 'signin'
                  ? 'Enter the Hud →'
                  : 'Join the Order →'}
              </button>
            </form>

            {/* Footer note */}
            <p className="text-center text-small text-monk-faint mt-6 leading-relaxed">
              {mode === 'signin' ? (
                <>No account?{' '}
                  <button onClick={() => { setMode('register'); setError('') }}
                          className="text-gold hover:opacity-80 transition-opacity">
                    Join the Order
                  </button>
                </>
              ) : (
                <>Already a Monk?{' '}
                  <button onClick={() => { setMode('signin'); setError('') }}
                          className="text-gold hover:opacity-80 transition-opacity">
                    Enter the Hud
                  </button>
                </>
              )}
            </p>

          </div>

          {/* Legal */}
          <p className="text-center text-small text-monk-faint mt-6 leading-relaxed">
            By continuing you agree to the{' '}
            <a href="/terms" className="text-monk-dim hover:text-gold transition-colors">Terms</a>
            {' '}and{' '}
            <a href="/privacy" className="text-monk-dim hover:text-gold transition-colors">Privacy Policy</a>.
          </p>

        </div>
      </main>
    </>
  )
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  )
}
