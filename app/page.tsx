import { getFeaturedProducts } from '@/lib/db/products'
import { getAllPaths } from '@/lib/db/paths'
import { getRecentJournalPosts } from '@/lib/db/journal'
import { ProductCard } from '@/components/ProductCard'
import { PathCard } from '@/components/PathCard'
import { JournalCard } from '@/components/JournalCard'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Monk Hud — Design Your Focus Environment',
  description: 'This is the Hud. The Monk removed everything that did not earn its place. What remained was quiet, precise, and enough. These are the Companions that survived.',
}

export default async function HomePage() {
  const [featured, paths, posts] = await Promise.all([
    getFeaturedProducts(),
    getAllPaths(),
    getRecentJournalPosts(3),
  ])

  return (
    <>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-32 pb-20 relative overflow-hidden">
        {/* ambient glow */}
        <div className="absolute inset-0 bg-forest-radial pointer-events-none" />
        {/* grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(140,122,79,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(140,122,79,0.06) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-container mx-auto w-full">
          <p className="text-micro text-gold mb-8 tracking-widest">MONKHUD · NO. 01</p>
          <h1 className="text-hero font-semibold leading-[1.02] tracking-[-0.025em] mb-8 max-w-2xl">
            Your desk,<br />at rest.
          </h1>
          <p className="text-body-lg text-monk-dim max-w-prose mb-12 font-light">
            This is the Hud. The Monk removed everything that didn&apos;t earn its place.
            What remained was quiet, precise, and enough.
            These are the Companions that survived.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/companions"
              className="inline-block bg-gold text-forest-dark text-micro tracking-widest px-8 py-4 font-medium hover:opacity-90 transition-opacity"
            >
              Enter the Hud
            </Link>
            <Link
              href="/origin"
              className="inline-flex items-center gap-3 text-micro text-monk-dim tracking-widest hover:text-monk-white transition-colors"
            >
              The Monk&apos;s way
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* coordinates */}
        <p className="absolute bottom-8 right-8 text-micro text-monk-faint tracking-widest">
          CANOPY · 28.61°N
        </p>
      </section>

      {/* ── WHAT IS THE HUD ──────────────────────────────────── */}
      <div className="border-t border-monk-border px-6 md:px-16 lg:px-24 py-16">
        <p className="text-body-lg text-monk-dim max-w-prose mx-auto text-center font-light leading-relaxed">
          The Hud is a state of focus. Not a product. Not a brand.
          A condition you design your environment to enter and sustain.
          Everything on this desk earned its place by serving that condition.
        </p>
      </div>

      {/* ── FEATURED COMPANIONS ──────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24 py-section border-t border-monk-border">
        <div className="max-w-container mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-micro text-gold tracking-widest mb-4">// The Companions</p>
              <h2 className="text-h2 font-medium">From the clearing.</h2>
            </div>
            <Link
              href="/companions"
              className="text-micro text-monk-dim tracking-widest hover:text-gold transition-colors hidden md:block"
            >
              Meet all Companions →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-monk-border border border-monk-border">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/companions"
              className="text-micro text-monk-dim tracking-widest hover:text-gold transition-colors"
            >
              Meet all Companions →
            </Link>
          </div>
        </div>
      </section>

      {/* ── THE THREE PATHS ──────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24 py-section bg-forest-dark border-t border-monk-border">
        <div className="max-w-container mx-auto">
          <div className="mb-16">
            <p className="text-micro text-gold tracking-widest mb-4">// The Three Paths</p>
            <h2 className="text-h2 font-medium max-w-md">
              Which path does the Monk walk?
            </h2>
            <p className="text-body text-monk-dim mt-4 max-w-prose font-light">
              The Hud takes a different shape for every practice. The path changes. The silence doesn&apos;t.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-monk-border border border-monk-border">
            {paths.map(path => (
              <PathCard key={path.id} path={path} />
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNAL PREVIEW ──────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="px-6 md:px-16 lg:px-24 py-section border-t border-monk-border">
          <div className="max-w-container mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="text-micro text-gold tracking-widest mb-4">// The Journal</p>
                <h2 className="text-h2 font-medium">Field notes.</h2>
              </div>
              <Link
                href="/journal"
                className="text-micro text-monk-dim tracking-widest hover:text-gold transition-colors hidden md:block"
              >
                All field notes →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-monk-border border border-monk-border">
              {posts.map(post => (
                <JournalCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NEWSLETTER ───────────────────────────────────────── */}
      <NewsletterSignup />

      <Footer />
    </>
  )
}
