import {
    Calendar, Tag, User, MapPin, Info, ArrowRight, Home, ChevronRight,
    Trash2, Edit, Plus, X
} from 'lucide-react'
import { useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Annonces() {
    const initialAnnonces = [
        {
            id: 1,
            titre: "Changement de programme en Ramadan",
            description: "test test test test test test test test test test test test test test test test test test test test test test test test test",
            img: "/formation.jpg",
            date: "18/04/2025"
        },
        {
            id: 2,
            titre: "Nouvelle formation : Langue Espangne",
            description: "test test test test test test test test test test test test test test test test test test test test test test test test test",
            img: "/formation.jpg",
            date: "15/04/2025"
        }
    ]

    const [annonces, setAnnonces] = useState(initialAnnonces)
    const [showEditForm, setShowEditForm] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [currentAnnonce, setCurrentAnnonce] = useState(null)
    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        img: ''
    })

    const fileInputRef = useRef(null)

    const handleDelete = (id) => {
        setAnnonces(annonces.filter(annonce => annonce.id !== id))
    }

    const handleEdit = (annonce) => {
        setCurrentAnnonce(annonce)
        setFormData({
            titre: annonce.titre,
            description: annonce.description,
            img: annonce.img
        })
        setShowEditForm(true)
    }

    const handleAdd = () => {
        setCurrentAnnonce(null)
        setFormData({
            titre: '',
            description: '',
            img: ''
        })
        setShowAddForm(true)
    }

    const handleCloseForm = () => {
        setShowEditForm(false)
        setShowAddForm(false)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    img: reader.result
                })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault()
        const updatedAnnonces = annonces.map(annonce =>
            annonce.id === currentAnnonce.id
                ? { ...annonce, ...formData }
                : annonce
        )
        setAnnonces(updatedAnnonces)
        setShowEditForm(false)
    }

    const handleSubmitAdd = (e) => {
        e.preventDefault()
        const newAnnonce = {
            id: Math.max(...annonces.map(a => a.id)) + 1,
            ...formData,
            date: new Date().toLocaleDateString('fr-FR'),
            categorie: "Nouvelle catégorie",
            auteur: "Utilisateur",
            ville: "Ville",
            prix: 0
        }
        setAnnonces([...annonces, newAnnonce])
        setShowAddForm(false)
    }

    return (
        <>
            <Head>
                <title>Annonces - Académie Nobough</title>
                <link rel="icon" href="/logo2-nobg.png" />
            </Head>

            <div className="max-w-full relative">
                <div className="flex justify-end px-4 py-6">
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-700 transition cursor-pointer"
                    >
                        <Plus className="w-5 h-5" />
                        Ajouter une annonce
                    </button>
                </div>

                <div className="space-y-6 md:px-4 lg:px-4 mb-8">
                    {annonces.map((annonce) => (
                        <div key={annonce.id} className="w-full bg-white/60 backdrop-blur-xs rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/4 h-64 md:h-auto relative overflow-hidden">
                                    <img
                                        src={annonce.img}
                                        alt={annonce.titre}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-6 md:w-3/4 relative">
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(annonce)}
                                            className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition cursor-pointer"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(annonce.id)}
                                            className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition cursor-pointer"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 text-gray-800">{annonce.titre}</h3>
                                    <p className="text-gray-600 mb-6">{annonce.description}</p>

                                    <div className="flex flex-wrap md:items-center gap-4 mb-6">
                                        <div className="flex items-center text-gray-600">
                                            <Calendar className="w-5 h-5 text-pink-600 mr-2" />
                                            <span>Publié le {annonce.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modifier */}
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

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition cursor-pointer"
                                    >
                                        Enregistrer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Modal pour ajouter une annonce */}
                {showAddForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
                            onClick={handleCloseForm}
                        ></div>
                        <div className="bg-white/60 backdrop-blur-3xl rounded-xl p-8 w-full max-w-lg z-10 relative">
                            <img src="/logo2-nobg.png" className="w-16 h-16 absolute top-4 right-4 cursor-pointer" onClick={handleCloseForm} />
                            <h2 className="text-2xl font-bold mb-6">Ajouter une annonce</h2>

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

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition cursor-pointer"
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}