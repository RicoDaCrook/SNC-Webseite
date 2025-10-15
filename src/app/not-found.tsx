'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Phone, FileText, Calculator, MessageCircle } from 'lucide-react'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-snc-dark via-snc-dark-2 to-snc-dark flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/snclogo.png"
              alt="SNC Logo"
              width={80}
              height={80}
              className="rounded-lg"
              priority
            />
          </div>

          {/* 404 Text */}
          <h1 className="text-9xl font-bold text-snc-yellow mb-4">404</h1>
          <h2 className="text-3xl font-bold text-white mb-4">
            Seite nicht gefunden
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Die von Ihnen gesuchte Seite existiert leider nicht oder wurde verschoben.
          </p>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all cursor-pointer border border-white/20"
              >
                <Home className="w-8 h-8 text-snc-yellow mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">Zur Startseite</h3>
                <p className="text-sm text-gray-300">Zurück zur Hauptseite</p>
              </motion.div>
            </Link>

            <Link href="/rechner">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all cursor-pointer border border-white/20"
              >
                <Calculator className="w-8 h-8 text-snc-yellow mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">Rechner</h3>
                <p className="text-sm text-gray-300">Wertminderung berechnen</p>
              </motion.div>
            </Link>

            <Link href="/faq">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all cursor-pointer border border-white/20"
              >
                <MessageCircle className="w-8 h-8 text-snc-yellow mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">FAQ</h3>
                <p className="text-sm text-gray-300">Häufige Fragen</p>
              </motion.div>
            </Link>

            <Link href="/ueber-snc">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all cursor-pointer border border-white/20"
              >
                <FileText className="w-8 h-8 text-snc-yellow mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">Über SNC</h3>
                <p className="text-sm text-gray-300">Mehr über uns erfahren</p>
              </motion.div>
            </Link>
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-snc-yellow/10 border-2 border-snc-yellow rounded-2xl p-6"
          >
            <Phone className="w-12 h-12 text-snc-yellow mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Brauchen Sie Hilfe?
            </h3>
            <p className="text-gray-300 mb-4">
              Rufen Sie uns direkt an - wir sind 24/7 für Sie da!
            </p>
            <a
              href="tel:+4915209423739"
              className="inline-block bg-snc-yellow text-snc-dark px-8 py-3 rounded-lg font-bold text-lg hover:shadow-glow transition-all"
            >
              +49 1520 9423739
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
