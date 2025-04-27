import React, { act, useEffect, useRef, useState } from 'react'
import {
    ArrowDown, ArrowUp, AlertCircle, DollarSign,
    Calendar, FileText, Users, PieChart, Briefcase,
    Plus, Filter, Bell, LogOut, User, Video,
    CreditCard, FileQuestion, X
} from 'lucide-react'
import Link from 'next/link'
import gsap from 'gsap'
import { useRouter } from 'next/router'

const Header = ({ activeTab, setActiveTab, headerOpened, setHeaderOpened, formationID, setFormationID }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const [currentFormationID, setCurrentFormationID] = useState(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu)
        if (showNotifications) setShowNotifications(false)
    }

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications)
        if (showProfileMenu) setShowProfileMenu(false)
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
        if (showProfileMenu) setShowProfileMenu(false)
        if (showNotifications) setShowNotifications(false)
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab)
        if (window.innerWidth < 768) {
            setMobileMenuOpen(false)
        }
    }

    const notifications = [
        { type: 'unpaid', message: 'Rappel: Mois de Mai non payé', date: '24/04/2025' },
        { type: 'payment', message: 'Paiement du mois d\'Avril validé', date: '01/04/2025' },
        { type: 'missed', message: 'Séance du 20/04 rattée', date: '20/04/2025' },
        { type: 'document', message: 'Nouveau document: Programme du semestre', date: '15/04/2025' },
    ]

    const recent = useRef(null)

    useEffect(() => {
        if (activeTab === "etudier" && !currentFormationID) {
            setCurrentFormationID(formationID)
            localStorage.setItem('formationID', formationID)
            setTimeout(() => {
                gsap.fromTo(recent.current, {
                    y: '100%',
                    opacity: 0,
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "elastic.out"
                })
            }, 100);
        }
    }, [activeTab])

    const closeFormation = (e) => {
        e.stopPropagation()
        gsap.to(recent.current, {
            y: '100%',
            opacity: 0,
            duration: 0.5,
            ease: "power3.in",
            onComplete: () => {
                localStorage.removeItem('formationID')
                setCurrentFormationID(null)
            }
        })
    }

    useEffect(() => {
        const recentFormationID = localStorage.getItem('formationID')
        if (recentFormationID !== 'null') {
            setCurrentFormationID(recentFormationID)
            setTimeout(() => {
                gsap.fromTo(recent.current, { y: 0 }, { y: 0 })
            }, 100);
        }

        const handleResize = () => {
            if (window.innerWidth >= 768 && mobileMenuOpen) {
                setMobileMenuOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [mobileMenuOpen])

    useEffect(() => {
        const active = localStorage.getItem('activeTabEtudiant')
        if(active === "null" || !active) active = 'formations'
        setActiveTab(active)
    }, [])

    const handleLogout = () => { }

    return (
        <div className={`fixed top-0 left-0 w-full z-40 ${!headerOpened && 'hidden'}`}>
            <header className={`relative text-white p-4 shadow-lg`} style={{
                backgroundColor: '#1B5E20',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpath fill='%23ffffff' fill-opacity='0.25' d='M60,0 L120,60 L60,120 L0,60 L60,0z M60,21.2 L21.2,60 L60,98.8 L98.8,60 L60,21.2z'/%3E%3Cpath fill='%23ffffff' fill-opacity='0.25' d='M42.5,42.5 C35,50 35,60 42.5,67.5 C50,75 60,75 67.5,67.5 C75,60 75,50 67.5,42.5 C60,35 50,35 42.5,42.5z M49.5,49.5 C52.5,46.5 57.5,46.5 60.5,49.5 C63.5,52.5 63.5,57.5 60.5,60.5 C57.5,63.5 52.5,63.5 49.5,60.5 C46.5,57.5 46.5,52.5 49.5,49.5z'/%3E%3Cpath fill='%23ffffff' fill-opacity='0.15' d='M0,0 L30,0 L30,30 L0,30z M0,30 L30,30 L30,60 L0,60z M0,60 L30,60 L30,90 L0,90z M0,90 L30,90 L30,120 L0,120z M30,0 L60,0 L60,30 L30,30z M30,30 L60,30 L60,60 L30,60z M30,60 L60,60 L60,90 L30,90z M30,90 L60,90 L60,120 L30,120z M60,0 L90,0 L90,30 L60,30z M60,30 L90,30 L90,60 L60,60z M60,60 L90,60 L90,90 L60,90z M60,90 L90,90 L90,120 L60,120z M90,0 L120,0 L120,30 L90,30z M90,30 L120,30 L120,60 L90,60z M90,60 L120,60 L120,90 L90,90z M90,90 L120,90 L120,120 L90,120z'/%3E%3C/svg%3E")`,
                backgroundSize: '120px 120px'
            }}>
                {/* zakhrafa en haut */}
                <div className="absolute top-0 left-0 right-0 h-4 overflow-hidden" style={{ opacity: 0.8 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 16" className="w-full h-full">
                        <path d="M0,16 L62.5,16 L62.5,0 L125,0 L125,16 L187.5,16 L187.5,0 L250,0 L250,16 L312.5,16 L312.5,0 L375,0 L375,16 L437.5,16 L437.5,0 L500,0 L500,16 L562.5,16 L562.5,0 L625,0 L625,16 L687.5,16 L687.5,0 L750,0 L750,16 L812.5,16 L812.5,0 L875,0 L875,16 L937.5,16 L937.5,0 L1000,0 L1000,16" fill="none" stroke="#8BC34A" strokeWidth="2" />
                    </svg>
                </div>

                <div className="container mx-auto flex justify-between items-center py-2 flex-col sm:flex-row" onClick={() => { setShowNotifications(false); setShowProfileMenu(false); setMobileMenuOpen(false) }}>
                    <div className="flex items-center space-x-3">
                        <div className="rounded-full bg-white/10 p-2 flex overflow-hidden cursor-pointer" onClick={() => setHeaderOpened(e => !e)}>
                            <img
                                src="/logo2.png"
                                alt="Académie Nobough Logo"
                                className="h-8 sm:h-12 w-auto shrink-0"
                            />
                        </div>
                        <div className="border-l-2 border-pink-400 pl-3">
                            <h1 className="text-xl sm:text-2xl font-bold">Académie Nobough</h1>
                            <p className="text-xs sm:text-sm text-pink-200">Espace Etudiant</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 sm:mt-0">
                        {/* Mobile Menu */}
                        <button
                            className="md:hidden flex items-center justify-center bg-pink-600/80 p-2 rounded-full hover:bg-pink-700 transition-colors cursor-pointer"
                            onClick={(e) => { e.stopPropagation(); toggleMobileMenu() }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>

                        {/* Notifications Btn */}
                        <div className="relative">
                            <button
                                className="flex items-center justify-center bg-pink-600/80 p-2 rounded-full hover:bg-pink-700 transition-colors cursor-pointer relative"
                                onClick={(e) => { e.stopPropagation(); toggleNotifications() }}
                            >
                                <Bell className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                    {notifications.length}
                                </span>
                            </button>

                            {/* Notifications Popup */}
                            {showNotifications && (
                                <div className="absolute -right-26 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 z-50" onClick={e => e.stopPropagation()}>
                                    <div className="px-4 py-2 border-b border-gray-200">
                                        <h3 className="font-medium text-gray-800">Notifications</h3>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {notifications.map((notification, index) => (
                                            <div key={index} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                                                <div className="flex items-start">
                                                    <div className={`p-1 rounded-full mr-3 mt-1 ${notification.type === 'unpaid' ? 'bg-red-100' :
                                                            notification.type === 'payment' ? 'bg-green-100' :
                                                                notification.type === 'missed' ? 'bg-orange-100' : 'bg-green-100'
                                                        }`}>
                                                        {notification.type === 'unpaid' && <AlertCircle className="w-4 h-4 text-red-500" />}
                                                        {notification.type === 'payment' && <DollarSign className="w-4 h-4 text-green-500" />}
                                                        {notification.type === 'missed' && <Calendar className="w-4 h-4 text-orange-500" />}
                                                        {notification.type === 'document' && <FileText className="w-4 h-4 text-green-500" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-700">{notification.message}</p>
                                                        <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="px-4 py-2 border-t border-gray-200">
                                        <Link href='/Notifications'>
                                            <button className="text-sm text-pink-600 hover:text-pink-800 font-medium cursor-pointer">
                                                Voir toutes les notifications
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile Btn */}
                        <div className="relative">
                            <button
                                className="flex items-center justify-center bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); toggleProfileMenu() }}
                            >
                                <User className="w-5 h-5" />
                            </button>

                            {/* Profile Popup */}
                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50" onClick={e => e.stopPropagation()}>
                                    <button onClick={() => setActiveTab('profile')} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer">
                                        <User className="w-4 h-4 mr-2 text-pink-600" />
                                        <span>Profil</span>
                                    </button>
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer">
                                        <LogOut className="w-4 h-4 mr-2 text-pink-600" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* zakhrafa en bas */}
                <div className="absolute bottom-0 left-0 right-0 h-4 overflow-hidden" style={{ opacity: 0.8 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 16" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0,0 C25,16 50,0 75,0 C100,16 125,0 150,0 C175,16 200,0 225,0 C250,16 275,0 300,0 C325,16 350,0 375,0 C400,16 425,0 450,0 C475,16 500,0 525,0 C550,16 575,0 600,0 C625,16 650,0 675,0 C700,16 725,0 750,0 C775,16 800,0 825,0 C850,16 875,0 900,0 C925,16 950,0 975,0 C1000,16 1025,0 1050,0 C1075,16 1100,0 1125,0 C1150,16 1175,0 1200,0 L1200,16 L0,16 Z" fill="#0D5302" />
                    </svg>
                </div>

                {/* zakhrafat sur les côtés - Hidden on mobile */}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-16 sm:w-12 sm:h-24 hidden sm:block">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 200" className="w-full h-full">
                        <path d="M0,0 L100,0 L100,100 L0,100 Z M50,0 L0,50 L50,100 L100,50 Z" fill="#8BC34A" fillOpacity="0.3" />
                        <path d="M25,25 L75,25 L75,75 L25,75 Z M50,25 L25,50 L50,75 L75,50 Z" fill="#8BC34A" fillOpacity="0.5" />
                        <path d="M40,40 L60,40 L60,60 L40,60 Z M50,40 L40,50 L50,60 L60,50 Z" fill="#8BC34A" fillOpacity="0.7" />
                    </svg>
                </div>

                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-16 sm:w-12 sm:h-24 hidden sm:block">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 200" className="w-full h-full">
                        <path d="M0,0 L100,0 L100,100 L0,100 Z M50,0 L0,50 L50,100 L100,50 Z" fill="#8BC34A" fillOpacity="0.3" />
                        <path d="M25,25 L75,25 L75,75 L25,75 Z M50,25 L25,50 L50,75 L75,50 Z" fill="#8BC34A" fillOpacity="0.5" />
                        <path d="M40,40 L60,40 L60,60 L40,60 Z M50,40 L40,50 L50,60 L60,50 Z" fill="#8BC34A" fillOpacity="0.7" />
                    </svg>
                </div>
            </header>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <div className="bg-white shadow-lg md:hidden z-50">
                    <ul className="flex flex-col">
                        {currentFormationID && (
                            <li>
                                <button
                                    className={`px-4 py-3 font-medium transition-all w-full text-left flex items-center justify-between ${activeTab === 'etudier' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-100'}`}
                                    onClick={() => handleTabChange('etudier')}
                                >
                                    <div className="flex items-center">
                                        <PieChart className={`w-5 h-5 mr-2 ${activeTab === 'etudier' ? 'text-green-600' : 'text-gray-500'}`} />
                                        <span>Récent</span>
                                    </div>
                                    <X className="w-5 h-5 text-red-600" onClick={closeFormation} />
                                </button>
                            </li>
                        )}
                        <li>
                            <button
                                className={`px-4 py-3 font-medium transition-all w-full text-left flex items-center ${activeTab === 'dashboard' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-100'}`}
                                onClick={() => handleTabChange('dashboard')}
                            >
                                <PieChart className={`w-5 h-5 mr-2 ${activeTab === 'dashboard' ? 'text-green-600' : 'text-gray-500'}`} />
                                <span>Dashboard</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-4 py-3 font-medium transition-all w-full text-left flex items-center ${activeTab === 'formations' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-100'}`}
                                onClick={() => handleTabChange('formations')}
                            >
                                <Briefcase className={`w-5 h-5 mr-2 ${activeTab === 'formations' ? 'text-green-600' : 'text-gray-500'}`} />
                                <span>Formations</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-4 py-3 font-medium transition-all w-full text-left flex items-center ${activeTab === 'annonces' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-100'}`}
                                onClick={() => handleTabChange('annonces')}
                            >
                                <AlertCircle className={`w-5 h-5 mr-2 ${activeTab === 'annonces' ? 'text-green-600' : 'text-gray-500'}`} />
                                <span>Annonces</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-4 py-3 font-medium transition-all w-full text-left flex items-center ${activeTab === 'evenements' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-100'}`}
                                onClick={() => handleTabChange('evenements')}
                            >
                                <Calendar className={`w-5 h-5 mr-2 ${activeTab === 'evenements' ? 'text-green-600' : 'text-gray-500'}`} />
                                <span>Événements</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-4 py-3 font-medium transition-all w-full text-left flex items-center ${activeTab === 'room' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-100'}`}
                                onClick={() => handleTabChange('room')}
                            >
                                <Video className={`w-5 h-5 mr-2 ${activeTab === 'room' ? 'text-green-600' : 'text-gray-500'}`} />
                                <span>Room</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-4 py-3 font-medium transition-all w-full text-left flex items-center ${activeTab === 'payer' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-100'}`}
                                onClick={() => handleTabChange('payer')}
                            >
                                <CreditCard className={`w-5 h-5 mr-2 ${activeTab === 'payer' ? 'text-green-600' : 'text-gray-500'}`} />
                                <span>Payer</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-4 py-3 font-medium transition-all w-full text-left flex items-center ${activeTab === 'protestation' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-100'}`}
                                onClick={() => handleTabChange('protestation')}
                            >
                                <FileQuestion className={`w-5 h-5 mr-2 ${activeTab === 'protestation' ? 'text-green-600' : 'text-gray-500'}`} />
                                <span>Protestation</span>
                            </button>
                        </li>
                    </ul>
                </div>
            )}

            {/* Desktop Nav */}
            <nav className={`bg-white/50 backdrop-blur-3xl shadow-xl hidden md:block`}>
                <div className="container mx-auto">
                    <ul className="flex overflow-x-auto">
                        {currentFormationID &&
                            <li ref={recent} className='translate-y-20'>
                                <button
                                    className={`px-5 py-4 font-medium border-b-3 transition-all duration-200 flex items-center ${activeTab === 'etudier' ? 'border-green-600 text-green-700 bg-green-50' : 'border-transparent hover:bg-gray-100'} cursor-pointer`}
                                    onClick={() => setActiveTab('etudier')}
                                >
                                    <PieChart className={`w-5 h-5 ${activeTab === 'etudier' ? 'text-green-600' : 'text-gray-500'}`} />
                                    <span className='hidden ml-3 lg:block'>Récent</span>
                                    <X className="w-5 h-5 ml-2 text-red-600 hover:bg-red-600 hover:text-white duration-200" onClick={closeFormation} />
                                </button>
                            </li>
                        }
                        <li>
                            <button
                                className={`px-5 py-4 font-medium border-b-3 transition-all duration-200 flex items-center ${activeTab === 'dashboard' ? 'border-green-600 text-green-700 bg-green-50' : 'border-transparent hover:bg-gray-100'} cursor-pointer`}
                                onClick={() => setActiveTab('dashboard')}
                            >
                                <PieChart className={`w-5 h-5 ${activeTab === 'dashboard' ? 'text-green-600' : 'text-gray-500'}`} />
                                <span className='hidden ml-3 lg:block'>Dashboard</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-5 py-4 font-medium border-b-3 transition-all duration-200 flex items-center ${activeTab === 'formations' ? 'border-green-600 text-green-700 bg-green-50' : 'border-transparent hover:bg-gray-100'} cursor-pointer`}
                                onClick={() => setActiveTab('formations')}
                            >
                                <Briefcase className={`w-5 h-5 ${activeTab === 'formations' ? 'text-green-600' : 'text-gray-500'}`} />
                                <span className='hidden ml-3 lg:block'>Formations</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-5 py-4 font-medium border-b-3 transition-all duration-200 flex items-center ${activeTab === 'annonces' ? 'border-green-600 text-green-700 bg-green-50' : 'border-transparent hover:bg-gray-100'} cursor-pointer`}
                                onClick={() => setActiveTab('annonces')}
                            >
                                <AlertCircle className={`w-5 h-5 ${activeTab === 'annonces' ? 'text-green-600' : 'text-gray-500'}`} />
                                <span className='hidden ml-3 lg:block'>Annonces</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-5 py-4 font-medium border-b-3 transition-all duration-200 flex items-center ${activeTab === 'evenements' ? 'border-green-600 text-green-700 bg-green-50' : 'border-transparent hover:bg-gray-100'} cursor-pointer`}
                                onClick={() => setActiveTab('evenements')}
                            >
                                <Calendar className={`w-5 h-5 ${activeTab === 'evenements' ? 'text-green-600' : 'text-gray-500'}`} />
                                <span className='hidden ml-3 lg:block'>Événements</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-5 py-4 font-medium border-b-3 transition-all duration-200 flex items-center ${activeTab === 'room' ? 'border-green-600 text-green-700 bg-green-50' : 'border-transparent hover:bg-gray-100'} cursor-pointer`}
                                onClick={() => setActiveTab('room')}
                            >
                                <Video className={`w-5 h-5 ${activeTab === 'room' ? 'text-green-600' : 'text-gray-500'}`} />
                                <span className='hidden ml-3 lg:block'>Room</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-5 py-4 font-medium border-b-3 transition-all duration-200 flex items-center ${activeTab === 'payer' ? 'border-green-600 text-green-700 bg-green-50' : 'border-transparent hover:bg-gray-100'} cursor-pointer`}
                                onClick={() => setActiveTab('payer')}
                            >
                                <CreditCard className={`w-5 h-5 ${activeTab === 'payer' ? 'text-green-600' : 'text-gray-500'}`} />
                                <span className='hidden ml-3 lg:block'>Payer</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-5 py-4 font-medium border-b-3 transition-all duration-200 flex items-center ${activeTab === 'protestation' ? 'border-green-600 text-green-700 bg-green-50' : 'border-transparent hover:bg-gray-100'} cursor-pointer`}
                                onClick={() => setActiveTab('protestation')}
                            >
                                <FileQuestion className={`w-5 h-5 ${activeTab === 'protestation' ? 'text-green-600' : 'text-gray-500'}`} />
                                <span className='hidden ml-3 lg:block'>Protestation</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header
