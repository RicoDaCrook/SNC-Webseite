import { Phone, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ImpressumPage() {
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
            <Link href="/" className="text-snc-yellow hover:text-white transition-colors">
              Zur Startseite →
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-snc-dark mb-8">Impressum</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-snc-dark mb-4">Angaben gemäß § 5 TMG</h2>
            
            <div className="bg-snc-light-gray rounded-xl p-6 mb-6">
              <p className="font-bold text-snc-dark mb-2">SNC Gutachter</p>
              <p className="text-snc-gray mb-1">Inhaber: Ilker Sancar</p>
              <div className="space-y-3 mt-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-snc-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-snc-dark">Rohrackerstraße 5</p>
                    <p className="text-snc-dark">73029 Stuttgart</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-snc-yellow flex-shrink-0" />
                  <a href="tel:+4915209423739" className="text-snc-dark hover:text-snc-yellow">
                    +49 1520 9423739
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-snc-yellow flex-shrink-0" />
                  <a href="mailto:kontakt@snc-svb.de" className="text-snc-dark hover:text-snc-yellow">
                    kontakt@snc-svb.de
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-snc-dark mb-4">Berufsbezeichnung</h2>
            <p className="text-snc-gray mb-4">
              <strong className="text-snc-dark">Kfz-Sachverständiger</strong><br />
              Öffentlich bestellt und vereidigt
            </p>
            <p className="text-snc-gray">
              <strong className="text-snc-dark">Zuständige Kammer:</strong><br />
              IHK Region Stuttgart<br />
              Jägerstraße 30<br />
              70174 Stuttgart
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-snc-dark mb-4">Berufshaftpflichtversicherung</h2>
            <p className="text-snc-gray">
              <strong className="text-snc-dark">Versicherer:</strong><br />
              [Versicherungsname]<br />
              [Adresse]<br />
              [PLZ Ort]
            </p>
            <p className="text-snc-gray mt-4">
              <strong className="text-snc-dark">Geltungsbereich:</strong> Deutschland
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-snc-dark mb-4">EU-Streitschlichtung</h2>
            <p className="text-snc-gray">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a 
                href="https://ec.europa.eu/consumers/odr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-snc-yellow hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>.
            </p>
            <p className="text-snc-gray mt-4">
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-snc-dark mb-4">
              Verbraucherstreitbeilegung / Universalschlichtungsstelle
            </h2>
            <p className="text-snc-gray">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-snc-dark mb-4">Haftung für Inhalte</h2>
            <p className="text-snc-gray mb-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
              Tätigkeit hinweisen.
            </p>
            <p className="text-snc-gray">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
              allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch 
              erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei 
              Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend 
              entfernen.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-snc-dark mb-4">Haftung für Links</h2>
            <p className="text-snc-gray mb-4">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber 
              der Seiten verantwortlich.
            </p>
            <p className="text-snc-gray">
              Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße 
              überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. 
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete 
              Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von 
              Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-snc-dark mb-4">Urheberrecht</h2>
            <p className="text-snc-gray mb-4">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
              der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
              Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
            <p className="text-snc-gray">
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch 
              gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden 
              die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche 
              gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, 
              bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden 
              wir derartige Inhalte umgehend entfernen.
            </p>
          </section>
        </div>

        {/* Quelle */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-snc-gray text-center">
            Quelle: <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer" className="text-snc-yellow hover:underline">eRecht24</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-snc-dark text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 SNC Gutachter · <Link href="/datenschutz" className="hover:text-snc-yellow">Datenschutz</Link> · <Link href="/faq" className="hover:text-snc-yellow">FAQ</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
