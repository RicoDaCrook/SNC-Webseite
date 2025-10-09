'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, Phone, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const FAQ_DATA = [
  {
    category: 'Kosten & Ablauf',
    questions: [
      {
        q: 'Was kostet ein KFZ-Gutachten in Stuttgart?',
        a: 'Die Kosten für ein KFZ-Gutachten liegen in der Regel zwischen €400-1.200, abhängig vom Schadensumfang. Die gute Nachricht: Bei einem unverschuldeten Unfall zahlt die gegnerische Versicherung das Gutachten. Für Sie entstehen also keine Kosten.'
      },
      {
        q: 'Wer zahlt das Gutachten nach einem Unfall?',
        a: 'Bei einem unverschuldeten Unfall zahlt die Haftpflichtversicherung des Unfallverursachers sowohl die Reparaturkosten als auch das Gutachten. Sie haben das Recht auf freie Gutachterwahl und können SNC beauftragen, ohne in Vorleistung zu treten.'
      },
      {
        q: 'Wie lange dauert ein Gutachten?',
        a: 'Wir arbeiten deutlich schneller als die meisten Gutachter: Die Besichtigung dauert 30-60 Minuten. Das fertige Gutachten erhalten Sie innerhalb von 48 Stunden nach der Besichtigung. In dringenden Fällen auch Express innerhalb von 24 Stunden.'
      }
    ]
  },
  {
    category: 'Gutachten vs. Kostenvoranschlag',
    questions: [
      {
        q: 'Brauche ich ein Gutachten bei Bagatellschäden?',
        a: 'Bei Schäden unter €750 reicht oft ein Kostenvoranschlag. Ab €750 Schadenshöhe empfehlen wir ein Gutachten, da es die Wertminderung berücksichtigt und bei Versicherungen eine höhere Akzeptanz hat. Wir beraten Sie gerne kostenlos, was in Ihrem Fall sinnvoll ist.'
      },
      {
        q: 'Was ist der Unterschied zwischen Gutachten und Kostenvoranschlag?',
        a: 'Ein Kostenvoranschlag (von der Werkstatt) schätzt nur die Reparaturkosten. Ein Gutachten ist umfassender: Es dokumentiert alle Schäden, berechnet die merkantile Wertminderung, Nutzungsausfall und hat bei Gericht Beweiskraft. Bei Schäden ab €750 ist ein Gutachten immer sinnvoll.'
      }
    ]
  },
  {
    category: 'Gutachterwahl',
    questions: [
      {
        q: 'Kann ich den Gutachter frei wählen?',
        a: 'Ja, absolut! Bei einem unverschuldeten Unfall haben Sie freie Gutachterwahl. Die Versicherung darf Ihnen keinen Gutachter vorschreiben. Sie können einen unabhängigen Gutachter wie SNC beauftragen, der allein in Ihrem Interesse handelt.'
      },
      {
        q: 'Was ist der Unterschied zwischen unabhängigem und Versicherungs-Gutachter?',
        a: 'Ein Versicherungs-Gutachter arbeitet für die Versicherung und versucht oft, Kosten zu minimieren. Ein unabhängiger Gutachter wie SNC arbeitet ausschließlich für Sie und dokumentiert alle Schäden vollständig. Durchschnittlich erzielen unabhängige Gutachter €2.500 mehr für ihre Kunden.'
      }
    ]
  },
  {
    category: 'Wertminderung',
    questions: [
      {
        q: 'Was ist merkantile Wertminderung?',
        a: 'Die merkantile Wertminderung ist der Wertverlust Ihres Fahrzeugs durch den Unfall. Auch nach perfekter Reparatur ist ein Unfallwagen weniger wert, da er in der Historie einen Schaden hat. Diese Wertminderung steht Ihnen als Schadensersatz zu und beträgt oft €1.000-3.000.'
      },
      {
        q: 'Steht mir immer eine Wertminderung zu?',
        a: 'In den meisten Fällen ja, besonders bei neueren Fahrzeugen (bis ca. 5 Jahre) mit niedrigem Kilometerstand und größeren Schäden. Die Höhe hängt von Fahrzeugalter, Kilometerstand, Schadenshöhe und Vorschäden ab. Unser Rechner gibt Ihnen eine erste Einschätzung.'
      }
    ]
  },
  {
    category: 'Ablauf & Unterlagen',
    questions: [
      {
        q: 'Welche Unterlagen brauche ich für das Gutachten?',
        a: 'Sie benötigen: Fahrzeugschein (Zulassungsbescheinigung Teil I), Unfallbericht oder Europäischer Unfallbericht, falls vorhanden: Polizeiaktenzeichen. Wenn Sie nicht alle Unterlagen haben, ist das kein Problem – wir helfen Ihnen weiter.'
      },
      {
        q: 'Wie läuft die Besichtigung ab?',
        a: 'Wir kommen zu Ihnen – egal ob zu Hause, am Arbeitsplatz oder in der Werkstatt. Die Besichtigung dauert 30-60 Minuten. Wir fotografieren alle Schäden, nehmen Messungen vor und dokumentieren den Zustand. Sie müssen dabei nicht anwesend sein, wenn Sie die Unterlagen hinterlegen.'
      }
    ]
  },
  {
    category: 'Gutachteninhalt',
    questions: [
      {
        q: 'Was steht alles im Gutachten?',
        a: 'Ein vollständiges Gutachten enthält: Detaillierte Schadensdokumentation mit Fotos, Reparaturkostenberechnung, Marktwertermittlung, Merkantile Wertminderung, Nutzungsausfall-Berechnung, Restwertermittlung (bei Totalschaden), Technische Daten und Fahrzeughistorie. Bei SNC erhalten Sie immer ein vollständiges Gutachten.'
      },
      {
        q: 'Akzeptieren Versicherungen Ihr Gutachten?',
        a: 'Ja! Als öffentlich bestellter und vereidigter Sachverständiger haben unsere Gutachten höchste Anerkennung. Unsere Akzeptanzrate liegt bei 97%. In seltenen Fällen von Unstimmigkeiten klären wir das direkt mit der Versicherung – ohne Mehrkosten für Sie.'
      }
    ]
  },
  {
    category: 'Weitere Ansprüche',
    questions: [
      {
        q: 'Was ist Nutzungsausfall?',
        a: 'Nutzungsausfall ist die Entschädigung dafür, dass Sie Ihr Fahrzeug während der Reparatur nicht nutzen können. Der Betrag richtet sich nach Fahrzeugklasse und Ausfalldauer und beträgt ca. €23-175 pro Tag. Dieser Anspruch steht Ihnen zu, auch wenn Sie keinen Mietwagen nehmen.'
      },
      {
        q: 'Erstellen Sie auch Gutachten bei Totalschaden?',
        a: 'Ja, bei Totalschaden erstellen wir ein Restwert- und Wiederbeschaffungswertgutachten. Dieses zeigt, wie viel Ihr Fahrzeug vor dem Unfall wert war und wie viel der Restwert (Schrottwert) ist. Die Differenz plus Nebenkosten steht Ihnen als Entschädigung zu.'
      },
      {
        q: 'Wie lange ist das Gutachten gültig?',
        a: 'Ein Gutachten hat keine offizielle Ablaufdauer. Allerdings sollte die Reparatur zeitnah erfolgen, da Preise sich ändern können. Versicherungen akzeptieren Gutachten in der Regel problemlos bis zu 6 Monate. Bei älteren Gutachten kann eine Aktualisierung nötig sein.'
      }
    ]
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  const filteredFAQ = FAQ_DATA.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`
    setOpenIndex(openIndex === key ? null : key)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-snc-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/snclogo.png" alt="SNC Logo" width={40} height={40} className="rounded-lg" />
              <span className="font-bold">SNC Gutachter</span>
            </Link>
            <a href="tel:+4915209423739" className="text-snc-yellow hover:text-white transition-colors">
              <Phone className="w-6 h-6" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-snc-dark via-snc-dark-2 to-snc-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Häufig gestellte Fragen
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Alles was Sie über KFZ-Gutachten wissen müssen
            </p>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Frage suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-14 rounded-xl text-snc-dark text-lg focus:ring-2 focus:ring-snc-yellow focus:outline-none"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-snc-gray" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-snc-gray">Keine Ergebnisse für "{searchTerm}" gefunden.</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-snc-yellow hover:underline"
              >
                Suche zurücksetzen
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredFAQ.map((category, catIndex) => (
                <motion.div
                  key={catIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-snc-dark mb-6 flex items-center gap-3">
                    <div className="w-2 h-8 bg-snc-yellow rounded-full"></div>
                    {category.category}
                  </h2>

                  <div className="space-y-4">
                    {category.questions.map((item, qIndex) => {
                      const key = `${catIndex}-${qIndex}`
                      const isOpen = openIndex === key

                      return (
                        <motion.div
                          key={qIndex}
                          className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-snc-yellow transition-colors"
                        >
                          <button
                            onClick={() => toggleQuestion(catIndex, qIndex)}
                            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-snc-light-gray transition-colors"
                          >
                            <span className="font-semibold text-snc-dark pr-4 text-lg">
                              {item.q}
                            </span>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-6 h-6 text-snc-yellow flex-shrink-0" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="px-6 pb-5 text-snc-gray leading-relaxed border-t-2 border-gray-100 pt-5">
                                  {item.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-snc-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-snc-dark mb-4">
            Noch Fragen?
          </h2>
          <p className="text-xl text-snc-gray mb-8">
            Wir beraten Sie gerne persönlich – kostenlos und unverbindlich.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="tel:+4915209423739"
              className="bg-snc-yellow text-snc-dark px-8 py-4 rounded-xl font-semibold hover:shadow-glow transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" />
              +49 1520 9423739
            </motion.a>
            <motion.a
              href="https://wa.me/4915209423739"
              className="bg-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-snc-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 SNC Gutachter · <Link href="/impressum" className="hover:text-snc-yellow">Impressum</Link> · <Link href="/datenschutz" className="hover:text-snc-yellow">Datenschutz</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
