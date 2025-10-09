'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { sendStatusEmail } from '@/lib/resend'
import { Upload, Mail, CheckCircle, Clock, Car, FileText, Plus, X } from 'lucide-react'

interface Case {
  id: string
  name: string
  email: string
  phone: string
  vehicle: string
  status: string
  status_token: string
  created_at: string
  updated_at: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [cases, setCases] = useState<Case[]>([])
  const [showNewCase, setShowNewCase] = useState(false)
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [loading, setLoading] = useState(false)

  // New Case Form
  const [newCase, setNewCase] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    appointment_date: ''
  })

  // Load cases
  useEffect(() => {
    if (isAuthenticated) {
      loadCases()
    }
  }, [isAuthenticated])

  async function loadCases() {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setCases(data)
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      alert('Falsches Passwort!')
    }
  }

  async function handleCreateCase(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      // Generate unique token
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

      const { data, error } = await supabase
        .from('cases')
        .insert([{
          ...newCase,
          status: 'termin_vereinbart',
          status_token: token
        }])
        .select()
        .single()

      if (error) throw error

      // Send confirmation email
      await sendStatusEmail(data.email, data.name, 'termin_vereinbart', token, newCase.appointment_date)

      alert('Fall erfolgreich erstellt! E-Mail wurde versendet.')
      setNewCase({ name: '', email: '', phone: '', vehicle: '', appointment_date: '' })
      setShowNewCase(false)
      loadCases()
    } catch (error) {
      console.error(error)
      alert('Fehler beim Erstellen des Falls')
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusChange(caseId: string, newStatus: string) {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('cases')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', caseId)
        .select()
        .single()

      if (error) throw error

      // Send status update email
      await sendStatusEmail(data.email, data.name, newStatus, data.status_token)

      alert('Status aktualisiert! E-Mail wurde versendet.')
      loadCases()
    } catch (error) {
      console.error(error)
      alert('Fehler beim Aktualisieren')
    } finally {
      setLoading(false)
    }
  }

  async function handlePDFUpload(caseId: string, file: File) {
    setLoading(true)
    try {
      const fileName = `${caseId}_${Date.now()}.pdf`
      
      const { error: uploadError } = await supabase.storage
        .from('gutachten-pdfs')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: publicURL } = supabase.storage
        .from('gutachten-pdfs')
        .getPublicUrl(fileName)

      const { error: updateError } = await supabase
        .from('cases')
        .update({ 
          pdf_url: publicURL.publicUrl,
          status: 'fertiggestellt'
        })
        .eq('id', caseId)

      if (updateError) throw updateError

      // Get case data for email
      const selectedCaseData = cases.find(c => c.id === caseId)
      if (selectedCaseData) {
        await sendStatusEmail(
          selectedCaseData.email, 
          selectedCaseData.name, 
          'fertiggestellt', 
          selectedCaseData.status_token
        )
      }

      alert('PDF hochgeladen! E-Mail wurde versendet.')
      loadCases()
    } catch (error) {
      console.error(error)
      alert('Fehler beim Upload')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-snc-dark flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
          <h1 className="text-3xl font-bold text-snc-dark mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort eingeben"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-snc-yellow focus:border-transparent"
            />
            <button
              type="submit"
              className="w-full bg-snc-yellow text-snc-dark py-3 rounded-lg font-semibold hover:shadow-glow transition-all"
            >
              Einloggen
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-snc-light-gray p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-snc-dark">Admin Dashboard</h1>
          <button
            onClick={() => setShowNewCase(!showNewCase)}
            className="bg-snc-yellow text-snc-dark px-6 py-3 rounded-lg font-semibold hover:shadow-glow transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Neuer Fall
          </button>
        </div>

        {/* New Case Form */}
        {showNewCase && (
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-snc-dark">Neuen Fall anlegen</h2>
              <button onClick={() => setShowNewCase(false)} className="text-gray-500 hover:text-snc-dark">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCreateCase} className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={newCase.name}
                onChange={(e) => setNewCase({ ...newCase, name: e.target.value })}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-snc-yellow"
              />
              <input
                type="email"
                placeholder="E-Mail"
                value={newCase.email}
                onChange={(e) => setNewCase({ ...newCase, email: e.target.value })}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-snc-yellow"
              />
              <input
                type="tel"
                placeholder="Telefon"
                value={newCase.phone}
                onChange={(e) => setNewCase({ ...newCase, phone: e.target.value })}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-snc-yellow"
              />
              <input
                type="text"
                placeholder="Fahrzeug (z.B. Mercedes C-Klasse)"
                value={newCase.vehicle}
                onChange={(e) => setNewCase({ ...newCase, vehicle: e.target.value })}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-snc-yellow"
              />
              <input
                type="datetime-local"
                value={newCase.appointment_date}
                onChange={(e) => setNewCase({ ...newCase, appointment_date: e.target.value })}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-snc-yellow"
              />
              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 bg-snc-yellow text-snc-dark py-3 rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50"
              >
                {loading ? 'Wird erstellt...' : 'Fall anlegen & E-Mail senden'}
              </button>
            </form>
          </div>
        )}

        {/* Cases List */}
        <div className="grid gap-6">
          {cases.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-snc-dark">{c.name}</h3>
                  <p className="text-snc-gray">{c.email} | {c.phone}</p>
                  <p className="text-snc-dark font-semibold mt-2">
                    <Car className="w-4 h-4 inline mr-2" />
                    {c.vehicle}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${
                    c.status === 'fertiggestellt' ? 'bg-green-100 text-green-700' :
                    c.status === 'in_bearbeitung' ? 'bg-blue-100 text-blue-700' :
                    c.status === 'besichtigung_durchgefuehrt' ? 'bg-purple-100 text-purple-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {c.status === 'fertiggestellt' && <CheckCircle className="w-5 h-5" />}
                    {c.status === 'in_bearbeitung' && <Clock className="w-5 h-5" />}
                    {getStatusText(c.status)}
                  </div>
                  <p className="text-xs text-snc-gray mt-2">
                    Erstellt: {new Date(c.created_at).toLocaleDateString('de-DE')}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <select
                  onChange={(e) => handleStatusChange(c.id, e.target.value)}
                  value={c.status}
                  disabled={loading}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-snc-yellow"
                >
                  <option value="termin_vereinbart">Termin vereinbart</option>
                  <option value="besichtigung_durchgefuehrt">Besichtigung durchgeführt</option>
                  <option value="in_bearbeitung">In Bearbeitung</option>
                  <option value="fertiggestellt">Fertiggestellt</option>
                </select>

                <label className="cursor-pointer bg-snc-dark text-white px-4 py-2 rounded-lg hover:bg-snc-dark-2 transition-all flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  PDF hochladen
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handlePDFUpload(c.id, e.target.files[0])
                      }
                    }}
                    className="hidden"
                  />
                </label>

                <a
                  href={`${process.env.NEXT_PUBLIC_SITE_URL}/status/${c.status_token}`}
                  target="_blank"
                  className="bg-gray-100 text-snc-dark px-4 py-2 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Status-Link
                </a>
              </div>
            </div>
          ))}
        </div>

        {cases.length === 0 && (
          <div className="text-center py-20">
            <p className="text-snc-gray text-lg">Noch keine Fälle vorhanden. Lege den ersten Fall an!</p>
          </div>
        )}
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
