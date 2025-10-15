'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calculator, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Confetti from 'react-confetti'

export default function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Check if popup was already shown in this session
    const shown = sessionStorage.getItem('exitIntentShown')
    if (shown) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse is moving towards top of window (exit intent)
      if (e.clientY <= 0 && !hasShown && !showPopup) {
        setShowPopup(true)
        setShowConfetti(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')

        // Stop confetti after 3 seconds
        setTimeout(() => setShowConfetti(false), 3000)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [hasShown, showPopup])

  const handleClose = () => {
    setShowPopup(false)
    setShowConfetti(false)
  }

  return (
    <>
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      <AnimatePresence>
        {showPopup && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
              onClick={handleClose}
            />

            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md mx-4"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 relative">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Content */}
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 10, 0] }}
                    transition={{ duration: 0.5, repeat: 2 }}
                    className="inline-block mb-4"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-4xl">✋</span>
                    </div>
                  </motion.div>

                  <h2 className="text-3xl font-bold text-snc-dark mb-4">
                    WARTEN SIE!
                  </h2>

                  <div className="bg-gradient-to-br from-snc-yellow to-yellow-300 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-snc-dark" />
                      <span className="font-bold text-snc-dark">KOSTENLOS</span>
                      <Sparkles className="w-5 h-5 text-snc-dark" />
                    </div>
                    <p className="text-lg font-semibold text-snc-dark">
                      Holen Sie sich Ihre
                    </p>
                    <p className="text-2xl font-black text-snc-dark">
                      Wertminderungs-Berechnung!
                    </p>
                  </div>

                  <p className="text-gray-600 mb-6">
                    In nur 60 Sekunden erfahren Sie, wie viel Ihnen zusteht.
                    <strong className="text-snc-dark"> Völlig kostenlos!</strong>
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/rechner"
                      onClick={handleClose}
                      className="bg-gradient-to-r from-snc-yellow to-yellow-400 text-snc-dark px-8 py-4 rounded-xl font-bold text-lg hover:shadow-glow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Calculator className="w-5 h-5" />
                      Zum Rechner
                    </Link>

                    <button
                      onClick={handleClose}
                      className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                    >
                      Nein danke, ich verzichte auf mein Geld
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
