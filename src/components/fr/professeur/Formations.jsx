import {
    Search, Filter, Users, Clock, User, Check, ArrowRight
} from 'lucide-react'
import { useState, useEffect } from 'react'
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
            categorie: "Programmation",
            tags: ["WordPress", "Hostinger", "Web", "Design"],
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
            categorie: "Religion",
            tags: ["Coran", "Dikr"],
            genre: 'tous'
        }
    ]
    const formateurs = [...new Set(formations.map(formation => formation.formateur))]
    const categories = [...new Set(formations.map(formation => formation.categorie))]

    const [searchQuery, setSearchQuery] = useState('')
    const [filteredFormations, setFilteredFormations] = useState([])
    const [filterOpen, setFilterOpen] = useState(false)
    const [filters, setFilters] = useState({
        categorie: 'tous',
        formateur: 'tous',
        genre: 'tous'
    })

    useEffect(() => {
        if (formations && formations.length > 0) {
            setFilteredFormations(formations)
        }
    }, [formations])

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase()
        setSearchQuery(query)

        const filtered = formations.filter(formation => {
            const matchQuery = formation.titre.toLowerCase().includes(query) || formation.description.toLowerCase().includes(query) || formation.tags.some(tag => tag.toLowerCase().includes(query))
            const matchCategorie = filters.categorie === 'tous' || formation.categorie === filters.categorie
            const matchFormateur = filters.formateur === 'tous' || formation.formateur === filters.formateur
            const matchGenre = filters.genre === 'tous' || formation.genre === filters.genre
            return matchQuery && matchCategorie && matchFormateur && matchGenre
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
                const matchFormateur = filters.formateur === 'tous' || formation.formateur === filters.formateur
                const matchGenre = filters.genre === 'tous' || formation.genre === filters.genre
                return matchQuery && matchCategorie && matchFormateur && matchGenre
            })
            setFilteredFormations(filtered)
        }
    }, [filters, searchQuery, formations])

    const cancelFilters = () => {
        setFilters({
            categorie: 'tous',
            formateur: 'tous',
            genre: 'tous'
        })
        setFilterOpen(false)
    }

    return (
        <div className="max-w-full">
            {/* Lfo9 */}
            <div className="mb-8 flex justify-between items-center flex-col md:flex-row lg:flex-row">
                <h1 className="text-2xl font-bold">Votre Enseignements</h1>
                <div className="flex space-x-4">
                    <button
                        className="px-3 py-2 flex items-center bg-white/70 rounded-lg shadow-sm hover:bg-white cursor-pointer"
                        onClick={() => setFilterOpen(!filterOpen)}
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        <span>Filtres</span>
                    </button>
                </div>
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

            {/* Aucun résultat */}
            {filteredFormations.length === 0 && (
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

            {/* Formations */}
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
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{formation.titre}</h3>
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
                                <span>Démarrer</span>
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}