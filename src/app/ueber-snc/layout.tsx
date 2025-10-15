import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über SNC - Ilker Sancar | KFZ Gutachter Stuttgart öffentlich bestellt',
  description: '300+ Gutachten in wenigen Monaten! Ilker Sancar - öffentlich bestellt & vereidigt. Erfahren Sie mehr über SNC Gutachter, unsere Mission und warum Kunden uns empfehlen.',
  keywords: 'Ilker Sancar, SNC Gutachter, KFZ Sachverständiger Stuttgart, öffentlich bestellt vereidigt, unabhängiger Gutachter, Erfolgsgeschichte, über uns',
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
    description: '300+ zufriedene Kunden. Öffentlich bestellt & vereidigt.',
  },
}

export default function UeberSNCLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
