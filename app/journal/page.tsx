import { getAllJournalPosts } from '@/lib/db/journal'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { JournalCard } from '@/components/JournalCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Journal',
  description: 'Field notes from the Hud. Creature studies, setup breakdowns, notes on focus and silence. Everything that earns a place in the Hud earns a story.',
}

export default async function JournalPage() {
  const posts = await getAllJournalPosts()
  const [featured, ...rest] = posts

  return (
    <>
      <Nav />

      {/* Hero */}
      <div className="bg-forest-dark border-b border-monk-border pt-32 pb-16 px-6 md:px-16 lg:px-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(140,122,79,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(140,122,79,0.04) 1px,transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="max-w-container mx-auto relative z-10 max-w-2xl">
          <h1 className="font-semibold leading-tight mb-6"
              style={{ fontSize: 'clamp(44px,5vw,64px)', letterSpacing: '-0.02em', lineHeight: '1.02' }}>
            Field notes<br />from the Hud.
          </h1>
          <p className="text-body text-monk-dim font-light">
            Creature studies, setup breakdowns, notes on focus and silence.
            Everything that earns a place in the Hud earns a story.
          </p>
        </div>
      </div>

      {/* Posts */}
      <main className="px-6 md:px-16 lg:px-24 py-section">
        <div className="max-w-container mx-auto">

          {/* Featured post */}
          {featured && (
            <div className="mb-px">
              <JournalCard post={featured} featured />
            </div>
          )}

          {/* Rest of posts */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-monk-border border border-t-0 border-monk-border">
              {rest.map(post => (
                <JournalCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {posts.length === 0 && (
            <div className="text-center py-32 border border-monk-border">
              <p className="text-micro text-monk-faint tracking-widest">The Journal opens soon.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}