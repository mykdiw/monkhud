'use client'

import { useState } from 'react'
import type { Product } from '@/lib/types'

interface Props {
  product: Product
}

export function AddToCartButton({ product }: Props) {
  const [added, setAdded] = useState(false)

  function handleAdd() {
    // TODO: Wire to CartContext / Zustand store
    // For now: localStorage cart matching the pattern from the HTML version
    try {
      const raw = localStorage.getItem('monkhud_cart')
      const cart = raw ? JSON.parse(raw) : []
      const existing = cart.find((i: { product_id: number }) => i.product_id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        cart.push({
          product_id: product.id,
          name: product.name,
          slug: product.slug,
          category: product.category,
          emoji: product.emoji,
          price_inr: product.price_inr,
          quantity: 1,
        })
      }
      localStorage.setItem('monkhud_cart', JSON.stringify(cart))
    } catch {
      console.error('Cart write failed')
    }

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
