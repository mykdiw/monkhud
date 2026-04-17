import { getProductBySlug, getAllProducts } from '@/lib/db/products'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { AddToCartButton } from '@/components/AddToCartButton'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await supabase.from('products').select('slug')
  return (data ?? []).map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} — ${product.category}`,
    description: product.description,
  }
}

export default async function CompanionPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const isOnSale = product.orig_inr != null && product.orig_inr > product.price_inr

  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen">

        {/* ── Section 1: The Companion ─────────────────────── */}
        <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 border-b border-monk-border">
          <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Product visual placeholder — swap for <Image> when photos exist */}
            <div className="aspect-square bg-forest-dark border border-monk-border flex items-center justify-center">
              <span className="text-[120px] opacity-60">{product.emoji}</span>
            </div>

            <div>
              <p className="text-micro text-gold tracking-widest mb-4 uppercase">{product.category}</p>
              <h1 className="font-semibold mb-4 leading-tight"
                  style={{ fontSize: 'clamp(36px,5vw,64px)', letterSpacing: '-0.02em', lineHeight: '1' }}>
                {product.name}
              </h1>
              <p className="text-body-lg text-monk-dim font-light mb-8 italic">{product.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-semibold text-gold" style={{ fontSize: '44px', letterSpacing: '-0.02em' }}>
                  ₹{product.price_inr.toLocaleString('en-IN')}
                </span>
                {isOnSale && (
                  <span className="text-monk-dim line-through text-h3">
                    ₹{product.orig_inr!.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Stock */}
              <p className={`text-micro tracking-widest mb-6 ${product.in_stock ? 'text-gold' : 'text-monk-error'}`}>
                {product.in_stock
                  ? `${product.stock_qty <= 5 ? `Only ${product.stock_qty}` : 'Available'} in the clearing`
                  : 'Out of stock'}
              </p>

              {/* Add to cart */}
              <AddToCartButton product={product} />
            </div>
          </div>
        </section>

        {/* ── Section 2: The Creature ──────────────────────── */}
        {product.creature_text && (
          <section className="px-6 md:px-16 lg:px-24 py-section border-b border-monk-border bg-forest-dark">
            <div className="max-w-container mx-auto max-w-prose">
              <p className="text-micro text-gold tracking-widest mb-6">// The Creature</p>
              <p className="text-body-lg text-monk-dim font-light leading-relaxed">{product.creature_text}</p>
            </div>
          </section>
        )}

        {/* ── Section 3: The Specification ─────────────────── */}
        <section className="px-6 md:px-16 lg:px-24 py-section border-b border-monk-border">
          <div className="max-w-container mx-auto">
            <p className="text-micro text-gold tracking-widest mb-12">// The Specification</p>
            <div className="divide-y divide-monk-border border-t border-b border-monk-border max-w-xl">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-4">
                  <span className="text-micro text-monk-faint tracking-widest uppercase">{key.replace(/_/g, ' ')}</span>
                  <span className="text-body text-monk-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 4: The Monk's Notes ──────────────────── */}
        {product.monks_notes && (
          <section className="px-6 md:px-16 lg:px-24 py-section bg-forest-dark border-b border-monk-border">
            <div className="max-w-container mx-auto max-w-prose">
              <p className="text-micro text-gold tracking-widest mb-8">// The Monk&apos;s Notes</p>
              <blockquote className="border-l-2 border-gold pl-8">
                <p className="text-body-lg text-monk-dim font-light leading-relaxed italic">
                  {product.monks_notes}
                </p>
              </blockquote>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  )
}
