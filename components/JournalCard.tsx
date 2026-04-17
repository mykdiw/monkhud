import Link from 'next/link'
import type { JournalPost } from '@/lib/types'

interface Props {
  post: JournalPost
  featured?: boolean
}

export function JournalCard({ post, featured = false }: Props) {
  const publishedDate = new Date(post.published_at).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long',
  })

  return (
    <Link
      href={`/journal/${post.slug}`}
      className={`group relative bg-forest flex flex-col gap-4 hover:bg-forest-dark transition-colors ${
        featured ? 'p-12 col-span-full' : 'p-8'
      }`}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      {/* Meta */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-micro text-gold tracking-widest border border-monk-border px-2.5 py-1">
          {post.tag}
        </span>
        {post.issue_number && (
          <span className="text-micro text-monk-faint tracking-widest">
            {publishedDate} · No. {String(post.issue_number).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className={`font-medium leading-tight group-hover:text-gold transition-colors ${
        featured ? 'text-h2' : 'text-h3'
      }`}>
        {post.title}
      </h2>

      {/* Excerpt */}
      <p className={`text-monk-dim font-light leading-relaxed ${
        featured ? 'text-body-lg max-w-2xl' : 'text-body'
      }`}>
        {post.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-monk-border">
        <span className="text-micro text-monk-faint tracking-widest">{post.read_time_min} min read</span>
        {post.creature && (
          <span className="text-micro text-gold tracking-widest">{post.creature}</span>
        )}
      </div>
    </Link>
  )
}
