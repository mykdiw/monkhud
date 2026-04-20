import { getFeaturedProducts } from '@/lib/db/products'
import { getAllPaths } from '@/lib/db/paths'
import { getRecentJournalPosts } from '@/lib/db/journal'
import { ProductCard } from '@/components/ProductCard'
import { PathCard } from '@/components/PathCard'
import { JournalCard } from '@/components/JournalCard'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Monk Hud — Design Your Focus Environment',
  description: "This is the Hud. The Monk removed everything that didn't earn its place. What remained was quiet, precise, and enough. These are the Companions that survived.",
}

const SIX_LAWS = [
  { num: '01', title: 'Nothing Unnecessary',  body: "The Monk removes clutter before it accumulates. Every product earns its place or it doesn't exist on this desk. We curate so ruthlessly you'll never scroll through noise." },
  { num: '02', title: 'The HUD Never Lies',   body: "The Monk's overlay — his HUD — shows only truth. Specs are real. Ratings are earned. Every Companion performs exactly as described. No illusions." },
  { num: '03', title: 'The Monk Moves Fast',  body: 'Discipline means zero wasted time. Order before 2PM — it ships the same day. When you decide to upgrade your focus environment, every hour of delay costs you.' },
  { num: '04', title: 'The Oath of 2 Years',  body: 'The Monk commits fully or not at all. Every product ships with a 2-year performance oath. If it breaks under honest use, we replace it. The mission continues.' },
  { num: '05', title: 'The Full Practice',    body: "The Monk doesn't build his clearing piece by piece over years. He composes it completely. Mix, match, bundle — save up to 30% when you gather your full set of Companions." },
  { num: '06', title: 'The Order of Monks',   body: "A growing collective of builders with one shared philosophy. Share your setup, earn early access, shape future drops. The community doesn't just use gear — they define what gets made next." },
]

const AUDIENCE = [
  { emoji: '🦅', role: 'The Quick Path',   sub: 'Speed and precision. Companions that move first.' },
  { emoji: '🧬', role: 'The Long Path',    sub: 'Systems thinking. Companions that go the distance.' },
  { emoji: '🖋️', role: 'The Still Path',  sub: 'They design a thinking space. Companions that hold their ground.' },
  { emoji: '📡', role: 'Content Monks',    sub: 'The camera sees the desk first. It must be worthy.' },
  { emoji: '📐', role: 'Apprentice Monks', sub: 'The discipline starts here. The HUD runs at every level.' },
]

