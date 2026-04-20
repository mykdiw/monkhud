'use client'

import { useCart } from '@/lib/cart'
import { useEffect } from 'react'
import Link from 'next/link'

export function CartDrawer() {
  const { cart, isOpen, closeCart, removeItem, updateQty } = useCart()

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeCart])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[800] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(11,31,18,0.7)' }}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Your cart"
        aria-modal="true"
        className={`fixed top-0 right-0 bottom-0 z-[801] flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          width: 'min(420px, 100vw)',
          background: '#172D1F',
          borderLeft: '1px solid rgba(196,148,60,0.18)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-monk-border flex-shrink-0">
          <div>
            <h2 className="font-medium text-monk-white tracking-widest" style={{ fontSize: '20px', letterSpacing: '0.15em' }}>
              THE COMPANIONS
            </h2>
            {cart.item_count > 0 && (
              <p className="text-micro text-monk-faint tracking-widest mt-1">
                {cart.item_count} {cart.item_count === 1 ? 'item' : 'items'} in the clearing
              </p>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 border border-monk-border text-monk-dim hover:border-gold hover:text-gold transition-colors flex items-center justify-center"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-monk-faint opacity-30">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p className="text-h3 font-medium text-monk-dim">The clearing is quiet.</p>
              <p className="text-small text-monk-faint">Add a Companion to begin.</p>
              <button
                onClick={closeCart}
                className="text-micro text-gold tracking-widest border border-monk-border px-6 py-3 hover:border-gold transition-colors mt-2"
              >
                Meet the Companions →
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-0">
              {cart.items.map(item => (
                <li key={item.product_id} className="flex gap-4 py-5 border-b border-monk-border last:border-b-0">
                  {/* Emoji thumbnail */}
                  <div
                    className="w-16 h-16 flex-shrink-0 flex items-center justify-center border border-monk-border"
                    style={{ background: '#1E3828' }}
                  >
                    <span style={{ fontSize: '28px' }}>{item.emoji}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-micro text-gold tracking-widest mb-1 uppercase">{item.category}</p>
                    <p className="text-body font-medium text-monk-white mb-3 truncate">{item.name}</p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQty(item.product_id, -1)}
                        className="w-7 h-7 border border-monk-border text-monk-dim hover:border-gold hover:text-gold transition-colors flex items-center justify-center text-sm"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-small text-monk-white w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.product_id, 1)}
                        className="w-7 h-7 border border-monk-border text-monk-dim hover:border-gold hover:text-gold transition-colors flex items-center justify-center text-sm"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.product_id)}
                        className="ml-2 text-micro text-monk-faint hover:text-monk-error transition-colors tracking-widest"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex-shrink-0 text-right">
                    <p className="font-medium text-monk-white" style={{ fontSize: '18px', letterSpacing: '-0.01em' }}>
                      ₹{(item.price_inr * item.quantity).toLocaleString('en-IN')}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-micro text-monk-faint mt-1">
                        ₹{item.price_inr.toLocaleString('en-IN')} each
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="px-8 py-6 border-t border-monk-border flex-shrink-0">
            {/* Subtotal */}
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-micro text-monk-dim tracking-widest">Subtotal</span>
              <span className="font-medium text-gold" style={{ fontSize: '28px', letterSpacing: '-0.02em' }}>
                ₹{cart.subtotal_inr.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-small text-monk-faint mb-6">
              Shipping & taxes calculated at checkout.{' '}
              {cart.subtotal_inr >= 5000 && (
                <span className="text-gold">Free shipping on this order.</span>
              )}
            </p>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full text-center bg-gold text-forest-dark text-micro tracking-widest py-4 font-medium hover:opacity-90 transition-opacity mb-3"
            >
              Proceed to Checkout →
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-center border border-monk-border text-monk-dim text-micro tracking-widest py-3 hover:border-monk-white hover:text-monk-white transition-colors"
            >
              Keep gathering
            </button>
          </div>
        )}
      </div>
    </>
  )
}
