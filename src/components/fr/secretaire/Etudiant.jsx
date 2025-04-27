import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Notification from '../../../utils/fr/Notification'
import {
    User, Mail, Phone, Calendar, Edit, Save, X, DollarSign,
    Check, AlertCircle, CreditCard, FileText, Info
} from 'lucide-react'

export default function Etudiant({ etudiantID }) {
    const [activeTab, setActiveTab] = useState('informations')
    const [editMode, setEditMode] = useState(false)
    const [notification, setNotification] = useState({
        msg: '',
        type: '',
        duration: 3000,
        onclose: null
    })
    const [showNotification, setShowNotification] = useState(false)

    const [etudiant, setEtudiant] = useState({
        id: 1,
        img: "/user.jpg",
        nom: "test",
        prenom: "test",
        tel: "+212600000000",
        email: "test.test@gmail.com",
        cin: "AB123456",
        birth: "22/07/1998",
        bio: "test test test test test test test test test test test test test test test test test test test test test test test test test",
        rabais: 15,
        dateInscr: "01/03/2024"
    })

    const [editData, setEditData] = useState({ ...etudiant })
    const fileInputRef = useRef(null)

    const [paiements, setPaiements] = useState([
        { mois: "Mars 2024", montant: 850, paye: true, datePaiement: "05/03/2024" },
        { mois: "Avril 2024", montant: 850, paye: true, datePaiement: "02/04/2024" },
        { mois: "Mai 2024", montant: 850, paye: false, datePaiement: null },
        { mois: "Juin 2024", montant: 850, paye: false, datePaiement: null },
        { mois: "Juillet 2024", montant: 850, paye: false, datePaiement: null },
        { mois: "Août 2024", montant: 850, paye: false, datePaiement: null }
    ])

    const totalPaye = paiements.reduce((total, paiement) => total + (paiement.paye ? paiement.montant : 0), 0)
    const totalAPayer = paiements.reduce((total, paiement) => total + paiement.montant, 0) - totalPaye

    const handlePaiementChange = (index) => {
        const newPaiements = [...paiements]
        newPaiements[index].paye = !newPaiements[index].paye
        newPaiements[index].datePaiement = newPaiements[index].paye ? new Date().toLocaleDateString('fr-FR') : null
        setPaiements(newPaiements)

        setNotification({
            msg: newPaiements[index].paye
                ? `Paiement de ${newPaiements[index].mois} marqué comme payé`
                : `Paiement de ${newPaiements[index].mois} marqué comme non payé`,
            type: newPaiements[index].paye ? 'success' : 'warning'
        })
        setShowNotification(true)
    }

    const handleEdit = () => {
        setEditData({ ...etudiant })
        setEditMode(true)
    }

    const handleSave = () => {
        setEtudiant({ ...editData })
        setEditMode(false)
        setNotification({
            msg: 'Informations mises à jour avec succès',
            type: 'success'
        })
        setShowNotification(true)
        console.log(editData)
    }

    const handleCancel = () => {
        setEditData({ ...etudiant })
        setEditMode(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setEditData(prev => ({
                    ...prev,
                    img: reader.result
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleEditImageClick = () => {
        fileInputRef.current.click()
    }

    return (
        <>
            <Head>
                <title>{etudiant.nom + ' ' + etudiant.prenom} - Académie Nobough</title>
                <link rel="icon" href="/logo2-nobg.png" />
            </Head>

            {showNotification &&
                <Notification {...notification} showNotification={showNotification} setShowNotification={setShowNotification} />
            }

            <div className="max-w-full">
                {/* Nav */}
                <div className="flex border-b mb-6 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('informations')}
                        className={`py-3 px-6 font-medium ${activeTab === 'informations' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-black'} cursor-pointer hover:bg-white/50 whitespace-nowrap`}
                    >
                        Informations personnelles
                    </button>
                    <button
                        onClick={() => setActiveTab('paiements')}
                        className={`py-3 px-6 font-medium ${activeTab === 'paiements' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-black'} cursor-pointer hover:bg-white/50 whitespace-nowrap`}
                    >
                        Paiements
                    </button>
                </div>

                {/* Infos */}
                {activeTab === 'informations' && (
                    <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl mb-6">
                        <div className="flex gap-2 flex-col md:flex-row lg:flex-row justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Profil</h2>
                            {!editMode ? (
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded transition-colors cursor-pointer"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Modifier
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors cursor-pointer"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Enregistrer
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition-colors cursor-pointer"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Annuler
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-1 flex flex-col items-center">
                                <img
                                    src={editData.img}
                                    alt={`${etudiant.prenom} ${etudiant.nom}`}
                                    className="w-48 h-48 rounded-full object-cover mb-6"
                                />

                                {editMode && (
                                    <>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                        <button
                                            onClick={handleEditImageClick}
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition-colors"
                                        >
                                            Modifier la photo
                                        </button>
                                    </>
                                )}

                                {!editMode && (
                                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 w-full mt-6">
                                        <h3 className="text-pink-600 font-semibold mb-2 flex items-center">
                                            <Info className="w-4 h-4 mr-2" />
                                            Statut financier
                                        </h3>
                                        <div className="text-sm space-y-2">
                                            <p className="flex justify-between">
                                                <span>Rabais:</span>
                                                <span className="font-semibold">{etudiant.rabais}%</span>
                                            </p>
                                            <p className="flex justify-between">
                                                <span>Paiements:</span>
                                                <span className="font-semibold">
                                                    {paiements.filter(p => p.paye).length}/{paiements.length}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {/* Prénom */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="prenom"
                                                value={editData.prenom}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            />
                                        ) : (
                                            <p className="text-gray-800 bg-white p-2 rounded border border-gray-200">{etudiant.prenom}</p>
                                        )}
                                    </div>

                                    {/* Nom */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="nom"
                                                value={editData.nom}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            />
                                        ) : (
                                            <p className="text-gray-800 bg-white p-2 rounded border border-gray-200">{etudiant.nom}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        {editMode ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={editData.email}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            />
                                        ) : (
                                            <div className="flex items-center text-gray-800 bg-white p-2 rounded border border-gray-200">
                                                <Mail className="w-4 h-4 text-pink-500 mr-2" />
                                                {etudiant.email}
                                            </div>
                                        )}
                                    </div>

                                    {/* Tel */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="tel"
                                                value={editData.tel}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            />
                                        ) : (
                                            <div className="flex items-center text-gray-800 bg-white p-2 rounded border border-gray-200">
                                                <Phone className="w-4 h-4 text-pink-500 mr-2" />
                                                {etudiant.tel}
                                            </div>
                                        )}
                                    </div>

                                    {/* Birth */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="birth"
                                                value={editData.birth}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            />
                                        ) : (
                                            <div className="flex items-center text-gray-800 bg-white p-2 rounded border border-gray-200">
                                                <Calendar className="w-4 h-4 text-pink-500 mr-2" />
                                                {etudiant.birth}
                                            </div>
                                        )}
                                    </div>

                                    {/* CIN */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">CIN</label>
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="cin"
                                                value={editData.cin}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            />
                                        ) : (
                                            <div className="flex items-center text-gray-800 bg-white p-2 rounded border border-gray-200">
                                                <FileText className="w-4 h-4 text-pink-500 mr-2" />
                                                {etudiant.cin}
                                            </div>
                                        )}
                                    </div>

                                    {/* Rabais */}
                                    {editMode && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Rabais (%)</label>
                                            <input
                                                type="number"
                                                name="rabais"
                                                value={editData.rabais}
                                                onChange={handleChange}
                                                min="0"
                                                max="100"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Bio */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Biographie</label>
                                    {editMode ? (
                                        <textarea
                                            name="bio"
                                            value={editData.bio}
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        ></textarea>
                                    ) : (
                                        <p className="text-gray-800 bg-white p-3 rounded border border-gray-200">{etudiant.bio}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Paiements */}
                {activeTab === 'paiements' && (
                    <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl mb-6">
                        <h2 className="text-2xl font-bold mb-6">Suivi des paiements</h2>

                        {/* Résumé */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-pink-500">
                                <p className="text-gray-500 mb-1">Total à payer</p>
                                <p className="text-2xl font-bold text-pink-600">{totalAPayer} DH</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
                                <p className="text-gray-500 mb-1">Déjà payé</p>
                                <p className="text-2xl font-bold text-green-600">{totalPaye} DH</p>
                            </div>
                        </div>

                        {/* Tableau */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Mois
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Montant
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Statut
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date de paiement
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {paiements.map((paiement, index) => (
                                        <tr key={index} className={paiement.paye ? "bg-green-50" : "bg-white"}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {paiement.mois}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                                                {paiement.montant} DH
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {paiement.paye ? (
                                                    <span className="px-2 inline-flex items-center text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                        <Check className="w-3 h-3 mr-1" />
                                                        Payé
                                                    </span>
                                                ) : (
                                                    <span className="px-2 inline-flex items-center text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                                                        <AlertCircle className="w-3 h-3 mr-1" />
                                                        Non payé
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {paiement.datePaiement || "-"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => handlePaiementChange(index)}
                                                    className={`inline-flex items-center rounded px-2.5 py-1.5 text-xs font-medium ${paiement.paye
                                                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                                                        : "bg-green-100 text-green-700 hover:bg-green-200"
                                                        }`}
                                                >
                                                    {paiement.paye ? (
                                                        <div className='flex gap-1 items-center justify-around cursor-pointer'>
                                                            <X className="w-3 h-3 mr-1" />
                                                            Marquer non payé
                                                        </div>
                                                    ) : (
                                                        <div className='flex gap-1 items-center justify-around cursor-pointer'>
                                                            <CreditCard className="w-3 h-3 mr-1" />
                                                            Marquer payé
                                                        </div>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}