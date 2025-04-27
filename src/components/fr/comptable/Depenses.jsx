import { useState, useEffect } from 'react'
import {
    ArrowDown, ArrowUp, AlertCircle, DollarSign,
    Calendar, FileText, Users, PieChart, Briefcase,
    Plus, Filter, Bell
} from 'lucide-react'

export default function ({ depenses, setDepenses }) {
    const [filterPeriod, setFilterPeriod] = useState('dernier-mois')
    const [selectedDate, setSelectedDate] = useState(null)
    const [showAddDepenseForm, setShowAddDepenseForm] = useState(false)
    const [showFilterPopup, setShowFilterPopup] = useState(false)
    const [newDepense, setNewDepense] = useState({
        type: 'salaires',
        montant: '',
        titre: '',
        remarque: ''
    })

    const handleAddDepenseSubmit = (e) => {
        e.preventDefault()
        const newDepenseItem = {
            ...newDepense,
            date: new Date().toISOString().split('T')[0]
        }
        setDepenses(prev => [...prev, newDepenseItem])

        setNewDepense({
            type: 'salaires',
            montant: '',
            titre: '',
            remarque: ''
        })
        setShowAddDepenseForm(false)
    }

    const filterDataByDate = (data, date) => {
        if (!date) return data
        const [year, month] = date.split('-')
        return data.filter(item => {
            const itemDate = item.date.split('-')
            return itemDate[0] === year && itemDate[1] === month
        })
    }

    const filteredDepenses = filterDataByDate(depenses, selectedDate)

    return (
        <div className="md:px-4 lg:px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-semibold">Dépenses</h2>

                <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                    <button
                        className="bg-pink-600 text-white px-3 py-2 rounded-md flex items-center gap-1 shadow-sm cursor-pointer"
                        onClick={() => setShowFilterPopup(true)}
                    >
                        <Filter className="w-4 h-4" />
                        Filtrer
                    </button>

                    <button
                        className="bg-pink-600 text-white px-3 py-2 rounded-md flex items-center gap-1 shadow-sm cursor-pointer"
                        onClick={() => setShowAddDepenseForm(true)}
                    >
                        <Plus className="w-4 h-4" />
                        Ajouter une dépense
                    </button>
                </div>
            </div>

            {showFilterPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50" onClick={() => setShowFilterPopup(false)}>
                    <div className="bg-white/60 p-6 rounded-lg shadow-lg" onClick={e => e.stopPropagation()}>
                        <h2 className="text-lg font-semibold mb-4">Sélectionner une date</h2>
                        <div className='flex justify-center items-center gap-2'>
                            <input
                                type="month"
                                className="border p-2 rounded-md"
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                            <button
                                className="px-4 py-2 bg-pink-500 text-white rounded-md"
                                onClick={() => setShowFilterPopup(false)}
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white/50 backdrop-blur-xs shadow-xl rounded-lg overflow-x-auto">
                <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 bg-gray-50 p-3 rounded-t-lg border-b">
                    <div className="font-medium">Type</div>
                    <div className="font-medium">Titre</div>
                    <div className="font-medium">Date</div>
                    <div className="font-medium text-right">Montant</div>
                </div>

                {filteredDepenses.map(depense => (
                    <div key={depense.id} className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 p-3 border-b hover:bg-gray-50">
                        <div>
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${depense.type === 'salaires' ? 'bg-pink-100 text-pink-700' :
                                depense.type === 'fournitures' ? 'bg-green-100 text-green-700' :
                                    'bg-orange-100 text-orange-700'
                                }`}>
                                {depense.type}
                            </span>
                        </div>
                        <div className="self-center">
                            <p>{depense.titre}</p>
                            {depense.remarque && <p className="text-gray-500 text-sm">{depense.remarque}</p>}
                        </div>
                        <div className="self-center">{depense.date}</div>
                        <div className="text-right self-center font-medium text-red-600">-{depense.montant.toLocaleString()} DH</div>
                    </div>
                ))}

                <div className="p-3 text-right font-semibold">
                    Total: {filteredDepenses.reduce((sum, item) => sum + (typeof item.montant === 'string' ? parseFloat(item.montant) : item.montant), 0).toLocaleString()} DH
                </div>
            </div>

            {showAddDepenseForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 cursor-pointer" onClick={() => setShowAddDepenseForm(false)}>
                    <div className="bg-white/60 backdrop-blur-3xl shadow-xl rounded-lg p-6 w-full max-w-md md:max-w-lg lg:max-w-xl" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg md:text-xl font-semibold mb-4">Ajouter une dépense</h3>
                        <img src="/logo2-nobg.png" className="w-16 h-16 absolute top-4 right-4" onClick={() => setShowAddDepenseForm(false)} />

                        <form onSubmit={handleAddDepenseSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newDepense.type}
                                        onChange={e => setNewDepense({ ...newDepense, type: e.target.value })}
                                        required
                                    >
                                        <option value="salaires">Salaires</option>
                                        <option value="fournitures">Fournitures</option>
                                        <option value="dettes">Dettes</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newDepense.titre}
                                        onChange={e => setNewDepense({ ...newDepense, titre: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Montant (DH)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newDepense.montant}
                                        onChange={e => setNewDepense({ ...newDepense, montant: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Remarque</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newDepense.remarque}
                                        onChange={e => setNewDepense({ ...newDepense, remarque: e.target.value })}
                                        rows="2"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
                                    onClick={() => setShowAddDepenseForm(false)}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-pink-600 text-white rounded-md cursor-pointer"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
