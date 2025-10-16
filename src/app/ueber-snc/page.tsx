'use client'

import { motion, useInView } from 'framer-motion'
import { Trophy, Target, Clock, Star, Shield, Phone, MessageCircle, CheckCircle, TrendingUp, Award, Users, Scale } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'

// Counter Animation Component
function CountUp({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return <span ref={ref}>{count.toLocaleString('de-DE')}{suffix}</span>
}

export default function UeberSNCPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/snclogo.png" alt="SNC Logo" width={40} height={40} className="rounded-lg" />
              <span className="font-bold text-snc-dark">SNC Gutachter</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-snc-gray hover:text-snc-dark transition-colors hidden md:block py-2">
                Home
              </Link>
              <Link href="/rechner" className="text-snc-gray hover:text-snc-dark transition-colors hidden md:block py-2">
                Rechner
              </Link>
              <Link href="/faq" className="text-snc-gray hover:text-snc-dark transition-colors hidden md:block py-2">
                FAQ
              </Link>
              <a href="tel:+4915209423739" className="p-2 touch-target group" aria-label="Jetzt anrufen">
                <div className="w-10 h-10 bg-snc-yellow/15 rounded-full flex items-center justify-center group-hover:bg-snc-yellow/25 transition-colors">
                  <Phone className="w-6 h-6 text-snc-dark" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-snc-dark via-snc-dark-2 to-snc-dark text-white py-24 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-snc-yellow rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Über SNC Gutachter
            </h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Erfolg lässt sprechen - Über 300 zufriedene Kunden in wenigen Monaten
            </p>
          </motion.div>
        </div>
      </section>

      {/* Erfolgsgeschichte Section */}
      <section className="py-20 bg-snc-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-snc-yellow rounded-full mb-6">
              <Trophy className="w-10 h-10 text-snc-dark" />
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-snc-dark mb-6">
              Von 0 auf <CountUp end={300} />+ in Rekordzeit
            </h2>

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
              <p className="text-xl text-snc-gray leading-relaxed mb-6">
                Gegründet am <strong className="text-snc-dark">01.01.2025</strong> - und schon über <strong className="text-snc-dark">300 Gutachten</strong> erstellt.
              </p>

              <p className="text-xl text-snc-gray leading-relaxed mb-6">
                <strong className="text-snc-dark">Wie haben wir das geschafft?</strong> Durch Empfehlungen!
              </p>

              <p className="text-xl text-snc-gray leading-relaxed">
                Jeder 3. Kunde kommt durch eine persönliche Empfehlung zu uns. Das zeigt: Unsere Kunden sind zufrieden und empfehlen uns weiter. Das ist unser größter Erfolg.
              </p>

              <motion.div
                className="mt-8 inline-flex items-center gap-3 bg-green-50 text-green-800 px-6 py-3 rounded-full"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Users className="w-6 h-6" />
                <span className="font-bold">Jeder 3. Kunde durch Empfehlung</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Warum SNC - 3 Säulen */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-snc-dark mb-4">
              Warum SNC?
            </h2>
            <p className="text-xl text-snc-gray">
              Drei Säulen unseres Erfolgs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                emoji: '🤝',
                title: 'Empfehlungsbasiert',
                description: 'Von Kunden für Kunden empfohlen. Wir machen keine klassische Werbung. Unser Wachstum basiert auf zufriedenen Kunden, die uns weiterempfehlen. Das ist unser größter Stolz.'
              },
              {
                icon: Star,
                emoji: '💯',
                title: 'Volle Kundenzufriedenheit',
                description: 'Wir sind erst zufrieden, wenn Sie es sind. Bei jeder Frage, jedem Anliegen - wir sind für Sie da. 24/7 erreichbar, immer hilfsbereit, immer transparent.'
              },
              {
                icon: Target,
                emoji: '🎯',
                title: 'Für jeden Kunden da',
                description: 'Ob Kleinwagen oder Luxusauto, ob 500€ oder 50.000€ Schaden - jeder Kunde ist uns gleich wichtig. Keine Spezialisierung, keine Ausgrenzung. Wir helfen ALLEN.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-2xl font-bold text-snc-dark mb-4">{item.title}</h3>
                <p className="text-snc-gray leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ilker Sancar - Gründer */}
      <section className="py-20 bg-snc-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Bild */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/uebersnc.png"
                  alt="Ilker Sancar - Gründer & Geschäftsführer"
                  width={600}
                  height={800}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 ring-2 ring-snc-yellow/20 rounded-2xl"></div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 bg-snc-yellow/10 text-snc-dark px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Award className="w-4 h-4" />
                Gründer & Geschäftsführer
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-snc-dark mb-4">
                Ilker Sancar
              </h2>

              <p className="text-lg text-snc-gray mb-6">
                Unabhängiger KFZ-Sachverständiger
              </p>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-snc-yellow mb-6">
                <p className="text-lg text-snc-gray leading-relaxed mb-4">
                  „Ich habe SNC mit einer Vision gegründet: <strong className="text-snc-dark">Unabhängige Gutachten, die wirklich in Ihrem Interesse sind.</strong>
                </p>

                <p className="text-lg text-snc-gray leading-relaxed mb-4">
                  Heute, nur wenige Monate später, haben über 300 Kunden mir ihr Vertrauen geschenkt. Und ich bin jedem einzelnen dankbar dafür.
                </p>

                <p className="text-lg text-snc-gray leading-relaxed">
                  Mein Versprechen an Sie: Ich behandle Ihren Fall wie meinen eigenen. Mit Sorgfalt, Engagement und der Erfahrung aus über 300 Gutachten."
                </p>
              </div>

              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-snc-gray">Über 300 erfolgreiche Gutachten</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline: Unsere Geschichte */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-snc-dark mb-4">
              Unsere Geschichte
            </h2>
            <p className="text-xl text-snc-gray">
              Von der Gründung bis heute
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-snc-yellow"></div>

            {/* Timeline Items */}
            {[
              {
                date: '01.01.2025',
                emoji: '🎉',
                title: 'SNC Gutachter gegründet',
                description: 'Vision: Unabhängige Gutachten für alle'
              },
              {
                date: 'Februar 2025',
                emoji: '📈',
                title: 'Erste 50 Gutachten erstellt',
                description: 'Positives Feedback überwältigt uns'
              },
              {
                date: 'März 2025',
                emoji: '🤝',
                title: 'Kooperation mit Güzel Anwaltskanzlei',
                description: 'Rechtliche Power für komplexe Fälle'
              },
              {
                date: 'Heute',
                emoji: '🏆',
                title: 'Über 300 zufriedene Kunden',
                description: 'Wachstum durch Empfehlungen'
              },
              {
                date: 'Zukunft',
                emoji: '🚀',
                title: 'Team-Ausbau geplant',
                description: 'Noch schneller für Sie da'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-24 pb-12 last:pb-0"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 w-16 h-16 bg-snc-yellow rounded-full flex items-center justify-center text-2xl shadow-lg">
                  {item.emoji}
                </div>

                {/* Content Card */}
                <div className="bg-snc-light-gray rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="text-sm text-snc-yellow font-bold mb-2">{item.date}</div>
                  <h3 className="text-xl font-bold text-snc-dark mb-2">{item.title}</h3>
                  <p className="text-snc-gray">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Zahlen die sprechen */}
      <section className="py-20 bg-snc-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-snc-dark mb-4">
              Zahlen die sprechen
            </h2>
            <p className="text-xl text-snc-gray">
              Unser Erfolg in Zahlen
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                number: 300,
                suffix: '+',
                label: 'Gutachten erstellt'
              },
              {
                number: 97,
                suffix: '%',
                label: 'Akzeptanz bei Vers.'
              },
              {
                number: 2500,
                prefix: '€',
                label: 'Ø Mehr Entschädigung'
              },
              {
                number: 24,
                suffix: 'h',
                label: 'Reaktionszeit'
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-snc-yellow to-yellow-300 rounded-2xl p-8 text-center shadow-xl hover:shadow-glow-lg transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-5xl font-black text-snc-dark mb-2">
                  {stat.prefix}<CountUp end={stat.number} />{stat.suffix}
                </div>
                <div className="text-sm text-snc-dark/80 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner-Highlight */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white border-2 border-snc-yellow rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-glow-lg transition-all">
              <div className="text-center mb-6">
                <p className="text-sm text-snc-gray mb-4">In Kooperation mit</p>
                <h3 className="text-3xl lg:text-4xl font-bold text-snc-dark mb-2 flex items-center justify-center gap-3">
                  Güzel Anwaltskanzlei
                  <div className="w-12 h-12 bg-snc-yellow/15 rounded-full flex items-center justify-center flex-shrink-0">
                    <Scale className="w-7 h-7 text-snc-dark" />
                  </div>
                </h3>
              </div>

              <div className="space-y-4 text-lg text-snc-gray leading-relaxed">
                <p>
                  <strong className="text-snc-dark">Rechtliche Expertise bei komplexen Fällen.</strong> Gemeinsam stark für Ihre Rechte.
                </p>

                <p>
                  Ob Versicherungsstreit oder Schadensersatzklage - mit unserem Partner haben Sie die beste rechtliche Unterstützung an Ihrer Seite.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-snc-gray">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Spezialisiert auf Versicherungsrecht</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Langjährige Erfahrung</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Versprechen-Box */}
      <section className="py-20 bg-snc-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 md:p-12">
              <h3 className="text-3xl font-bold text-green-900 mb-8 text-center">
                Unser Versprechen an Sie
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  'Akzeptiert von allen Versicherungen',
                  'Bei jeder Frage behilflich',
                  '24/7 erreichbar',
                  'Transparente Kommunikation',
                  'Kein Kleingedrucktes',
                  'Faire Preise - Versicherung zahlt'
                ].map((promise, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-lg text-green-900 font-medium">{promise}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-snc-dark via-snc-dark-2 to-snc-dark text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-snc-yellow rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Überzeugt?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Werden Sie Teil unserer Erfolgsgeschichte.<br />
              Über 300 Kunden vertrauen uns bereits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:+4915209423739"
                className="bg-snc-yellow text-snc-dark px-10 py-5 rounded-xl font-bold text-xl hover:shadow-glow-lg transition-all flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-6 h-6" />
                Jetzt anrufen
              </motion.a>

              <motion.a
                href="https://wa.me/4915209423739"
                className="bg-green-500 text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-green-600 transition-all flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-6 h-6" />
                WhatsApp
              </motion.a>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-snc-yellow" />
                <span>300+ zufriedene Kunden</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-snc-yellow fill-snc-yellow" />
                <span>4.9/5 Bewertung</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-snc-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">SNC Gutachter</h3>
              <p className="text-gray-400 text-sm">
                Unabhängige KFZ-Gutachten in Stuttgart.<br />
                Ihr unabhängiger Gutachter.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Schnellzugriff</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-snc-yellow transition-colors">Home</Link></li>
                <li><Link href="/rechner" className="hover:text-snc-yellow transition-colors">Rechner</Link></li>
                <li><Link href="/ueber-snc" className="hover:text-snc-yellow transition-colors">Über SNC</Link></li>
                <li><Link href="/faq" className="hover:text-snc-yellow transition-colors">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Kontakt</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="tel:+4915209423739" className="hover:text-snc-yellow transition-colors">+49 1520 9423739</a></li>
                <li><a href="https://wa.me/4915209423739" className="hover:text-snc-yellow transition-colors">WhatsApp</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>
              © 2025 SNC Gutachter · <Link href="/impressum" className="hover:text-snc-yellow">Impressum</Link> · <Link href="/datenschutz" className="hover:text-snc-yellow">Datenschutz</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
