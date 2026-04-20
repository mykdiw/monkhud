import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Origin',
  description: "The Monk existed before the brand. He stripped his desk down to nothing — then rebuilt it with total intention.",
}

const TIMELINE = [
  { year: '2021', title: 'The Idea Starts in a Bedroom', body: "Two builders — a competitive gamer who kept losing to gear, and a designer who kept losing focus to clutter. They compared desks. Both were wrong. So they stripped everything, rebuilt from zero, and documented what worked. That document became the philosophy. The philosophy became Monk Hud. It started as a Google Doc and a shared conviction: your environment is not decoration. It's infrastructure.", tag: '🚀 Founding' },
  { year: '2022', title: 'The First Disciples.', body: "We launched with 8 products and no advertising. Word travelled through Discord servers and setup communities — the Monk's philosophy spread person to person, desk to desk. Within 3 months we'd shipped to 6 countries. Every drop since has started with a community signal. The Order shapes what gets built.", tag: '📦 First Launch' },
  { year: '2023', title: 'The Three Paths Are Defined.', body: 'The community told us what they really needed — not products, but answers. So the Monk defined three paths: Quick, Still, Long. Three complete systems, each built to work as one. Not a shopping list — a doctrine. A practice, complete.', tag: '🦅 The Three Paths' },
  { year: '2024', title: 'The Companions Arrive.', body: "16 Companions. 7 categories. Each one tested, challenged, and approved by the Monk before it earned a place in the Hud. No padding the catalogue. No compromising on spec. The standard is set from the first day — if it doesn't serve the practice, it doesn't ship.", tag: '⚡ Monk Hud Launches' },
  { year: '2025', title: 'The HUD Grows. The Order Builds.', body: "The clearing expands — but only when something earns it. More Companions. More Monks. The Order is the community of builders who share setups, challenge each other's choices, and decide what gets tested next. The Monk no longer curates alone.", tag: '🌍 What\'s Next' },
]

const VALUES = [
  { icon: '🔬', title: 'Ruthless Curation',            body: "The Monk doesn't hoard. Every Companion was tested, questioned, and made to justify its existence. We carry what earned its place — nothing more. If it doesn't make the practice cleaner, it doesn't exist here." },
  { icon: '👁️', title: 'The HUD Never Distorts',       body: "The HUD shows only truth. Real specs. Earned ratings. Honest descriptions. We don't inflate numbers, fake reviews, or sell the fantasy of gear. We sell the gear itself — and it performs exactly as the HUD says it will." },
  { icon: '⚡', title: 'Function Before Form',          body: 'The Monk does not decorate. He equips. Aesthetic is important — but only after function is locked. Every product here must perform first. The fact that it also looks exceptional is the standard, not the selling point.' },
  { icon: '🧠', title: 'Design Is Thinking Made Physical', body: "The Monk's desk is not styled — it's engineered. Every product placement, every cable run, every surface cleared is a thought made physical. We help people think like architects about the space where they do their best work." },
  { icon: '🤝', title: 'The Order Comes First',         body: "The community of Monks is not a marketing channel. It's the source. Every drop starts with a community signal. Every product gets voted on. Every feature gets suggested by someone who lives at their desk. They shape what gets built next." },
  { icon: '🌱', title: 'The HUD Runs at Every Level',   body: "A student's desk deserves the same intention as a studio's. We build products and bundles across every budget — because the discipline of the Monk doesn't require spending a fortune. It requires spending with purpose." },
]

