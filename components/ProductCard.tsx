'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart'
import type { Product } from '@/lib/types'

interface Props {
  product: Product
}

const BADGE_STYLES: Record<string, string> = {
  new:  'bg-gold text-forest-dark',
  sale: 'bg-monk-error text-white',
  hot:  'bg-amber-600 text-white',
  '':   'bg-gold text-forest-dark',
}

export function ProductCard({ product }: Props) {
  const { addItem } = useCart()
  const badgeStyle = BADGE_STYLES[product.badge_type ?? ''] ?? BADGE_STYLES['']

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    addItem({
      product_id: product.id,
      name:       product.name,
      slug:       product.slug,
      category:   product.category,
      emoji:      product.emoji,
      price_inr:  product.price_inr,
    })
  }

  return (
    <Link
      href={`/companions/${product.slug}`}
      className="group relative bg-forest block hover:-translate-y-1 transition-transform duration-300"
    >
      {/* Hover accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10" />

      {/* Product image / emoji placeholder */}
      <div className="aspect-square flex items-center justify-center bg-forest-dark relative overflow-hidden">
        <span className="text-7xl opacity-50 group-hover:opacity-70 transition-opacity">
          {product.emoji}
        </span>
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(140,122,79,0.06),transparent_70%)]" />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 right-3 text-micro tracking-widest px-2.5 py-1 font-medium z-10 ${badgeStyle}`}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <p className="text-micro text-gold tracking-widest mb-2">{product.category}</p>
        <h3 className="text-h3 font-medium mb-2 group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-small text-monk-dim font-light leading-relaxed mb-5 italic">
          {product.description}
        </p>

        {/* Price + add */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-monk-white" style={{ fontSize: '22px', letterSpacing: '-0.01em' }}>
              ₹{product.price_inr.toLocaleString('en-IN')}
            </span>
            {product.orig_inr && (
              <span className="text-small text-monk-faint line-through">
                ₹{product.orig_inr.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            className="w-9 h-9 bg-gold text-forest-dark flex items-center justify-center text-lg font-bold hover:scale-110 transition-transform"
            aria-label={`Add ${product.name} to cart`}
            onClick={handleAdd}
          >
            +
          </button>
        </div>

        {/* Stock warning */}
        {product.in_stock && product.stock_qty <= 5 && product.stock_qty > 0 && (
          <p className="text-micro text-monk-error tracking-widest mt-3">
            Only {product.stock_qty} left
          </p>
        )}
        {!product.in_stock && (
          <p className="text-micro text-monk-faint tracking-widest mt-3">Out of stock</p>
        )}
      </div>
    </Link>
  )
}
