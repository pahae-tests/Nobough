import { useState, useEffect } from 'react';
import {
    ArrowDown, ArrowUp, AlertCircle, DollarSign,
    Calendar, FileText, Users, PieChart, Briefcase,
    Plus, Filter, Bell
} from 'lucide-react';

export default function ({ budget, events, setEvents }) {
    const [showAddEventForm, setShowAddEventForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        titre: '',
        lieu: '',
        date: '',
        description: '',
        remarques: '',
        depenses: ''
    });

    const handleAddEventSubmit = (e) => {
        e.preventDefault();
        alert(`Événement "${newEvent.titre}" ajouté avec succès!`);

        if (parseFloat(newEvent.depenses) > budget.reel) {
            alert("⚠️ ATTENTION: Cet événement risque d'impacter négativement le budget réel!");
        }

        setEvents([...events, newEvent]);

        setNewEvent({
            titre: '',
            lieu: '',
            date: '',
            description: '',
            remarques: '',
            depenses: ''
        });
        setShowAddEventForm(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Événements</h2>

                <button
                    className="bg-pink-600 text-white px-3 py-2 rounded-md flex items-center gap-1 shadow-sm cursor-pointer"
                    onClick={() => setShowAddEventForm(true)}
                >
                    <Plus className="w-4 h-4" />
                    Ajouter un événement
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((event, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-xs shadow-xl p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar className="w-5 h-5 text-pink-500" />
                            <h3 className="font-semibold">{event.titre}</h3>
                        </div>

                        <div className="grid grid-cols-4 gap-2 text-sm mb-3">
                            <div className="col-span-1 text-gray-500">Date:</div>
                            <div className="col-span-3">{new Date(event.date).toLocaleString()}</div>

                            <div className="col-span-1 text-gray-500">Lieu:</div>
                            <div className="col-span-3">{event.lieu}</div>

                            <div className="col-span-1 text-gray-500">Dépenses:</div>
                            <div className="col-span-3">{event.depenses} DH {event.remarques && "(" + event.remarques +")"}</div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                    </div>
                ))}
            </div>

            {showAddEventForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 cursor-pointer" onClick={() => setShowAddEventForm(false)}>
                    <div className="bg-white/50 backdrop-blur-xs shadow-xl rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold mb-4">Ajouter un événement</h3>
                        <img src="/logo2-nobg.png" className="w-16 h-16 absolute top-4 right-4" onClick={() => setShowAddEventForm(false)} />

                        <form onSubmit={handleAddEventSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newEvent.titre}
                                        onChange={e => setNewEvent({ ...newEvent, titre: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            value={newEvent.lieu}
                                            onChange={e => setNewEvent({ ...newEvent, lieu: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                        <input
                                            type="datetime-local"
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            value={newEvent.date}
                                            onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newEvent.description}
                                        onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                                        rows="3"
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Remarques</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newEvent.remarques}
                                        onChange={e => setNewEvent({ ...newEvent, remarques: e.target.value })}
                                        rows="2"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Dépenses estimées (DH)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newEvent.depenses}
                                        onChange={e => setNewEvent({ ...newEvent, depenses: e.target.value })}
                                        required
                                    />

                                    {parseFloat(newEvent.depenses || 0) > budget.reel && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            Ces dépenses dépassent le budget réel disponible!
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
                                    onClick={() => setShowAddEventForm(false)}
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
