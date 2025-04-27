import {
    Search, Filter, Users, Clock, Navigation, Flag, TrendingUp,
    Tag, DollarSign, BookOpen, User, Bookmark, Check, FileText,
    ArrowRight, Heart, Star, ChevronDown, Grid, List, Mail, Phone,
    Calendar, Info, MessageCircle, Library, Book, Video, File, Download,
    PlusCircle, Send, Paperclip, Image, FileText as FileIcon, Delete,
    MapPin
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Notification from '../../../utils/fr/Notification'

export default function Formation({ formationID }) {
    const [activeTab, setActiveTab] = useState('programme')
    const [notification, setNotification] = useState({
        msg: '',
        type: '',
        duration: 3000,
        onclose: null
    })
    const [showNotification, setShowNotification] = useState(false)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const chatEndRef = useRef(null)
    const [attachmentName, setAttachmentName] = useState('')
    const fileInputRef = useRef(null)

    const formation = {
        id: 1,
        titre: "Formation avancée en JavaScript",
        description: "Maîtrisez les concepts avancés de JavaScript pour créer des applications web robustes et performantes. Ce cours couvre les notions essentielles de JavaScript moderne, notamment les promesses, async/await, les modules ES6, les APIs du navigateur, et bien plus encore. À la fin de cette formation, vous serez capable de développer des applications web complexes et bien structurées.",
        img: "/formation.jpg",
        formateur: "Mehdi ELJAMAI",
        duree: 4,
        etudiants: 15,
        prix: 1200,
        categorie: "Programmation",
        type: "Avie",
        tags: ["JavaScript", "ES6", "Web", "Frontend"],
        inscrit: true,
        genre: 'tous',
        createdAt: "05/03/2024",
        salle: "Fadaaa Imam Nafie - Etage 3",
        programme: [{ jour: 'Mardi', heure: '18h à 20h', salle: 'Fadaa Imam Nafie' }, { jour: 'Vendredi', heure: '19h à 21h', salle: 'Fadaa Imam Nafie' }, { jour: 'Dimanche', heure: '19h à 21h', salle: 'Fadaa Imam Nafie' }],
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
        totalEtudiants: 150
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

    const chatData = [
        {
            id: 1,
            user: {
                id: 1,
                nom: "ELJAMAI",
                prenom: "Mehdi",
                img: "/user.jpg",
                role: "formateur"
            },
            message: "Bonjour à tous ! Bienvenue dans cette formation JavaScript. N'hésitez pas à poser vos questions ici.",
            timestamp: "25/04/2025 09:15"
        },
        {
            id: 2,
            user: {
                id: 2,
                nom: "BENALI",
                prenom: "Youssef",
                img: "/user.jpg",
                role: "étudiant"
            },
            message: "Merci pour le cours d'introduction ! J'ai une question concernant les promesses, pourriez-vous recommander des ressources supplémentaires ?",
            timestamp: "25/04/2025 10:23"
        },
        {
            id: 3,
            user: {
                id: 1,
                nom: "ELJAMAI",
                prenom: "Mehdi",
                img: "/user.jpg",
                role: "formateur"
            },
            message: "Bien sûr Youssef ! J'ai ajouté quelques documents dans la bibliothèque. Je vous recommande particulièrement 'JavaScript Asynchrone.pdf'.",
            timestamp: "25/04/2025 11:05"
        }
    ]

    const bibliotheque = [
        {
            id: 1,
            titre: "JavaScript Asynchrone.pdf",
            description: "Guide complet sur les promesses, async/await et les callbacks en JavaScript.",
            type: "pdf",
            taille: "2.4 MB",
            date: "25/04/2025",
            auteur: "Mehdi ELJAMAI",
            url: "/documents/javascript-asynchrone.pdf"
        },
        {
            id: 2,
            titre: "Diagramme architecture ES6.png",
            description: "Schéma visuel de l'architecture modulaire en JavaScript ES6.",
            type: "image",
            taille: "1.1 MB",
            date: "25/04/2025",
            auteur: "Mehdi ELJAMAI",
            url: "/documents/architecture-es6.png"
        },
        {
            id: 3,
            titre: "Introduction aux concepts avancés.mp4",
            description: "Enregistrement du premier cours d'introduction.",
            type: "video",
            taille: "156 MB",
            date: "25/04/2025",
            auteur: "Mehdi ELJAMAI",
            url: "/documents/intro-concepts-avances.mp4"
        },
        {
            id: 4,
            titre: "Exercices - Semaine 1.zip",
            description: "Ensemble d'exercices pratiques sur les notions vues lors du premier cours.",
            type: "archive",
            taille: "3.8 MB",
            date: "25/04/2025",
            auteur: "Mehdi ELJAMAI",
            url: "/documents/exercices-semaine1.zip"
        },
        {
            id: 5,
            titre: "Ressources supplémentaires.txt",
            description: "Liste de liens et de ressources pour approfondir vos connaissances.",
            type: "text",
            taille: "12 KB",
            date: "25/04/2025",
            auteur: "Mehdi ELJAMAI",
            url: "/documents/ressources-supplementaires.txt"
        }
    ]

    useEffect(() => {
        setMessages(chatData)
    }, [])

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (newMessage.trim() === '' && !attachmentName) return

        const newMsg = {
            id: messages.length + 1,
            user: {
                id: 99,
                nom: "VOTRE",
                prenom: "Nom",
                img: "/user.jpg",
                role: "étudiant"
            },
            message: newMessage,
            attachment: attachmentName ? { name: attachmentName } : null,
            timestamp: new Date().toLocaleString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        }

        setMessages([...messages, newMsg])
        setNewMessage('')
        setAttachmentName('')
    }

    const handleFileButtonClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setAttachmentName(file.name)
        }
    }

    const removeAttachment = () => {
        setAttachmentName('')
        fileInputRef.current.value = ''
    }

    const handleDownload = (documentUrl, documentTitle) => {
        const link = document.createElement('a')
        link.href = documentUrl
        link.download = documentTitle
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setNotification({
            msg: `Téléchargement de "${documentTitle}" démarré`,
            type: 'success',
            duration: 3000
        })
        setShowNotification(true)
    }

    const getFileIcon = (type) => {
        switch (type) {
            case 'pdf':
                return <FileText className="w-8 h-8 text-red-500" />
            case 'image':
                return <Image className="w-8 h-8 text-blue-500" />
            case 'video':
                return <Video className="w-8 h-8 text-purple-500" />
            case 'archive':
                return <File className="w-8 h-8 text-yellow-500" />
            default:
                return <FileIcon className="w-8 h-8 text-gray-500" />
        }
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
                {/* Nav */}
                <div className="flex border-b mb-6 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('programme')}
                        className={`py-3 px-6 font-medium ${activeTab === 'programme' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-black'} cursor-pointer hover:bg-white/50 whitespace-nowrap`}
                    >
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Programme
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('chat')}
                        className={`py-3 px-6 font-medium ${activeTab === 'chat' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-black'} cursor-pointer hover:bg-white/50 whitespace-nowrap`}
                    >
                        <div className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Chat
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('bibliotheque')}
                        className={`py-3 px-6 font-medium ${activeTab === 'bibliotheque' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-black'} cursor-pointer hover:bg-white/50 whitespace-nowrap`}
                    >
                        <div className="flex items-center">
                            <Library className="w-4 h-4 mr-2" />
                            Bibliothèque
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('formateur')}
                        className={`py-3 px-6 font-medium ${activeTab === 'formateur' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-black'} cursor-pointer hover:bg-white/50 whitespace-nowrap`}
                    >
                        <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            Formateur
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('etudiants')}
                        className={`py-3 px-6 font-medium ${activeTab === 'etudiants' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-black'} cursor-pointer hover:bg-white/50 whitespace-nowrap`}
                    >
                        <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            Étudiants
                        </div>
                    </button>
                </div>

                {/* Programme */}
                {activeTab === 'programme' && (
                    <div className="bg-white/60 backdrop-blur-xs p-4 sm:p-6 rounded-xl shadow-xl mb-6">
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <h2 className="text-xl sm:text-2xl font-bold">Programme de la formation</h2>
                        </div>

                        <div className="bg-pink-50 p-3 sm:p-4 rounded-lg mb-6 border border-pink-200">
                            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-pink-700">Informations générales</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {formation.programme.map((prog, index) => (
                                    <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                                        <h3 className="text-center font-medium mb-2">Séance {index + 1} :</h3>
                                        <div className="flex items-center my-2 sm:my-4">
                                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-pink-600 flex-shrink-0" />
                                            <span className="font-medium text-sm sm:text-base">Jour:</span>
                                            <span className="ml-2 text-sm sm:text-base truncate">{prog.jour}</span>
                                        </div>
                                        <div className="flex items-center my-2 sm:my-4">
                                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-pink-600 flex-shrink-0" />
                                            <span className="font-medium text-sm sm:text-base">Horaire:</span>
                                            <span className="ml-2 text-sm sm:text-base">{prog.heure}</span>
                                        </div>
                                        <div className="flex items-center my-2 sm:my-4">
                                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-pink-600 flex-shrink-0" />
                                            <span className="font-medium text-sm sm:text-base">Salle:</span>
                                            <span className="ml-2 text-sm sm:text-base truncate">{prog.salle}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Chat */}
                {activeTab === 'chat' && (
                    <div className="bg-white/60 backdrop-blur-xs py-6 rounded-xl shadow-xl mb-6 flex flex-col h-screen max-h-[80vh]">
                        <h2 className="text-2xl font-bold mb-4 pl-3">Discussion du groupe</h2>

                        <div className="flex-grow overflow-y-auto mb-4 p-4 rounded-lg">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`mb-4 ${msg.user.id === 99 ? 'flex justify-end' : 'flex justify-start'}`}>
                                    {msg.user.id !== 99 && (
                                        <img
                                            src={msg.user.img}
                                            alt={`${msg.user.prenom} ${msg.user.nom}`}
                                            className="w-10 h-10 rounded-full mr-2 object-cover self-end"
                                        />
                                    )}

                                    <div className={`max-w-[75%] ${msg.user.id === 99 ? 'order-1' : 'order-2'}`}>
                                        {msg.user.id !== 99 && (
                                            <div className="flex items-center mb-1 ml-1">
                                                <span className={`font-semibold text-sm mr-2 ${msg.user.role === 'formateur' ? 'text-pink-600' : 'text-green-600'}`}>
                                                    {msg.user.prenom} {msg.user.nom}
                                                </span>
                                                {msg.user.role === 'formateur' && (
                                                    <span className="text-xs bg-pink-100 text-pink-800 rounded-full px-2 py-0.5">
                                                        Formateur
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        <div className={`rounded-2xl p-3 shadow-sm ${msg.user.id === 99
                                            ? 'bg-pink-500 text-white rounded-br-none'
                                            : msg.user.role === 'formateur'
                                                ? 'bg-pink-100 text-gray-800 rounded-bl-none'
                                                : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                            }`}>
                                            <p className="break-words">{msg.message}</p>

                                            {msg.attachment && (
                                                <div className={`mt-2 ${msg.user.id === 99 ? 'bg-pink-400' : 'bg-gray-100'} rounded p-2 inline-block`}>
                                                    <div className={`flex items-center text-sm ${msg.user.id === 99 ? 'text-white' : 'text-blue-600'}`}>
                                                        <FileIcon className="w-4 h-4 mr-2" />
                                                        {msg.attachment.name}
                                                    </div>
                                                </div>
                                            )}

                                            <div className={`text-xs mt-1 ${msg.user.id === 99 ? 'text-pink-200' : 'text-gray-500'} text-right`}>
                                                {msg.timestamp.split(' ')[1]}
                                            </div>
                                        </div>
                                    </div>

                                    {msg.user.id === 99 && (
                                        <img
                                            src={msg.user.img}
                                            alt={`${msg.user.prenom} ${msg.user.nom}`}
                                            className="w-10 h-10 rounded-full ml-2 object-cover self-end"
                                        />
                                    )}
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="border-t pt-4">
                            {attachmentName && (
                                <div className="mb-2 bg-blue-50 p-2 rounded flex items-center justify-between">
                                    <div className="flex items-center text-sm">
                                        <FileIcon className="w-4 h-4 mr-2 text-blue-600" />
                                        <span className="text-blue-800">{attachmentName}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={removeAttachment}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Delete className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleFileButtonClick}
                                    className="p-2 text-gray-500 hover:text-pink-600 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <Paperclip className="w-6 h-6" />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Écrivez votre message ici..."
                                    className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-pink-600 text-white rounded-lg p-3 hover:bg-pink-700 transition-colors cursor-pointer"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Bibliothèque */}
                {activeTab === 'bibliotheque' && (
                    <div className="bg-white/60 backdrop-blur-xs p-4 sm:p-6 rounded-xl shadow-xl mb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
                            <h2 className="text-xl sm:text-2xl font-bold">Bibliothèque de ressources</h2>
                            <div className="text-gray-600 text-sm sm:text-base">
                                {bibliotheque.length} documents disponibles
                            </div>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                            {bibliotheque.map((document) => (
                                <div key={document.id} className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-pink-300 transition-colors shadow-sm">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="flex items-start sm:items-center sm:mr-4">
                                            {getFileIcon(document.type)}
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-base sm:text-lg font-semibold text-pink-600">{document.titre}</h3>
                                            <p className="text-sm text-gray-600 mb-2">{document.description}</p>
                                            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-gray-500">
                                                <span className="flex items-center">
                                                    <User className="w-3 h-3 mr-1" />
                                                    {document.auteur}
                                                </span>
                                                <span className="flex items-center">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {document.date}
                                                </span>
                                                <span className="flex items-center">
                                                    <FileIcon className="w-3 h-3 mr-1" />
                                                    {document.taille}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-3 sm:mt-0">
                                            <button
                                                className="bg-pink-600 text-white rounded-lg p-2 hover:bg-pink-700 transition-colors flex items-center cursor-pointer text-sm w-full sm:w-auto justify-center"
                                                onClick={() => handleDownload(document.url, document.titre)}
                                            >
                                                <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                                                <span>Télécharger</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Formateur */}
                {activeTab === 'formateur' && (
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
                                            <p className="text-2xl font-bold text-pink-600">{formateur.totalEtudiants}</p>
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
                {activeTab === 'etudiants' && (
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