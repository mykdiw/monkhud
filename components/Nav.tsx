'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
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