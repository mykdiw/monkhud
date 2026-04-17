import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Monk Hud design tokens
        forest: {
          DEFAULT: '#0F2A1D',   // primary background
          dark:    '#0A1F16',   // darker — overlays, footers
        },
        gold: {
          DEFAULT: '#8C7A4F',   // accent — use sparingly (max 2x per viewport)
          muted:   'rgba(140, 122, 79, 0.2)', // borders / dividers
        },
        monk: {
          white:   '#F0EFEA',               // text primary
          dim:     'rgba(228,228,220,0.65)', // text secondary
          faint:   'rgba(228,228,220,0.45)', // text tertiary
          border:  'rgba(140,122,79,0.2)',   // borders
          error:   '#C2705C',               // earth red — stock warnings only
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Monk Hud type scale
        'hero':   ['clamp(52px,5vw,64px)', { lineHeight: '1.02', letterSpacing: '-0.025em', fontWeight: '600' }],
        'h2':     ['clamp(36px,4vw,44px)', { lineHeight: '1.1',  letterSpacing: '-0.015em', fontWeight: '500' }],
        'h3':     ['24px',                 { lineHeight: '1.2',  fontWeight: '500' }],
        'body-lg':['17px',                 { lineHeight: '1.65', fontWeight: '400' }],
        'body':   ['15px',                 { lineHeight: '1.65', fontWeight: '400' }],
        'small':  ['13px',                 { lineHeight: '1.5',  fontWeight: '400' }],
        'micro':  ['11px',                 { lineHeight: '1',    letterSpacing: '0.25em', fontWeight: '500' }],
      },
      spacing: {
        'section': '120px',
        'section-mobile': '80px',
      },
      maxWidth: {
        'container': '1280px',
        'prose':     '540px',
      },
      backgroundImage: {
        'forest-radial': 'radial-gradient(ellipse at 30% 20%, rgba(140,122,79,0.06) 0%, transparent 60%)',
      },
    },
  },
  plugins: [],
}

export default config
