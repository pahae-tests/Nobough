import {
    Search, Filter, Users, Clock, Navigation, Flag, TrendingUp,
    Tag, DollarSign, BookOpen, User, Bookmark, Check, FileText,
    ArrowRight, Heart, Star, ChevronDown, Grid, List,
    Trash, Edit, Plus, X
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Link from 'next/link'

export default function Formations() {
    const [formations, setFormations] = useState([
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
            genre: 'Hommes',
            salle: "Salle 1",
            programme: [
                { jour: "Lundi", horaire: "18:00" },
                { jour: "Mercredi", horaire: "19:00" }
            ]
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
            genre: 'tous',
            salle: "Salle 2",
            programme: [
                { jour: "Mardi", horaire: "18:00" }
            ]
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
            genre: 'Enfants',
            salle: "Salle 3",
            programme: [
                { jour: "Vendredi", horaire: "14:00" },
                { jour: "Samedi", horaire: "10:00" }
            ]
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
            genre: 'Femmes',
            salle: "Salle 4",
            programme: [
                { jour: "Jeudi", horaire: "19:00" }
            ]
        },
    ])

    const formateurs = [...new Set(formations.map(formation => formation.formateur))]
    const categories = [...new Set(formations.map(formation => formation.categorie))]
    const salles = ["Salle 1", "Salle 2", "Salle 3", "Salle 4", "Salle 5"]
    const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

    const [searchQuery, setSearchQuery] = useState('')
    const [filteredFormations, setFilteredFormations] = useState([])

    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [currentFormationId, setCurrentFormationId] = useState(null)
    const fileInputRef = useRef(null)
    const editFileInputRef = useRef(null)

    const emptyFormData = {
        titre: "",
        description: "",
        img: "",
        formateur: formateurs[0] || "",
        prix: 0,
        categorie: categories[0] || "",
        type: "Avie",
        genre: "tous",
        salle: salles[0],
        programme: []
    }

    const [formData, setFormData] = useState(emptyFormData)
    const [tempProgramme, setTempProgramme] = useState({ jour: jours[0], horaire: "08:00" })

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
            return matchQuery
        })
        setFilteredFormations(filtered)
    }

    useEffect(() => {
        if (formations && formations.length > 0) {
            const filtered = formations.filter(formation => {
                const matchQuery = searchQuery === '' || formation.titre.toLowerCase().includes(searchQuery.toLowerCase()) || formation.description.toLowerCase().includes(searchQuery.toLowerCase()) || formation.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                return matchQuery
            })
            setFilteredFormations(filtered)
        }
    }, [searchQuery, formations])

    const handleOpenAddForm = () => {
        setFormData(emptyFormData)
        setShowAddForm(true)
    }

    const handleOpenEditForm = (formation) => {
        setCurrentFormationId(formation.id)
        setFormData({
            titre: formation.titre,
            description: formation.description,
            img: formation.img,
            formateur: formation.formateur,
            prix: formation.prix,
            categorie: formation.categorie,
            type: formation.type,
            genre: formation.genre,
            salle: formation.salle,
            programme: [...formation.programme]
        })
        setShowEditForm(true)
    }

    const handleCloseForm = () => {
        setShowAddForm(false)
        setShowEditForm(false)
        setCurrentFormationId(null)
        setFormData(emptyFormData)
        setTempProgramme({ jour: jours[0], horaire: "08:00" })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'prix' ? parseFloat(value) : value
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    img: reader.result
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleTempProgrammeChange = (e) => {
        const { name, value } = e.target
        setTempProgramme(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleAddProgramme = () => {
        setFormData(prev => ({
            ...prev,
            programme: [...prev.programme, { ...tempProgramme }]
        }))
        setTempProgramme({ jour: jours[0], horaire: "08:00" })
    }

    const handleRemoveProgramme = (index) => {
        setFormData(prev => ({
            ...prev,
            programme: prev.programme.filter((_, i) => i !== index)
        }))
    }

    const handleSubmitAdd = (e) => {
        e.preventDefault()
        const newFormation = {
            id: Math.max(0, ...formations.map(f => f.id)) + 1,
            ...formData,
            etudiants: 0,
            tags: formData.titre.split(' '),
        }
        console.log(newFormation)
        setFormations(prev => [...prev, newFormation])
        handleCloseForm()
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault()
        setFormations(prev => prev.map(formation =>
            formation.id === currentFormationId
                ? { ...formation, ...formData }
                : formation
        ))
        handleCloseForm()
    }

    const handleDeleteFormation = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
            setFormations(prev => prev.filter(formation => formation.id !== id))
        }
    }

    return (
        <div className="max-w-full">
            {/* Heder */}
            <div className="mb-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Catalogue des formations</h1>
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors cursor-pointer"
                    onClick={handleOpenAddForm}
                >
                    <Plus className="w-5 h-5" />
                    <span>Ajouter une formation</span>
                </button>
            </div>

            {/* Recherche */}
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

            {/* Grille */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFormations.map((formation, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-xs rounded-xl shadow-xl overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
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
                            {/* Boutons d'actions */}
                            <div className="absolute top-0 right-0 flex space-x-2 m-2">
                                <button
                                    className="bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenEditForm(formation);
                                    }}
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteFormation(formation.id);
                                    }}
                                >
                                    <Trash className="w-4 h-4" />
                                </button>
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
                        </div>
                    </div>
                ))}
            </div>

            {/* Aucun resultat */}
            {filteredFormations.length === 0 && (
                <div className="bg-white/60 backdrop-blur-xs p-8 rounded-xl shadow-xl text-center">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Aucune formation trouvée</h3>
                    <p className="text-gray-600 mb-4">Aucune formation ne correspond à vos critères de recherche.</p>
                    <button
                        className="px-4 py-2 bg-pink-600 text-white rounded-md cursor-pointer"
                        onClick={() => {
                            setSearchQuery('')
                            setFilteredFormations(formations)
                        }}
                    >
                        Réinitialiser la recherche
                    </button>
                </div>
            )}

            {/* Ajout */}
            {showAddForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
                        onClick={handleCloseForm}
                    ></div>
                    <div className="bg-white/60 backdrop-blur-3xl rounded-xl p-8 w-full max-w-lg z-10 relative">
                        <img src="/logo2-nobg.png" className="w-16 h-16 absolute top-4 right-4 cursor-pointer" onClick={handleCloseForm} />
                        <h2 className="text-2xl font-bold mb-6">Ajouter une formation</h2>

                        <form onSubmit={handleSubmitAdd} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Titre</label>
                                <input
                                    type="text"
                                    name="titre"
                                    value={formData.titre}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Image</label>
                                <div className="flex items-center space-x-4">
                                    {formData.img && (
                                        <div className="w-20 h-20 relative">
                                            <img
                                                src={formData.img}
                                                alt="Aperçu"
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current.click()}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                                    >
                                        Choisir une image
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">Prix (DH)</label>
                                    <input
                                        type="number"
                                        name="prix"
                                        value={formData.prix}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Formateur</label>
                                    <select
                                        name="formateur"
                                        value={formData.formateur}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        required
                                    >
                                        {formateurs.map((formateur, index) => (
                                            <option key={index} value={formateur}>{formateur}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">Catégorie</label>
                                    <select
                                        name="categorie"
                                        value={formData.categorie}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        required
                                    >
                                        {categories.map((categorie, index) => (
                                            <option key={index} value={categorie}>{categorie}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="Avie">A vie</option>
                                        <option value="Niveaux">Certificats aux niveaux</option>
                                        <option value="Cycle">Durée précise</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">Genre</label>
                                    <select
                                        name="genre"
                                        value={formData.genre}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="tous">Tous</option>
                                        <option value="Hommes">Hommes</option>
                                        <option value="Femmes">Femmes</option>
                                        <option value="Enfants">Enfants</option>
                                        <option value="préados">Préadolescents</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Salle</label>
                                    <select
                                        name="salle"
                                        value={formData.salle}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        required
                                    >
                                        {salles.map((salle, index) => (
                                            <option key={index} value={salle}>{salle}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Programme</label>
                                <div className="space-y-2">
                                    {formData.programme.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                                            <div className="flex-1">{item.jour} - {item.horaire}</div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveProgramme(index)}
                                                className="text-red-500 hover:text-red-700 cursor-pointer"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-2 grid grid-cols-5 gap-2">
                                    <select
                                        name="jour"
                                        value={tempProgramme.jour}
                                        onChange={handleTempProgrammeChange}
                                        className="col-span-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    >
                                        {jours.map((jour, index) => (
                                            <option key={index} value={jour}>{jour}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="time"
                                        name="horaire"
                                        value={tempProgramme.horaire}
                                        onChange={handleTempProgrammeChange}
                                        className="col-span-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddProgramme}
                                        className="bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer flex items-center justify-center"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition cursor-pointer"
                                >
                                    Ajouter la formation
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modification */}
            {showEditForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
                        onClick={handleCloseForm}
                    ></div>
                    <div className="bg-white/60 backdrop-blur-3xl rounded-xl p-8 w-full max-w-lg z-10 relative">
                        <img src="/logo2-nobg.png" className="w-16 h-16 absolute top-4 right-4 cursor-pointer" onClick={handleCloseForm} />
                        <h2 className="text-2xl font-bold mb-6">Modifier l'annonce</h2>

                        <form onSubmit={handleSubmitEdit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Titre</label>
                                <input
                                    type="text"
                                    name="titre"
                                    value={formData.titre}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Image</label>
                                <div className="flex items-center space-x-4">
                                    {formData.img && (
                                        <div className="w-20 h-20 relative">
                                            <img
                                                src={formData.img}
                                                alt="Aperçu"
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        ref={editFileInputRef}
                                        onChange={handleImageChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => editFileInputRef.current.click()}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                                    >
                                        Choisir une image
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">Prix (DH)</label>
                                    <input
                                        type="number"
                                        name="prix"
                                        value={formData.prix}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Formateur</label>
                                    <select
                                        name="formateur"
                                        value={formData.formateur}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        required
                                    >
                                        {formateurs.map((formateur, index) => (
                                            <option key={index} value={formateur}>{formateur}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">Catégorie</label>
                                    <select
                                        name="categorie"
                                        value={formData.categorie}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        required
                                    >
                                        {categories.map((categorie, index) => (
                                            <option key={index} value={categorie}>{categorie}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="Avie">A vie</option>
                                        <option value="Niveaux">Certificats aux niveaux</option>
                                        <option value="Cycle">Durée précise</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">Genre</label>
                                    <select
                                        name="genre"
                                        value={formData.genre}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="tous">Tous</option>
                                        <option value="Hommes">Hommes</option>
                                        <option value="Femmes">Femmes</option>
                                        <option value="Enfants">Enfants</option>
                                        <option value="préados">Préadolescents</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Salle</label>
                                    <select
                                        name="salle"
                                        value={formData.salle}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        required
                                    >
                                        {salles.map((salle, index) => (
                                            <option key={index} value={salle}>{salle}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Programme</label>
                                <div className="space-y-2">
                                    {formData.programme.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                                            <div className="flex-1">{item.jour} - {item.horaire}</div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveProgramme(index)}
                                                className="text-red-500 hover:text-red-700 cursor-pointer"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-2 grid grid-cols-5 gap-2">
                                    <select
                                        name="jour"
                                        value={tempProgramme.jour}
                                        onChange={handleTempProgrammeChange}
                                        className="col-span-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    >
                                        {jours.map((jour, index) => (
                                            <option key={index} value={jour}>{jour}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="time"
                                        name="horaire"
                                        value={tempProgramme.horaire}
                                        onChange={handleTempProgrammeChange}
                                        className="col-span-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddProgramme}
                                        className="bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer flex items-center justify-center"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition cursor-pointer"
                                >
                                    Enregistrer les modifications
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}