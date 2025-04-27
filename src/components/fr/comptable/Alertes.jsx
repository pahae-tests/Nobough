import {
    ArrowDown, ArrowUp, AlertCircle, DollarSign,
    Calendar, FileText, Users, PieChart, Briefcase,
    Plus, Filter, Bell
} from 'lucide-react';

export default function ({ alertes }) {
    return (
        <>
            {alertes.length > 0 && (
                <div className="container mx-auto mt-4">
                    {alertes.map((alerte, index) => (
                        <div key={index} className={`p-3 mb-2 rounded-md flex items-start gap-2 ${alerte.type === 'danger' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            <p>{alerte.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}