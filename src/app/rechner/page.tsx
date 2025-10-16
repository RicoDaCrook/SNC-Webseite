'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Car, Calendar, Gauge, Euro, AlertCircle, CheckCircle, Phone, MessageCircle, Sparkles, TrendingUp, TrendingDown, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamic import for Confetti (only loaded when needed)
const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false
})

const CAR_BRANDS = [
  'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Porsche',
  'Opel', 'Ford', 'Renault', 'Peugeot', 'Toyota',
  'Honda', 'Mazda', 'Volvo', 'Skoda', 'Seat', 'Sonstige'
]

function CountUp({ end }: { end: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    const duration = 2000

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end])

  return <>{count.toLocaleString('de-DE')}€</>
}

// Social Proof Counter
function SocialProofCounter() {
  const [count, setCount] = useState(2543)

  useEffect(() => {
    const interval = setInterval(() => {
      // Random increment between 1-3 every 5-10 seconds
      if (Math.random() > 0.5) {
        setCount(prev => prev + Math.floor(Math.random() * 3) + 1)
      }
    }, Math.random() * 5000 + 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="flex items-center justify-center gap-2 text-snc-gray mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-7 h-7 bg-snc-yellow/15 rounded-full flex items-center justify-center flex-shrink-0">
        <Users className="w-4 h-4 text-snc-dark" />
      </div>
      <span className="text-sm">
        <motion.span
          key={count}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-bold text-snc-dark"
        >
          {count.toLocaleString('de-DE')}
        </motion.span>
        {' '}Personen haben bereits verglichen
      </span>
    </motion.div>
  )
}

export default function RechnerPage() {
  const [activeTab, setActiveTab] = useState<'wertminderung' | 'vergleich'>('wertminderung')
  const [step, setStep] = useState(1)
  const [showResult, setShowResult] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Form Data
  const [brand, setBrand] = useState('')
  const [year, setYear] = useState(2020)
  const [km, setKm] = useState(50000)
  const [repairCost, setRepairCost] = useState<number | ''>(5000)
  const [damage, setDamage] = useState<'klein' | 'mittel' | 'groß'>('mittel')

  // Results
  const [result, setResult] = useState({ min: 0, max: 0 })

  const calculateDepreciation = () => {
    // Age Factor (je neuer, desto höher)
    const currentYear = new Date().getFullYear()
    const age = currentYear - year
    const ageFactor = Math.max(0.05, Math.min(0.15, 0.15 - (age * 0.015)))

    // KM Factor (je weniger km, desto höher)
    const kmFactor = km < 50000 ? 1.2 : km < 100000 ? 1.0 : 0.8

    // Damage Factor
    const damageFactor = {
      klein: 0.8,
      mittel: 1.0,
      groß: 1.2
    }[damage]

    // Base Calculation
    const costValue = typeof repairCost === 'number' ? repairCost : 0
    const baseDepreciation = costValue * ageFactor * kmFactor * damageFactor

    // Range
    const min = Math.round(baseDepreciation * 0.8 / 50) * 50
    const max = Math.round(baseDepreciation * 1.2 / 50) * 50

    return { min, max }
  }

  // Calculate comparison values
  const calculateComparison = () => {
    const costValue = typeof repairCost === 'number' ? repairCost : 0
    const sncDepreciation = calculateDepreciation()
    const insuranceDepreciation = Math.round(sncDepreciation.max * 0.6) // 60% vom SNC-Wert

    const sncNutzungsausfall = Math.round(costValue * 0.09) // ~9% der Reparaturkosten

    return {
      insurance: {
        repair: costValue,
        depreciation: insuranceDepreciation,
        nutzungsausfall: 0,
        total: costValue + insuranceDepreciation
      },
      snc: {
        repair: costValue,
        depreciation: sncDepreciation.max,
        nutzungsausfall: sncNutzungsausfall,
        total: costValue + sncDepreciation.max + sncNutzungsausfall
      }
    }
  }

  const handleCalculate = () => {
    const calculated = calculateDepreciation()
    setResult(calculated)
    setShowResult(true)

    if (activeTab === 'vergleich') {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    } else {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }
  }

  const resetCalculator = () => {
    setStep(1)
    setShowResult(false)
    setBrand('')
    setYear(2020)
    setKm(50000)
    setRepairCost(5000)
    setDamage('mittel')
  }

  const comparison = calculateComparison()
  const loss = comparison.snc.total - comparison.insurance.total
  const percentIncrease = Math.round(((comparison.snc.depreciation - comparison.insurance.depreciation) / comparison.insurance.depreciation) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-snc-light-gray to-white">
      {showConfetti && activeTab === 'vergleich' && <Confetti recycle={false} numberOfPieces={300} />}
      {showConfetti && activeTab === 'wertminderung' && <Confetti recycle={false} numberOfPieces={200} />}

      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
              <Link href="/ueber-snc" className="text-snc-gray hover:text-snc-dark transition-colors hidden md:block py-2">
                Über SNC
              </Link>
              <Link href="/faq" className="text-snc-gray hover:text-snc-dark transition-colors hidden md:block py-2">
                FAQ
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Social Proof Counter */}
        <SocialProofCounter />

        {/* Tab System */}
        <div className="flex gap-2 mb-8 bg-white rounded-2xl p-2 shadow-lg">
          <button
            onClick={() => {
              setActiveTab('wertminderung')
              resetCalculator()
            }}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'wertminderung'
                ? 'bg-snc-yellow text-snc-dark shadow-md'
                : 'text-snc-gray hover:bg-snc-light-gray'
            }`}
          >
            💰 Wertminderung
          </button>
          <button
            onClick={() => {
              setActiveTab('vergleich')
              resetCalculator()
            }}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'vergleich'
                ? 'bg-snc-yellow text-snc-dark shadow-md'
                : 'text-snc-gray hover:bg-snc-light-gray'
            }`}
          >
            ⚖️ Vergleich
          </button>
        </div>

        {!showResult ? (
          <>
            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-snc-gray">Schritt {step} von 3</div>
                <div className="text-sm text-snc-gray">{Math.round((step / 3) * 100)}%</div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-snc-yellow to-yellow-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-snc-yellow/15 text-snc-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" />
                Kostenloser Rechner
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-snc-dark mb-4">
                {activeTab === 'wertminderung' ? 'Wertminderungs-Rechner' : 'Vergleichs-Rechner'}
              </h1>
              <p className="text-xl text-snc-gray">
                {activeTab === 'wertminderung'
                  ? 'Prüfen Sie in 60 Sekunden, wie viel Ihnen zusteht'
                  : 'Sehen Sie den Unterschied zwischen Versicherungs- und unabhängigem Gutachter'
                }
              </p>
            </motion.div>

            {/* Form */}
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <AnimatePresence mode="wait">
                {/* Step 1: Fahrzeugdaten */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 bg-snc-yellow rounded-xl flex items-center justify-center">
                        <Car className="w-6 h-6 text-snc-dark" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-snc-dark">Fahrzeugdaten</h2>
                        <p className="text-snc-gray">Grundlegende Informationen</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Brand */}
                      <div>
                        <label className="block text-sm font-semibold text-snc-dark mb-2">
                          Marke & Modell
                        </label>
                        <select
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-snc-yellow focus:ring-0 transition-colors text-lg touch-target"
                        >
                          <option value="">Wählen Sie eine Marke...</option>
                          {CAR_BRANDS.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>

                      {/* Year */}
                      <div>
                        <label className="block text-sm font-semibold text-snc-dark mb-2">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Erstzulassung: <span className="text-snc-dark font-bold">{year}</span>
                        </label>
                        <input
                          type="range"
                          min="2000"
                          max={new Date().getFullYear()}
                          value={year}
                          onChange={(e) => setYear(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-snc-yellow"
                        />
                        <div className="flex justify-between text-xs text-snc-gray mt-1">
                          <span>2000</span>
                          <span>{new Date().getFullYear()}</span>
                        </div>
                      </div>

                      {/* KM */}
                      <div>
                        <label className="block text-sm font-semibold text-snc-dark mb-2">
                          <Gauge className="w-4 h-4 inline mr-2" />
                          Kilometerstand: <span className="text-snc-dark font-bold">{km.toLocaleString('de-DE')} km</span>
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="300000"
                          step="5000"
                          value={km}
                          onChange={(e) => setKm(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-snc-yellow"
                        />
                        <div className="flex justify-between text-xs text-snc-gray mt-1">
                          <span>0 km</span>
                          <span>300.000 km</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Schadensinfo */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 bg-snc-yellow rounded-xl flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-snc-dark" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-snc-dark">Schadensinfo</h2>
                        <p className="text-snc-gray">Details zum Unfallschaden</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Repair Cost */}
                      <div>
                        <label className="block text-sm font-semibold text-snc-dark mb-2">
                          <Euro className="w-4 h-4 inline mr-2" />
                          Geschätzte Reparaturkosten
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={repairCost}
                            onChange={(e) => {
                              const value = e.target.value
                              setRepairCost(value === '' ? '' : parseInt(value) || 0)
                            }}
                            className="w-full px-4 py-5 pl-12 border-2 border-gray-200 rounded-xl focus:border-snc-yellow focus:ring-0 transition-colors text-2xl font-bold text-snc-dark touch-target"
                            placeholder="5000"
                            inputMode="numeric"
                          />
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-snc-gray">
                            €
                          </div>
                        </div>
                        <p className="text-xs text-snc-gray mt-2">
                          💡 Tipp: Auch grobe Schätzungen sind ok
                        </p>
                      </div>

                      {/* Damage Extent */}
                      <div>
                        <label className="block text-sm font-semibold text-snc-dark mb-4">
                          Schadensumfang
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { value: 'klein', label: 'Klein', icon: '🔧', desc: 'Kratzer, Delle' },
                            { value: 'mittel', label: 'Mittel', icon: '🚗', desc: 'Stoßstange, Tür' },
                            { value: 'groß', label: 'Groß', icon: '⚠️', desc: 'Mehrere Teile' }
                          ].map((d) => (
                            <motion.button
                              key={d.value}
                              type="button"
                              onClick={() => setDamage(d.value as any)}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                damage === d.value
                                  ? 'border-snc-yellow bg-snc-yellow/15'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="text-3xl mb-2">{d.icon}</div>
                              <div className="font-bold text-snc-dark mb-1">{d.label}</div>
                              <div className="text-xs text-snc-gray">{d.desc}</div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Übersicht oder Vergleich */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 bg-snc-yellow rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-snc-dark" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-snc-dark">Ihre Angaben</h2>
                        <p className="text-snc-gray">Bitte überprüfen Sie Ihre Daten</p>
                      </div>
                    </div>

                    <div className="bg-snc-light-gray rounded-2xl p-6 space-y-4 mb-8">
                      <div className="flex justify-between">
                        <span className="text-snc-gray">Fahrzeug:</span>
                        <span className="font-semibold text-snc-dark">{brand || 'Keine Angabe'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-snc-gray">Erstzulassung:</span>
                        <span className="font-semibold text-snc-dark">{year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-snc-gray">Kilometerstand:</span>
                        <span className="font-semibold text-snc-dark">{km.toLocaleString('de-DE')} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-snc-gray">Reparaturkosten:</span>
                        <span className="font-semibold text-snc-dark">{typeof repairCost === 'number' ? repairCost.toLocaleString('de-DE') : '0'}€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-snc-gray">Schadensumfang:</span>
                        <span className="font-semibold text-snc-dark capitalize">{damage}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <strong>Hinweis:</strong> Dies ist eine Schätzung. Ein offizielles Gutachten gibt Ihnen
                          den exakten Wert und ist für Versicherungen verbindlich.
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <motion.button
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 px-6 py-4 border-2 border-gray-300 text-snc-dark rounded-xl font-semibold hover:bg-gray-50 transition-colors touch-target text-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Zurück
                  </motion.button>
                )}

                {step < 3 ? (
                  <motion.button
                    onClick={() => setStep(step + 1)}
                    disabled={step === 1 && !brand}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-snc-yellow text-snc-dark rounded-xl font-semibold hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all touch-target text-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Weiter
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleCalculate}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-5 bg-gradient-to-r from-snc-yellow to-yellow-400 text-snc-dark rounded-xl font-bold hover:shadow-glow-lg transition-all text-xl touch-target"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sparkles className="w-6 h-6" />
                    Jetzt berechnen!
                  </motion.button>
                )}
              </div>
            </motion.div>
          </>
        ) : (
          /* Results */
          <>
            {activeTab === 'wertminderung' ? (
              /* Original Wertminderung Result */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  className="inline-block mb-8"
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-6xl">🎉</div>
                </motion.div>

                <h2 className="text-3xl font-bold text-snc-dark mb-4">Ihre geschätzte Wertminderung:</h2>

                <motion.div
                  className="bg-gradient-to-br from-snc-yellow to-yellow-300 rounded-3xl p-12 mb-8 shadow-2xl"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <div className="text-6xl lg:text-8xl font-black text-snc-dark mb-4">
                    <CountUp end={result.min} /> - <CountUp end={result.max} />
                  </div>
                  <div className="text-xl text-snc-dark/80">
                    Das bedeutet: Neben den <strong>{typeof repairCost === 'number' ? repairCost.toLocaleString('de-DE') : '0'}€</strong> Reparaturkosten
                    stehen Ihnen zusätzlich bis zu <strong>{result.max.toLocaleString('de-DE')}€</strong> Wertminderung zu!
                  </div>
                </motion.div>

                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                    <div className="text-left">
                      <h3 className="font-bold text-green-900 mb-2">Lassen Sie sich diese {result.max.toLocaleString('de-DE')}€ nicht entgehen!</h3>
                      <p className="text-green-800">
                        Ein offizielles Gutachten von uns sichert Ihnen diese Ansprüche.
                        Die Versicherung zahlt das Gutachten – für Sie <strong>völlig kostenlos</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <motion.a
                    href="tel:+4915209423739"
                    className="flex-1 bg-snc-dark text-white px-6 sm:px-8 py-5 rounded-xl font-bold hover:bg-snc-dark-2 transition-all flex items-center justify-center gap-3 text-lg touch-target"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Jetzt anrufen"
                  >
                    <Phone className="w-6 h-6" />
                    <span className="hidden xs:inline">Jetzt anrufen</span>
                    <span className="xs:hidden">Anrufen</span>
                  </motion.a>
                  <motion.a
                    href="https://wa.me/4915209423739"
                    className="flex-1 bg-green-500 text-white px-6 sm:px-8 py-5 rounded-xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-3 text-lg touch-target"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="WhatsApp Kontakt"
                  >
                    <MessageCircle className="w-6 h-6" />
                    WhatsApp
                  </motion.a>
                </div>

                <button
                  onClick={resetCalculator}
                  className="text-snc-gray hover:text-snc-dark transition-colors underline"
                >
                  Neue Berechnung starten
                </button>
              </motion.div>
            ) : (
              /* COMPARISON RESULT - DRAMATIC! */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl mx-auto"
              >
                <h2 className="text-3xl font-bold text-snc-dark mb-2 text-center">Was bekommen Sie?</h2>
                <p className="text-snc-gray text-center mb-8">Der dramatische Unterschied</p>

                <div className="space-y-6">
                  {/* Insurance Gutachter */}
                  <motion.div
                    className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">😐</span>
                      <h3 className="text-xl font-bold text-gray-700">Versicherungs-Gutachter</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>├─ Reparatur:</span>
                        <span className="font-semibold"><CountUp end={comparison.insurance.repair} /></span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>├─ Wertminderung:</span>
                        <span className="font-semibold"><CountUp end={comparison.insurance.depreciation} /></span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>└─ Nutzungsausfall:</span>
                        <span className="font-semibold">0€</span>
                      </div>
                      <div className="border-t-2 border-gray-300 pt-3 flex justify-between items-center">
                        <span className="font-bold text-gray-900">GESAMT:</span>
                        <span className="text-2xl font-black text-gray-900">
                          <CountUp end={comparison.insurance.total} />
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Divider */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                    <span className="text-snc-gray font-semibold">VS</span>
                    <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                  </div>

                  {/* SNC Gutachter - WITH GLOW! */}
                  <motion.div
                    className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 rounded-2xl p-6 relative overflow-hidden"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-snc-yellow/20 to-green-400/20 blur-2xl"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                      }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🎉</span>
                        <h3 className="text-xl font-bold text-green-900">SNC Gutachter</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-green-800">
                          <span>├─ Reparatur:</span>
                          <span className="font-semibold"><CountUp end={comparison.snc.repair} /></span>
                        </div>
                        <div className="flex justify-between text-green-800">
                          <span>├─ Wertminderung:</span>
                          <span className="font-semibold">
                            <CountUp end={comparison.snc.depreciation} />
                            <span className="text-green-600 text-sm ml-2">(+{percentIncrease}%)</span>
                          </span>
                        </div>
                        <div className="flex justify-between text-green-800">
                          <span>├─ Nutzungsausfall:</span>
                          <span className="font-semibold"><CountUp end={comparison.snc.nutzungsausfall} /></span>
                        </div>
                        <div className="border-t-2 border-green-400 pt-3 flex justify-between items-center">
                          <span className="font-bold text-green-900">GESAMT:</span>
                          <span className="text-2xl font-black text-green-900">
                            <CountUp end={comparison.snc.total} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Loss Warning - BLINKING! */}
                  <motion.div
                    className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center justify-center gap-4">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [1, 0.7, 1]
                        }}
                        transition={{
                          repeat: 3,
                          duration: 0.5
                        }}
                      >
                        <TrendingDown className="w-10 h-10" />
                      </motion.div>
                      <div className="text-center">
                        <p className="text-sm font-semibold mb-1">⚠️ SIE VERLIEREN</p>
                        <motion.p
                          className="text-4xl font-black"
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            repeat: 3,
                            duration: 0.5
                          }}
                        >
                          -{loss.toLocaleString('de-DE')}€
                        </motion.p>
                        <p className="text-sm mt-1">mit Versicherungs-Gutachter!</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    className="bg-snc-dark text-white rounded-2xl p-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <TrendingUp className="w-12 h-12 text-snc-yellow mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">
                      Holen Sie sich die vollen {loss.toLocaleString('de-DE')}€!
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Ein unabhängiges Gutachten von SNC sichert Ihnen {loss.toLocaleString('de-DE')}€ mehr.
                      <strong> Kostenlos für Sie</strong> - die Versicherung zahlt!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.a
                        href="tel:+4915209423739"
                        className="flex-1 bg-snc-yellow text-snc-dark px-6 sm:px-8 py-5 rounded-xl font-bold hover:shadow-glow-lg transition-all flex items-center justify-center gap-3 text-lg touch-target"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Jetzt anrufen"
                      >
                        <Phone className="w-6 h-6" />
                        <span className="hidden xs:inline">Jetzt anrufen</span>
                        <span className="xs:hidden">Anrufen</span>
                      </motion.a>
                      <motion.a
                        href="https://wa.me/4915209423739"
                        className="flex-1 bg-green-500 text-white px-6 sm:px-8 py-5 rounded-xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-3 text-lg touch-target"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="WhatsApp Kontakt"
                      >
                        <MessageCircle className="w-6 h-6" />
                        WhatsApp
                      </motion.a>
                    </div>
                  </motion.div>
                </div>

                <button
                  onClick={resetCalculator}
                  className="text-snc-gray hover:text-snc-dark transition-colors underline mt-8 block mx-auto"
                >
                  Neue Berechnung starten
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-snc-dark text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 SNC Gutachter · <Link href="/impressum" className="hover:text-snc-yellow">Impressum</Link> · <Link href="/datenschutz" className="hover:text-snc-yellow">Datenschutz</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
