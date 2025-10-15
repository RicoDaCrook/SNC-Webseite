import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Häufige Fragen zu KFZ-Gutachten Stuttgart | SNC Gutachter',
  description: 'Alle Antworten auf Ihre Fragen rund um KFZ-Gutachten in Stuttgart: Kosten, Ablauf, Dauer, Wertminderung, Ansprüche. 16 detaillierte FAQs von Experten beantwortet.',
  keywords: 'KFZ Gutachten FAQ, Gutachter Fragen, Unfallgutachten Kosten, Wertminderung Fragen, Gutachten Ablauf, KFZ Sachverständiger Fragen Stuttgart',
  openGraph: {
    title: 'FAQ - Häufige Fragen zu KFZ-Gutachten | SNC Gutachter Stuttgart',
    description: '16 häufig gestellte Fragen zu KFZ-Gutachten beantwortet: Kosten, Ablauf, Rechte, Wertminderung und mehr.',
    url: 'https://snc-svb.de/faq',
    type: 'website',
    images: [
      {
        url: '/images/snclogo.png',
        width: 1200,
        height: 630,
        alt: 'SNC Gutachter Stuttgart - FAQ KFZ-Gutachten',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Häufige Fragen zu KFZ-Gutachten Stuttgart',
    description: 'Alle Antworten zu KFZ-Gutachten: Kosten, Ablauf, Wertminderung und mehr.',
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
