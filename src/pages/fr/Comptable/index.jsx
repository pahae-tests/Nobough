import { useState, useEffect } from 'react'
import { Bell, X } from 'lucide-react';

import Head from 'next/head'
import Header from '../../../components/fr/comptable/Header'
import Budget from '../../../components/fr/comptable/Budget'
import Revenus from '../../../components/fr/comptable/Revenus'
import Depenses from '../../../components/fr/comptable/Depenses'
import Dettes from '../../../components/fr/comptable/Dettes'
import Evenements from '../../../components/fr/comptable/Evenements'
import Protestations from '../../../components/fr/comptable/Protestations'
import Alertes from '../../../components/fr/comptable/Alertes'
import Profile from '../../../components/fr/etudiant/Profile'

export default function Comptable() {
  const [activeTab, setActiveTab] = useState('budget')
  const [showAlertes, setShowAlertes] = useState(true)

  const [revenus, setRevenus] = useState([])
  const [depenses, setDepenses] = useState([])
  const [dettes, setDettes] = useState([])
  const [protestations, setProtestations] = useState([])
  const [events, setEvents] = useState()
  const [budget, setBudget] = useState({ total: 0, reel: 0 })
  const [alertes, setAlertes] = useState([])
  const [headerOpened, setHeaderOpened] = useState(true)

  useEffect(() => {
    localStorage.setItem('activeTabComptable', activeTab)
  }, [activeTab])

  useEffect(() => {
    const exempleRevenus = [
      { id: 1, type: 'inscriptions', montant: 2500, date: '2025-04-01', label: 'Inscriptions à la nouvelle formation' },
      { id: 2, type: 'paiements_mensuels', montant: 5500, date: '2025-03-10', label: 'Paiements mensuels des étudiants' },
      { id: 3, type: 'dons', montant: 3000, date: '2025-02-15', label: 'Don de Monsieur test' },
      { id: 4, type: 'dons', montant: 4000, date: '2025-01-03', label: 'Don de Monsieur test' },
      { id: 5, type: 'dons', montant: 2700, date: '2024-12-14', label: 'Don de Monsieur test' },
    ]

    const exempleDepenses = [
      { id: 1, type: 'salaires', montant: 800, date: '2025-04-05', label: 'Salaires professeurs', remarque: 'Paiement mensuel' },
      { id: 2, type: 'fournitures', montant: 2500, date: '2025-03-08', label: 'Matériel informatique', remarque: 'Nouveaux ordinateurs' },
      { id: 3, type: 'salaires', montant: 1500, date: '2025-02-12', label: 'Salaires caméramans', remarque: 'Paiement mensuel' },
      { id: 4, type: 'salaires', montant: 4500, date: '2025-01-02', label: 'Salaires caméramans', remarque: 'Paiement mensuel' },
      { id: 5, type: 'salaires', montant: 2500, date: '2024-12-16', label: 'Salaires caméramans', remarque: 'Paiement mensuel' },
    ]

    const exempleDettes = [
      { id: 1, montant: 1200, titre: 'Crédit painture', date: '2025-01-15', deadline: '2025-06-15', remarque: 'Il faut pas ce retarder pour celle-là' },
      { id: 2, montant: 8000, titre: 'Loyer arriéré', date: '2025-03-20', deadline: '2025-05-01', remarque: 'Paiement urgent' },
    ]

    const exempleProtestations = [
      { id: 1, sujet: 'Non compréhension', message: 'Je ne comprends pas comment s\'inscrire', date: '2025-04-18', nom: 'LAMRISSI', prenom: 'Bahaa-eddine', email: 'pahae@gmail.com' },
      { id: 2, sujet: 'Séacnce en ligne', message: 'Comment avoir le code d\'une séance en ligne svp ?', date: '2025-04-20', nom: 'LAMRISSI', prenom: 'Bahaa-eddine', email: 'pahae@gmail.com' },
    ]

    const exempleEvenements = [
      {
        titre: 'Réunion des professeurs',
        lieu: 'Salle de conférence A',
        date: '2025-04-28T14:00:00',
        description: 'Discussion du budget pour le prochain semestre avec tous les professeurs.',
        remarques: '',
        depenses: '350'
      },
      {
        titre: 'Séminaire sur les finances',
        lieu: 'Salle principale',
        date: '2025-05-15T10:00:00',
        description: 'Séminaire de formation financière pour les étudiants et le personnel administratif.',
        remarques: '',
        depenses: '1200'
      }
    ]

    const totalRevenus = exempleRevenus.reduce((sum, item) => sum + item.montant, 0)
    const totalDepenses = exempleDepenses.reduce((sum, item) => sum + item.montant, 0)
    const salaireNonPayes = 5000 // Exemple

    const exempleBudget = {
      total: totalRevenus - totalDepenses,
      reel: totalRevenus - totalDepenses - salaireNonPayes
    }

    const exempleAlertes = []
    if (exempleBudget.reel < 1000) {
      exempleAlertes.push({
        type: 'danger',
        message: 'Budget réel risque de devenir négatif! Attention aux dépenses supplémentaires.',
      })
    }

    exempleDettes.forEach((dette) => {
      if (dette.montant <= exempleBudget.reel) {
        exempleAlertes.push({
          type: 'info',
          message: `Possibilité de rembourser la dette "${dette.titre}" (${dette.montant} DH)`,
        })
      }
    })

    setRevenus(exempleRevenus)
    setDepenses(exempleDepenses)
    setDettes(exempleDettes)
    setProtestations(exempleProtestations)
    setBudget(exempleBudget)
    setAlertes(exempleAlertes)
    setEvents(exempleEvenements)

  }, [])

  return (
    <>
      <Head>
        <title>Tableau de bord comptable - Académie Nobough</title>
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

      <Header activeTab={activeTab} setActiveTab={setActiveTab} headerOpened={headerOpened} setHeaderOpened={setHeaderOpened} />

      <div className={`min-h-screen ${headerOpened && 'mt-30 md:mt-40 lg:mt-40'}`}>
        {showAlertes ?
          <X className='bg-pink-500 rounded-full text-white p-2 w-8 h-8 font-bold cursor-pointer translate-y-8 md:translate-x-10 md:translate-y-10 lg:translate-x-10 lg:translate-y-10'
            onClick={() => setShowAlertes(false)} />
          :
          <Bell className='bg-green-500 rounded-full text-white p-2 w-8 h-8 font-bold cursor-pointer translate-y-8 md:translate-x-10 md:translate-y-10 lg:translate-x-10 lg:translate-y-10'
            onClick={() => setShowAlertes(true)} />
        }
        {showAlertes && <Alertes alertes={alertes} />}

        <main className="container mx-auto p-4">
          {activeTab === 'budget' && (
            <Budget
              revenus={revenus}
              depenses={depenses}
              dettes={dettes}
              budget={budget}
            />
          )}
          {activeTab === 'revenus' && (
            <Revenus revenus={revenus} setRevenus={setRevenus} />
          )}
          {activeTab === 'depenses' && (
            <Depenses depenses={depenses} setDepenses={setDepenses} />
          )}
          {activeTab === 'dettes' && (
            <Dettes dettes={dettes} setDettes={setDettes} />
          )}
          {activeTab === 'evenements' && (
            <Evenements budget={budget} events={events} setEvents={setEvents} />
          )}
          {activeTab === 'protestations' && (
            <Protestations
              protestations={protestations}
              setProtestations={setProtestations}
            />
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