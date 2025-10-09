import { Shield, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function DatenschutzPage() {
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
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-snc-yellow/10 rounded-xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-snc-yellow" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-snc-dark">Datenschutzerklärung</h1>
            <p className="text-snc-gray">Stand: Januar 2025</p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-snc-dark mb-4">1. Datenschutz auf einen Blick</h2>
            
            <h3 className="text-xl font-semibold text-snc-dark mb-3">Allgemeine Hinweise</h3>
            <p className="text-snc-gray mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h3 className="text-xl font-semibold text-snc-dark mb-3">Datenerfassung auf dieser Website</h3>
            <p className="text-snc-gray mb-2">
              <strong className="text-snc-dark">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
            </p>
            <p className="text-snc-gray mb-4">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
              Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>

            <p className="text-snc-gray mb-2">
              <strong className="text-snc-dark">Wie erfassen wir Ihre Daten?</strong>
            </p>
            <p className="text-snc-gray mb-4">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei 
              kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben oder 
              wenn Sie telefonisch einen Gutachtenauftrag erteilen.
            </p>
            <p className="text-snc-gray mb-4">
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website 
              durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. 
              Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>

            <p className="text-snc-gray mb-2">
              <strong className="text-snc-dark">Wofür nutzen wir Ihre Daten?</strong>
            </p>
            <p className="text-snc-gray mb-4">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu 
              gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. 
              Die meisten Daten nutzen wir zur Abwicklung Ihres Gutachtenauftrags.
            </p>

            <p className="text-snc-gray mb-2">
              <strong className="text-snc-dark">Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>
            </p>
            <p className="text-snc-gray">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und 
              Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein 
              Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu 
              weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum 
              angegebenen Adresse an uns wenden.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-snc-dark mb-4">2. Hosting und Content Delivery Networks (CDN)</h2>
            
            <h3 className="text-xl font-semibold text-snc-dark mb-3">Externes Hosting</h3>
            <p className="text-snc-gray mb-4">
              Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die 
              personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern 
              des Hosters gespeichert.
            </p>
            <p className="text-snc-gray mb-4">
              <strong className="text-snc-dark">Vercel Inc.</strong><br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789<br />
              USA
            </p>
            <p className="text-snc-gray mb-4">
              Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren 
              potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse 
              einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots 
              durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
            <p className="text-snc-gray">
              Unser Hoster wird Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner 
              Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-snc-dark mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            
            <h3 className="text-xl font-semibold text-snc-dark mb-3">Datenschutz</h3>
            <p className="text-snc-gray mb-4">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir 
              behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen 
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>

            <h3 className="text-xl font-semibold text-snc-dark mb-3">Hinweis zur verantwortlichen Stelle</h3>
            <div className="bg-snc-light-gray rounded-xl p-6 mb-6">
              <p className="text-snc-gray mb-2">
                <strong className="text-snc-dark">Verantwortliche Stelle:</strong>
              </p>
              <p className="text-snc-dark mb-1">SNC Gutachter</p>
              <p className="text-snc-gray mb-1">Ilker Sancar</p>
              <p className="text-snc-gray mb-1">Rohrackerstraße 5</p>
              <p className="text-snc-gray mb-4">73029 Stuttgart</p>
              
              <div className="space-y-2">
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

            <h3 className="text-xl font-semibold text-snc-dark mb-3">Speicherdauer</h3>
            <p className="text-snc-gray mb-4">
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt 
              wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die 
              Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen 
              oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, 
              sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer 
              personenbezogenen Daten haben (z.B. steuer- oder handelsrechtliche Aufbewahrungsfristen).
            </p>

            <h3 className="text-xl font-semibold text-snc-dark mb-3">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p className="text-snc-gray mb-4">
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. 
              Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit 
              der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>

            <h3 className="text-xl font-semibold text-snc-dark mb-3">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
            <p className="text-snc-gray mb-4">
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei 
              einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, 
              ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu.
            </p>
            <p className="text-snc-gray">
              <strong className="text-snc-dark">Zuständige Aufsichtsbehörde:</strong><br />
              Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg<br />
              Königstraße 10a<br />
              70173 Stuttgart
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-snc-dark mb-4">4. Datenerfassung auf dieser Website</h2>
            
            <h3 className="text-xl font-semibold text-snc-dark mb-3">Server-Log-Dateien</h3>
            <p className="text-snc-gray mb-4">
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten 
              Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-disc list-inside text-snc-gray mb-4 space-y-1">
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p className="text-snc-gray">
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. 
              Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-snc-dark mb-4">5. Plugins und Tools</h2>
            
            <h3 className="text-xl font-semibold text-snc-dark mb-3">Supabase (Datenbank & Storage)</h3>
            <p className="text-snc-gray mb-4">
              Wir nutzen Supabase für die Speicherung von Gutachten-Daten und hochgeladenen Dokumenten. 
              Anbieter ist Supabase Inc., mit Servern in der Europäischen Union (Frankfurt, Deutschland).
            </p>
            <p className="text-snc-gray mb-4">
              Gespeichert werden:
            </p>
            <ul className="list-disc list-inside text-snc-gray mb-4 space-y-1">
              <li>Name, E-Mail, Telefonnummer</li>
              <li>Fahrzeugdaten (Marke, Modell, Kennzeichen)</li>
              <li>Gutachten-PDFs</li>
              <li>Status-Informationen</li>
            </ul>
            <p className="text-snc-gray">
              Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO 
              (Vertragserfüllung) und lit. f DSGVO (berechtigtes Interesse an effizienter Verwaltung).
            </p>

            <h3 className="text-xl font-semibold text-snc-dark mb-3 mt-8">Resend (E-Mail-Versand)</h3>
            <p className="text-snc-gray mb-4">
              Für den Versand von Benachrichtigungs-E-Mails nutzen wir Resend. Anbieter ist Resend, Inc., USA.
            </p>
            <p className="text-snc-gray mb-4">
              Übermittelt werden:
            </p>
            <ul className="list-disc list-inside text-snc-gray mb-4 space-y-1">
              <li>E-Mail-Adresse des Empfängers</li>
              <li>Name des Empfängers</li>
              <li>E-Mail-Inhalt (Status-Updates, Links)</li>
            </ul>
            <p className="text-snc-gray">
              Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO 
              (Vertragserfüllung). Die E-Mails enthalten keine sensiblen Daten, sondern nur 
              Status-Informationen und Download-Links.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-snc-dark mb-4">6. Ihre Rechte</h2>
            
            <p className="text-snc-gray mb-4">
              Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
            </p>
            
            <div className="space-y-4">
              <div className="bg-snc-light-gray rounded-lg p-4">
                <h4 className="font-semibold text-snc-dark mb-2">Recht auf Auskunft (Art. 15 DSGVO)</h4>
                <p className="text-snc-gray text-sm">
                  Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.
                </p>
              </div>
              
              <div className="bg-snc-light-gray rounded-lg p-4">
                <h4 className="font-semibold text-snc-dark mb-2">Recht auf Berichtigung (Art. 16 DSGVO)</h4>
                <p className="text-snc-gray text-sm">
                  Sie können die Berichtigung unrichtiger oder Vervollständigung Ihrer Daten verlangen.
                </p>
              </div>
              
              <div className="bg-snc-light-gray rounded-lg p-4">
                <h4 className="font-semibold text-snc-dark mb-2">Recht auf Löschung (Art. 17 DSGVO)</h4>
                <p className="text-snc-gray text-sm">
                  Sie können die Löschung Ihrer Daten verlangen, sofern keine Aufbewahrungspflichten bestehen.
                </p>
              </div>
              
              <div className="bg-snc-light-gray rounded-lg p-4">
                <h4 className="font-semibold text-snc-dark mb-2">Recht auf Einschränkung (Art. 18 DSGVO)</h4>
                <p className="text-snc-gray text-sm">
                  Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen.
                </p>
              </div>
              
              <div className="bg-snc-light-gray rounded-lg p-4">
                <h4 className="font-semibold text-snc-dark mb-2">Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</h4>
                <p className="text-snc-gray text-sm">
                  Sie können verlangen, dass wir Ihre Daten in einem strukturierten Format an Sie übergeben.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
              <h4 className="font-semibold text-blue-900 mb-2">Kontakt für Datenschutzfragen</h4>
              <p className="text-blue-800 mb-4">
                Für alle Anfragen zum Datenschutz wenden Sie sich bitte an:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <a href="mailto:kontakt@snc-svb.de" className="text-blue-900 hover:underline">
                    kontakt@snc-svb.de
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <a href="tel:+4915209423739" className="text-blue-900 hover:underline">
                    +49 1520 9423739
                  </a>
                </div>
              </div>
            </div>
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
            © 2025 SNC Gutachter · <Link href="/impressum" className="hover:text-snc-yellow">Impressum</Link> · <Link href="/faq" className="hover:text-snc-yellow">FAQ</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
