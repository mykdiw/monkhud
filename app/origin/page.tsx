import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Origin',
  description: 'How the Hud was built. One doctrine. A relentless stripping away of everything that did not earn its place.',
}

const LAWS = [
  {
    num: '01',
    title: 'Nothing unnecessary.',
    body: 'The Monk removed what did not belong. What remained is enough.',
  },
  {
    num: '02',
    title: 'The Hud never lies.',
    body: 'Real specs. Earned ratings. Honest descriptions. Every Companion performs exactly as described.',
  },
  {
    num: '03',
    title: 'The practice does not wait.',
    body: 'Discipline means zero wasted time. When you decide to improve your environment, every hour of delay costs you.',
  },
  {
    num: '04',
    title: 'The oath of two years.',
    body: 'Every Companion ships with a two-year oath. If it breaks under honest use, it is replaced. The practice continues.',
  },
  {
    num: '05',
    title: 'The complete path.',
    body: 'The Monk does not build the clearing piece by piece over years. He composes it completely. Mix, match, bundle — save when you gather the full path.',
  },
  {
    num: '06',
    title: 'The Order comes first.',
    body: 'The community of Monks is not a marketing channel. Every drop starts with a signal from the Order. They shape what gets built next.',
  },
]

const TIMELINE = [
  {
    year: '2021',
    title: 'The idea starts in a clearing.',
    body: 'A Google Doc and a shared conviction: your environment is not decoration. It is infrastructure. Monk Hud began as a document about stripping a desk to its essentials.',
    tag: 'Founding',
  },
  {
    year: '2022',
    title: 'The first disciples.',
    body: 'Launched with a small set of Companions and no advertising. Word travelled desk to desk. The Order forms.',
    tag: 'First Launch',
  },
  {
    year: '2023',
    title: 'The three paths are defined.',
    body: 'The community told us what they needed — not products, but answers. The Quick, Still, and Long paths became three complete systems. Not shopping lists. Doctrines.',
    tag: 'The Three Paths',
  },
  {
    year: '2024',
    title: 'The Companions arrive.',
    body: '16 Companions. 7 categories. Each one tested, challenged, and approved before earning a place in the Hud. No padding. No compromise.',
    tag: 'Monk Hud Launches',
  },
  {
    year: '2025',
    title: 'The clearing expands.',
    body: 'More Companions. More Monks. The Order decides what gets built next. The Monk no longer curates alone.',
    tag: 'What\'s Next',
  },
]

export default function OriginPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <div className="bg-forest-dark border-b border-monk-border pt-32 pb-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-container mx-auto max-w-2xl">
          <p className="text-micro text-gold tracking-widest mb-4">// The Origin</p>
          <h1 className="font-semibold leading-tight mb-6"
              style={{ fontSize: 'clamp(44px,5vw,64px)', letterSpacing: '-0.02em', lineHeight: '1.02' }}>
            How the Hud<br />was built.
          </h1>
          <p className="text-body text-monk-dim font-light leading-relaxed">
            Four years. One doctrine. A relentless stripping away of everything that
            didn&apos;t earn its place. This is how Monk Hud became what it is.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <section className="px-6 md:px-16 lg:px-24 py-section border-b border-monk-border">
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-micro text-gold tracking-widest mb-4">// The Monk&apos;s Path</p>
            <h2 className="text-h2 font-medium mb-8">The story so far.</h2>
            <div className="border border-monk-border p-8 bg-forest-dark">
              <p className="text-micro text-gold tracking-widest mb-3">// The Monk&apos;s North Star</p>
              <p className="font-semibold leading-tight mb-4"
                 style={{ fontSize: '28px', letterSpacing: '-0.01em', lineHeight: '1.1' }}>
                &ldquo;Discipline builds<br />the environment.&rdquo;
              </p>
              <p className="text-small text-monk-dim font-light leading-relaxed">
                This is the belief the Hud was built on. It still drives every Companion chosen,
                every system designed, every order shipped.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-0">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-6 pb-10 relative">
                <div className="flex flex-col items-center">
                  <div className="w-px bg-monk-border flex-1 mb-2 mt-6" />
                  <div className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
                  {i < TIMELINE.length - 1 && <div className="w-px bg-monk-border flex-1 mt-2" />}
                </div>
                <div className="pb-2">
                  <p className="text-micro text-gold tracking-widest mb-1">{item.year}</p>
                  <h3 className="text-h3 font-medium mb-2">{item.title}</h3>
                  <p className="text-small text-monk-dim font-light leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Six Laws */}
      <section className="px-6 md:px-16 lg:px-24 py-section border-b border-monk-border bg-forest-dark">
        <div className="max-w-container mx-auto">
          <p className="text-micro text-gold tracking-widest mb-4">// The Monk&apos;s Laws</p>
          <h2 className="text-h2 font-medium mb-16">Six laws of the focused desk.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-monk-border border border-monk-border">
            {LAWS.map(law => (
              <div key={law.num} className="bg-forest p-10">
                <p className="font-semibold text-gold opacity-20 mb-6"
                   style={{ fontSize: '56px', letterSpacing: '-0.02em', lineHeight: '1' }}>
                  {law.num}
                </p>
                <h3 className="text-h3 font-medium mb-4">{law.title}</h3>
                <p className="text-body text-monk-dim font-light leading-relaxed">{law.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="px-6 md:px-16 lg:px-24 py-section border-b border-monk-border">
        <div className="max-w-container mx-auto">
          <p className="text-micro text-gold tracking-widest mb-4">// The Monk</p>
          <div className="border border-monk-border p-12 text-center max-w-xl mx-auto">
            <p className="text-body text-monk-dim font-light leading-relaxed">
              The people behind Monk Hud prefer to let the Companions speak first.
              Introductions to follow.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 lg:px-24 py-section bg-forest-dark border-b border-monk-border text-center">
        <div className="max-w-container mx-auto">
          <h2 className="text-h2 font-medium mb-4">
            The Hud is <span className="text-gold">open.</span>
          </h2>
          <p className="text-body text-monk-dim font-light max-w-prose mx-auto mb-10">
            The Monk built his clearing with intent. Now it is your turn.
            Choose your path, gather your Companions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/paths" className="inline-block bg-gold text-forest-dark text-micro tracking-widest px-8 py-4 font-medium hover:opacity-90 transition-opacity">
              Choose Your Path
            </a>
            <a href="/companions" className="inline-flex items-center gap-3 text-micro text-monk-dim tracking-widest hover:text-gold transition-colors">
              Meet the Companions →
            </a>
          </div>
        </div>
      </section>

      <NewsletterSignup />
      <Footer />
    </>
  )
}
