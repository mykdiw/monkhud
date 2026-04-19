import { getAllPaths, getPathWithProducts } from '@/lib/db/paths'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { ProductCard } from '@/components/ProductCard'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Three Paths',
  description: 'The Quick Path, the Still Path, the Long Path. Three complete systems — each built to work as one. Choose your path, gather your Companions.',
}

export default async function PathsPage() {
  const paths = await getAllPaths()
  const pathsWithProducts = await Promise.all(
    paths.map(p => getPathWithProducts(p.slug as 'quick' | 'still' | 'long'))
  )

  return (
    <>
      <Nav />

      {/* Hero */}
      <div className="bg-forest-dark border-b border-monk-border pt-32 pb-16 px-6 md:px-16 lg:px-24">
        <div className="max-w-container mx-auto max-w-2xl">
          <h1 className="font-semibold leading-tight mb-6"
              style={{ fontSize: 'clamp(44px,5vw,64px)', letterSpacing: '-0.02em', lineHeight: '1.02' }}>
            Three paths.<br />One practice.
          </h1>
          <p className="text-body text-monk-dim font-light">
            Not a shopping list — a doctrine.
            Each path is a complete system, built to work as one.
          </p>
        </div>
      </div>

      {/* Paths */}
      <main className="px-6 md:px-16 lg:px-24">
        <div className="max-w-container mx-auto">
          {pathsWithProducts.map((path, idx) => {
            if (!path) return null
            const bundleTotal = path.products.reduce((s, p) => s + p.price_inr, 0)
            const bundlePrice = bundleTotal - path.bundle_savings

            return (
              <section
                key={path.id}
                className={`py-section ${idx < pathsWithProducts.length - 1 ? 'border-b border-monk-border' : ''}`}
              >
                {/* Path header */}
                <div className="mb-16">
                  <div className="flex items-start justify-between flex-wrap gap-8">
                    <div>
                      <p className="text-micro text-gold tracking-widest mb-3">
                        {path.archetype_emoji} {path.archetype}
                      </p>
                      <h2 className="text-h2 font-medium mb-2">{path.name}</h2>
                      <p className="text-body text-monk-dim mb-4">{path.subtitle}</p>
                      <p className="text-body text-monk-dim font-light max-w-prose">{path.description}</p>
                    </div>

                    {/* Bundle pricing */}
                    <div className="border border-monk-border p-6 min-w-[220px]">
                      <p className="text-micro text-monk-faint tracking-widest mb-3">Bundle price</p>
                      <p className="font-semibold text-gold mb-1"
                         style={{ fontSize: '32px', letterSpacing: '-0.02em' }}>
                        ₹{bundlePrice.toLocaleString('en-IN')}
                      </p>
                      <p className="text-small text-monk-dim mb-4">
                        Save ₹{path.bundle_savings.toLocaleString('en-IN')} vs individual
                      </p>
                      <button className="w-full bg-gold text-forest-dark text-micro tracking-widest py-3 font-medium hover:opacity-90 transition-opacity">
                        Add Path to Cart
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  {path.stat_label_1 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 border border-monk-border mt-10">
                      {[
                        [path.stat_label_1, path.stat_value_1],
                        [path.stat_label_2, path.stat_value_2],
                        [path.stat_label_3, path.stat_value_3],
                        [path.stat_label_4, path.stat_value_4],
                      ].filter(([l]) => l).map(([label, value]) => (
                        <div key={label} className="px-6 py-5 border-r border-monk-border last:border-r-0">
                          <p className="font-semibold text-gold mb-1"
                             style={{ fontSize: '28px', letterSpacing: '-0.01em' }}>{value}</p>
                          <p className="text-micro text-monk-faint tracking-widest">{label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Companions in this path */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-monk-border border border-monk-border">
                  {path.products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </main>

      <Footer />
    </>
  )
}