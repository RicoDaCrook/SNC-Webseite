import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SNC - Unabhängige KFZ-Gutachten Stuttgart | Öffentlich bestellt & vereidigt',
  description: 'Unabhängige KFZ-Unfallgutachten in Stuttgart und Umgebung. Öffentlich bestellt & vereidigt. 24h Reaktion, 48h Gutachten. Durchschnittlich €2.500 mehr als Versicherungs-Gutachter.',
  keywords: 'KFZ Gutachter Stuttgart, Unfallgutachten, Schadensgutachten, öffentlich bestellt, vereidigt, Wertminderung, Nutzungsausfall',
  openGraph: {
    title: 'SNC - Unabhängige KFZ-Gutachten Stuttgart',
    description: 'Öffentlich bestellt & vereidigt. 24h Reaktion, 48h Gutachten.',
    url: 'https://snc-svb.de',
    siteName: 'SNC Gutachter',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
