import { useState, useEffect } from 'react';
import {
    ArrowDown, ArrowUp, AlertCircle, DollarSign,
    Calendar, FileText, Users, PieChart, Briefcase,
    Plus, Filter, Bell
} from 'lucide-react';

export default function ({ protestations, setProtestations }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Protestations des étudiants</h2>

                <div className="flex gap-2">
                    <button className="bg-white/50 backdrop-blur-xs shadow-xl p-2 rounded-md shadow-sm">
                        <Filter className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {protestations.map(protestation => (
                    <div key={protestation.id} className="bg-white/50 backdrop-blur-xs shadow-xl p-4 rounded-lg shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{protestation.sujet}</h3>
                        </div>

                        <p className="text-gray-600 mb-3">{protestation.message}</p>

                        <div className="flex justify-between items-center text-sm mb-2">
                            <span className="text-gray-500">Reçue le {protestation.date}</span>
                            <span className="text-gray-500">{protestation.prenom} {protestation.nom}</span>
                        </div>

                        <div className="flex justify-between items-center text-sm mb-2">
                            <span className="text-gray-500">{protestation.email}</span>
                        </div>
                    </div>
                ))}

                {protestations.length === 0 && (
                    <div className="bg-white/50 backdrop-blur-xs shadow-xl p-6 rounded-lg shadow text-center">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">Aucune protestation à afficher pour le moment.</p>
                    </div>
                )}
            </div>
        </div>
    )
}