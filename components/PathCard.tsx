import Link from 'next/link'
import type { Path } from '@/lib/types'

interface Props {
  path: Path
}

export function PathCard({ path }: Props) {
  return (
    <Link
      href={`/paths#${path.slug}`}
      className="group relative bg-forest p-10 flex flex-col gap-4 hover:bg-forest-dark transition-colors"
    >
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

      <span className="text-4xl">{path.archetype_emoji}</span>

      <div>
        <p className="text-micro text-gold tracking-widest mb-2">{path.name}</p>
        <h3 className="text-h3 font-medium mb-3">{path.subtitle}</h3>
        <p className="text-small text-monk-dim font-light leading-relaxed">{path.description}</p>
      </div>

      <p className="text-micro text-monk-faint tracking-widest mt-auto group-hover:text-gold transition-colors">
        {path.product_ids.length} Companions →
      </p>
    </Link>
  )
}
