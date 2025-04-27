import { useState, useEffect } from 'react';
import {
    ArrowDown, ArrowUp, AlertCircle, DollarSign,
    Calendar, FileText, Users, PieChart, Briefcase,
    Plus, Filter, Bell
} from 'lucide-react';

export default function ({ dettes, setDettes }) {
    const [showAddDebtForm, setShowAddDebtForm] = useState(false);
    const [newDebt, setNewDebt] = useState({
        montant: '',
        titre: '',
        remarque: '',
        deadline: ''
    });

    const handleAddDebtSubmit = (e) => {
        e.preventDefault();
        const newId = dettes.length + 1;
        const newDebtItem = {
          id: newId,
          ...newDebt,
          date: new Date().toISOString().split('T')[0]
        };
        
        setDettes(prev => [...prev, newDebtItem]);
        
        setNewDebt({
          montant: '',
          titre: '',
          remarque: '',
          deadline: ''
        });
        setShowAddDebtForm(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Dettes</h2>
                <div className="flex gap-2">
                    <button
                        className="bg-pink-600 text-white px-3 py-2 rounded-md flex items-center gap-1 shadow-sm cursor-pointer"
                        onClick={() => setShowAddDebtForm(true)}
                    >
                        <Plus className="w-4 h-4" />
                        Ajouter une dette
                    </button>
                </div>
            </div>

            <div className="bg-white/50 backdrop-blur-xs shadow-xl rounded-lg">
                <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-5 bg-gray-50 p-3 rounded-t-lg border-b">
                    <div className="font-medium">Titre</div>
                    <div className="font-medium">Date</div>
                    <div className="font-medium">Deadline</div>
                    <div className="hidden md:block lg:block font-medium">Remarque</div>
                    <div className="font-medium text-right">Montant</div>
                </div>

                {dettes.map(dette => (
                    <div key={dette.id} className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-5 p-3 border-b hover:bg-gray-50">
                        <div className="self-center font-medium">{dette.titre}</div>
                        <div className="self-center">{dette.date}</div>
                        <div className="self-center">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${new Date(dette.deadline) < new Date() ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                                }`}>
                                {dette.deadline}
                            </span>
                        </div>
                        <div className="hidden md:block lg:block self-center text-gray-500">{dette.remarque}</div>
                        <div className="text-right self-center font-medium text-orange-600">{dette.montant.toLocaleString()} DH</div>
                    </div>
                ))}

                <div className="p-3 text-right font-semibold">
                    Total: {dettes.reduce((sum, item) => sum + item.montant, 0).toLocaleString()} DH
                </div>
            </div>

            {showAddDebtForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 cursor-pointer" onClick={() => setShowAddDebtForm(false)}>
                    <div className="bg-white/60 backdrop-blur-3xl shadow-xl rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold mb-4">Ajouter une dette</h3>
                        <img src="/logo2-nobg.png" className="w-16 h-16 absolute top-4 right-4" onClick={() => setShowAddDebtForm(false)} />

                        <form onSubmit={handleAddDebtSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newDebt.titre}
                                        onChange={e => setNewDebt({ ...newDebt, titre: e.target.value })}
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
                                        value={newDebt.montant}
                                        onChange={e => setNewDebt({ ...newDebt, montant: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Échéance</label>
                                    <input
                                        type="date"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newDebt.deadline}
                                        onChange={e => setNewDebt({ ...newDebt, deadline: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Remarque</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newDebt.remarque}
                                        onChange={e => setNewDebt({ ...newDebt, remarque: e.target.value })}
                                        rows="2"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
                                    onClick={() => setShowAddDebtForm(false)}
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
