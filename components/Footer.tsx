import Link from 'next/link'

const LINKS = [
  { href: '/companions', label: 'Companions' },
  { href: '/paths',      label: 'Paths' },
  { href: '/journal',    label: 'Journal' },
  { href: '/origin',     label: 'Origin' },
  { href: '/privacy',    label: 'Privacy' },
  { href: '/terms',      label: 'Terms' },
  { href: '/returns',    label: 'Returns' },
  { href: 'mailto:support@monkhud.com', label: 'Support' },
]

export function Footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 py-12 border-t border-monk-border flex flex-col md:flex-row items-center justify-between gap-6">
      <Link href="/" className="font-semibold tracking-wider text-monk-white"
            style={{ fontSize: '20px', letterSpacing: '0.15em' }}>
        MONK<span className="text-gold"> HUD</span>
      </Link>

      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {LINKS.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-micro text-monk-faint tracking-widest hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <p className="text-micro text-monk-faint tracking-widest">
        © {new Date().getFullYear()} Monk Hud
      </p>
    </footer>
  )
}
