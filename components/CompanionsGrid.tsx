'use client'

import { useState, useMemo } from 'react'
import { ProductCard } from './ProductCard'
import type { Product, ProductCategory } from '@/lib/types'

const CATEGORIES: { value: string; label: string }[] = [
  { value: 'all',         label: 'All' },
  { value: 'keyboards',   label: 'Keyboards' },
  { value: 'mice',        label: 'Mice' },
  { value: 'audio',       label: 'Audio' },
  { value: 'lighting',    label: 'Lighting' },
  { value: 'mounts',      label: 'Mounts' },
  { value: 'accessories', label: 'Accessories' },
]

const SORTS: { value: string; label: string }[] = [
  { value: 'featured',    label: 'Featured' },
  { value: 'az',          label: 'A – Z' },
  { value: 'price-asc',   label: 'Price: Low – High' },
  { value: 'price-desc',  label: 'Price: High – Low' },
]

interface Props {
  products: Product[]
}

export function CompanionsGrid({ products }: Props) {
  const [category, setCategory] = useState('all')
  const [sort, setSort]         = useState('featured')
  const [query, setQuery]       = useState('')

  const filtered = useMemo(() => {
    let list = [...products]

    if (category !== 'all') {
      list = list.filter(p => p.category === category as ProductCategory)
    }

    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    }

    switch (sort) {
      case 'az':         list.sort((a, b) => a.name.localeCompare(b.name)); break
      case 'price-asc':  list.sort((a, b) => a.price_inr - b.price_inr); break
      case 'price-desc': list.sort((a, b) => b.price_inr - a.price_inr); break
      default:           list.sort((a, b) => a.sort_order - b.sort_order); break
    }

    return list
  }, [products, category, sort, query])

  return (
    <div>
      {/* Toolbar */}
      <div className="sticky top-20 z-30 bg-forest/90 backdrop-blur-sm border-b border-monk-border px-6 md:px-16 lg:px-24 py-4 flex flex-wrap items-center gap-4 justify-between">
        {/* Category tabs */}
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`text-micro tracking-widest px-4 py-2 whitespace-nowrap transition-colors border ${
                category === cat.value
                  ? 'bg-gold text-forest-dark border-gold font-medium'
                  : 'text-monk-dim border-transparent hover:border-monk-border hover:text-monk-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right: search + sort */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search…"
              className="bg-transparent border border-monk-border text-small text-monk-white placeholder:text-monk-faint px-4 py-2 w-40 focus:outline-none focus:border-gold transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-monk-dim hover:text-monk-white text-sm"
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-transparent border border-monk-border text-small text-monk-dim px-3 py-2 focus:outline-none focus:border-gold transition-colors appearance-none"
          >
            {SORTS.map(s => (
              <option key={s.value} value={s.value} className="bg-forest">
                {s.label}
              </option>
            ))}
          </select>

          <span className="text-micro text-monk-faint tracking-widest hidden md:block">
            {filtered.length} {filtered.length === 1 ? 'companion' : 'companions'}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 md:px-16 lg:px-24 py-12">
        <div className="max-w-container mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-monk-border border border-monk-border">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 border border-monk-border">
              <p className="text-h3 font-medium text-monk-dim mb-3">No Companions found.</p>
              <p className="text-body text-monk-faint mb-6">
                {query ? `No match for "${query}"` : 'Nothing in this category yet.'}
              </p>
              <button
                onClick={() => { setCategory('all'); setQuery('') }}
                className="text-micro text-gold tracking-widest border border-monk-border px-6 py-3 hover:border-gold transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
