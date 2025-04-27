import { useState, useEffect } from 'react'
import {
    ArrowDown, ArrowUp, AlertCircle, DollarSign,
    Calendar, FileText, Users, PieChart, Briefcase,
    Plus, Filter, Bell
} from 'lucide-react'

export default function ({ revenus, setRevenus }) {
    const [filterPeriod, setFilterPeriod] = useState('dernier-mois')
    const [selectedDate, setSelectedDate] = useState(null)
    const [showAddRevenuForm, setShowAddRevenuForm] = useState(false)
    const [showFilterPopup, setShowFilterPopup] = useState(false)
    const [newRevenu, setNewRevenu] = useState({
        type: 'salaires',
        montant: '',
        label: '',
        remarque: ''
    })

    const handleAddRevenusSubmit = (e) => {
        e.preventDefault()
        const newRevenuItem = {
            ...newRevenu,
            date: new Date().toISOString().split('T')[0]
        }
        setRevenus(prev => [...prev, newRevenuItem])

        setNewRevenu({
            type: 'salaires',
            montant: '',
            label: '',
            remarque: ''
        })
        setShowAddRevenuForm(false)
    }

    const filterDataByDate = (data, date) => {
        if (!date) return data
        const [year, month] = date.split('-')
        return data.filter(item => {
            const itemDate = item.date.split('-')
            return itemDate[0] === year && itemDate[1] === month
        })
    }

    const filteredRevenus = filterDataByDate(revenus, selectedDate)

    return (
        <div className="md:px-4 lg:px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-semibold">Revenus</h2>

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
                        onClick={() => setShowAddRevenuForm(true)}
                    >
                        <Plus className="w-4 h-4" />
                        Ajouter un revenu
                    </button>
                </div>
            </div>

            {showFilterPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md cursor-pointer z-50" onClick={() => setShowFilterPopup(false)}>
                    <div className="bg-white/60 p-6 rounded-lg shadow-lg" onClick={e => e.stopPropagation()}>
                        <h2 className="text-lg font-semibold mb-4">Sélectionner une date</h2>
                        <div className='flex gap-2 items-center justify-center'>
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
                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 bg-gray-50 p-3 rounded-t-lg border-b">
                    <div className="font-medium">Source</div>
                    <div className="font-medium">Date</div>
                    <div className="font-medium text-right">Montant</div>
                </div>

                {filteredRevenus.map(revenu => (
                    <div key={revenu.id} className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 p-3 border-b hover:bg-gray-50">
                        <div>
                            <p className="font-medium">
                                {revenu.type === 'inscriptions' && 'Inscriptions'}
                                {revenu.type === 'paiements_mensuels' && 'Paiements mensuels'}
                                {revenu.type === 'dons' && 'Dons'}
                            </p>
                            <p className="text-gray-500 text-sm">{revenu.label}</p>
                        </div>
                        <div className="self-center">{revenu.date}</div>
                        <div className="text-right self-center font-medium text-green-600">+{revenu.montant.toLocaleString()} DH</div>
                    </div>
                ))}

                <div className="p-3 text-right font-semibold">
                    Total: {filteredRevenus.reduce((sum, item) => sum + (typeof item.montant === 'string' ? parseFloat(item.montant) : item.montant), 0).toLocaleString()} DH
                </div>
            </div>

            {showAddRevenuForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 cursor-pointer" onClick={() => setShowAddRevenuForm(false)}>
                    <div className="bg-white/50 backdrop-blur-xs shadow-xl rounded-lg p-6 w-full max-w-md md:max-w-lg lg:max-w-xl" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg md:text-xl font-semibold mb-4">Ajouter un revenu</h3>
                        <img src="/logo2-nobg.png" className="w-16 h-16 absolute top-4 right-4" onClick={() => setShowAddRevenuForm(false)} />

                        <form onSubmit={handleAddRevenusSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newRevenu.type}
                                        onChange={e => setNewRevenu({ ...newRevenu, type: e.target.value })}
                                        required
                                    >
                                        <option value="inscriptions">Inscriptions</option>
                                        <option value="paiements_mensuels">Paiements mensuels</option>
                                        <option value="dons">Dons</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newRevenu.label}
                                        onChange={e => setNewRevenu({ ...newRevenu, label: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Montant ( DH)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newRevenu.montant}
                                        onChange={e => setNewRevenu({ ...newRevenu, montant: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Remarque</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newRevenu.remarque}
                                        onChange={e => setNewRevenu({ ...newRevenu, remarque: e.target.value })}
                                        rows="2"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
                                    onClick={() => setShowAddRevenuForm(false)}
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