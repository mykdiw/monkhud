'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const COOKIE_KEY = 'monkhud_cookie_consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY)
    if (!stored) setVisible(true)
  }, [])

  function acceptAll() {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ essential: true, analytics: true }))
    setVisible(false)
  }

  function acceptEssential() {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ essential: true, analytics: false }))
    setVisible(false)
  }

  function savePreferences() {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ essential: true, analytics }))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[900] border-t border-monk-border bg-forest-dark/95 backdrop-blur-sm">
      <div className="max-w-container mx-auto px-6 md:px-10 py-4">

        {!showPrefs ? (
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <p className="text-small text-monk-dim flex-1 leading-relaxed">
              <span className="text-monk-white font-medium">The Monk uses cookies</span>
              {' '}— only what&apos;s needed to keep your cart alive and understand how you move through the HUD.
              Essential ones are always on. Analytics are optional.{' '}
              <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>
            </p>
            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setShowPrefs(true)}
                className="text-micro text-monk-dim tracking-widest hover:text-monk-white transition-colors"
              >
                Manage Preferences
              </button>
              <button
                onClick={acceptEssential}
                className="text-micro text-monk-dim tracking-widest border border-monk-border px-4 py-2 hover:border-monk-white hover:text-monk-white transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={acceptAll}
                className="text-micro bg-gold text-forest-dark tracking-widest px-4 py-2 font-medium hover:opacity-90 transition-opacity"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-micro text-gold tracking-widest">Cookie Preferences</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-monk-border border border-monk-border">
              {/* Essential */}
              <div className="bg-forest p-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-small font-medium text-monk-white mb-1">Essential Cookies</p>
                  <p className="text-small text-monk-dim">Cart, session, authentication. Always on.</p>
                </div>
                <div className="w-10 h-5 rounded-full bg-gold flex-shrink-0 relative mt-0.5" style={{minWidth:'40px'}}>
                  <span className="absolute top-0.5 left-5 w-4 h-4 rounded-full bg-forest-dark" />
                </div>
              </div>
              {/* Analytics */}
              <div className="bg-forest p-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-small font-medium text-monk-white mb-1">Analytics Cookies</p>
                  <p className="text-small text-monk-dim">Understand how you use the HUD. No personal data sold.</p>
                </div>
                <button
                  onClick={() => setAnalytics(v => !v)}
                  className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 mt-0.5 ${analytics ? 'bg-gold' : 'bg-forest border border-monk-border'}`}
                  style={{minWidth:'40px'}}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200 ${analytics ? 'bg-forest-dark left-5' : 'bg-monk-faint left-0.5'}`} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={savePreferences}
                className="text-micro bg-gold text-forest-dark tracking-widest px-6 py-2.5 font-medium hover:opacity-90 transition-opacity"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setShowPrefs(false)}
                className="text-micro text-monk-faint tracking-widest hover:text-monk-white transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
