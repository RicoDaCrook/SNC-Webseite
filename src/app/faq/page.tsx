'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Phone, MessageCircle, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { FAQPageSchema, BreadcrumbSchema } from '@/components/SchemaMarkup'

const FAQ_DATA = [
  {
    question: 'Was kostet ein KFZ-Gutachten in Stuttgart?',
    answer: 'Die Kosten für ein KFZ-Gutachten in Stuttgart variieren je nach Schadensumfang und Fahrzeugtyp. Als Geschädigter zahlen Sie nichts - die gegnerische Versicherung übernimmt alle Kosten für das Gutachten. Bei Haftpflichtschäden ist das Gutachten für Sie völlig kostenlos. Ein Unfallgutachten kostet in der Regel zwischen 500€ und 1.200€, wobei dieser Betrag direkt mit der Versicherung abgerechnet wird. Bei SNC Gutachter erstellen wir Ihr Gutachten bereits innerhalb von 48 Stunden und garantieren die Akzeptanz bei allen Versicherungen in Stuttgart und Umgebung.'
  },
  {
    question: 'Wie lange dauert die Gutachten-Erstellung in Stuttgart?',
    answer: 'Bei SNC Gutachter in Stuttgart erhalten Sie Ihr fertiges KFZ-Gutachten innerhalb von 48 Stunden nach der Besichtigung. Der Ablauf ist einfach: Nach Ihrer Kontaktaufnahme vereinbaren wir innerhalb von 24 Stunden einen Termin. Die Fahrzeugbesichtigung dauert etwa 30-45 Minuten und kann bei Ihnen vor Ort, in der Werkstatt oder bei uns durchgeführt werden. Anschließend erstellen wir das detaillierte Gutachten mit Fotos, Schadensanalyse und Wertberechnung. In dringenden Fällen ist auch eine Express-Bearbeitung innerhalb von 24 Stunden möglich. Unser Service umfasst Stuttgart, Esslingen, Ludwigsburg und alle umliegenden Städte.'
  },
  {
    question: 'Bin ich als Geschädigter zur Wahl des Gutachters frei?',
    answer: 'Ja, absolut! Als Geschädigter haben Sie das freie Wahlrecht bei der Auswahl Ihres KFZ-Gutachters - dies ist gesetzlich verankert. Die gegnerische Versicherung darf Ihnen keinen bestimmten Gutachter vorschreiben. Sie haben das Recht, einen unabhängigen Sachverständigen wie SNC Gutachter in Stuttgart zu beauftragen. Viele Versicherungen versuchen, ihre eigenen Gutachter zu empfehlen - doch diese sind nicht in Ihrem Interesse tätig. Ein unabhängiger Gutachter wie wir ermittelt durchschnittlich 2.500€ mehr Entschädigung als Versicherungsgutachter. Nutzen Sie Ihr Wahlrecht und profitieren Sie von einer objektiven Begutachtung in Stuttgart.'
  },
  {
    question: 'Was ist der Unterschied zwischen Wertgutachten und Unfallgutachten?',
    answer: 'Ein Unfallgutachten wird nach einem Verkehrsunfall erstellt und dokumentiert alle Schäden am Fahrzeug, berechnet die Reparaturkosten, die Wertminderung und stellt fest, ob ein wirtschaftlicher Totalschaden vorliegt. Es dient als Grundlage für die Schadensregulierung mit der Versicherung. Ein Wertgutachten hingegen ermittelt den aktuellen Marktwert Ihres Fahrzeugs zum Bewertungszeitpunkt und wird benötigt beim Fahrzeugkauf/-verkauf, für Finanzierungen, bei Scheidungen oder Erbschaften. Bei SNC Gutachter in Stuttgart erstellen wir beide Gutachtenarten professionell und zuverlässig. Als unabhängiger Sachverständiger garantieren wir höchste Qualität und Akzeptanz bei allen Behörden und Versicherungen.'
  },
  {
    question: 'Wie berechnet sich die Wertminderung nach einem Unfall in Stuttgart?',
    answer: 'Die Wertminderung ist der Betrag, um den Ihr Fahrzeug nach einem Unfall weniger wert ist - selbst nach fachgerechter Reparatur. Die Berechnung erfolgt nach der Ruhkopf/Sahlen-Formel und berücksichtigt Faktoren wie: Fahrzeugalter (je neuer, desto höher), Kilometerstand, Schadenshöhe, Fahrzeugwert und Schadensart. Ein Fahrzeug, das erst 1-2 Jahre alt ist, kann eine Wertminderung von bis zu 25% der Reparaturkosten haben. Bei einem Schaden von 5.000€ Reparaturkosten können so zusätzlich 1.000-2.500€ Wertminderung geltend gemacht werden. In Stuttgart und Umgebung berechnen wir bei SNC Gutachter die exakte Wertminderung nach den neuesten rechtlichen Standards und holen für Sie das Maximum heraus.'
  },
  {
    question: 'Welche Unterlagen brauche ich für ein KFZ-Gutachten?',
    answer: 'Für die Erstellung eines KFZ-Gutachtens in Stuttgart benötigen Sie folgende Unterlagen: Fahrzeugschein (Zulassungsbescheinigung Teil I), Fahrzeugbrief wenn vorhanden, Unfallbericht oder Schadenmeldung, Fotos vom Unfallort falls vorhanden, Kontaktdaten der gegnerischen Versicherung und bei Vorschäden eventuell alte Gutachten. Keine Sorge - wenn Unterlagen fehlen, können wir das Gutachten trotzdem erstellen. Bei SNC Gutachter in Stuttgart machen wir es Ihnen so einfach wie möglich. Wir kommen zu Ihnen, fotografieren das Fahrzeug professionell und kümmern uns um alle Details. Sie müssen sich um nichts kümmern - wir regeln alles mit der Versicherung.'
  },
  {
    question: 'Wird das Gutachten von allen Versicherungen akzeptiert?',
    answer: 'Ja, die Gutachten von SNC Gutachter werden von allen Versicherungen in Deutschland akzeptiert. Als unabhängiger Sachverständiger erfüllen unsere Gutachten alle rechtlichen Anforderungen und sind gerichtsverwertbar. Wir haben eine Akzeptanzrate von 97% bei allen großen Versicherungen wie Allianz, HUK-Coburg, ERGO, Axa und vielen mehr. In den seltenen Fällen, wo Versicherungen Einwände haben, unterstützen wir Sie aktiv in der Kommunikation. Über 300 zufriedene Kunden in Stuttgart und Umgebung vertrauen bereits auf unsere Expertise. Unsere detaillierten, professionell fotografierten Gutachten lassen keine Zweifel offen und beschleunigen die Schadensregulierung erheblich.'
  },
  {
    question: 'Kann ich als Geschädigter auch ohne Anwalt ein Gutachten in Auftrag geben?',
    answer: 'Absolut! Sie können als Geschädigter jederzeit direkt und ohne Anwalt ein unabhängiges KFZ-Gutachten bei SNC Gutachter in Stuttgart beauftragen. Ein Anwalt ist dafür nicht notwendig. Das Gutachten ist Ihre Grundlage für die Schadensregulierung mit der Versicherung. Bei komplexeren Fällen oder wenn die Versicherung sich weigert zu zahlen, können Sie immer noch einen Anwalt hinzuziehen - auch dessen Kosten trägt bei einem Fremdverschulden die gegnerische Versicherung. Wir arbeiten eng mit der renommierten Güzel Anwaltskanzlei zusammen und können Sie bei Bedarf an kompetente Anwälte vermitteln. So haben Sie bei SNC Gutachter alles aus einer Hand für Ihre Schadensabwicklung in Stuttgart.'
  },
  {
    question: 'Was passiert bei einem Totalschaden meines Fahrzeugs?',
    answer: 'Bei einem Totalschaden unterscheiden wir zwischen wirtschaftlichem und technischem Totalschaden. Ein wirtschaftlicher Totalschaden liegt vor, wenn die Reparaturkosten höher sind als der Wiederbeschaffungswert des Fahrzeugs. Ein technischer Totalschaden bedeutet, dass das Fahrzeug nicht mehr verkehrssicher repariert werden kann. Bei SNC Gutachter in Stuttgart ermitteln wir in beiden Fällen: den Wiederbeschaffungswert (was ein gleichwertiges Fahrzeug kostet), den Restwert (was Sie noch für Ihr beschädigtes Fahrzeug bekommen), die fiktiven Reparaturkosten und die Wertminderung. Sie erhalten dann die Differenz zwischen Wiederbeschaffungswert und Restwert. Durchschnittlich sind das 5.000-15.000€ je nach Fahrzeug. Wir sorgen dafür, dass Sie die maximale Entschädigung erhalten.'
  },
  {
    question: 'Wie schnell muss ich nach einem Unfall ein Gutachten beauftragen?',
    answer: 'Grundsätzlich sollten Sie so schnell wie möglich nach einem Unfall ein KFZ-Gutachten beauftragen - idealerweise innerhalb von 1-2 Wochen. Je länger Sie warten, desto schwieriger wird es, den Schaden eindeutig dem Unfall zuzuordnen. Die Verjährungsfrist für Schadensersatzansprüche beträgt zwar 3 Jahre, aber die Versicherung könnte bei zu langer Wartezeit argumentieren, dass Schäden auch später entstanden sein könnten. Bei SNC Gutachter in Stuttgart sind wir innerhalb von 24 Stunden für Sie da. Rufen Sie uns direkt nach dem Unfall an, und wir vereinbaren sofort einen Termin. So sichern Sie sich alle Ansprüche und die Schadensregulierung kann zügig beginnen. Unser Service ist 24/7 erreichbar.'
  },
  {
    question: 'Was ist ein Nutzungsausfallentschädigung und steht sie mir zu?',
    answer: 'Die Nutzungsausfallentschädigung ist eine Entschädigung dafür, dass Sie Ihr Fahrzeug während der Reparaturzeit nicht nutzen können - auch wenn Sie keinen Mietwagen nehmen. Sie wird pauschal pro Tag berechnet und hängt von der Fahrzeugklasse ab. Für einen Kleinwagen erhalten Sie etwa 25-35€ pro Tag, für die Mittelklasse 50-75€ und für Oberklasse-Fahrzeuge bis zu 175€ täglich. Bei einer Reparaturdauer von 10 Tagen sind das schnell 500-1.750€ zusätzlich. Bei SNC Gutachter in Stuttgart berechnen wir die Nutzungsausfallentschädigung automatisch in jedem Gutachten mit. Diese Ansprüche werden oft übersehen, doch sie stehen Ihnen rechtlich zu - wir holen sie für Sie heraus!'
  },
  {
    question: 'Muss ich mein Fahrzeug in einer bestimmten Werkstatt reparieren lassen?',
    answer: 'Nein, Sie haben freie Werkstattwahl! Als Geschädigter können Sie selbst entscheiden, wo Ihr Fahrzeug repariert wird - sei es in einer Markenwerkstatt, freien Werkstatt oder bei Ihrem Vertrauensbetrieb in Stuttgart oder Umgebung. Die Versicherung muss die Kosten einer fachgerechten Reparatur tragen, auch wenn eine Markenwerkstatt teurer ist. Sie können sogar auf eine Reparatur verzichten und sich die Kosten auszahlen lassen (fiktive Abrechnung). Bei SNC Gutachter beraten wir Sie, welche Option für Sie am vorteilhaftesten ist. Wir arbeiten mit vielen Werkstätten in Stuttgart zusammen und können Ihnen kompetente Partner empfehlen, die direkt mit der Versicherung abrechnen.'
  },
  {
    question: 'Kann ich auch bei Bagatellschäden ein Gutachten erstellen lassen?',
    answer: 'Bei sehr kleinen Schäden unter 700-1.000€ Reparaturkosten ist meist ein einfacher Kostenvoranschlag ausreichend. Bei Schäden ab 1.000€ lohnt sich definitiv ein vollständiges Gutachten, da hier auch Wertminderung und Nutzungsausfall geltend gemacht werden können. Ein Gutachten kostet die gegnerische Versicherung etwa 500-800€, die aber bei jedem Fremdverschulden zusätzlich erstattet werden. Bei SNC Gutachter in Stuttgart beraten wir Sie kostenlos, ob sich ein Gutachten in Ihrem Fall lohnt. Generell gilt: Bei sichtbaren Lackschäden, Dellen oder strukturellen Schäden empfehlen wir immer ein Gutachten, um alle Ansprüche zu sichern. Ein Anruf bei uns klärt, welche Option für Sie optimal ist.'
  },
  {
    question: 'Wie läuft die Schadensregulierung nach der Gutachten-Erstellung ab?',
    answer: 'Nach Erstellung des Gutachtens durch SNC Gutachter läuft die Schadensregulierung wie folgt ab: Wir senden das Gutachten direkt an die gegnerische Haftpflichtversicherung. Die Versicherung prüft das Gutachten (meist innerhalb von 1-2 Wochen) und erstellt ein Regulierungsangebot. Sie können dann entscheiden: Reparatur durchführen lassen und Kostenübernahme durch Versicherung, fiktive Abrechnung (Auszahlung ohne Reparatur) oder Totalschadenregulierung. Die Versicherung überweist die Summe direkt an Sie. Bei Verzögerungen oder Problemen unterstützen wir Sie aktiv und können unseren Kooperationspartner, die Güzel Anwaltskanzlei, einschalten. In Stuttgart und Umgebung wickeln wir durchschnittlich über 300 Schadensfälle pro Jahr erfolgreich ab.'
  },
  {
    question: 'Werden auch Oldtimer und Sonderfahrzeuge begutachtet?',
    answer: 'Ja, bei SNC Gutachter in Stuttgart erstellen wir auch Gutachten für Oldtimer, Youngtimer, Motorräder, Wohnmobile, Transporter und andere Sonderfahrzeuge. Oldtimer-Gutachten erfordern besondere Expertise, da hier Seltenheit, Originalität, Restaurierungsgrad und historischer Wert berücksichtigt werden müssen. Wir ermitteln den Marktwert auf Basis aktueller Verkaufspreise vergleichbarer Fahrzeuge und berücksichtigen auch regionale Besonderheiten des Stuttgart-Raums. Für H-Kennzeichen-Zulassungen erstellen wir die erforderlichen Wertgutachten nach §23 StVZO. Auch bei Liebhaberfahrzeugen kennen wir die Besonderheiten und sorgen dafür, dass Sie im Schadensfall die angemessene Entschädigung erhalten. Sprechen Sie uns an - wir haben Erfahrung mit allen Fahrzeugtypen.'
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFAQs = FAQ_DATA.filter(
    faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const breadcrumbItems = [
    { name: 'Home', url: 'https://snc-svb.de' },
    { name: 'FAQ', url: 'https://snc-svb.de/faq' }
  ]

  return (
    <>
      {/* Schema Markup */}
      <FAQPageSchema faqs={FAQ_DATA} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="min-h-screen bg-gradient-to-br from-snc-light-gray to-white">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/snclogo.png"
                  alt="SNC Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                  priority
                  sizes="40px"
                />
                <span className="font-bold text-snc-dark">SNC Gutachter</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/" className="text-snc-gray hover:text-snc-dark transition-colors hidden md:block py-2">
                  Home
                </Link>
                <Link href="/rechner" className="text-snc-gray hover:text-snc-dark transition-colors hidden md:block py-2">
                  Rechner
                </Link>
                <Link href="/ueber-snc" className="text-snc-gray hover:text-snc-dark transition-colors hidden md:block py-2">
                  Über SNC
                </Link>
                <a
                  href="tel:+4915209423739"
                  className="p-2 touch-target group"
                  aria-label="Jetzt anrufen"
                >
                  <div className="w-10 h-10 bg-snc-yellow/15 rounded-full flex items-center justify-center group-hover:bg-snc-yellow/25 transition-colors">
                    <Phone className="w-6 h-6 text-snc-dark" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-snc-dark via-snc-dark-2 to-snc-dark text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Häufig gestellte Fragen
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Alles was Sie über KFZ-Gutachten in Stuttgart wissen müssen
              </p>

              {/* Search Box */}
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Frage durchsuchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-5 pl-14 rounded-xl text-snc-dark text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-snc-yellow touch-target"
                  aria-label="FAQ durchsuchen"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-4 sm:px-6 py-5 flex items-center justify-between text-left hover:bg-snc-light-gray transition-colors touch-target"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-base sm:text-lg font-bold text-snc-dark pr-4 sm:pr-8">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-9 h-9 bg-snc-yellow/15 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-snc-dark" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                        id={`faq-answer-${index}`}
                      >
                        <div className="px-4 sm:px-6 pb-6 text-sm sm:text-base text-snc-gray leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-snc-gray">
                  Keine Ergebnisse für "{searchTerm}" gefunden.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-snc-dark via-snc-dark-2 to-snc-dark text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ihre Frage nicht dabei?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Rufen Sie uns an oder schreiben Sie uns - wir helfen Ihnen gerne weiter!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:+4915209423739"
                className="bg-snc-yellow text-snc-dark px-6 sm:px-8 py-5 rounded-xl font-bold text-lg hover:shadow-glow-lg transition-all flex items-center justify-center gap-3 w-full sm:w-auto touch-target"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Jetzt anrufen +49 152 09423739"
              >
                <Phone className="w-6 h-6" />
                <span className="hidden sm:inline">+49 1520 9423739</span>
                <span className="sm:hidden">Anrufen</span>
              </motion.a>

              <motion.a
                href="https://wa.me/4915209423739"
                className="bg-green-500 text-white px-6 sm:px-8 py-5 rounded-xl font-bold text-lg hover:bg-green-600 transition-all flex items-center justify-center gap-3 w-full sm:w-auto touch-target"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="WhatsApp Kontakt"
              >
                <MessageCircle className="w-6 h-6" />
                WhatsApp
              </motion.a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-snc-dark text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">
              © 2025 SNC Gutachter · <Link href="/impressum" className="hover:text-snc-yellow">Impressum</Link> · <Link href="/datenschutz" className="hover:text-snc-yellow">Datenschutz</Link>
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
