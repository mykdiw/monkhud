'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { CartItem, Cart } from '@/lib/types'

const STORAGE_KEY = 'monkhud_cart'

interface CartContextValue {
  cart: Cart
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: number) => void
  updateQty: (productId: number, delta: number) => void
  clearCart: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function calcCart(items: CartItem[]): Cart {
  return {
    items,
    item_count: items.reduce((s, i) => s + i.quantity, 0),
    subtotal_inr: items.reduce((s, i) => s + i.price_inr * i.quantity, 0),
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.product_id === item.product_id)
      if (existing) {
        return prev.map(i =>
          i.product_id === item.product_id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId: number) => {
    setItems(prev => prev.filter(i => i.product_id !== productId))
  }, [])

  const updateQty = useCallback((productId: number, delta: number) => {
    setItems(prev => {
      const updated = prev.map(i =>
        i.product_id === productId ? { ...i, quantity: i.quantity + delta } : i
      )
      return updated.filter(i => i.quantity > 0)
    })
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  return (
    <CartContext.Provider value={{
      cart: calcCart(items),
      addItem,
      removeItem,
      updateQty,
      clearCart,
      isOpen,
      openCart:  () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
