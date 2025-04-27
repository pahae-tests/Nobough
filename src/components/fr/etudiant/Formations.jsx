import {
    Search, Filter, Users, Clock, Navigation, Flag, TrendingUp,
    Tag, DollarSign, BookOpen, User, Bookmark, Check, FileText,
    ArrowRight, Heart, Star, ChevronDown, Grid, List
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Link from 'next/link'

export default function Formations({ setActiveTab, setFormationID }) {
    const formations = [
        {
            id: 1,
            titre: "Web Design",
            description: "Apprenez les fondamentaux du WordPress.",
            img: "/formation.jpg",
            formateur: "Mehdi ELJAMAI",
            duree: 3,
            etudiants: 12,
            prix: 100,
            categorie: "Programmation",
            type: "Avie",
            tags: ["WordPress", "Hostinger", "Web", "Design"],
            inscrit: true,
            genre: 'Hommes'
        },
        {
            id: 2,
            titre: "Coran",
            description: "Apprenez le coran.",
            img: "/formation.jpg",
            formateur: "Ayoub BELMLIH",
            duree: null,
            etudiants: 26,
            prix: 200,
            etoiles: 5,
            categorie: "Religion",
            type: "Avie",
            tags: ["Coran", "Dikr"],
            inscrit: false,
            genre: 'tous'
        },
        {
            id: 3,
            titre: "Fiqh",
            description: "Apprenez le Fiqh Ibno Achir.",
            img: "/formation.jpg",
            formateur: "Mehdi ELBERRICHI",
            duree: 24,
            etudiants: 19,
            prix: 150,
            categorie: "Religion",
            type: "Niveaux",
            tags: ["Fiqh", "Imam Malik", "Ibno Achir"],
            inscrit: false,
            genre: 'Enfants'
        },
        {
            id: 4,
            titre: "El Motun",
            description: "Apprenez les motuns Ibno Achir.",
            img: "/formation.jpg",
            formateur: "Mehdi ELBERRICHI",
            duree: 24,
            etudiants: 19,
            prix: 100,
            categorie: "Religion",
            type: "Cycle",
            tags: ["Mouns", "Ibno Achir"],
            inscrit: false,
            genre: 'Femmes'
        },
    ]
    const formateurs = [...new Set(formations.map(formation => formation.formateur))]
    const categories = [...new Set(formations.map(formation => formation.categorie))]

    const [activeTab2, setActiveTab2] = useState('grille')
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredFormations, setFilteredFormations] = useState([])
    const [filterOpen, setFilterOpen] = useState(false)
    const [filters, setFilters] = useState({
        categorie: 'tous',
        type: 'tous',
        formateur: 'tous',
        genre: 'tous'
    })

    useEffect(() => {
        if (formations && formations.length > 0) {
            setFilteredFormations(formations)
        }
    }, [formations])

    const statsData = [
        { mois: 'Jan', inscriptions: 45, completions: 22 },
        { mois: 'Fév', inscriptions: 52, completions: 31 },
        { mois: 'Mar', inscriptions: 61, completions: 38 },
        { mois: 'Avr', inscriptions: 58, completions: 42 },
        { mois: 'Mai', inscriptions: 72, completions: 49 },
        { mois: 'Juin', inscriptions: 83, completions: 51 }
    ]

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase()
        setSearchQuery(query)

        const filtered = formations.filter(formation => {
            const matchQuery = formation.titre.toLowerCase().includes(query) || formation.description.toLowerCase().includes(query) || formation.tags.some(tag => tag.toLowerCase().includes(query))
            const matchCategorie = filters.categorie === 'tous' || formation.categorie === filters.categorie
            const matchType = filters.type === 'tous' || formation.type === filters.type
            const matchFormateur = filters.formateur === 'tous' || formation.formateur === filters.formateur
            const matchGenre = filters.genre === 'tous' || formation.genre === filters.genre
            return matchQuery && matchCategorie && matchType && matchFormateur && matchGenre
        })
        setFilteredFormations(filtered)
    }

    const handleFilterChange = (filterType, value) => {
        setFilters({
            ...filters,
            [filterType]: value
        })
    }

    useEffect(() => {
        if (formations && formations.length > 0) {
            const filtered = formations.filter(formation => {
                const matchQuery = searchQuery === '' || formation.titre.toLowerCase().includes(searchQuery.toLowerCase()) || formation.description.toLowerCase().includes(searchQuery.toLowerCase()) || formation.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                const matchCategorie = filters.categorie === 'tous' || formation.categorie === filters.categorie
                const matchType = filters.type === 'tous' || formation.type === filters.type
                const matchFormateur = filters.formateur === 'tous' || formation.formateur === filters.formateur
                const matchGenre = filters.genre === 'tous' || formation.genre === filters.genre
                return matchQuery && matchCategorie && matchType && matchFormateur && matchGenre
            })
            setFilteredFormations(filtered)
        }
    }, [filters, searchQuery, formations])

    const cancelFilters = () => {
        setFilters({
            categorie: 'tous',
            type: 'tous',
            formateur: 'tous',
            genre: 'tous'
        })
        setFilterOpen(false)
    }

    return (
        <div className="max-w-full">
            {/* Lfo9 */}
            <div className="mb-8 flex justify-between items-center flex-col md:flex-row lg:flex-row">
                <h1 className="text-2xl font-bold">Catalogue des formations</h1>
                {activeTab2 !== "mesCours" && <div className="flex space-x-4">
                    <button
                        className="px-3 py-2 flex items-center bg-white/70 rounded-lg shadow-sm hover:bg-white cursor-pointer"
                        onClick={() => setFilterOpen(!filterOpen)}
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        <span>Filtres</span>
                    </button>
                    <div className="px-3 py-2 flex items-center bg-white/70 rounded-lg shadow-sm hover:bg-white">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setActiveTab2('grille')}
                                className={`p-1 rounded ${activeTab2 === 'grille' ? 'bg-pink-100 text-pink-600' : ''} cursor-pointer`}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setActiveTab2('liste')}
                                className={`p-1 rounded ${activeTab2 === 'liste' ? 'bg-pink-100 text-pink-600' : ''} cursor-pointer`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>}
            </div>

            {/* Recherchhe */}
            <div className="mb-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                        placeholder="Rechercher une formation par nom, description ou tags..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* Filtres */}
            {filterOpen && (
                <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl mb-8">
                    <h3 className="text-lg font-semibold mb-4">Filtres avancés</h3>
                    <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between gap-4">
                        {/* Cat */}
                        <div className='w-full'>
                            <label className="block text-sm font-medium mb-2">Catégorie</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                value={filters.categorie}
                                onChange={(e) => handleFilterChange('categorie', e.target.value)}
                            >
                                <option value="tous">Toutes les catégories</option>
                                {categories.map((categorie, index) => (
                                    <option key={index} value={categorie}>{categorie}</option>
                                ))}
                            </select>
                        </div>

                        {/* Type */}
                        <div className='w-full'>
                            <label className="block text-sm font-medium mb-2">Type</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                value={filters.type}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                            >
                                <option value="tous">Tous les types</option>
                                <option value="Avie">A vie</option>
                                <option value="Niveaux">Certificats aux niveaux</option>
                                <option value="Cycle">Durée précise</option>
                            </select>
                        </div>

                        {/* Formateur */}
                        <div className='w-full'>
                            <label className="block text-sm font-medium mb-2">Formateur</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                value={filters.formateur}
                                onChange={(e) => handleFilterChange('formateur', e.target.value)}
                            >
                                <option value="tous">Tous les formateurs</option>
                                {formateurs.map((formateur, index) => (
                                    <option key={index} value={formateur}>{formateur}</option>
                                ))}
                            </select>
                        </div>

                        {/* Genre */}
                        <div className='w-full'>
                            <label className="block text-sm font-medium mb-2">Genre</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                value={filters.genre}
                                onChange={(e) => handleFilterChange('genre', e.target.value)}
                            >
                                <option value="tous">Tous les genres</option>
                                <option value="Enfants">Enfants</option>
                                <option value="préados">Préadolescents</option>
                                <option value="Jeunes">Jeunes</option>
                                <option value="Femmes">Femmes</option>
                                <option value="Hommes">Hommes</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            className="px-4 py-2 bg-pink-600 text-white rounded-md cursor-pointer"
                            onClick={cancelFilters}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}

            {/* Onglets de navigation */}
            <div className="flex border-b mb-6">
                <button
                    onClick={() => setActiveTab2('grille')}
                    className={`py-3 px-6 font-medium ${activeTab2 === 'grille' || activeTab2 === 'liste' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-black'} cursor-pointer hover:bg-white/50`}
                >
                    Toutes les formations
                </button>
                <button
                    onClick={() => setActiveTab2('mesCours')}
                    className={`py-3 px-6 font-medium ${activeTab2 === 'mesCours' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-black'} cursor-pointer hover:bg-white/50`}
                >
                    Mes formations
                </button>
            </div>

            {activeTab2 === 'grille' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFormations.map((formation, index) => (
                        <div key={index} className="bg-white/60 backdrop-blur-xs rounded-xl shadow-xl overflow-hidden">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={formation.img}
                                    alt={formation.titre}
                                    className="w-full h-full object-cover"
                                />
                                {formation.inscrit && (
                                    <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-xs font-medium m-2 rounded">
                                        <Check className="w-3 h-3 inline mr-1" />
                                        Inscrit
                                    </div>
                                )}
                                {formation.prix === 0 ? (
                                    <div className="absolute bottom-0 left-0 bg-green-500 text-white px-3 py-1 m-2 rounded font-medium">
                                        Gratuit
                                    </div>
                                ) : (
                                    <div className="absolute bottom-0 left-0 bg-pink-600 text-white px-3 py-1 m-2 rounded font-medium">
                                        {formation.prix} DH
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold">{formation.titre}</h3>
                                    <div className="flex space-x-1">
                                        {formation.type === "Avie" ? <Navigation className='text-green-500' /> : formation.type === "niveaux" ? <TrendingUp className='text-green-500' /> : <Flag className='text-green-500' />}
                                        <span>{formation.type === "Avie" ? "A vie, pas de certificat" : formation.type === "niveaux" ? "Certificat à chaque niveau" : "Certificat à la fin de la formation"}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                    {formation.description}
                                </p>
                                <div className="flex items-center mb-3">
                                    <User className="w-4 h-4 text-gray-500 mr-1" />
                                    <span className="text-sm">{formation.formateur}</span>
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center">
                                        {formation.duree &&
                                            <>
                                                <Clock className="w-4 h-4 text-gray-500 mr-1 text-pink-500" />
                                                <span className="text-sm">{formation.duree} Mois</span>
                                            </>
                                        }
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 text-yellow-500 mr-1" />
                                        <span className="text-sm">{formation.etudiants} étudiants</span>
                                    </div>
                                </div>
                                <div className="mb-4 flex flex-wrap gap-1">
                                    {formation.tags.slice(0, 3).map((tag, i) => (
                                        <span key={i} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                    {formation.tags.length > 3 && (
                                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                            +{formation.tags.length - 3}
                                        </span>
                                    )}
                                </div>
                                <button className="w-full py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors flex items-center justify-center cursor-pointer"
                                    onClick={() => { setActiveTab('formation'); setFormationID(formation.id) }}>
                                    <span>Voir détails</span>
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab2 === 'mesCours' && (
                <div className="flex flex-col gap-6">
                    {/* Formations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredFormations.filter(f => f.inscrit).map((formation, index) => (
                            <div key={index} className="bg-white/60 backdrop-blur-xs rounded-xl shadow-xl overflow-hidden">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={formation.img}
                                        alt={formation.titre}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-xs font-medium m-2 rounded">
                                        <Check className="w-3 h-3 inline mr-1" />
                                        Inscrit
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-semibold">{formation.titre}</h3>
                                        <div className="flex space-x-1">
                                            {formation.type === "Avie" ? <Navigation className='text-green-500' /> : formation.type === "niveaux" ? <TrendingUp className='text-green-500' /> : <Flag className='text-green-500' />}
                                            <span>{formation.type === "Avie" ? "A vie, pas de certificat" : formation.type === "niveaux" ? "Certificat à chaque niveau" : "Certificat à la fin de la formation"}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-3">
                                        <User className="w-4 h-4 text-gray-500 mr-1" />
                                        <span className="text-sm">{formation.formateur}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center">
                                            {formation.duree &&
                                                <>
                                                    <Clock className="w-4 h-4 text-gray-500 mr-1 text-pink-500" />
                                                    <span className="text-sm">{formation.duree} Mois</span>
                                                </>
                                            }
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="w-4 h-4 text-yellow-500 mr-1" />
                                            <span className="text-sm">{formation.etudiants} étudiants</span>
                                        </div>
                                    </div>
                                    <button className="w-full py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors flex items-center justify-center cursor-pointer"
                                        onClick={() => { setActiveTab('etudier'); setFormationID(formation.id) }}>
                                        <span>Continuer</span>
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pas de formations */}
                    {filteredFormations.filter(f => f.inscrit).length === 0 && (
                        <div className="col-span-3 bg-white/60 backdrop-blur-xs p-8 rounded-xl shadow-xl text-center">
                            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Aucune formation trouvée</h3>
                            <p className="text-gray-600 mb-4">Vous n'êtes inscrit à aucune formation correspondant à vos critères.</p>
                            <button
                                className="px-4 py-2 bg-pink-600 text-white rounded-md cursor-pointer"
                                onClick={() => setActiveTab2('grille')}
                            >
                                Explorer les formations
                            </button>
                        </div>
                    )}

                    {/* Recommandées */}
                    <div className="col-span-1 md:col-span-2 bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl">
                        <h3 className="text-lg font-semibold mb-6">Formations recommandées pour vous</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {filteredFormations.slice(0, 3).map((formation, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden" onClick={() => { setActiveTab('formation'); setFormationID(formation.id) }}>
                                    <div className="relative h-36 overflow-hidden">
                                        <img
                                            src={formation.img}
                                            alt={formation.titre}
                                            className="w-full h-full object-cover"
                                        />
                                        {formation.prix === 0 ? (
                                            <div className="absolute bottom-0 left-0 bg-green-500 text-white px-3 py-1 m-2 rounded font-medium">
                                                Gratuit
                                            </div>
                                        ) : (
                                            <div className="absolute bottom-0 left-0 bg-pink-600 text-white px-3 py-1 m-2 rounded font-medium">
                                                {formation.prix} DH
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-medium mb-1">{formation.titre}</h4>
                                        <div className="flex items-center mb-2">
                                            <User className="w-3 h-3 text-gray-500 mr-1" />
                                            <span className="text-xs text-gray-600">{formation.formateur}</span>
                                        </div>
                                        <div className="flex space-x-1 mb-3">
                                            {formation.type === "Avie" ? <Navigation className='text-green-500' /> : formation.type === "niveaux" ? <TrendingUp className='text-green-500' /> : <Flag className='text-green-500' />}
                                            <span>{formation.type === "Avie" ? "A vie, pas de certificat" : formation.type === "niveaux" ? "Certificat à chaque niveau" : "Certificat à la fin de la formation"}</span>
                                        </div>
                                        <button className="w-full py-1.5 bg-pink-600 text-white text-sm rounded-md hover:bg-pink-700 transition-colors flex items-center justify-center cursor-pointer">
                                            <span>Détails</span>
                                            <ArrowRight className="w-3 h-3 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Aucun résultat */}
            {filteredFormations.length === 0 && activeTab2 !== 'statistiques' && (
                <div className="bg-white/60 backdrop-blur-xs p-8 rounded-xl shadow-xl text-center">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Aucune formation trouvée</h3>
                    <p className="text-gray-600 mb-4">Aucune formation ne correspond à vos critères de recherche.</p>
                    <button
                        className="px-4 py-2 bg-pink-600 text-white rounded-md cursor-pointer"
                        onClick={() => {
                            setSearchQuery('')
                            setFilters({
                                categorie: 'tous',
                                type: 'tous',
                                formateur: 'tous',
                                genre: 'tous'
                            })
                            setFilteredFormations(formations)
                        }}
                    >
                        Réinitialiser les filtres
                    </button>
                </div>
            )}

            {/* Mode liste */}
            {activeTab2 === 'liste' && (
                <div className="space-y-4">
                    {filteredFormations.map((formation, index) => (
                        <div key={index} className="bg-white/60 backdrop-blur-xs rounded-xl shadow-xl overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                                <div className="relative md:w-64 h-48 md:h-auto overflow-hidden">
                                    <img
                                        src={formation.img}
                                        alt={formation.titre}
                                        className="w-full h-full object-cover"
                                    />
                                    {formation.inscrit && (
                                        <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-xs font-medium m-2 rounded">
                                            <Check className="w-3 h-3 inline mr-1" />
                                            Inscrit
                                        </div>
                                    )}
                                    {formation.prix === 0 ? (
                                        <div className="absolute bottom-0 left-0 bg-green-500 text-white px-3 py-1 m-2 rounded font-medium">
                                            Gratuit
                                        </div>
                                    ) : (
                                        <div className="absolute bottom-0 left-0 bg-pink-600 text-white px-3 py-1 m-2 rounded font-medium">
                                            {formation.prix} DH
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-semibold">{formation.titre}</h3>
                                        <div className="flex space-x-1">
                                            {formation.type === "Avie" ? <Navigation className='text-green-500' /> : formation.type === "niveaux" ? <TrendingUp className='text-green-500' /> : <Flag className='text-green-500' />}
                                            <span>{formation.type === "Avie" ? "A vie, pas de certificat" : formation.type === "niveaux" ? "Certificat à chaque niveau" : "Certificat à la fin de la formation"}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">
                                        {formation.description}
                                    </p>
                                    <div className="flex items-center mb-3">
                                        <User className="w-4 h-4 text-gray-500 mr-1" />
                                        <span className="text-sm">{formation.formateur}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <div className="flex items-center">
                                            {formation.duree &&
                                                <>
                                                    <Clock className="w-4 h-4 text-gray-500 mr-1 text-pink-500" />
                                                    <span className="text-sm">{formation.duree} Mois</span>
                                                </>
                                            }
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="w-4 h-4 text-yellow-500 mr-1" />
                                            <span className="text-sm">{formation.etudiants} étudiants</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Tag className="w-4 h-4 text-gray-500 mr-1" />
                                            <span className="text-sm">{formation.categorie}</span>
                                        </div>
                                    </div>
                                    <div className="mb-4 flex flex-wrap gap-1">
                                        {formation.tags.map((tag, i) => (
                                            <span key={i} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="w-full py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors flex items-center justify-center cursor-pointer"
                                        onClick={() => { setActiveTab('formation'); setFormationID(formation.id) }}>
                                        <span>Voir détails</span>
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}