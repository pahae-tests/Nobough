import { useState, useEffect, useRef, act } from 'react'
import Head from 'next/head'
import Header from '../../../components/fr/secretaire/Header'
import Annonces from '../../../components/fr/secretaire/Annonces'
import Formations from '../../../components/fr/secretaire/Formations'
import Etudiants from '../../../components/fr/secretaire/Etudiants'
import Etudiant from '../../../components/fr/secretaire/Etudiant'
import Inscriptions from '../../../components/fr/secretaire/Inscriptions'
import Adhesions from '../../../components/fr/secretaire/Adhesions'
import Professeurs from '../../../components/fr/secretaire/Professeurs'
import Profile from '../../../components/fr/secretaire/Profile'
import Protestations from '../../../components/fr/secretaire/Protestations'

export default function Secretaire() {
  const [activeTab, setActiveTab] = useState('adhesions')
  const [etudiantID, setEtudiantID] = useState(null)
  const [headerOpened, setHeaderOpened] = useState(true)
  const [protestations, setProtestations] = useState([
    { id: 1, sujet: 'Non compréhension', message: 'Je ne comprends pas comment s\'inscrire', date: '2025-04-18', nom: 'LAMRISSI', prenom: 'Bahaa-eddine', email: 'pahae@gmail.com' },
    { id: 2, sujet: 'Séacnce en ligne', message: 'Comment avoir le code d\'une séance en ligne svp ?', date: '2025-04-20', nom: 'LAMRISSI', prenom: 'Bahaa-eddine', email: 'pahae@gmail.com' },
  ])

  useEffect(() => {
    localStorage.setItem('activeTabSecretaire', activeTab)
  }, [activeTab])

  return (
    <>
      <Head>
        <title>Espace Secretaire - Académie Nobough</title>
        <link rel="icon" href="/logo2-nobg.png" />
      </Head>

      {!headerOpened &&
        <div className="fixed top-4 left-4 rounded-full bg-green-900 p-2 flex overflow-hidden cursor-pointer" onClick={() => setHeaderOpened(e => !e)}>
          <img 
            src="/logo2.png" 
            alt="Académie Nobough Logo" 
            className="h-12 w-auto shrink-0 rounded-full"
          />
        </div>
      }
      
      <Header activeTab={activeTab} setActiveTab={setActiveTab} headerOpened={headerOpened} setHeaderOpened={setHeaderOpened} etudiantID={etudiantID} setEtudiantID={setEtudiantID} />

      <div className={`min-h-screen ${headerOpened && 'mt-36 md:mt-46 lg:mt-46'}`}>
        <main className="container mx-auto p-4">
          {activeTab === 'adhesions' && (
            <Adhesions />
          )}
          {activeTab === 'inscriptions' && (
            <Inscriptions />
          )}
          {activeTab === 'annonces' && (
            <Annonces />
          )}
          {activeTab === 'etudiants' && (
            <Etudiants setActiveTab={setActiveTab} setEtudiantID={setEtudiantID} />
          )}
          {activeTab === 'etudiant' && (
            <Etudiant etudiantID={etudiantID} />
          )}
          {activeTab === 'formations' && (
            <Formations />
          )}
          {activeTab === 'professeurs' && (
            <Professeurs />
          )}
          {activeTab === 'profile' && (
            <Profile />
          )}
          {activeTab === 'protestations' && (
            <Protestations protestations={protestations} />
          )}
        </main>
        
        <footer className="bg-white border-t mt-8 py-4">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>© 2025 Académie Nobough - Tous droits réservés</p>
            <p className="mt-1">Interface de gestion comptable v1.0</p>
          </div>
        </footer>
      </div>
    </>
  )
}