import {
    Calendar, User, Phone, Mail, CreditCard, GraduationCap, Trash2, Info, Plus, X
} from 'lucide-react'
import { useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Etudiants({ setActiveTab, setEtudiantID }) {
    const initialEtudiants = [
        {
            id: 1,
            img: "/user.jpg",
            nom: "test1",
            prenom: "test1",
            birth: "12/08/2002",
            tel: "+212678123456",
            email: "test.test@gmail.com",
            cin: "EF456789",
            bio: "test test test test test test test test test test test test test test test test test test test test test test test test test",
            rabais: "50"
        },
        {
            id: 2,
            img: "/user.jpg",
            nom: "test2",
            prenom: "test2",
            birth: "05/03/2001",
            tel: "+212661987654",
            email: "test.test@gmail.com",
            cin: "GH123456",
            bio: "test test test test test test test test test test test test test test test test test test test test test test test test test",
            rabais: "0"
        }
    ]

    const [etudiants, setEtudiants] = useState(initialEtudiants)
    const [showAddForm, setShowAddForm] = useState(false)
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        birth: '',
        tel: '',
        email: '',
        cin: '',
        bio: '',
        promo: '',
        img: ''
    })

    const fileInputRef = useRef(null)

    const handleDelete = (id) => {
        setEtudiants(etudiants.filter(etudiant => etudiant.id !== id))
    }

    const handleAdd = () => {
        setFormData({
            nom: '',
            prenom: '',
            birth: '',
            tel: '',
            email: '',
            cin: '',
            bio: '',
            promo: '',
            img: ''
        })
        setShowAddForm(true)
    }

    const handleCloseForm = () => {
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

    const handleSubmitAdd = (e) => {
        e.preventDefault()
        const newEtudiant = {
            id: Math.max(...etudiants.map(e => e.id)) + 1,
            ...formData
        }
        setEtudiants([...etudiants, newEtudiant])
        setShowAddForm(false)
    }

    return (
        <>
            <Head>
                <title>Étudiants - Académie Nobough</title>
                <link rel="icon" href="/logo2-nobg.png" />
            </Head>

            <div className="max-w-full relative">
                <div className="flex justify-end px-4 py-6">
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-700 transition cursor-pointer"
                    >
                        <Plus className="w-5 h-5" />
                        Ajouter un étudiant
                    </button>
                </div>

                <div className="space-y-6 md:px-4 lg:px-4 mb-8">
                    {etudiants.map((etudiant) => (
                        <div key={etudiant.id} className="w-full bg-white/60 backdrop-blur-xs rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/4 h-64 md:h-auto relative overflow-hidden">
                                    <img
                                        src={etudiant.img}
                                        alt={`${etudiant.prenom} ${etudiant.nom}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-6 md:w-3/4 relative">
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition cursor-pointer"
                                        onClick={() => { setActiveTab('etudiant'); setEtudiantID(etudiant.id) }}>
                                            <Info className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(etudiant.id)}
                                            className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition cursor-pointer"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 text-gray-800">
                                        {etudiant.prenom} {etudiant.nom}
                                    </h3>

                                    <p className="text-gray-600 mb-6">{etudiant.bio}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className="flex items-center text-gray-600">
                                            <Calendar className="w-5 h-5 text-pink-600 mr-2" />
                                            <span>Né(e) le {etudiant.birth}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Phone className="w-5 h-5 text-pink-600 mr-2" />
                                            <span>{etudiant.tel}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Mail className="w-5 h-5 text-pink-600 mr-2" />
                                            <span>{etudiant.email}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <CreditCard className="w-5 h-5 text-pink-600 mr-2" />
                                            <span>CIN: {etudiant.cin}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex items-center text-gray-600">
                                            <GraduationCap className="w-5 h-5 text-pink-600 mr-2" />
                                            <div>
                                                <span className="font-medium">Promotion:</span>
                                                <span className="ml-2 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
                                                    {etudiant.rabais}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Ajout */}
                {showAddForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
                            onClick={handleCloseForm}
                        ></div>
                        <div className="bg-white/60 backdrop-blur-3xl rounded-xl p-8 w-full max-w-lg z-10 relative max-h-screen overflow-y-auto">
                            <img src="/logo2-nobg.png" className="w-16 h-16 absolute top-4 right-4 cursor-pointer" onClick={handleCloseForm} />
                            <h2 className="text-2xl font-bold mb-6">Ajouter un étudiant</h2>

                            <form onSubmit={handleSubmitAdd} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 mb-2">Nom</label>
                                        <input
                                            type="text"
                                            name="nom"
                                            value={formData.nom}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">Prénom</label>
                                        <input
                                            type="text"
                                            name="prenom"
                                            value={formData.prenom}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 mb-2">Date de naissance</label>
                                        <input
                                            type="text"
                                            name="birth"
                                            value={formData.birth}
                                            onChange={handleChange}
                                            placeholder="JJ/MM/AAAA"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">CIN</label>
                                        <input
                                            type="text"
                                            name="cin"
                                            value={formData.cin}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 mb-2">Téléphone</label>
                                        <input
                                            type="text"
                                            name="tel"
                                            value={formData.tel}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">Promotion</label>
                                    <input
                                        type="text"
                                        name="promo"
                                        value={formData.promo}
                                        onChange={handleChange}
                                        placeholder="AAAA-AAAA"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows="3"
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