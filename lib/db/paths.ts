import { createClient } from '@/lib/supabase/server'
import { getProductsByIds } from './products'
import type { Path, PathWithProducts, PathSlug } from '@/lib/types'

export async function getAllPaths(): Promise<Path[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('paths')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw new Error(`Failed to fetch paths: ${error.message}`)
  return data as Path[]
}

export async function getPathWithProducts(slug: PathSlug): Promise<PathWithProducts | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('paths')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw new Error(`Failed to fetch path: ${error.message}`)
  }

  const path = data as Path
  const products = await getProductsByIds(path.product_ids)
  return { ...path, products }
}
