import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-snc-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/images/snclogo.png" alt="SNC Logo" width={40} height={40} className="rounded-lg" />
              <div>
                <div className="font-bold">SNC Gutachter</div>
                <div className="text-xs text-gray-400">Öffentlich bestellt & vereidigt</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Unabhängige KFZ-Gutachten in Stuttgart und Umgebung. 
              Ihr Partner für professionelle Schadensbewertung.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Schnellzugriff</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#prozess" className="text-gray-400 hover:text-snc-yellow transition-colors">
                  Unser Prozess
                </Link>
              </li>
              <li>
                <Link href="/rechner" className="text-gray-400 hover:text-snc-yellow transition-colors">
                  Wertminderungs-Rechner
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-snc-yellow transition-colors">
                  Häufige Fragen (FAQ)
                </Link>
              </li>
              <li>
                <a href="/#kontakt" className="text-gray-400 hover:text-snc-yellow transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-snc-yellow flex-shrink-0 mt-0.5" />
                <div className="text-gray-400">
                  <div>Rohrackerstraße 5</div>
                  <div>73029 Stuttgart</div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-snc-yellow flex-shrink-0" />
                <a href="tel:+4915209423739" className="text-gray-400 hover:text-snc-yellow transition-colors">
                  +49 1520 9423739
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-snc-yellow flex-shrink-0" />
                <a href="mailto:kontakt@snc-svb.de" className="text-gray-400 hover:text-snc-yellow transition-colors">
                  kontakt@snc-svb.de
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-bold mb-4">Erreichbarkeit</h3>
            <div className="flex items-start gap-3 text-sm">
              <Clock className="w-5 h-5 text-snc-yellow flex-shrink-0 mt-0.5" />
              <div className="text-gray-400">
                <div className="font-semibold text-white mb-2">24/7 für Sie da</div>
                <div>Notfall-Hotline:</div>
                <div>Täglich erreichbar</div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="text-xs text-gray-500 mb-2">Kooperationspartner:</div>
              <div className="text-sm text-gray-400">Güzel Anwaltskanzlei</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>
              © 2025 SNC Gutachter · Ilker Sancar · Alle Rechte vorbehalten
            </div>
            <div className="flex gap-6">
              <Link href="/impressum" className="hover:text-snc-yellow transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="hover:text-snc-yellow transition-colors">
                Datenschutz
              </Link>
              <Link href="/faq" className="hover:text-snc-yellow transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
