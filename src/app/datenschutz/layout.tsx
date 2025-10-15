import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://snc-svb.de/datenschutz',
  },
  title: 'Datenschutzerklärung | SNC Gutachter Stuttgart',
  description: 'Datenschutzerklärung von SNC Gutachter Stuttgart. Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO.',
  keywords: 'Datenschutz, Datenschutzerklärung, DSGVO, SNC Gutachter, Datenschutz Stuttgart',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Datenschutzerklärung | SNC Gutachter Stuttgart',
    description: 'Datenschutzerklärung von SNC Gutachter Stuttgart gemäß DSGVO',
    url: 'https://snc-svb.de/datenschutz',
    type: 'website',
  },
}

export default function DatenschutzLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