export default async function HomePage() {
  const [featured, paths, posts] = await Promise.all([
    getFeaturedProducts(),
    getAllPaths(),
    getRecentJournalPosts(3),
  ])

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-32 pb-20 relative overflow-hidden bg-forest">
        <div className="absolute inset-0 bg-forest-radial pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'linear-gradient(rgba(196,148,60,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(196,148,60,0.04) 1px,transparent 1px)', backgroundSize:'52px 52px' }} />
        <div className="relative z-10 max-w-container mx-auto w-full">
          <h1 className="font-semibold leading-[1.02] tracking-[-0.025em] mb-8 max-w-2xl text-monk-white" style={{fontSize:'clamp(52px,7vw,96px)',lineHeight:'0.92',letterSpacing:'0.02em'}}>
            STRIP THE<br /><span className="text-gold">NOISE.</span><br />KEEP THE EDGE.
          </h1>
          <p className="text-body-lg text-monk-dim max-w-prose mb-12 font-light">
            This is the Hud. The Monk removed everything that didn&apos;t earn its place. What remained was quiet, precise, and enough. These are the Companions that survived.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/companions" className="inline-block bg-gold text-forest-dark text-micro tracking-widest px-8 py-4 font-medium hover:opacity-90 transition-opacity">Enter the Hud</Link>
            <Link href="/paths" className="inline-flex items-center gap-3 text-micro text-monk-dim tracking-widest hover:text-monk-white transition-colors">
              Find Your Setup
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
        <p className="absolute bottom-8 right-8 text-micro text-monk-faint tracking-widest">CANOPY · 28.61°N</p>
      </section>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-monk-border bg-forest-dark">
        {[{num:'16',label:'Companions'},{num:'7',label:'Categories'},{num:'2+',label:'Years of Curation'},{num:'4.9★',label:'Avg Curation Score'}].map(s => (
          <div key={s.label} className="px-8 py-6 border-r border-monk-border last:border-r-0 text-center">
            <div className="font-semibold text-gold mb-1" style={{fontSize:'42px',letterSpacing:'-0.02em',lineHeight:'1'}}>{s.num}</div>
            <div className="text-micro text-monk-faint tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>

      {/* MARQUEE */}
      <div className="overflow-hidden border-b border-monk-border bg-gold py-3.5">
        <div className="flex whitespace-nowrap" style={{animation:'marquee 24s linear infinite'}}>
          {[1,2].map(n => (
            <span key={n} className="flex items-center gap-10 px-10 text-forest-dark font-semibold" style={{fontSize:'18px',letterSpacing:'0.25em'}}>
              BUILT FOR THE HUD <span className="w-1.5 h-1.5 rounded-full bg-forest-dark opacity-40 inline-block" />
              THE MONK&apos;S COMPANIONS <span className="w-1.5 h-1.5 rounded-full bg-forest-dark opacity-40 inline-block" />
              FOCUS IS A PRACTICE <span className="w-1.5 h-1.5 rounded-full bg-forest-dark opacity-40 inline-block" />
              DISCIPLINE OVER DECORATION <span className="w-1.5 h-1.5 rounded-full bg-forest-dark opacity-40 inline-block" />
              QUIET YOUR DESK <span className="w-1.5 h-1.5 rounded-full bg-forest-dark opacity-40 inline-block" />
              EVERY COMPANION EARNS ITS PLACE <span className="w-1.5 h-1.5 rounded-full bg-forest-dark opacity-40 inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* SIX LAWS */}
      <section className="px-6 md:px-16 lg:px-24 py-section bg-forest border-b border-monk-border">
        <div className="max-w-container mx-auto">
          <div className="mb-16">
              <h2 className="text-h2 font-medium mb-6 text-monk-white">SIX LAWS OF<br />THE FOCUSED DESK</h2>
            <p className="text-body text-monk-dim font-light max-w-prose">The Monk removed what did not belong. What remained followed six laws. Every Companion in the Hud passes them.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-monk-border border border-monk-border">
            {SIX_LAWS.map(law => (
              <div key={law.num} className="bg-forest p-10 relative group hover:bg-forest-dark transition-colors">
                <div className="absolute top-0 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <p className="font-semibold text-gold opacity-20 mb-6 leading-none" style={{fontSize:'64px',letterSpacing:'-0.02em'}}>{law.num}</p>
                <h3 className="text-h3 font-medium mb-4 text-monk-white">{law.title}</h3>
                <p className="text-body text-monk-dim font-light leading-relaxed">{law.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOME COMPANIONS */}
      <section className="px-6 md:px-16 lg:px-24 py-section bg-forest-dark border-b border-monk-border">
        <div className="max-w-container mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
                  <h2 className="text-h2 font-medium text-monk-white">THE MONK&apos;S<br />COMPANIONS</h2>
            </div>
            <Link href="/companions" className="hidden md:block text-micro text-monk-dim tracking-widest hover:text-gold transition-colors">Meet All Companions →</Link>
          </div>
          {featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-monk-border border border-monk-border">
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="border border-monk-border p-16 text-center">
              <p className="text-micro text-monk-faint tracking-widest">The Companions are being gathered.</p>
            </div>
          )}
          <div className="mt-8 text-center md:hidden">
            <Link href="/companions" className="text-micro text-monk-dim tracking-widest hover:text-gold transition-colors">Meet All Companions →</Link>
          </div>
        </div>
      </section>

      {/* THREE PATHS */}
      <section className="px-6 md:px-16 lg:px-24 py-section bg-forest border-b border-monk-border">
        <div className="max-w-container mx-auto">
          <div className="mb-16">
              <h2 className="text-h2 font-medium text-monk-white mb-4">WHICH MONK<br />ARE YOU?</h2>
            <p className="text-body text-monk-dim font-light max-w-prose">The Hud takes a different shape for every practice. The path changes. The silence doesn&apos;t.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-monk-border border border-monk-border">
            {paths.map(path => <PathCard key={path.id} path={path} />)}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="px-6 md:px-16 lg:px-24 py-section bg-gold text-forest-dark relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="font-semibold opacity-[0.04] whitespace-nowrap select-none" style={{fontSize:'200px',letterSpacing:'0.1em'}}>MONK HUD</span>
        </div>
        <div className="max-w-container mx-auto text-center relative z-10">
          <h2 className="font-semibold leading-none mb-8" style={{fontSize:'clamp(44px,6vw,80px)',letterSpacing:'-0.02em',lineHeight:'1'}}>
            YOUR ENVIRONMENT<br />IS YOUR DISCIPLINE
          </h2>
          <p className="text-body-lg font-light max-w-2xl mx-auto mb-10 opacity-75">
            The Monk understood something most people don&apos;t: chaos is a choice. Every scattered cable, every wrong tool, every cluttered surface is a decision — to let the environment win. The HUD changes that. It overlays intention onto every inch of your desk. What you see is what you&apos;ve designed. What you&apos;ve designed is who you are.
          </p>
          <Link href="/companions" className="inline-block border border-forest-dark text-forest-dark text-micro tracking-widest px-8 py-4 font-medium hover:bg-forest-dark hover:text-gold transition-colors">
            Enter the Hud →
          </Link>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="px-6 md:px-16 lg:px-24 py-section bg-forest-dark border-t border-b border-monk-border">
        <div className="max-w-container mx-auto">
          <div className="mb-16">
              <h2 className="text-h2 font-medium text-monk-white">THE ORDER<br />OF MONKS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-px">
              {AUDIENCE.map(a => (
                <div key={a.role} className="flex items-center gap-5 px-6 py-5 border border-monk-border hover:border-gold/40 transition-colors group">
                  <span style={{fontSize:'28px'}} className="flex-shrink-0">{a.emoji}</span>
                  <div>
                    <div className="font-medium text-monk-white group-hover:text-gold transition-colors" style={{fontSize:'22px',letterSpacing:'0.05em'}}>{a.role}</div>
                    <div className="text-small text-monk-dim mt-1">{a.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-6">
              <blockquote className="font-semibold text-monk-white leading-tight" style={{fontSize:'clamp(32px,4vw,54px)',letterSpacing:'0.05em',lineHeight:'1.1'}}>
                &ldquo;DISCIPLINE<br />BUILDS THE<br /><span className="text-gold">ENVIRONMENT.&rdquo;</span>
              </blockquote>
              <p className="text-body text-monk-dim font-light leading-relaxed">
                The Monk doesn&apos;t wait for inspiration. He engineers the conditions that make it inevitable. Your desk is not a surface — it&apos;s a system. Design it that way.
              </p>
              <Link href="/companions" className="inline-block self-start bg-gold text-forest-dark text-micro tracking-widest px-8 py-4 font-medium hover:opacity-90 transition-opacity">
                Meet the Companions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      {posts.length > 0 && (
        <section className="px-6 md:px-16 lg:px-24 py-section bg-forest border-b border-monk-border">
          <div className="max-w-container mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                  <h2 className="text-h2 font-medium text-monk-white">Field notes.</h2>
              </div>
              <Link href="/journal" className="hidden md:block text-micro text-monk-dim tracking-widest hover:text-gold transition-colors">All field notes →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-monk-border border border-monk-border">
              {posts.map(post => <JournalCard key={post.id} post={post} />)}
            </div>
          </div>
        </section>
      )}

      <NewsletterSignup />
      <Footer />

      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </>
  )
}