'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '@/lib/cart'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const NAV_LINKS = [
  { href: '/companions', label: 'Companions' },
  { href: '/paths',      label: 'Paths' },
  { href: '/journal',    label: 'Journal' },
  { href: '/origin',     label: 'Origin' },
]

export function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { cart, openCart } = useCart()

  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    setDropdownOpen(false)
    router.push('/')
  }

  const displayName = user?.user_metadata?.full_name
    ?? user?.user_metadata?.name
    ?? user?.email
    ?? 'Monk'

  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const enterHudHref = user ? '/account' : `/signin?next=${encodeURIComponent(pathname)}`

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-20 border-b border-monk-border bg-forest/90 backdrop-blur-sm">
        {/* Logo */}
        <Link href="/" className="font-semibold tracking-wider text-monk-white hover:text-gold transition-colors"
              style={{ fontSize: '20px', letterSpacing: '0.15em' }}>
          MONK<span className="text-gold"> HUD</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-micro tracking-widest transition-colors ${
                  pathname.startsWith(link.href)
                    ? 'text-monk-white'
                    : 'text-monk-dim hover:text-monk-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4">

          {/* Cart icon */}
          <button
            onClick={openCart}
            className="relative text-monk-dim hover:text-monk-white transition-colors"
            aria-label={`Open cart — ${cart.item_count} items`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cart.item_count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-forest-dark rounded-full flex items-center justify-center font-medium"
                    style={{ fontSize: '9px' }}>
                {cart.item_count > 9 ? '9+' : cart.item_count}
              </span>
            )}
          </button>

          {/* Auth CTA — desktop */}
          {user ? (
            <div className="hidden md:block relative" ref={dropdownRef}>
              {/* Profile icon button */}
              <button
                onClick={() => setDropdownOpen(v => !v)}
                title={displayName}
                className="w-9 h-9 rounded-full border border-monk-border bg-forest-dark flex items-center justify-center text-gold hover:border-gold transition-colors"
                style={{ fontSize: '12px', letterSpacing: '0.05em', fontWeight: '500' }}
                aria-label={`Account menu for ${displayName}`}
              >
                {initials}
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-56 border border-monk-border bg-forest-dark shadow-lg z-50">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-monk-border">
                    <p className="text-micro text-monk-white tracking-widest truncate font-medium">{displayName}</p>
                    {user.email && displayName !== user.email && (
                      <p className="text-small text-monk-faint mt-0.5 truncate">{user.email}</p>
                    )}
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    <Link
                      href="/account"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-small text-monk-dim hover:text-monk-white hover:bg-forest transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      Profile
                    </Link>
                    <Link
                      href="/account/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-small text-monk-dim hover:text-monk-white hover:bg-forest transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
                      </svg>
                      Account Settings
                    </Link>
                    <div className="border-t border-monk-border mt-1 pt-1">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-3 text-small text-monk-dim hover:text-monk-error hover:bg-forest transition-colors w-full text-left"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                          <polyline points="16 17 21 12 16 7"/>
                          <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                        Leave the Order
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href={enterHudHref}
              className="hidden md:inline-block border border-gold text-gold text-micro tracking-widest px-5 py-2.5 hover:bg-gold hover:text-forest transition-colors"
            >
              Enter the Hud
            </Link>
          )}

          {/* Hamburger — mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 text-monk-dim hover:text-monk-white"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle navigation"
          >
            <span className={`block w-5 h-px bg-current transition-transform origin-center ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-transform origin-center ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-forest pt-20">
          <ul className="flex flex-col divide-y divide-monk-border border-b border-monk-border">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-6 py-5 text-body text-monk-dim hover:text-monk-white transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-6 flex flex-col gap-3">
            {user ? (
              <>
                <div className="px-2 py-3 border-b border-monk-border mb-2">
                  <p className="text-micro text-monk-white tracking-widest">{displayName}</p>
                  {user.email && <p className="text-small text-monk-faint mt-1">{user.email}</p>}
                </div>
                <Link href="/account" onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-gold text-forest-dark text-micro tracking-widest py-4 font-medium">
                  My Account
                </Link>
                <Link href="/account/settings" onClick={() => setMobileOpen(false)}
                  className="block w-full text-center border border-monk-border text-monk-dim text-micro tracking-widest py-3 hover:border-gold hover:text-gold transition-colors">
                  Account Settings
                </Link>
                <button
                  onClick={() => { handleSignOut(); setMobileOpen(false) }}
                  className="block w-full text-center border border-monk-border text-monk-dim text-micro tracking-widest py-3 hover:border-monk-error hover:text-monk-error transition-colors">
                  Leave the Order
                </button>
              </>
            ) : (
              <Link
                href={enterHudHref}
                className="block w-full text-center bg-gold text-forest-dark text-micro tracking-widest py-4 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Enter the Hud →
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}


const NAV_LINKS = [
  { href: '/companions', label: 'Companions' },
  { href: '/paths',      label: 'Paths' },
  { href: '/journal',    label: 'Journal' },
  { href: '/origin',     label: 'Origin' },
]

export function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const { cart, openCart } = useCart()

  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  const enterHudHref = user ? '/account' : `/signin?next=${encodeURIComponent(pathname)}`

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-20 border-b border-monk-border bg-forest/90 backdrop-blur-sm">
        {/* Logo */}
        <Link href="/" className="font-semibold tracking-wider text-monk-white hover:text-gold transition-colors"
              style={{ fontSize: '20px', letterSpacing: '0.15em' }}>
          MONK<span className="text-gold"> HUD</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-micro tracking-widest transition-colors ${
                  pathname.startsWith(link.href)
                    ? 'text-monk-white'
                    : 'text-monk-dim hover:text-monk-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4">

          {/* Cart icon */}
          <button
            onClick={openCart}
            className="relative text-monk-dim hover:text-monk-white transition-colors"
            aria-label={`Open cart — ${cart.item_count} items`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cart.item_count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-forest-dark rounded-full flex items-center justify-center font-medium"
                    style={{ fontSize: '9px' }}>
                {cart.item_count > 9 ? '9+' : cart.item_count}
              </span>
            )}
          </button>

          {/* Auth CTA — desktop */}
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-micro text-monk-dim tracking-widest">
                {user.user_metadata?.first_name ?? user.email?.split('@')[0]}
              </span>
              <button
                onClick={handleSignOut}
                className="text-micro text-monk-faint tracking-widest hover:text-gold transition-colors"
              >
                Leave
              </button>
            </div>
          ) : (
            <Link
              href={enterHudHref}
              className="hidden md:inline-block border border-gold text-gold text-micro tracking-widest px-5 py-2.5 hover:bg-gold hover:text-forest transition-colors"
            >
              Enter the Hud
            </Link>
          )}

          {/* Hamburger — mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 text-monk-dim hover:text-monk-white"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle navigation"
          >
            <span className={`block w-5 h-px bg-current transition-transform origin-center ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-transform origin-center ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-forest pt-20">
          <ul className="flex flex-col divide-y divide-monk-border border-b border-monk-border">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-6 py-5 text-body text-monk-dim hover:text-monk-white transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-6 flex flex-col gap-3">
            <Link
              href={enterHudHref}
              className="block w-full text-center bg-gold text-forest-dark text-micro tracking-widest py-4 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {user ? 'My Account' : 'Enter the Hud →'}
            </Link>
            {user && (
              <button
                onClick={() => { handleSignOut(); setMobileOpen(false) }}
                className="block w-full text-center border border-monk-border text-monk-dim text-micro tracking-widest py-3 hover:border-gold hover:text-gold transition-colors"
              >
                Leave the Order
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}