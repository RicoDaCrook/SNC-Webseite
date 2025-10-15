import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://snc-svb.de/ueber-snc',
  },
  title: 'Über SNC - Ilker Sancar | Unabhängiger KFZ Gutachter Stuttgart',
  description: '300+ Gutachten in wenigen Monaten! Ilker Sancar - Ihr unabhängiger Gutachter. Erfahren Sie mehr über SNC Gutachter, unsere Mission und warum Kunden uns empfehlen.',
  keywords: 'Ilker Sancar, SNC Gutachter, KFZ Sachverständiger Stuttgart, unabhängiger Gutachter, Erfolgsgeschichte, über uns',
  openGraph: {
    title: 'Über SNC - Ilker Sancar | KFZ Gutachter Stuttgart',
    description: '300+ zufriedene Kunden in Rekordzeit. Erfahren Sie, warum jeder 3. Kunde durch Empfehlung zu uns kommt.',
    url: 'https://snc-svb.de/ueber-snc',
    type: 'profile',
    images: [
      {
        url: '/images/sncportrait.png',
        width: 1200,
        height: 630,
        alt: 'Ilker Sancar - SNC Gutachter Stuttgart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Über SNC - Ilker Sancar | KFZ Gutachter Stuttgart',
    description: '300+ zufriedene Kunden. Ihr unabhängiger Gutachter.',
  },
}

export default function UeberSNCLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
