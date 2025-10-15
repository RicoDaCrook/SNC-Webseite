import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import LayoutClient from '@/components/LayoutClient'
import { LocalBusinessSchema, OrganizationSchema } from '@/components/SchemaMarkup'
import { WebVitals, PerformanceMonitor } from './web-vitals'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffff47',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://snc-svb.de'),
  title: 'KFZ Gutachter Stuttgart - Unabhängig & Schnell | SNC Gutachter',
  description: 'Unabhängige KFZ-Gutachten in Stuttgart. Öffentlich bestellt & vereidigt. 24h vor Ort, 48h Gutachten fertig. Über 300 zufriedene Kunden. Jetzt kostenlos anrufen!',
  keywords: 'KFZ Gutachter Stuttgart, Unfallgutachten Stuttgart, Schadensgutachten, Wertgutachten, öffentlich bestellt vereidigt, Wertminderung, Nutzungsausfall, Gutachter Stuttgart',
  authors: [{ name: 'Ilker Sancar - SNC Gutachter' }],
  openGraph: {
    title: 'KFZ Gutachter Stuttgart - Unabhängig & Schnell | SNC Gutachter',
    description: 'Öffentlich bestellt & vereidigt. 24h vor Ort, 48h Gutachten fertig. Jetzt kostenlos anrufen: 0152 09423739',
    url: 'https://snc-svb.de',
    siteName: 'SNC Gutachter Stuttgart',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/images/snclogo.png',
        width: 1200,
        height: 630,
        alt: 'SNC Gutachter Stuttgart - Unabhängige KFZ-Gutachten',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KFZ Gutachter Stuttgart - Unabhängig & Schnell',
    description: 'Öffentlich bestellt & vereidigt. 24h vor Ort, 48h Gutachten fertig.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  formatDetection: {
    telephone: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        <LocalBusinessSchema />
        <OrganizationSchema />
      </head>
      <body className={inter.className}>
        <WebVitals />
        <PerformanceMonitor />
        <LayoutClient>
          {children}
        </LayoutClient>
        <Footer />
      </body>
    </html>
  )
}
