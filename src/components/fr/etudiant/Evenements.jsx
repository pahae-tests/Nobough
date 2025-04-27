import { 
  Calendar, Tag, User, MapPin, Info, ArrowRight, Home, ChevronRight, Clock, Users
} from 'lucide-react'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Evenements() {
  const [filtreGenres, setFiltreGenres] = useState({
    tous: true,
    hommes: false,
    femmes: false,
    enfants: false,
    preadolescents: false
  })

  const evenements = [
    {
      id: 1,
      titre: "Conférence sur l'éducation islamique",
      description: "Une conférence enrichissante sur les méthodes modernes d'enseignement de l'islam aux jeunes générations.",
      img: "/formation.jpg",
      date: "15/05/2025",
      lieu: "Centre culturel, Casablanca",
      genres: ["hommes", "femmes"]
    },
    {
      id: 2,
      titre: "Atelier d'apprentissage du Coran",
      description: "Atelier interactif pour apprendre les bases de la récitation du Coran avec des professeurs qualifiés.",
      img: "/formation.jpg",
      date: "28/04/2025",
      lieu: "Académie Nobough, Berrechid",
      genres: ["enfants", "preadolescents"]
    },
    {
      id: 3,
      titre: "Séminaire sur la finance islamique",
      description: "Exploration des principes et applications modernes de la finance conforme à la charia.",
      img: "/formation.jpg",
      date: "10/04/2025",
      lieu: "ENSA, Berrechid",
      genres: ["hommes", "femmes"]
    }
  ]

  const calculerJoursRestants = (dateEvenement) => {
    const aujourdHui = new Date()
    const dateParts = dateEvenement.split('/')
    const dateEvent = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
    
    if (dateEvent < aujourdHui) {
      return "Passé"
    } else {
      const diffTemps = dateEvent - aujourdHui
      const joursRestants = Math.ceil(diffTemps / (1000 * 60 * 60 * 24))
      return `${joursRestants} jour${joursRestants > 1 ? 's' : ''} restant${joursRestants > 1 ? 's' : ''}`
    }
  }

  const handleGenreChange = (genre) => {
    if (genre === 'tous') {
      setFiltreGenres({
        tous: true,
        hommes: false,
        femmes: false,
        enfants: false,
        preadolescents: false
      })
    } else {
      setFiltreGenres({
        ...filtreGenres,
        tous: false,
        [genre]: !filtreGenres[genre]
      })
    }
  }

  // Effet pour gérer le cas où aucun filtre spécifique n'est sélectionné
  useEffect(() => {
    const aucunFiltreSpecifique = !filtreGenres.hommes && !filtreGenres.femmes && 
                                 !filtreGenres.enfants && !filtreGenres.preadolescents
    
    if (aucunFiltreSpecifique) {
      setFiltreGenres(prev => ({ ...prev, tous: true }))
    }
  }, [filtreGenres.hommes, filtreGenres.femmes, filtreGenres.enfants, filtreGenres.preadolescents])

  // Filtrer les événements selon les genres sélectionnés
  const evenementsFiltres = evenements.filter(evenement => {
    if (filtreGenres.tous) return true
    
    return evenement.genres.some(genre => filtreGenres[genre])
  })

  return (
    <>
      <Head>
        <title>Événements - Académie Nobough</title>
        <link rel="icon" href="/logo2-nobg.png" />
      </Head>

      <div className="max-w-full">
        <div className="md:px-4 lg:px-4 py-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Événements à venir</h2>
            
            <div className="bg-white/60 backdrop-blur-xs rounded-xl shadow p-4 mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Filtrer par genre</h3>
              <div className="flex flex-wrap gap-3">
                {['tous', 'hommes', 'femmes', 'enfants', 'preadolescents'].map((genre) => (
                  <div key={genre} className="flex items-center">
                    <input
                      type="checkbox"
                      id={genre}
                      checked={filtreGenres[genre]}
                      onChange={() => handleGenreChange(genre)}
                      className="w-4 h-4 mr-2 accent-pink-600"
                    />
                    <label htmlFor={genre} className="text-gray-700 capitalize">
                      {genre}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            {evenementsFiltres.length > 0 ? (
              evenementsFiltres.map((evenement) => (
                <div key={evenement.id} className="w-full bg-white/60 backdrop-blur-xs rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 h-64 md:h-auto relative overflow-hidden">
                      <img
                        src={evenement.img}
                        alt={evenement.titre}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute top-0 right-0 ${calculerJoursRestants(evenement.date) !== 'Passé' ? 'bg-pink-600' : 'bg-gray-600'} text-white py-1 px-3 rounded-bl-lg font-semibold`}>
                        {calculerJoursRestants(evenement.date)}
                      </div>
                    </div>
                    
                    <div className="p-6 md:w-3/4">
                      <h3 className="text-2xl font-bold mb-3 text-gray-800">{evenement.titre}</h3>
                      <p className="text-gray-600 mb-6">{evenement.description}</p>
                      
                      <div className="flex flex-wrap md:items-center gap-4 mb-6">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-5 h-5 text-pink-600 mr-2" />
                          <span>{evenement.date}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-5 h-5 text-pink-600 mr-2" />
                          <span>{evenement.lieu}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <Users className="w-5 h-5 text-pink-600 mr-2" />
                          <span>
                            {evenement.genres.map((genre, index) => (
                              <span key={genre}>
                                {genre.charAt(0).toUpperCase() + genre.slice(1)}
                                {index < evenement.genres.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>
                      
                      {/* <div className="flex justify-end">
                        <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
                          Plus d'informations
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex">
                  <Info className="w-5 h-5 text-yellow-400 mr-3" />
                  <p className="text-yellow-700">
                    Aucun événement ne correspond à vos critères de filtre.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}