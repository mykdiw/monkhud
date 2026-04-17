import { createClient } from '@/lib/supabase/server'
import type { Product, ProductCategory } from '@/lib/types'

export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw new Error(`Failed to fetch products: ${error.message}`)
  return data as Product[]
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .limit(6)

  if (error) throw new Error(`Failed to fetch featured products: ${error.message}`)
  return data as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // not found
    throw new Error(`Failed to fetch product: ${error.message}`)
  }
  return data as Product
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('sort_order', { ascending: true })

  if (error) throw new Error(`Failed to fetch products by category: ${error.message}`)
  return data as Product[]
}

export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('id', ids)

  if (error) throw new Error(`Failed to fetch products by ids: ${error.message}`)
  // Return in the order of the ids array
  const map = new Map((data as Product[]).map(p => [p.id, p]))
  return ids.map(id => map.get(id)).filter(Boolean) as Product[]
}

export async function searchProducts(query: string): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
    .order('sort_order', { ascending: true })

  if (error) throw new Error(`Failed to search products: ${error.message}`)
  return data as Product[]
}

// Client-side inventory update (optimistic)
export async function updateStockQty(productId: number, delta: number): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.rpc('decrement_stock', {
    product_id: productId,
    qty: delta,
  })
  if (error) console.error('Stock update failed:', error.message)
}
