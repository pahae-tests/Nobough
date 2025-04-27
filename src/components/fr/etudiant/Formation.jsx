import {
    Search, Filter, Users, Clock, Navigation, Flag, TrendingUp,
    Tag, DollarSign, BookOpen, User, Bookmark, Check, FileText,
    ArrowRight, Heart, Star, ChevronDown, Grid, List, Mail, Phone, Calendar, Info
} from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Notification from '../../../utils/fr/Notification'

export default function Formation({ formationID, setActiveTab }) {
    const [activeTab2, setActiveTab2] = useState('details')
    const [headerOpened, setHeaderOpened] = useState(true)
    const [notification, setNotification] = useState({
        msg: '',
        type: '',
        duration: 3000,
        onclose: null
    })
    const [showNotification, setShowNotification] = useState(false)

    const formation = {
        id: 1,
        titre: "Web Design",
        description: "Apprenez les fondamentaux du WordPress. Ce cours vous guide à travers toutes les étapes nécessaires pour créer et gérer un site Web professionnel en utilisant WordPress. Vous découvrirez comment choisir un hébergement avec Hostinger, installer et configurer WordPress, personnaliser votre site avec des thèmes et des plugins, et optimiser votre présence en ligne.",
        img: "/formation.jpg",
        formateur: "Mehdi ELJAMAI",
        duree: 3,
        etudiants: 12,
        prix: 100,
        categorie: "Programmation",
        type: "Avie",
        tags: ["WordPress", "Hostinger", "Web", "Design"],
        inscrit: false,
        genre: 'Hommes',
        createdAt: "15/03/2024"
    }

    const formateur = {
        id: 1,
        img: "/user.jpg",
        nom: "ELJAMAI",
        prenom: "Mehdi",
        tel: "+212 600000000",
        email: "mehdi.eljamai@gmail.com",
        birth: "15/04/1985",
        bio: "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test",
        specialites: ["WordPress", "JavaScript", "React", "UI/UX Design"],
        formations: 8,
        etudiants_total: 150
    }

    const etudiants = [
        {
            id: 1,
            img: "/user.jpg",
            nom: "SAIDI",
            prenom: "Ahmed",
            tel: "+212 600000000",
            email: "ahmed.saidi@gmail.com",
            birth: "22/07/1998",
            bio: "test test test test test test test test test test test test test test test test test test test",
            dateInscr: "01/03/2024"
        },
        {
            id: 2,
            img: "/user.jpg",
            nom: "BENALI",
            prenom: "Youssef",
            tel: "+212 600000000",
            email: "youssef.benali@gmail.com",
            birth: "05/09/1995",
            bio: "test test test test test test test test test test test test test test test test test test test",
            dateInscr: "03/03/2024"
        },
        {
            id: 3,
            img: "/user.jpg",
            nom: "MOUSSAOUI",
            prenom: "Karim",
            tel: "+212 600000000",
            email: "karim.moussaoui@gmail.com",
            birth: "12/12/1997",
            bio: "test test test test test test test test test test test test test test test test test test test",
            dateInscr: "05/03/2024"
        },
        {
            id: 4,
            img: "/user.jpg",
            nom: "LAHLOU",
            prenom: "Omar",
            tel: "+212 600000000",
            email: "omar.lahlou@gmail.com",
            birth: "18/03/1994",
            bio: "test test test test test test test test test test test test test test test test test test test",
            dateInscr: "10/03/2024"
        },
        {
            id: 5,
            img: "/user.jpg",
            nom: "TAZI",
            prenom: "Hamza",
            tel: "+212 600000000",
            email: "hamza.tazi@gmail.com",
            birth: "29/05/1996",
            bio: "test test test test test test test test test test test test test test test test test test test",
            dateInscr: "12/03/2024"
        }
    ]

    const handleJoin = () => {
        setNotification({ msg: 'Joined !', type: 'success' })
        setShowNotification(true)
    }

    return (
        <>
            <Head>
                <title>{formation.titre} - Académie Nobough</title>
                <link rel="icon" href="/logo2-nobg.png" />
            </Head>

            {showNotification &&
                <Notification {...notification} showNotification={showNotification} setShowNotification={setShowNotification} />
            }

            <div className="max-w-full">
                {/* Banner */}
                <div className="relative h-64 md:h-80 lg:h-96 mb-8 overflow-hidden">
                    <img
                        src={formation.img}
                        alt={formation.titre}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h1 className="text-3xl font-bold mb-2">{formation.titre}</h1>
                        <div className="flex flex-wrap gap-4 items-center">
                            <span className="flex items-center">
                                <Tag className="w-4 h-4 mr-1" />
                                {formation.categorie}
                            </span>
                            {formation.duree &&
                                <span className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {formation.duree} mois
                                </span>
                            }
                            <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {formation.etudiants} étudiants
                            </span>
                            <span className="flex items-center">
                                {formation.type === "Avie" ? (
                                    <Navigation className="w-4 h-4 mr-1" />
                                ) : formation.type === "Niveaux" ? (
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                ) : (
                                    <Flag className="w-4 h-4 mr-1" />
                                )}
                                {formation.type === "Avie" ? "À vie" : formation.type === "Niveaux" ? "Niveaux" : "Cycle"}
                            </span>
                        </div>
                    </div>
                    {formation.prix === 0 ? (
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded font-medium">
                            Gratuit
                        </div>
                    ) : (
                        <div className="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 rounded font-medium">
                            {formation.prix} DH
                        </div>
                    )}
                    {formation.inscrit && (
                        <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 text-xs font-medium rounded flex items-center">
                            <Check className="w-3 h-3 mr-1" />
                            Inscrit
                        </div>
                    )}
                </div>

                {/* Nav */}
                <div className="flex border-b mb-6 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab2('details')}
                        className={`py-3 px-6 font-medium ${activeTab2 === 'details' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-black'} cursor-pointer hover:bg-white/50 whitespace-nowrap`}
                    >
                        Détails de la formation
                    </button>
                    <button
                        onClick={() => setActiveTab2('formateur')}
                        className={`py-3 px-6 font-medium ${activeTab2 === 'formateur' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-black'} cursor-pointer hover:bg-white/50 whitespace-nowrap`}
                    >
                        Formateur
                    </button>
                    <button
                        onClick={() => setActiveTab2('etudiants')}
                        className={`py-3 px-6 font-medium ${activeTab2 === 'etudiants' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-black'} cursor-pointer hover:bg-white/50 whitespace-nowrap`}
                    >
                        Étudiants inscrits
                    </button>
                </div>

                {/* Dztails */}
                {activeTab2 === 'details' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl mb-6">
                                <h2 className="text-xl font-bold mb-4">Description</h2>
                                <p className="text-gray-700 mb-6">
                                    {formation.description}
                                </p>

                                <h2 className="text-xl font-bold mb-4">Contenu de la formation</h2>
                                <ul className="space-y-3 mb-6">
                                    {formation.duree &&
                                        <li className="flex items-center">
                                            <Clock className="w-5 h-5 text-pink-600 mr-2" />
                                            <span>{formation.duree} Mois</span>
                                        </li>}
                                    <li className="flex items-center">
                                        <Calendar className="w-5 h-5 text-pink-600 mr-2" />
                                        <span>Date début: {formation.createdAt}</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Users className="w-5 h-5 text-pink-600 mr-2" />
                                        <span>{formation.etudiants} étudiants</span>
                                    </li>
                                </ul>

                                <h2 className="text-xl font-bold mb-4">Tags</h2>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {formation.tags.map((tag, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl mb-6 sticky top-6">
                                <h2 className="text-xl font-bold mb-4">Aperçu</h2>
                                <ul className="space-y-4 mb-6">
                                    {formation.duree &&
                                        <li className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Clock className="w-5 h-5 text-gray-500 mr-2" />
                                                <span>Durée</span>
                                            </div>
                                            <span className="font-semibold">{formation.duree} mois</span>
                                        </li>
                                    }
                                    <li className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Users className="w-5 h-5 text-gray-500 mr-2" />
                                            <span>Étudiants</span>
                                        </div>
                                        <span className="font-semibold">{formation.etudiants}</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
                                            <span>Prix</span>
                                        </div>
                                        <span className="font-semibold">{formation.prix} DH</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Tag className="w-5 h-5 text-gray-500 mr-2" />
                                            <span>Catégorie</span>
                                        </div>
                                        <span className="font-semibold">{formation.categorie}</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <User className="w-5 h-5 text-gray-500 mr-2" />
                                            <span>Genre</span>
                                        </div>
                                        <span className="font-semibold">{formation.genre}</span>
                                    </li>
                                </ul>

                                {formation.inscrit ? (
                                    <Link href={`Etudier?id=${formation.id}`}>
                                        <button className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-pink-500 transition-colors flex items-center justify-center mb-3 cursor-pointer"
                                            onClick={handleJoin}>
                                            <Bookmark className="w-5 h-5 mr-2" />
                                            <span>Accéder au cours</span>
                                        </button>
                                    </Link>
                                ) : (
                                    <button className="w-full py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors flex items-center justify-center mb-3 cursor-pointer"
                                        onClick={handleJoin}>
                                        <Check className="w-5 h-5 mr-2" />
                                        <span>S'inscrire maintenant</span>
                                    </button>
                                )}

                                <button className="w-full py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center cursor-pointer"
                                    onClick={() => setActiveTab('formations')}>
                                    <ArrowRight className="w-5 h-5 mr-2" />
                                    <span>Retour aux formations</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Formateur */}
                {activeTab2 === 'formateur' && (
                    <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl mb-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/3">
                                <div className="rounded-xl p-6 text-center">
                                    <img
                                        src={formateur.img}
                                        alt={`${formateur.prenom} ${formateur.nom}`}
                                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                    />
                                    <h2 className="text-xl font-bold mb-1">{formateur.prenom} {formateur.nom}</h2>
                                    <p className="text-gray-600 mb-4">Formateur en {formation.categorie}</p>

                                    <div className="space-y-3 text-left mb-6">
                                        <div className="flex items-center">
                                            <Mail className="w-5 h-5 text-gray-500 mr-2" />
                                            <span>{formateur.email}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="w-5 h-5 text-gray-500 mr-2" />
                                            <span>{formateur.tel}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                                            <span>Né le {formateur.birth}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-around mb-4">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-pink-600">{formateur.formations}</p>
                                            <p className="text-sm text-gray-500">Formations</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-pink-600">{formateur.etudiants_total}</p>
                                            <p className="text-sm text-gray-500">Étudiants</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-2/3">
                                <h2 className="text-2xl font-bold mb-4">Biographie</h2>
                                <p className="text-gray-700 mb-6">{formateur.bio}</p>

                                <h3 className="text-xl font-bold mb-3">Spécialités</h3>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {formateur.specialites.map((specialite, index) => (
                                        <span key={index} className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full">
                                            {specialite}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Etudiants */}
                {activeTab2 === 'etudiants' && (
                    <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl mb-6">
                        <h2 className="text-2xl font-bold mb-6">Étudiants inscrits ({etudiants.length})</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {etudiants.map((etudiant) => (
                                <div key={etudiant.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                    <div className="flex p-4">
                                        <img
                                            src={etudiant.img}
                                            alt={`${etudiant.prenom} ${etudiant.nom}`}
                                            className="w-20 h-20 rounded-full object-cover mr-4"
                                        />
                                        <div>
                                            <h3 className="text-lg text-pink-500 font-semibold">{etudiant.prenom} {etudiant.nom}</h3>
                                            <p className="text-gray-600 text-sm">Inscrit le {etudiant.dateInscr}</p>
                                        </div>
                                    </div>

                                    <div className="border-t px-4 py-3">
                                        <div className="mb-3">
                                            <h4 className="font-medium text-sm mb-1 text-green-500">Informations de contact</h4>
                                            <div className="space-y-1 text-sm">
                                                <div className="flex items-center">
                                                    <Mail className="w-4 h-4 text-pink-500 mr-1" />
                                                    <span>{etudiant.email}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Phone className="w-4 h-4 text-pink-500 mr-1" />
                                                    <span>{etudiant.tel}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Calendar className="w-4 h-4 text-pink-500 mr-1" />
                                                    <span>Né le {etudiant.birth}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-sm mb-1 text-green-500">Biographie</h4>
                                            <p className="text-sm text-gray-700">{etudiant.bio}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}