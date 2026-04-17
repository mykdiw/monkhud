import { getJournalPostBySlug, getAllJournalPosts } from '@/lib/db/journal'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllJournalPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getJournalPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getJournalPostBySlug(slug)
  if (!post) notFound()

  const publishedDate = new Date(post.published_at).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long',
  })

  return (
    <>
      <Nav />
      <main className="pt-32 min-h-screen">

        {/* Header */}
        <header className="px-6 md:px-16 lg:px-24 pb-16 border-b border-monk-border">
          <div className="max-w-container mx-auto max-w-2xl">
            <Link
              href="/journal"
              className="text-micro text-monk-dim tracking-widest hover:text-gold transition-colors mb-8 inline-flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              The Journal
            </Link>

            <div className="flex items-center gap-4 mt-8 mb-6">
              <span className="text-micro text-gold tracking-widest border border-monk-border px-3 py-1">
                {post.tag}
              </span>
              {post.issue_number && (
                <span className="text-micro text-monk-faint tracking-widest">
                  No. {String(post.issue_number).padStart(2, '0')} · {publishedDate}
                </span>
              )}
            </div>

            <h1 className="font-semibold leading-tight mb-6"
                style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-small text-monk-faint">
              {post.creature && <span>{post.creature}</span>}
              <span>{post.read_time_min} min read</span>
            </div>
          </div>
        </header>

        {/* Body */}
        <article className="px-6 md:px-16 lg:px-24 py-section">
          <div className="max-w-container mx-auto max-w-2xl">
            <div className="prose prose-invert prose-lg max-w-none
              prose-p:text-monk-dim prose-p:font-light prose-p:leading-relaxed
              prose-headings:text-monk-white prose-headings:font-medium
              prose-strong:text-monk-white
              prose-a:text-gold prose-a:no-underline hover:prose-a:underline">
              {post.body.split('\n\n').map((para, i) => {
                if (para.startsWith('**')) {
                  return (
                    <h3 key={i} className="text-h3 font-medium text-monk-white mt-12 mb-4">
                      {para.replace(/\*\*/g, '')}
                    </h3>
                  )
                }
                return (
                  <p key={i} className="text-body-lg text-monk-dim font-light leading-relaxed mb-6">
                    {para}
                  </p>
                )
              })}
            </div>
          </div>
        </article>

        {/* Back */}
        <div className="px-6 md:px-16 lg:px-24 pb-section border-t border-monk-border">
          <div className="max-w-container mx-auto pt-12">
            <Link
              href="/journal"
              className="text-micro text-monk-dim tracking-widest hover:text-gold transition-colors inline-flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              All field notes
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