export default function OriginPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <div className="bg-forest-dark border-b border-monk-border pt-32 pb-20 px-6 md:px-16 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'linear-gradient(rgba(196,148,60,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(196,148,60,0.04) 1px,transparent 1px)', backgroundSize:'50px 50px', opacity:0.5 }} />
        <div className="max-w-container mx-auto relative z-10">
          <h1 className="font-semibold mb-8 text-monk-white" style={{fontSize:'clamp(52px,7vw,96px)',letterSpacing:'0.02em',lineHeight:'0.92'}}>
            THE MONK<br />EXISTED<br />BEFORE<br /><em className="text-gold not-italic">THE BRAND.</em>
          </h1>
          <p className="text-body-lg text-monk-dim font-light max-w-prose mb-10">
            He&apos;s not a mascot. He&apos;s a mindset. The Monk stripped his desk down to nothing — then rebuilt it with total intention. Every object had to earn its place. What remained was the most powerful workspace he&apos;d ever used. Monk Hud was built to give everyone access to that same clarity.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/companions" className="inline-block bg-gold text-forest-dark text-micro tracking-widest px-8 py-4 font-medium hover:opacity-90 transition-opacity">Enter the Hud</Link>
            <Link href="/paths" className="inline-flex items-center gap-3 text-micro text-monk-dim tracking-widest hover:text-monk-white transition-colors">
              Find Your Path
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="px-6 md:px-16 lg:px-24 py-section bg-forest border-b border-monk-border">
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
              <h2 className="text-h2 font-medium text-monk-white mb-0">YOUR DESK IS<br />A DECISION<br />YOU MAKE DAILY.</h2>
          </div>
          <p className="text-body-lg text-monk-dim font-light leading-relaxed">
            The Monk HUD is not about aesthetics. It&apos;s about architecture. Your environment shapes how you think, how long you focus, how much you create, and how far you go. A chaotic desk is a tax on your output — one you pay every single day. The HUD removes that tax.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-monk-border bg-forest-dark">
        {[
          { num: '2021', label: 'The HUD Activates',   sub: "Started in a bedroom. The Monk's doctrine now ships globally." },
          { num: '16',   label: 'Companions',           sub: 'Each one tested. Each one earning its place or getting cut.' },
          { num: '1',    label: 'Shared Doctrine',      sub: "One philosophy. Strip what doesn't serve. Keep what does." },
        ].map(s => (
          <div key={s.label} className="px-10 py-8 border-r border-monk-border last:border-r-0">
            <div className="font-semibold text-gold mb-2" style={{fontSize:'48px',letterSpacing:'-0.02em',lineHeight:'1'}}>{s.num}</div>
            <div className="text-micro text-monk-white tracking-widest mb-2">{s.label}</div>
            <div className="text-small text-monk-dim font-light">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <section className="px-6 md:px-16 lg:px-24 py-section border-b border-monk-border bg-forest">
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
              <h2 className="text-h2 font-medium text-monk-white mb-8">HOW THE HUD<br />WAS BUILT.</h2>
            <p className="text-body text-monk-dim font-light leading-relaxed mb-8">
              Four years. One doctrine. A relentless stripping away of everything that didn&apos;t earn its place. This is how Monk Hud became what it is.
            </p>
            <div className="border border-monk-border p-8 bg-forest-dark">
              <p className="font-semibold text-monk-white mb-4" style={{fontSize:'28px',letterSpacing:'0.02em',lineHeight:'1.1'}}>
                &ldquo;DISCIPLINE<br />BUILDS THE<br />ENVIRONMENT.&rdquo;
              </p>
              <p className="text-small text-monk-dim font-light leading-relaxed">
                This is the belief the HUD was built on. It still drives every product we choose, every system we design, every order we ship.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-0">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-6 pb-10 relative">
                <div className="flex flex-col items-center">
                  <div className="w-px bg-monk-border flex-1 mb-2 mt-1" style={{minHeight:'20px'}} />
                  <div className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
                  {i < TIMELINE.length - 1 && <div className="w-px bg-monk-border flex-1 mt-2" />}
                </div>
                <div className="pb-2">
                  <p className="text-micro text-gold tracking-widest mb-1">{item.year}</p>
                  <h3 className="text-h3 font-medium text-monk-white mb-2">{item.title}</h3>
                  <p className="text-small text-monk-dim font-light leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-16 lg:px-24 py-section border-b border-monk-border bg-forest-dark">
        <div className="max-w-container mx-auto">
          <h2 className="text-h2 font-medium text-monk-white mb-16">THE CODE<br />UNDER THE<br />HOOD.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-monk-border border border-monk-border">
            {VALUES.map(v => (
              <div key={v.title} className="bg-forest-dark p-10 hover:bg-forest transition-colors">
                <span style={{fontSize:'28px'}} className="block mb-6">{v.icon}</span>
                <h3 className="text-h3 font-medium text-monk-white mb-4">{v.title}</h3>
                <p className="text-body text-monk-dim font-light leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 md:px-16 lg:px-24 py-section border-b border-monk-border bg-forest-dark">
        <div className="max-w-container mx-auto">
          <h2 className="text-h2 font-medium text-monk-white mb-16">
            Those who<br />unlocked the gate.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-monk-border border border-monk-border">

            {/* Visual */}
            <div className="bg-forest flex flex-col items-center justify-center py-16 px-8 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at 50% 30%, rgba(196,148,60,0.06) 0%, transparent 65%)'}} />

              {/* Avatar halo */}
              <div className="relative flex items-center justify-center mb-8" style={{width:'120px',height:'120px'}}>
                <div className="absolute inset-0 rounded-full" style={{border:'0.5px solid rgba(196,148,60,0.2)'}} />
                <div className="absolute rounded-full" style={{inset:'10px',border:'0.5px solid rgba(196,148,60,0.12)'}} />
                <div className="absolute rounded-full" style={{inset:'22px',border:'0.5px solid rgba(196,148,60,0.07)'}} />
                <div className="flex items-center justify-center rounded-full z-10" style={{width:'68px',height:'68px',background:'#172D1F',border:'0.5px solid rgba(196,148,60,0.25)'}}>
                  <span className="text-gold font-medium tracking-widest" style={{fontSize:'16px',letterSpacing:'0.1em'}}>MD</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-5 bg-gold opacity-60" />
                <p className="text-micro text-gold tracking-widest" style={{fontSize:'9px'}}>ORACLE · FOUNDER</p>
                <div className="h-px w-5 bg-gold opacity-60" />
              </div>
              <h3 className="text-h3 font-medium text-monk-white text-center mb-1">Mayank Dwivedi</h3>
              <p className="text-small text-monk-dim italic text-center">The one who unlocked the gate</p>
            </div>

            {/* Text */}
            <div className="bg-forest p-10 flex flex-col justify-between">
              <div>
                <p className="text-body-lg text-gold font-light italic leading-relaxed mb-6">
                  An inventor since before he knew the word. The kind of person who looks at an object and immediately sees what it could be instead.
                </p>
                <p className="text-body text-monk-dim font-light leading-relaxed mb-4">
                  He spent years building things for himself — quietly, without announcement. Tools that didn't exist. Setups that solved problems nobody had named yet. Each one made with a single question: what would make this work the way it should?
                </p>
                <p className="text-body text-monk-dim font-light leading-relaxed mb-8">
                  Monk Hud is the answer to that question at scale. Not a product catalogue. A philosophy of function — built by someone who has always believed that the right object in the right place changes how a person thinks.
                </p>
                <div className="border-l border-monk-border pl-6">
                  <p className="text-body text-gold font-light italic leading-relaxed">
                    &ldquo;I did not build this for the ones who are already certain. I built it for the ones who are almost there.&rdquo;
                  </p>
                  <p className="text-micro text-monk-faint tracking-widest mt-3">— MAYANK DWIVEDI</p>
                </div>
              </div>
            </div>

          </div>

          <p className="text-center text-small text-monk-faint italic mt-10">
            More Companions will be introduced when the time is right.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 lg:px-24 py-section bg-forest-dark border-b border-monk-border text-center">
        <div className="max-w-container mx-auto">
          <h2 className="text-h2 font-medium text-monk-white mb-4">
            THE HUD IS <span className="text-gold">OPEN.</span>
          </h2>
          <p className="text-body text-monk-dim font-light max-w-prose mx-auto mb-10">
            The Monk built his clearing with intent. Now it is your turn. Choose your path, gather your Companions, and join the Order of builders who treat their workspace as a practice — not a decoration.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/paths" className="inline-block bg-gold text-forest-dark text-micro tracking-widest px-8 py-4 font-medium hover:opacity-90 transition-opacity">Choose Your Path</Link>
            <Link href="/companions" className="inline-flex items-center gap-3 text-micro text-monk-dim tracking-widest hover:text-gold transition-colors">Meet the Companions →</Link>
          </div>
        </div>
      </section>

      <NewsletterSignup />
      <Footer />
    </>
  )
}