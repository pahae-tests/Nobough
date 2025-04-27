import {
  Search, Filter, Users, Clock, Navigation, Flag, TrendingUp,
  Tag, DollarSign, BookOpen, User, Bookmark, Check, FileText, X,
  ArrowRight, Heart, Star, ChevronDown, Grid, List, Mail, Phone, Calendar, Info,
  CreditCard, AlertCircle, CheckCircle, ChevronRight, FileCheck, UserCheck, UserX
} from 'lucide-react'
import { useState } from 'react'
import Head from 'next/head'
import Notification from '../../../utils/fr/Notification'

export default function AdminValidation() {
  const [activeTab, setActiveTab] = useState('inscriptions')
  const [notification, setNotification] = useState({
    msg: '',
    type: '',
    duration: 3000,
    onclose: null
  })
  const [showNotification, setShowNotification] = useState(false)
  const [showRefuseReason, setShowRefuseReason] = useState({})
  const [showRefuseReasonPaiement, setShowRefuseReasonPaiement] = useState({})
  const [refuseReason, setRefuseReason] = useState({})
  const [refuseReasonPaiement, setRefuseReasonPaiement] = useState({})
  const [selectedImage, setSelectedImage] = useState(null)

  const inscriptions = [
    {
      id: 1,
      img: "/user.jpg",
      nom: "test",
      prenom: "test",
      tel: "+212600000000",
      email: "test.test@gmail.com",
      birth: "22/07/1998",
      CIN: "BE123456",
      bio: "test test test test test test test test test test test test test test test test test test test",
      dateInscr: "01/04/2025"
    },
    {
      id: 2,
      img: "/user.jpg",
      nom: "test",
      prenom: "test",
      tel: "+212600000000",
      email: "test.test@gmail.com",
      birth: "05/09/1995",
      CIN: "CD789012",
      bio: "test test test test test test test test test test test test test test test test test test test",
      dateInscr: "03/04/2025"
    },
  ]

  const paiements = [
    {
      id: 1,
      img: "/user.jpg",
      nom: "test",
      prenom: "test",
      tel: "+212600000000",
      email: "test.test@gmail.com",
      birth: "18/03/1994",
      CIN: "GH901234",
      transaction: "/transaction.webp",
      message: "",
      montant: 100,
      datePaiement: "10/04/2025"
    },
    {
      id: 2,
      img: "/user.jpg",
      nom: "test",
      prenom: "test",
      tel: "+212 600000000",
      email: "test.test@gmail.com",
      birth: "29/05/1996",
      CIN: "IJ567890",
      bio: "test test test test test test test test test test test test test test test test test test test",
      transaction: "/transaction.webp",
      message: "Désolé pour le retard",
      montant: 150,
      datePaiement: "12/04/2025"
    },
    {
      id: 3,
      img: "/user.jpg",
      nom: "test",
      prenom: "test",
      tel: "+212 600000000",
      email: "test.test@gmail.com",
      birth: "14/02/1993",
      CIN: "KL123456",
      bio: "test test test test test test test test test test test test test test test test test test test",
      transaction: "/transaction.webp",
      message: "Paiement",
      montant: 200,
      datePaiement: "15/04/2025"
    }
  ]

  const handleValiderInscription = (id) => {
    setNotification({
      msg: `Inscription #${id} validée avec succès !`,
      type: 'success'
    })
    setShowNotification(true)
  }

  const handleRefuserInscription = (id, reason) => {
    setNotification({
      msg: `Inscription #${id} refusée : ${reason}`,
      type: 'error'
    })
    setShowNotification(true)
    setShowRefuseReason(prev => ({ ...prev, [id]: false }))
  }

  const handleValiderPaiement = (id) => {
    setNotification({
      msg: `Paiement #${id} validé avec succès !`,
      type: 'success'
    })
    setShowNotification(true)
  }

  const handleRefuserPaiement = (id, reason) => {
    setNotification({
      msg: `Paiement #${id} refusé : ${reason}`,
      type: 'error'
    })
    setShowNotification(true)
    setShowRefuseReasonPaiement(prev => ({ ...prev, [id]: false }))
  }

  const toggleRefuseReason = (id) => {
    setShowRefuseReason(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleRefuseReasonPaiement = (id) => {
    setShowRefuseReasonPaiement(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl)
  }

  const closeTransaction = () => {
    setSelectedImage(null)
  }

  return (
    <>
      <Head>
        <title>Administration - Académie Nobough</title>
        <link rel="icon" href="/logo2-nobg.png" />
      </Head>

      {showNotification &&
        <Notification {...notification} showNotification={showNotification} setShowNotification={setShowNotification} />
      }

      <div className="max-w-full">
        {/* Nav */}
        <div className="flex border-b mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('inscriptions')}
            className={`py-3 px-6 font-medium ${activeTab === 'inscriptions' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-black'} cursor-pointer hover:bg-white/50 whitespace-nowrap`}
          >
            <div className="flex items-center">
              <UserCheck className="w-5 h-5 mr-2" />
              Nouvelles inscriptions
              <span className="ml-2 bg-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                {inscriptions.length}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('paiements')}
            className={`py-3 px-6 font-medium ${activeTab === 'paiements' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-black'} cursor-pointer hover:bg-white/50 whitespace-nowrap`}
          >
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Nouveaux paiements
              <span className="ml-2 bg-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                {paiements.length}
              </span>
            </div>
          </button>
        </div>

        {/* Section 1: Inscriptions */}
        {activeTab === 'inscriptions' && (
          <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl mb-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <UserCheck className="w-6 h-6 mr-2 text-pink-600" />
              Nouvelles inscriptions ({inscriptions.length})
            </h2>

            <div className="space-y-4">
              {inscriptions.map((inscription) => (
                <div key={inscription.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex flex-col sm:flex-row justify-between p-4">
                    <div className="flex mb-4 sm:mb-0">
                      <img
                        src={inscription.img}
                        alt={`${inscription.prenom} ${inscription.nom}`}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-lg text-pink-500 font-semibold">
                          {inscription.prenom} {inscription.nom}
                        </h3>
                        <p className="text-gray-600 text-sm">Inscrit le {inscription.dateInscr}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center cursor-pointer"
                        onClick={() => handleValiderInscription(inscription.id)}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Valider
                      </button>
                      {showRefuseReason[inscription.id] ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="py-2 px-4 border border-gray-300 rounded mr-2"
                            placeholder="Entrez la raison"
                            onChange={(e) => setRefuseReason({ ...refuseReason, [inscription.id]: e.target.value })}
                            value={refuseReason[inscription.id] || ""}
                          />
                          <button
                            className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
                            onClick={() => handleRefuserInscription(inscription.id, refuseReason[inscription.id])}
                            disabled={!refuseReason[inscription.id]}
                          >
                            Confirmer
                          </button>
                        </div>
                      ) : (
                        <button
                          className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors flex items-center cursor-pointer"
                          onClick={() => toggleRefuseReason(inscription.id)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Refuser
                        </button>
                      )}
                    </div>
                  </div>

                  <details className="px-4 pb-4 border-t">
                    <summary className="py-2 cursor-pointer focus:outline-none text-pink-600 font-medium">
                      <div className="flex items-center">
                        <Info className="w-4 h-4 mr-2" />
                        Voir détails de l'inscription
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </summary>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Informations personnelles</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <User className="w-4 h-4 text-pink-500 mr-2" />
                            <span className="font-medium">Nom complet:</span>
                            <span className="ml-2">{inscription.prenom} {inscription.nom}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-pink-500 mr-2" />
                            <span className="font-medium">Date de naissance:</span>
                            <span className="ml-2">{inscription.birth}</span>
                          </div>
                          <div className="flex items-center">
                            <FileCheck className="w-4 h-4 text-pink-500 mr-2" />
                            <span className="font-medium">CIN:</span>
                            <span className="ml-2">{inscription.CIN}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Coordonnées</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 text-pink-500 mr-2" />
                            <span className="font-medium">Email:</span>
                            <span className="ml-2">{inscription.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 text-pink-500 mr-2" />
                            <span className="font-medium">Téléphone:</span>
                            <span className="ml-2">{inscription.tel}</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="font-medium text-green-600 mb-2">Biographie</h4>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                          {inscription.bio}
                        </p>
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Paiements */}
        {activeTab === 'paiements' && (
          <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl mb-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-pink-600" />
              Nouveaux paiements ({paiements.length})
            </h2>

            <div className="space-y-4">
              {paiements.map((paiement) => (
                <div key={paiement.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex flex-col sm:flex-row justify-between p-4">
                    <div className="flex mb-4 sm:mb-0">
                      <img
                        src={paiement.img}
                        alt={`${paiement.prenom} ${paiement.nom}`}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-lg text-pink-500 font-semibold">
                          {paiement.prenom} {paiement.nom}
                        </h3>
                        <p className="text-gray-600 text-sm">Paiement du {paiement.datePaiement}</p>
                        <p className="font-medium text-green-600">{paiement.montant} DH</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center"
                        onClick={() => handleValiderPaiement(paiement.id)}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Valider
                      </button>
                      {showRefuseReasonPaiement[paiement.id] ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="py-2 px-4 border border-gray-300 rounded mr-2"
                            placeholder="Entrez la raison"
                            onChange={(e) => setRefuseReasonPaiement({ ...refuseReasonPaiement, [paiement.id]: e.target.value })}
                            value={refuseReasonPaiement[paiement.id] || ""}
                          />
                          <button
                            className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            onClick={() => handleRefuserPaiement(paiement.id, refuseReasonPaiement[paiement.id])}
                            disabled={!refuseReasonPaiement[paiement.id]}
                          >
                            Confirmer
                          </button>
                        </div>
                      ) : (
                        <button
                          className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors flex items-center"
                          onClick={() => toggleRefuseReasonPaiement(paiement.id)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Refuser
                        </button>
                      )}
                    </div>
                  </div>

                  <details className="px-4 pb-4 border-t">
                    <summary className="py-2 cursor-pointer focus:outline-none text-pink-600 font-medium">
                      <div className="flex items-center">
                        <Info className="w-4 h-4 mr-2" />
                        Voir détails du paiement
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </summary>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Informations personnelles</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <User className="w-4 h-4 text-pink-500 mr-2" />
                            <span className="font-medium">Nom complet:</span>
                            <span className="ml-2">{paiement.prenom} {paiement.nom}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-pink-500 mr-2" />
                            <span className="font-medium">Date de naissance:</span>
                            <span className="ml-2">{paiement.birth}</span>
                          </div>
                          <div className="flex items-center">
                            <FileCheck className="w-4 h-4 text-pink-500 mr-2" />
                            <span className="font-medium">CIN:</span>
                            <span className="ml-2">{paiement.CIN}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Coordonnées</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 text-pink-500 mr-2" />
                            <span className="font-medium">Email:</span>
                            <span className="ml-2">{paiement.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 text-pink-500 mr-2" />
                            <span className="font-medium">Téléphone:</span>
                            <span className="ml-2">{paiement.tel}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Détails du paiement</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 text-pink-500 mr-2" />
                            <span className="font-medium">Montant:</span>
                            <span className="ml-2">{paiement.montant} DH</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-pink-500 mr-2" />
                            <span className="font-medium">Date:</span>
                            <span className="ml-2">{paiement.datePaiement}</span>
                          </div>
                          <div>
                            <p className="font-medium flex items-center mb-1">
                              <FileText className="w-4 h-4 text-pink-500 mr-2" />
                              Message:
                            </p>
                            <p className="text-gray-700 ml-6">{paiement.message}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Preuve de transaction</h4>
                        <img
                          src={paiement.transaction}
                          alt="Preuve de transaction"
                          className="border border-gray-200 rounded w-full max-w-xs cursor-pointer"
                          onClick={() => handleImageClick(paiement.transaction)}
                        />
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Open img */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 cursor-pointer" onClick={closeTransaction} >
          <div className="max-w-4xl w-full p-4 bg-white rounded-lg shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeTransaction}
            >
              <X className="w-6 h-6 cursor-pointer" />
            </button>
            <img
              src={selectedImage}
              alt="Preuve de transaction agrandie"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  )
}