import {
    User, Mail, Bell, Calendar, BookOpen, FileText, CreditCard, 
    Settings, Clock, ChevronRight, CheckCircle, AlertCircle, 
    PlusCircle, ExternalLink, HelpCircle, Library, Home
  } from 'lucide-react'
  import { useState, useEffect } from 'react'
  import Head from 'next/head'
  import Link from 'next/link'
  
  export default function Dashboard() {
    const [userData, setUserData] = useState({
      nom: 'El Amrani',
      prenom: 'Yasmine',
      profilePic: null,
      paiementStatus: 'À jour',
      formationsSuivies: 5,
      protestationsDeposees: 2,
      notificationsNonLues: 3,
      prochaineSeance: {
        titre: 'Développement Web Avancé',
        date: '28 Avril 2025',
        heure: '14:00',
        url: '#',
      }
    });
  
    const [currentDate, setCurrentDate] = useState('');
    const [notifications, setNotifications] = useState([
      {
        id: 1,
        type: 'payment',
        message: 'Paiement reçu pour le mois d\'avril',
        date: 'Aujourd\'hui à 10:30'
      },
      {
        id: 2,
        type: 'session',
        message: 'Nouvelle séance programmée: Développement Web Avancé',
        date: 'Hier à 15:45'
      },
      {
        id: 3,
        type: 'protest',
        message: 'Réponse à votre protestation concernant le cours de design',
        date: '24 Apr à 09:20'
      },
      {
        id: 4,
        type: 'general',
        message: 'Bienvenue sur votre nouveau tableau de bord étudiant!',
        date: '23 Apr à 08:00'
      }
    ]);
  
    const [evenements, setEvenements] = useState([
      {
        id: 1,
        titre: 'Conférence: Intelligence Artificielle et Éducation',
        date: '30 Avril 2025',
        heure: '18:00'
      },
      {
        id: 2,
        titre: 'Concours de Programmation',
        date: '15 Mai 2025',
        heure: '10:00'
      },
      {
        id: 3,
        titre: 'Atelier: Design Thinking',
        date: '22 Mai 2025',
        heure: '14:30'
      }
    ]);
  
    const [showHelp, setShowHelp] = useState(false);
  
    useEffect(() => {
      const date = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setCurrentDate(date.toLocaleDateString('fr-FR', options));
    }, []);
  
    const getNotificationIcon = (type) => {
      switch(type) {
        case 'payment':
          return <CreditCard className="h-5 w-5 text-green-500" />;
        case 'session':
          return <Calendar className="h-5 w-5 text-blue-500" />;
        case 'protest':
          return <FileText className="h-5 w-5 text-orange-500" />;
        default:
          return <Bell className="h-5 w-5 text-gray-500" />;
      }
    };
  
    return (
      <>
        <Head>
          <title>Tableau de Bord - Académie Nobough</title>
          <link rel="icon" href="/logo2-nobg.png" />
        </Head>
  
        <div className="max-w-full">
          <div className="md:px-4 lg:px-4">
            <div className="w-full bg-white/60 backdrop-blur-xs rounded-xl shadow-xl overflow-hidden p-6">

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="flex items-center mb-4 md:mb-0">
                  {userData.profilePic ? (
                    <img 
                      src={userData.profilePic} 
                      alt="Photo de profil" 
                      className="h-16 w-16 rounded-full object-cover border-2 border-pink-500"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center border-2 border-pink-500">
                      <User className="h-8 w-8 text-pink-500" />
                    </div>
                  )}
                  <div className="ml-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                      Bonjour, {userData.prenom} {userData.nom}
                    </h1>
                    <p className="text-gray-600">{currentDate}</p>
                  </div>
                </div>
                <div className="relative">
                  <button className="p-2 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors relative">
                    <Bell className="h-6 w-6 text-pink-600" />
                    {userData.notificationsNonLues > 0 && (
                      <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {userData.notificationsNonLues}
                      </span>
                    )}
                  </button>
                </div>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-700">Statut des paiements</h3>
                      <p className="text-lg font-bold text-gray-900">{userData.paiementStatus}</p>
                      <p className="text-sm text-gray-600">Dernier paiement: Avril 2025</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-green-500" />
                  </div>
                  <button className="mt-4 px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded-md text-sm transition-colors w-full">
                    Payer maintenant
                  </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-700">Formations suivies</h3>
                      <p className="text-lg font-bold text-gray-900">{userData.formationsSuivies}</p>
                      <p className="text-sm text-gray-600">2 en cours</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-500" />
                  </div>
                  <button className="mt-4 px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded-md text-sm transition-colors w-full">
                    Voir mes formations
                  </button>
                </div>
  
                {/* Widget protestations */}
                <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-orange-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-700">Protestations déposées</h3>
                      <p className="text-lg font-bold text-gray-900">{userData.protestationsDeposees}</p>
                      <p className="text-sm text-gray-600">1 en attente de réponse</p>
                    </div>
                    <FileText className="h-8 w-8 text-orange-500" />
                  </div>
                  <button className="mt-4 px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded-md text-sm transition-colors w-full">
                    Voir mes protestations
                  </button>
                </div>
  
                {/* Widget prochaine séance */}
                <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-indigo-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-700">Prochaine séance</h3>
                      <p className="text-lg font-bold text-gray-900">{userData.prochaineSeance.titre}</p>
                      <p className="text-sm text-gray-600">{userData.prochaineSeance.date} à {userData.prochaineSeance.heure}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-indigo-500" />
                  </div>
                  <a 
                    href={userData.prochaineSeance.url} 
                    className="mt-4 px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded-md text-sm transition-colors w-full flex items-center justify-center gap-2"
                  >
                    Rejoindre <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Notifications récentes */}
                <div className="md:col-span-2">
                  <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-800">Notifications récentes</h2>
                      <Link href="#" className="text-pink-600 hover:text-pink-700 text-sm flex items-center">
                        Voir tout <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {notifications.map(notif => (
                        <div key={notif.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="mr-3 mt-1">
                            {getNotificationIcon(notif.type)}
                          </div>
                          <div>
                            <p className="text-gray-800">{notif.message}</p>
                            <p className="text-xs text-gray-500">{notif.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
  
                  {/* Événements à venir */}
                  <div className="bg-white rounded-xl shadow-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-800">Événements à venir</h2>
                      <Link href="#" className="text-pink-600 hover:text-pink-700 text-sm flex items-center">
                        Calendrier complet <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {evenements.map(event => (
                        <div key={event.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="mr-3 mt-1">
                            <Clock className="h-5 w-5 text-pink-500" />
                          </div>
                          <div>
                            <p className="text-gray-800 font-medium">{event.titre}</p>
                            <p className="text-sm text-gray-600">{event.date} à {event.heure}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
  
                <div className="space-y-6">
                  {/* Accès rapide */}
                  <div className="bg-white rounded-xl shadow-md p-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Accès rapide</h2>
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/formations" className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-pink-50 rounded-lg transition-colors">
                        <BookOpen className="h-6 w-6 text-pink-600 mb-2" />
                        <span className="text-sm text-gray-700">Formations</span>
                      </Link>
                      <Link href="/seances" className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-pink-50 rounded-lg transition-colors">
                        <Calendar className="h-6 w-6 text-pink-600 mb-2" />
                        <span className="text-sm text-gray-700">Séances</span>
                      </Link>
                      <Link href="/paiements" className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-pink-50 rounded-lg transition-colors">
                        <CreditCard className="h-6 w-6 text-pink-600 mb-2" />
                        <span className="text-sm text-gray-700">Paiement</span>
                      </Link>
                      <Link href="/bibliotheque" className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-pink-50 rounded-lg transition-colors">
                        <Library className="h-6 w-6 text-pink-600 mb-2" />
                        <span className="text-sm text-gray-700">Bibliothèque</span>
                      </Link>
                      <Link href="/profil" className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-pink-50 rounded-lg transition-colors">
                        <Settings className="h-6 w-6 text-pink-600 mb-2" />
                        <span className="text-sm text-gray-700">Profil</span>
                      </Link>
                      <Link href="/accueil" className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-pink-50 rounded-lg transition-colors">
                        <Home className="h-6 w-6 text-pink-600 mb-2" />
                        <span className="text-sm text-gray-700">Accueil</span>
                      </Link>
                    </div>
                  </div>
  
                  {/* Aide rapide */}
                  <div className="bg-white rounded-xl shadow-md p-4">
                    <button 
                      onClick={() => setShowHelp(!showHelp)}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition-colors"
                    >
                      <HelpCircle className="h-5 w-5" />
                      Besoin d'aide ?
                    </button>
                    
                    {showHelp && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-800 mb-2">Comment pouvons-nous vous aider ?</h3>
                        <div className="space-y-2">
                          <button className="text-left w-full p-2 text-gray-700 hover:bg-pink-50 rounded transition-colors">
                            Comment accéder à mes cours ?
                          </button>
                          <button className="text-left w-full p-2 text-gray-700 hover:bg-pink-50 rounded transition-colors">
                            Comment effectuer un paiement ?
                          </button>
                          <button className="text-left w-full p-2 text-gray-700 hover:bg-pink-50 rounded transition-colors">
                            Comment modifier mon profil ?
                          </button>
                          <button className="text-left w-full p-2 text-gray-700 hover:bg-pink-50 rounded transition-colors">
                            Comment contacter un enseignant ?
                          </button>
                        </div>
                        <div className="mt-4">
                          <input 
                            type="text" 
                            placeholder="Poser une question..." 
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
  
                  {/* Statistiques simplifiées */}
                  <div className="bg-white rounded-xl shadow-md p-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Statistiques</h2>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Assiduité ce mois</span>
                          <span className="text-sm font-medium text-gray-700">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-pink-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Progression générale</span>
                          <span className="text-sm font-medium text-gray-700">70%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Paiements effectués</span>
                          <span className="text-sm font-medium text-gray-700">100%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>
                    <Link 
                      href="/statistiques" 
                      className="mt-4 text-center block text-pink-600 hover:text-pink-700 text-sm"
                    >
                      Voir les statistiques détaillées
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }