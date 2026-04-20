'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart'
import type { Product } from '@/lib/types'

interface Props {
  product: Product
}

export function AddToCartButton({ product }: Props) {
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  function handleAdd() {
    addItem({
      product_id: product.id,
      name:       product.name,
      slug:       product.slug,
      category:   product.category,
      emoji:      product.emoji,
      price_inr:  product.price_inr,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (!product.in_stock) {
    return (
      <div className="border border-monk-border px-8 py-4 text-micro text-monk-faint tracking-widest text-center">
        Out of stock
      </div>
    )
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full md:w-auto px-10 py-4 text-micro tracking-widest font-medium transition-all ${
        added
          ? 'bg-forest-dark border border-gold text-gold'
          : 'bg-gold text-forest-dark hover:opacity-90'
      }`}
    >
      {added ? '✓ Added to cart' : `Add to cart — ₹${product.price_inr.toLocaleString('en-IN')}`}
    </button>
  )
}
