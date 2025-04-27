import { useState, useEffect, useRef, act } from 'react'
import Head from 'next/head'
import Header from '../../../components/fr/etudiant/Header'
import Dashboard from '../../../components/fr/etudiant/Dashboard'
import Formations from '../../../components/fr/etudiant/Formations'
import Formation from '../../../components/fr/etudiant/Formation'
import Annonces from '../../../components/fr/etudiant/Annonces'
import Evenements from '../../../components/fr/etudiant/Evenements'
import Protestation from '../../../components/fr/etudiant/Protestation'
import Payer from '../../../components/fr/etudiant/Payer'
import Room from '../../../components/fr/etudiant/Room'
import Etudier from '../../../components/fr/etudiant/Etudier'
import Profile from '../../../components/fr/etudiant/Profile'

export default function Etudiant() {
  const [activeTab, setActiveTab] = useState('formations')
  const [formationID, setFormationID] = useState(null)
  const [headerOpened, setHeaderOpened] = useState(true)

  useEffect(() => {
    localStorage.setItem('activeTabEtudiant', activeTab)
  }, [activeTab])

  return (
    <>
      <Head>
        <title>Espace Etudiant - Académie Nobough</title>
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
      
      <Header activeTab={activeTab} setActiveTab={setActiveTab} headerOpened={headerOpened} setHeaderOpened={setHeaderOpened} formationID={formationID} setFormationID={setFormationID} />

      <div className={`min-h-screen ${headerOpened && 'mt-36 md:mt-50 lg:mt-50'}`}>
        <main className="container mx-auto p-4">
          {activeTab === 'dashboard' && (
            <Dashboard />
          )}
          {activeTab === 'formations' && (
            <Formations setActiveTab={setActiveTab} setFormationID={setFormationID} />
          )}
          {activeTab === 'annonces' && (
            <Annonces />
          )}
          {activeTab === 'evenements' && (
            <Evenements />
          )}
          {activeTab === 'formation' && (
            <Formation formationID={formationID} setActiveTab={setActiveTab} />
          )}
          {activeTab === 'protestation' && (
            <Protestation />
          )}
          {activeTab === 'payer' && (
            <Payer />
          )}
          {activeTab === 'room' && (
            <Room />
          )}
          {activeTab === 'etudier' && (
            <Etudier formationID={formationID} />
          )}
          {activeTab === 'profile' && (
            <Profile />
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
