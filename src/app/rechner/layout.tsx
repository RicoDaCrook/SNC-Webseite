import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wertminderungsrechner KFZ - Kostenlos berechnen | SNC Gutachter Stuttgart',
  description: 'Berechnen Sie kostenlos die Wertminderung nach Ihrem Unfall. Vergleich: Versicherungs-Gutachter vs. unabhängiger Gutachter. Bis zu €2.500 mehr Entschädigung!',
  keywords: 'Wertminderung berechnen, Wertminderungsrechner, KFZ Wertminderung Stuttgart, Unfallschaden berechnen, Schadenrechner, merkantile Wertminderung',
  openGraph: {
    title: 'Wertminderungsrechner KFZ - Kostenlos berechnen | SNC Gutachter',
    description: 'Kostenloser Rechner: Ermitteln Sie sofort Ihre Wertminderung. Vergleichen Sie Versicherungs-Gutachter vs. unabhängiger Gutachter.',
    url: 'https://snc-svb.de/rechner',
    type: 'website',
    images: [
      {
        url: '/images/snclogo.png',
        width: 1200,
        height: 630,
        alt: 'SNC Wertminderungsrechner - Kostenlos berechnen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wertminderungsrechner KFZ - Kostenlos berechnen',
    description: 'Ermitteln Sie sofort Ihre Wertminderung nach einem Unfall. Bis zu €2.500 mehr!',
  },
}

export default function RechnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
