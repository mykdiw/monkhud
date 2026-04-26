import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/lib/cart'
import { CartDrawer } from '@/components/CartDrawer'
import { CookieBanner } from '@/components/CookieBanner'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Monk Hud — Design Your Focus Environment | Workspace Gear India',
    template: '%s | Monk Hud',
  },
  description:
    'The Monk stripped the desk to its essentials — what remained was pure power. Curated Companions for creators, builders, and those who treat their environment as a discipline. Free shipping over ₹5,000.',
  metadataBase: new URL('https://monkhud.com'),
  openGraph: {
    type: 'website',
    siteName: 'Monk Hud',
    locale: 'en_IN',
    url: 'https://monkhud.com',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@monkhud',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-forest text-monk-white antialiased">
        <CartProvider>
          {children}
          <CartDrawer />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  )
}
