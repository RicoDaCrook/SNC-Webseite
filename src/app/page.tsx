'use client'

import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Shield, Zap, Award, Phone, MessageCircle, ArrowRight, CheckCircle, Star, Clock, Calculator, Car, FileText, Users, TrendingUp, Target, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

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

// Typing Animation Component
function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 40 + delay)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, delay, mounted])

  // Show nothing during SSR to avoid hydration mismatch
  if (!mounted) return <span>&nbsp;</span>

  return <span>{displayedText}</span>
}

// Time-based Urgency Text Component
function UrgencyText() {
  const [text, setText] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const updateText = () => {
      const now = new Date()
      const hour = now.getHours()

      if (hour >= 19) {
        // 19:00 - 23:59 Uhr
        setText("Morgen garantierten Termin sichern")
      } else {
        // 00:00 - 18:59 Uhr
        setText("Schnelle Terminvergabe – Noch heute möglich")
      }
    }

    updateText()
    // Update every minute to check time
    const interval = setInterval(updateText, 60000)

    return () => clearInterval(interval)
  }, [])

  // Show nothing during SSR to avoid hydration mismatch
  if (!mounted) return <span>&nbsp;</span>

  return <span>{text}</span>
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const [showWhatsAppBubble, setShowWhatsAppBubble] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const portraitY = useTransform(scrollYProgress, [0, 0.5], [0, -80])
  const portraitScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  // Hide scroll indicator when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Show WhatsApp bubble after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWhatsAppBubble(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Image
                src="/images/snclogo.png"
                alt="SNC Logo"
                width={40}
                height={40}
                className="rounded-lg"
                priority
                sizes="40px"
              />
              <div>
                <div className="font-bold text-snc-dark">SNC Gutachter</div>
                <div className="text-xs text-snc-gray">Öffentlich bestellt & vereidigt</div>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#prozess" className="text-snc-gray hover:text-snc-dark transition-colors py-2">Prozess</a>
              <Link href="/rechner" className="text-snc-gray hover:text-snc-dark transition-colors py-2">Rechner</Link>
              <Link href="/ueber-snc" className="text-snc-gray hover:text-snc-dark transition-colors py-2">Über SNC</Link>
              <Link href="/faq" className="text-snc-gray hover:text-snc-dark transition-colors py-2">FAQ</Link>
              <a href="#kontakt" className="bg-snc-yellow text-snc-dark px-6 py-2 rounded-lg font-semibold hover:shadow-glow transition-all">
                Kontakt
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 text-snc-dark hover:bg-snc-light-gray rounded-lg transition-colors touch-target"
              aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-6 space-y-4">
                <a
                  href="#prozess"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-4 text-snc-gray hover:text-snc-dark hover:bg-snc-light-gray rounded-lg transition-colors"
                >
                  Prozess
                </a>
                <Link
                  href="/rechner"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-4 text-snc-gray hover:text-snc-dark hover:bg-snc-light-gray rounded-lg transition-colors"
                >
                  Rechner
                </Link>
                <Link
                  href="/ueber-snc"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-4 text-snc-gray hover:text-snc-dark hover:bg-snc-light-gray rounded-lg transition-colors"
                >
                  Über SNC
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-4 text-snc-gray hover:text-snc-dark hover:bg-snc-light-gray rounded-lg transition-colors"
                >
                  FAQ
                </Link>
                <a
                  href="#kontakt"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-4 bg-snc-yellow text-snc-dark rounded-lg font-semibold text-center hover:shadow-glow transition-all"
                >
                  Kontakt
                </a>
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                  <a
                    href="tel:+4915209423739"
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-snc-dark text-white rounded-lg font-semibold"
                  >
                    <Phone className="w-5 h-5" />
                    Anrufen
                  </a>
                  <a
                    href="https://wa.me/4915209423739"
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-green-500 text-white rounded-lg font-semibold"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section - MAXIMUM WOW EFFECT! */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-snc-dark via-snc-dark-2 to-snc-dark">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-snc-yellow rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-snc-yellow rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              style={{ y: heroY, opacity: heroOpacity }}
              className="text-white"
            >
              {/* Floating Badge with Pulse Effect */}
              <motion.div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm mb-6 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { delay: 0.2 },
                  y: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(255, 208, 0, 0.5)"
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }}
                >
                  <Shield className="w-4 h-4 text-snc-yellow" />
                </motion.div>
                <span>Öffentlich bestellt & vereidigt</span>
              </motion.div>

              {/* Typing Animation Headline */}
              <motion.h1
                className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="block">
                  <TypingText text="Unabhängige" />
                </span>
                <span className="block text-snc-yellow">
                  <TypingText text="KFZ-Gutachten" delay={100} />
                </span>
                <motion.span
                  className="block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.95 }}
                >
                  in Stuttgart
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15 }}
              >
                Nach einem Unfall bis zu <strong className="text-snc-yellow">€2.500 mehr</strong> Entschädigung durch ein unabhängiges Gutachten.
                <strong> Für Sie kostenlos</strong> - die Versicherung zahlt.
              </motion.p>

              {/* Enhanced CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                {/* Heartbeat Animation Button */}
                <motion.div className="relative w-full sm:w-auto">
                  <motion.a
                    href="tel:+4915209423739"
                    className="relative z-10 bg-snc-yellow text-snc-dark px-8 py-5 rounded-xl font-semibold text-lg hover:shadow-glow-lg transition-all flex items-center justify-center gap-2 group w-full sm:w-auto touch-target"
                    aria-label="Jetzt anrufen +49 152 09423739"
                    animate={{
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut"
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotateX: 5,
                      rotateY: 5
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Jetzt anrufen
                  </motion.a>
                </motion.div>

                {/* Ring Animation Button */}
                <motion.div className="relative w-full sm:w-auto">
                  {/* Animated Ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-green-400 rounded-xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.a
                    href="https://wa.me/4915209423739"
                    className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-5 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2 group w-full sm:w-auto touch-target"
                    aria-label="WhatsApp Kontakt"
                    whileHover={{
                      scale: 1.1,
                      rotateX: 5,
                      rotateY: -5,
                      backgroundColor: "rgba(255, 255, 255, 0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear"
                      }}
                      className="group-hover:pause"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </motion.div>
                    WhatsApp
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* URGENCY ELEMENT */}
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
              >
                <motion.span
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{
                    opacity: [1, 0.3, 1],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5
                  }}
                />
                <Clock className="w-4 h-4" />
                <UrgencyText />
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="flex items-center gap-6 pt-8 border-t border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
              >
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-snc-yellow fill-snc-yellow" />
                  <span className="text-sm">4.9/5 Bewertung</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-snc-yellow" />
                  <span className="text-sm">24/7 erreichbar</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Portrait with Enhanced Parallax & Glow */}
            <motion.div
              className="relative"
              style={{ y: portraitY, scale: portraitScale }}
            >
              <motion.div
                className="relative z-10 group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Glow Effect on Hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-snc-yellow/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }}
                />

                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/sncportrait.png"
                    alt="Ilker Sancar - KFZ Gutachter"
                    width={600}
                    height={800}
                    className="w-full h-auto"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    quality={90}
                  />
                  <div className="absolute inset-0 ring-2 ring-white/20 rounded-2xl"></div>
                </div>

                {/* Floating Card with Animation */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-2xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: [0, -5, 0]
                  }}
                  transition={{
                    opacity: { delay: 0.8 },
                    x: { delay: 0.8 },
                    y: {
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                      delay: 1
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-12 h-12 bg-snc-yellow rounded-lg flex items-center justify-center"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut"
                      }}
                    >
                      <Award className="w-6 h-6 text-snc-dark" />
                    </motion.div>
                    <div>
                      <div className="font-bold text-snc-dark">Ilker Sancar</div>
                      <div className="text-sm text-snc-gray">Ihr Experte</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Enhanced Background Decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <motion.div
                  className="absolute top-0 right-0 w-64 h-64 bg-snc-yellow/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 3 }}
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <motion.div
                className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center pt-2 hover:border-snc-yellow transition-colors"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  className="w-1.5 h-3 bg-snc-yellow rounded-full"
                  animate={{
                    y: [0, 8, 0],
                    opacity: [1, 0.3, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <motion.p
                className="text-white/60 text-xs mt-2 text-center"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{
                  repeat: Infinity,
                  duration: 2
                }}
              >
                Scroll
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Stats Counter Section - NEU! */}
      <section className="py-20 bg-snc-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <div className="text-5xl font-bold text-snc-dark mb-2">
                <CountUp end={2300} />+
              </div>
              <div className="text-snc-gray">Gutachten erstellt</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-snc-dark mb-2">
                <CountUp end={97} />%
              </div>
              <div className="text-snc-gray">Akzeptanzrate</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-snc-dark mb-2">
                €<CountUp end={2500} />
              </div>
              <div className="text-snc-gray">Ø Mehr Entschädigung</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-snc-dark mb-2">
                <CountUp end={24} />h
              </div>
              <div className="text-snc-gray">Reaktionszeit</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Unser Prozess Section - NEU mit Bild! */}
      <section id="prozess" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-snc-dark mb-4">
              So arbeiten wir
            </h2>
            <p className="text-xl text-snc-gray max-w-2xl mx-auto">
              Professionell, transparent und immer in Ihrem Interesse
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Bild */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <Image
                  src="/images/sncgutachter.png"
                  alt="Ilker Sancar bei der Arbeit"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  quality={85}
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
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-snc-yellow rounded-xl flex items-center justify-center flex-shrink-0">
                  <Car className="w-6 h-6 text-snc-dark" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-snc-dark mb-2">Vor-Ort-Besichtigung</h3>
                  <p className="text-snc-gray">Wir kommen zu Ihnen - egal ob zu Hause, am Arbeitsplatz oder in der Werkstatt. Keine Anfahrt nötig.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-snc-yellow rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-snc-dark" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-snc-dark mb-2">Detaillierte Dokumentation</h3>
                  <p className="text-snc-gray">Jeder Schaden wird fotografiert, vermessen und genau dokumentiert. Nichts bleibt unberücksichtigt.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-snc-yellow rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-snc-dark" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-snc-dark mb-2">Wertminderung maximieren</h3>
                  <p className="text-snc-gray">Als unabhängiger Gutachter kämpfen wir für jeden Euro, der Ihnen zusteht. Durchschnittlich €2.500 mehr.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-snc-yellow rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-snc-dark" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-snc-dark mb-2">Express-Service</h3>
                  <p className="text-snc-gray">Ihr fertiges Gutachten innerhalb von 48 Stunden. In dringenden Fällen auch Express innerhalb von 24h.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* USP Cards - UPGRADED mit 3D Tilt */}
      <section className="py-24 bg-snc-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-snc-dark mb-4">
              Warum SNC?
            </h2>
            <p className="text-xl text-snc-gray">
              Mehr als nur ein Gutachten - Ihr Anwalt für maximale Entschädigung
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Unabhängig & Vereidigt',
                description: 'Als öffentlich bestellter Sachverständiger arbeiten wir ausschließlich in Ihrem Interesse - nicht für die Versicherung.',
                gradient: 'from-blue-500 to-blue-600'
              },
              {
                icon: Zap,
                title: '48h Fertigstellung',
                description: 'Wir arbeiten schneller als die Konkurrenz. Ihr Gutachten ist innerhalb von 48 Stunden fertig - garantiert.',
                gradient: 'from-snc-yellow to-yellow-400'
              },
              {
                icon: Award,
                title: '€2.500 mehr im Schnitt',
                description: 'Durch vollständige Wertminderungsberechnung und professionelle Dokumentation holen wir durchschnittlich €2.500 mehr für Sie raus.',
                gradient: 'from-green-500 to-green-600'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.05
                }}
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <item.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-bold text-snc-dark mb-4">{item.title}</h3>
                  <p className="text-snc-gray leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-red-900 mb-6">⚠️ Versicherungs-Gutachter</h3>
                <ul className="space-y-4">
                  {[
                    'Arbeitet für die Versicherung',
                    'Versucht Kosten zu minimieren',
                    'Wertminderung oft zu niedrig',
                    'Durchschnittlich €2.500 weniger'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-red-800">
                      <span className="text-red-500 font-bold">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-green-900 mb-6">✓ Unabhängiger Gutachter (SNC)</h3>
                <ul className="space-y-4">
                  {[
                    'Arbeitet nur für Sie',
                    'Maximiert Ihre Entschädigung',
                    'Vollständige Wertminderung',
                    'Durchschnittlich €2.500 mehr'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-green-800">
                      <span className="text-green-500 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 bg-snc-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-snc-dark mb-4">
              So einfach geht's
            </h2>
            <p className="text-xl text-snc-gray">
              In 4 Schritten zu Ihrer maximalen Entschädigung
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-snc-yellow"></div>

            {/* Steps */}
            {[
              {
                step: '1',
                title: 'Anruf oder WhatsApp',
                description: 'Sie kontaktieren uns - wir vereinbaren einen Termin, der zu Ihnen passt.',
                icon: Phone
              },
              {
                step: '2',
                title: 'Vor-Ort-Besichtigung',
                description: 'Wir kommen zu Ihnen und dokumentieren alle Schäden professionell (30-60 Min).',
                icon: Car
              },
              {
                step: '3',
                title: 'Gutachten-Erstellung',
                description: 'Innerhalb von 48h erstellen wir Ihr detailliertes Gutachten mit voller Wertminderung.',
                icon: FileText
              },
              {
                step: '4',
                title: 'Maximale Entschädigung',
                description: 'Sie reichen das Gutachten ein und erhalten durchschnittlich €2.500 mehr als mit Versicherungs-Gutachtern.',
                icon: TrendingUp
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-24 pb-16 last:pb-0"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                {/* Step Number */}
                <div className="absolute left-0 w-16 h-16 bg-snc-yellow rounded-full flex items-center justify-center text-2xl font-bold text-snc-dark shadow-lg">
                  {item.step}
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-md mb-4">
                  <item.icon className="w-6 h-6 text-snc-dark" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-snc-dark mb-2">{item.title}</h3>
                <p className="text-snc-gray leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-snc-dark mb-4">
              Das sagen unsere Kunden
            </h2>
            <div className="flex items-center justify-center gap-2 text-snc-gold mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current drop-shadow-sm" />
              ))}
            </div>
            <p className="text-xl text-snc-gray">4.9/5 Sterne - Über 200 Bewertungen</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Michael Weber',
                text: 'Schnell, professionell und transparant. Das Gutachten war innerhalb von 2 Tagen fertig und die Versicherung hat alles anerkannt. Sehr zu empfehlen!',
                rating: 5
              },
              {
                name: 'Sarah Schmidt',
                text: 'Herr Sancar hat sich wirklich Zeit genommen und alles genau erklärt. Am Ende habe ich deutlich mehr Geld bekommen als erwartet. Vielen Dank!',
                rating: 5
              },
              {
                name: 'Thomas Müller',
                text: 'Nach dem Unfall war ich unsicher, aber SNC hat mir alles abgenommen. Das Gutachten war top und die Abwicklung mit der Versicherung lief reibungslos.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-snc-light-gray rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-snc-gold fill-current drop-shadow-sm" />
                  ))}
                </div>
                <p className="text-snc-gray mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="font-semibold text-snc-dark">{testimonial.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="kontakt" className="py-24 bg-gradient-to-br from-snc-dark via-snc-dark-2 to-snc-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Bereit für Ihr Gutachten?
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Wir sind <strong>24/7</strong> für Sie erreichbar. Rufen Sie jetzt an oder 
              schreiben Sie uns auf WhatsApp - die Erstberatung ist <strong>kostenlos</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12">
              <motion.a
                href="tel:+4915209423739"
                className="bg-snc-yellow text-snc-dark px-8 sm:px-10 py-5 rounded-xl font-bold text-lg sm:text-xl hover:shadow-glow-lg transition-all flex items-center justify-center gap-3 w-full sm:w-auto touch-target"
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
                className="bg-green-500 text-white px-8 sm:px-10 py-5 rounded-xl font-bold text-lg sm:text-xl hover:bg-green-600 transition-all flex items-center justify-center gap-3 w-full sm:w-auto touch-target"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="WhatsApp Kontakt"
              >
                <MessageCircle className="w-6 h-6" />
                WhatsApp
              </motion.a>
            </div>

            <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold text-snc-yellow mb-2">24/7</div>
                <div className="text-gray-400">Erreichbar</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-snc-yellow mb-2">48h</div>
                <div className="text-gray-400">Gutachten fertig</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-snc-yellow mb-2">€0</div>
                <div className="text-gray-400">Für Sie (Versicherung zahlt)</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Float Button with Chat Preview */}
      <div className="fixed bottom-8 right-8 z-50">
        {/* Chat Preview Bubble */}
        <AnimatePresence>
          {showWhatsAppBubble && (
            <motion.div
              initial={{ opacity: 0, x: 100, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-4 w-72 mb-2"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowWhatsAppBubble(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="flex items-start gap-3">
                {/* Profile Picture Placeholder */}
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">IS</span>
                </div>

                {/* Message */}
                <div className="flex-1">
                  <div className="font-bold text-snc-dark mb-1">Ilker Sancar</div>
                  <div className="bg-green-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-700 mb-1">Hallo! 👋</p>
                    <p className="text-sm text-gray-700">Wie kann ich helfen?</p>
                  </div>

                  {/* WhatsApp Button */}
                  <motion.a
                    href="https://wa.me/4915209423739"
                    className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-green-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp öffnen
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/4915209423739"
          className="block w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle className="w-8 h-8" />
        </motion.a>
      </div>
    </div>
  )
}
