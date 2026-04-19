import { getAllProducts } from '@/lib/db/products'
import { CompanionsGrid } from '@/components/CompanionsGrid'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Companions',
  description: 'Every Companion earned its place. Nothing here is accidental — function, form, and purpose. If it is here, it survived the Monk\'s test.',
}

export default async function CompanionsPage() {
  const products = await getAllProducts()

  return (
    <>
      <Nav />

      {/* Hero */}
      <div className="bg-forest-dark border-b border-monk-border pt-32 pb-16 px-6 md:px-16 lg:px-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(140,122,79,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(140,122,79,0.04) 1px,transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="max-w-container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-micro text-gold tracking-widest mb-4">// The Monk&apos;s Companions</p>
              <h1 className="font-semibold leading-tight tracking-tight mb-4"
                  style={{ fontSize: 'clamp(48px,6vw,80px)', letterSpacing: '-0.02em', lineHeight: '0.95' }}>
                EVERY COMPANION<br />
                <span className="text-gold">EARNED ITS PLACE.</span>
              </h1>
              <p className="text-body text-monk-dim font-light max-w-md mt-6">
                Nothing here is accidental. Every Companion passed the Monk&apos;s test — function, form, and purpose. If it is here, it survived.
              </p>
            </div>
            <div className="hidden md:flex gap-4 justify-end flex-wrap">
              <div className="border border-monk-border px-8 py-6 text-center">
                <div className="font-semibold text-gold mb-1" style={{ fontSize: '40px', fontFamily: 'var(--font-inter)', letterSpacing: '-0.02em' }}>{products.length}</div>
                <div className="text-micro text-monk-faint tracking-widest">Companions</div>
              </div>
              <div className="border border-monk-border px-8 py-6 text-center">
                <div className="font-semibold text-gold mb-1" style={{ fontSize: '40px', fontFamily: 'var(--font-inter)', letterSpacing: '-0.02em' }}>7</div>
                <div className="text-micro text-monk-faint tracking-widest">Categories</div>
              </div>
              <div className="border border-monk-border px-8 py-6 text-center">
                <div className="font-semibold text-gold mb-1" style={{ fontSize: '40px', fontFamily: 'var(--font-inter)', letterSpacing: '-0.02em' }}>2+</div>
                <div className="text-micro text-monk-faint tracking-widest">Years of curation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products grid with client-side filtering */}
      <CompanionsGrid products={products} />

      <Footer />
    </>
  )
}