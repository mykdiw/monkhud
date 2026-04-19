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
        forest: {
          DEFAULT: '#1E3828',   // Option B — dappled forest light
          dark:    '#172D1F',   // darker — sections, footers
          deep:    '#111F16',   // deepest — overlays
        },
        gold: {
          DEFAULT: '#C4943C',   // saffron — monk's robe in the clearing
          muted:   'rgba(196,148,60,0.2)',
        },
        monk: {
          white:   '#EDE8DC',               // weathered stone white
          dim:     'rgba(237,232,220,0.60)',
          faint:   'rgba(237,232,220,0.40)',
          border:  'rgba(196,148,60,0.18)',
          error:   '#B45032',               // terracotta — clay brick
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
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
        'forest-radial': 'radial-gradient(ellipse at 70% 30%, rgba(196,148,60,0.07) 0%, transparent 60%)',
      },
    },
  },
  plugins: [],
}

export default config