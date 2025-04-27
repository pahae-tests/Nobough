import {
  User, Mail, Phone, MessageSquare, Send, Home, ChevronRight
} from 'lucide-react'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Protestation() {
  const predefinedProtestations = [
    { 
      id: 1, 
      question: "test question 1", 
      response: "test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse"
    },
    { 
      id: 2, 
      question: "test question 2", 
      response: "test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse"
    },
    { 
      id: 3, 
      question: "test question 3", 
      response: "test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse"
    },
    { 
      id: 4, 
      question: "test question 4", 
      response: "test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse"
    },
    { 
      id: 5, 
      question: "test question 5", 
      response: "test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse test réponse"
    },
  ]

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    message: ''
  })

  const [selectedProtestation, setSelectedProtestation] = useState('')
  const [automaticResponse, setAutomaticResponse] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleProtestationChange = (e) => {
    const selectedId = e.target.value
    setSelectedProtestation(selectedId)
    
    if (selectedId) {
      const selected = predefinedProtestations.find(item => item.id === parseInt(selectedId))
      setAutomaticResponse(selected.response)
    } else {
      setAutomaticResponse('')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSend = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false)
      // Reset du formulaire ou autre action après envoi
    }, 2000)
  }

  return (
    <>
      <Head>
        <title>Envoyer une Protestation - Académie Nobough</title>
        <link rel="icon" href="/logo2-nobg.png" />
      </Head>

      <div className="max-w-full">
        <div className="md:px-4 lg:px-4">
          <div className="w-full bg-white/60 backdrop-blur-xs rounded-xl shadow-xl overflow-hidden p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Envoyer une Protestation</h1>
            <p className="text-gray-600 mb-8">
              Utilisez ce formulaire pour soumettre votre protestation. Nous examinerons votre demande et vous contacterons dans les plus brefs délais.
            </p>

            {/* Sélection de protestation prédéfinie */}
            <div className="mb-8">
              <label htmlFor="predefinedProtestation" className="block text-sm font-medium text-gray-700 mb-2">
                Sélectionnez le type de protestation
              </label>
              <select
                id="predefinedProtestation"
                name="predefinedProtestation"
                value={selectedProtestation}
                onChange={handleProtestationChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 bg-white/80 py-2"
              >
                <option value="">-- Sélectionnez une protestation --</option>
                {predefinedProtestations.map(protestation => (
                  <option key={protestation.id} value={protestation.id}>
                    {protestation.question}
                  </option>
                ))}
              </select>
            </div>

            {/* Affichage de la réponse automatique si disponible */}
            {automaticResponse && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-medium text-green-800 mb-2">Réponse automatique :</h3>
                <p className="text-green-700">{automaticResponse}</p>
              </div>
            )}

            {/* Affichage du formulaire uniquement si "Autre problème" est sélectionné ou aucune sélection */}
            {(!selectedProtestation || selectedProtestation === '5') && (
              <form onSubmit={handleSend} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className="pl-10 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 bg-white/80"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                        className="pl-10 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 bg-white/80"
                        placeholder="Votre prénom"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="pl-10 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 bg-white/80"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="tel" className="block text-sm font-medium text-gray-700">Téléphone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="tel"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        required
                        className="pl-10 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 bg-white/80"
                        placeholder="+212 6XX XX XX XX"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="pl-10 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 bg-white/80"
                      placeholder="Détaillez votre protestation ici..."
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex gap-4 items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Envoyer
                    {isSubmitting ? <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : <Send className="ml-2 -mr-1 h-5 w-5" />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}