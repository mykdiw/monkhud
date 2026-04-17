import { createClient } from '@/lib/supabase/server'
import type { JournalPost } from '@/lib/types'

export async function getAllJournalPosts(): Promise<JournalPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('journal_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (error) throw new Error(`Failed to fetch journal posts: ${error.message}`)
  return data as JournalPost[]
}

export async function getJournalPostBySlug(slug: string): Promise<JournalPost | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('journal_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw new Error(`Failed to fetch journal post: ${error.message}`)
  }
  return data as JournalPost
}

export async function getRecentJournalPosts(limit = 3): Promise<JournalPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('journal_posts')
    .select('id, slug, title, tag, excerpt, creature, read_time_min, issue_number, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) throw new Error(`Failed to fetch recent posts: ${error.message}`)
  return data as JournalPost[]
}
