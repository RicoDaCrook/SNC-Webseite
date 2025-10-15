import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://snc-svb.de/impressum',
  },
  title: 'Impressum | SNC Gutachter Stuttgart',
  description: 'Impressum und Kontaktdaten von SNC Gutachter - Ilker Sancar, KFZ-Sachverständiger in Stuttgart. Öffentlich bestellt und vereidigt.',
  keywords: 'Impressum, SNC Gutachter, Kontaktdaten, Ilker Sancar, Stuttgart',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Impressum | SNC Gutachter Stuttgart',
    description: 'Impressum und Kontaktdaten von SNC Gutachter Stuttgart',
    url: 'https://snc-svb.de/impressum',
    type: 'website',
  },
}

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
