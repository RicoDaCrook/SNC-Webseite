'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { CheckCircle, Clock, Car, Phone, Download } from 'lucide-react'
import Image from 'next/image'

interface Case {
  id: string
  name: string
  vehicle: string
  status: string
  pdf_url?: string
  created_at: string
  updated_at: string
}

export default function StatusPage({ params }: { params: { token: string } }) {
  const [caseData, setCaseData] = useState<Case | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCaseData()
  }, [params.token])

  async function loadCaseData() {
    try {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('status_token', params.token)
        .single()

      if (error) throw error
      setCaseData(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-snc-light-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-snc-yellow mx-auto mb-4"></div>
          <p className="text-snc-gray">Lade Status...</p>
        </div>
      </div>
    )
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-snc-light-gray flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-snc-dark mb-2">Fall nicht gefunden</h1>
          <p className="text-snc-gray mb-6">Dieser Status-Link ist ungültig oder abgelaufen.</p>
          <a href="/" className="text-snc-yellow hover:underline">
            Zur Startseite →
          </a>
        </div>
      </div>
    )
  }

  const steps = [
    { key: 'termin_vereinbart', label: 'Termin vereinbart', icon: Phone },
    { key: 'besichtigung_durchgefuehrt', label: 'Besichtigung durchgeführt', icon: Car },
    { key: 'in_bearbeitung', label: 'Gutachten in Bearbeitung', icon: Clock },
    { key: 'fertiggestellt', label: 'Fertiggestellt', icon: CheckCircle },
  ]

  const currentStepIndex = steps.findIndex(s => s.key === caseData.status)

  return (
    <div className="min-h-screen bg-snc-light-gray py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Image src="/images/snclogo.png" alt="SNC Logo" width={80} height={80} className="mx-auto mb-4 rounded-xl" />
          <h1 className="text-4xl font-bold text-snc-dark mb-2">Status Ihres Gutachtens</h1>
          <p className="text-snc-gray">Verfolgen Sie hier den Fortschritt in Echtzeit</p>
        </div>

        {/* Case Info Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-snc-yellow/10 rounded-xl flex items-center justify-center">
              <Car className="w-8 h-8 text-snc-yellow" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-snc-dark">{caseData.name}</h2>
              <p className="text-snc-gray">{caseData.vehicle}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="text-sm text-snc-gray mb-2">Aktueller Status:</div>
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-lg ${
              caseData.status === 'fertiggestellt' ? 'bg-green-100 text-green-700' :
              caseData.status === 'in_bearbeitung' ? 'bg-blue-100 text-blue-700' :
              caseData.status === 'besichtigung_durchgefuehrt' ? 'bg-purple-100 text-purple-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {getStatusIcon(caseData.status)}
              {getStatusText(caseData.status)}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-snc-dark mb-8">Fortschritt</h3>
          
          <div className="space-y-6">
            {steps.map((step, index) => {
              const isComplete = index <= currentStepIndex
              const isCurrent = index === currentStepIndex
              const Icon = step.icon

              return (
                <div key={step.key} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    isComplete 
                      ? 'bg-snc-yellow shadow-glow' 
                      : 'bg-gray-200'
                  }`}>
                    {isComplete ? (
                      <Icon className={`w-6 h-6 ${isCurrent ? 'text-snc-dark' : 'text-snc-dark/70'}`} />
                    ) : (
                      <span className="text-gray-400">{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className={`font-semibold ${isComplete ? 'text-snc-dark' : 'text-gray-400'}`}>
                      {step.label}
                    </div>
                    {isCurrent && (
                      <div className="text-sm text-snc-yellow font-medium mt-1">
                        ● Aktueller Schritt
                      </div>
                    )}
                    {isComplete && !isCurrent && (
                      <div className="text-sm text-green-600 mt-1">
                        ✓ Abgeschlossen
                      </div>
                    )}
                  </div>

                  {index < steps.length - 1 && (
                    <div className={`h-16 w-1 ml-6 -mb-12 ${
                      isComplete ? 'bg-snc-yellow' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* PDF Download */}
        {caseData.status === 'fertiggestellt' && caseData.pdf_url && (
          <div className="bg-gradient-to-br from-snc-yellow to-yellow-300 rounded-2xl p-8 shadow-lg text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-snc-dark mb-4">Ihr Gutachten ist fertig!</h3>
            <p className="text-snc-dark/80 mb-6">Sie können es jetzt herunterladen und verwenden.</p>
            <a
              href={caseData.pdf_url}
              download
              className="inline-flex items-center gap-3 bg-snc-dark text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-snc-dark-2 transition-all shadow-lg"
            >
              <Download className="w-6 h-6" />
              Gutachten herunterladen (PDF)
            </a>
          </div>
        )}

        {/* Contact Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mt-8 text-center">
          <h3 className="text-xl font-bold text-snc-dark mb-4">Fragen zu Ihrem Gutachten?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+4915209423739"
              className="flex items-center justify-center gap-2 bg-snc-yellow text-snc-dark px-6 py-3 rounded-lg font-semibold hover:shadow-glow transition-all"
            >
              <Phone className="w-5 h-5" />
              +49 1520 9423739
            </a>
            <a
              href="https://wa.me/4915209423739"
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-snc-gray">
          <p>Erstellt am {new Date(caseData.created_at).toLocaleDateString('de-DE', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
          })}</p>
          <p className="mt-2">
            <a href="/" className="text-snc-yellow hover:underline">
              ← Zurück zur Startseite
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

function getStatusText(status: string) {
  switch (status) {
    case 'termin_vereinbart': return 'Termin vereinbart'
    case 'besichtigung_durchgefuehrt': return 'Besichtigung durchgeführt'
    case 'in_bearbeitung': return 'In Bearbeitung'
    case 'fertiggestellt': return 'Fertiggestellt'
    default: return status
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'fertiggestellt': return '✓'
    case 'in_bearbeitung': return '⏳'
    case 'besichtigung_durchgefuehrt': return '🚗'
    default: return '📞'
  }
}
