'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/signin?next=/account')
      } else {
        setUser(data.user)
        setLoading(false)
      }
    })
  }, [])

  if (loading) {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-forest pt-32 px-6 flex items-center justify-center">
          <p className="text-micro text-monk-faint tracking-widest">Loading...</p>
        </main>
      </>
    )
  }

  const displayName = user?.user_metadata?.full_name
    ?? user?.user_metadata?.name
    ?? user?.email?.split('@')[0]
    ?? 'Monk'

  const initials = (displayName as string)
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-forest pt-32 pb-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-container mx-auto">

          {/* Header */}
          <div className="flex items-center gap-6 mb-16 pb-8 border-b border-monk-border">
            <div className="w-16 h-16 rounded-full border border-monk-border bg-forest-dark flex items-center justify-center text-gold font-medium"
                 style={{ fontSize: '20px', letterSpacing: '0.05em' }}>
              {initials}
            </div>
            <div>
              <h1 className="text-h2 font-medium text-monk-white">{displayName}</h1>
              <p className="text-small text-monk-faint mt-1">{user?.email}</p>
            </div>
          </div>

          {/* Nav cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-monk-border border border-monk-border mb-16">

            <Link href="/account/settings"
              className="bg-forest p-8 group hover:bg-forest-dark transition-colors relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div className="mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
                </svg>
              </div>
              <h2 className="text-h3 font-medium text-monk-white mb-2">Account Settings</h2>
              <p className="text-small text-monk-dim">Profile, password, addresses, notifications.</p>
            </Link>

            <div className="bg-forest p-8 relative opacity-60">
              <div className="mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-monk-faint">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <h2 className="text-h3 font-medium text-monk-white mb-2">Order History</h2>
              <p className="text-small text-monk-dim">Your past Companions. Available after first order.</p>
              <span className="absolute top-4 right-4 text-micro text-monk-faint tracking-widest border border-monk-border px-2 py-1">
                Coming soon
              </span>
            </div>

            <div className="bg-forest p-8 relative opacity-60">
              <div className="mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-monk-faint">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              </div>
              <h2 className="text-h3 font-medium text-monk-white mb-2">Wishlist</h2>
              <p className="text-small text-monk-dim">Companions waiting for the right moment.</p>
              <span className="absolute top-4 right-4 text-micro text-monk-faint tracking-widest border border-monk-border px-2 py-1">
                Coming soon
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="border-t border-monk-border pt-8">
            <p className="text-micro text-monk-faint tracking-widest mb-6">Quick Actions</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/companions" className="text-small text-monk-dim hover:text-gold transition-colors tracking-wide">
                Meet the Companions →
              </Link>
              <Link href="/paths" className="text-small text-monk-dim hover:text-gold transition-colors tracking-wide">
                Find Your Path →
              </Link>
              <Link href="/journal" className="text-small text-monk-dim hover:text-gold transition-colors tracking-wide">
                Read Field Notes →
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
