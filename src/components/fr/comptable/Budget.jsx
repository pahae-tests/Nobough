import {
    ArrowDown, ArrowUp, AlertCircle, DollarSign,
    Calendar, FileText, Users, PieChart, Briefcase,
    Plus, Filter, Bell, Activity, Bot, TrendingDown
} from 'lucide-react';
import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RPieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const getRandomColor = () => {
    const colors = [
        '#FFD700', '#FFEA00', '#FFE135', '#FFF200', '#F5DEB3', // jaunes
        '#009900', '#00B300', '#228B22', '#32CD32', '#66CDAA', // verts
        '#FFA500', '#FF8C00', '#FFB347', '#FF7F50', '#FFDAB9', // oranges
        '#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB', '#FF82AB', // roses
        '#FF0000', '#FF4500', '#FF6347', '#DC143C', '#E9967A'  // rouges et tons voisins
    ];

    return colors[Math.floor(Math.random() * colors.length)];
};

export default function ({ revenus, depenses, dettes, budget }) {
    const [activeTab, setActiveTab] = useState('apercu');
    const [selectedDate, setSelectedDate] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [recommendations, set] = useState([
        "Rembourser la dette 'exemple test dette'",
        "Économiser le reste pour les dépenses futures",
        "test recommendation test test",
        "exeeeemple recommendation" 
    ])

    ///////////////////

    const filterDataByDate = (data, date) => {
        if (!date) return data;
        const [year, month] = date.split('-');
        return data.filter(item => {
            const itemDate = item.date.split('-');
            return itemDate[0] === year && itemDate[1] === month;
        });
    };

    const filteredRevenus = filterDataByDate(revenus, selectedDate);
    const filteredDepenses = filterDataByDate(depenses, selectedDate);
    const filteredDettes = filterDataByDate(dettes, selectedDate);

    const totalRevenus = filteredRevenus.reduce((sum, item) => sum + item.montant, 0);
    const totalDepenses = filteredDepenses.reduce((sum, item) => sum + (typeof item.montant === 'string' ? parseFloat(item.montant) : item.montant), 0);
    const totalDettes = filteredDettes.reduce((sum, item) => sum + item.montant, 0);

    ///////////////////

    const getLast6MonthsData = (data) => {
        const months = Array.from(new Set(data.map(item => item.date.split('-')[1])));
        const last6Months = months.slice(-6);
        return last6Months.map(month => {
            const monthRevenus = revenus.filter(item => item.date.split('-')[1] === month).reduce((sum, item) => sum + item.montant, 0);
            const monthDepenses = depenses.filter(item => item.date.split('-')[1] === month).reduce((sum, item) => sum + (typeof item.montant === 'string' ? parseFloat(item.montant) : item.montant), 0);
            return { mois: month, revenus: monthRevenus, depenses: monthDepenses };
        });
    };

    ///////////////////

    const evolutionData = getLast6MonthsData([...revenus, ...depenses]);

    ///////////////////

    const depensesParCategorie = depenses.reduce((acc, item) => {
        const existing = acc.find(entry => entry.name === item.type);
        if (existing) {
            existing.value += typeof item.montant === 'string' ? parseFloat(item.montant) : item.montant;
        } else {
            acc.push({ name: item.type, value: typeof item.montant === 'string' ? parseFloat(item.montant) : item.montant, color: getRandomColor() });
        }
        return acc;
    }, []);

    ///////////////////

    const revenusParCategorie = revenus.reduce((acc, item) => {
        const existing = acc.find(entry => entry.name === item.type);
        if (existing) {
            existing.value += item.montant;
        } else {
            acc.push({ name: item.type, value: item.montant, color: getRandomColor() });
        }
        return acc;
    }, []);

    return (
        <div className="max-w-full">
            {/* Header */}
            <div className="mb-8 flex justify-between items-center flex-col md:flex-row lg:flex-row">
                <h1 className="text-2xl font-bold">Tableau de bord financier</h1>
                <div className="flex space-x-4">
                    <button
                        className="px-3 py-2 flex items-center bg-white/70 rounded-lg shadow-sm hover:bg-white cursor-pointer"
                        onClick={() => setShowPopup(true)}
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        <span>Filtrer</span>
                    </button>
                    {selectedDate &&
                        <button className="px-3 py-2 flex items-center bg-white/70 rounded-lg shadow-sm hover:bg-white">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{selectedDate}</span>
                        </button>
                    }
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-40 cursor-pointer" onClick={() => setShowPopup(false)}>
                    <div className="bg-white/60 p-6 rounded-lg shadow-lg" onClick={e => e.stopPropagation()}>
                        <h2 className="text-lg font-semibold mb-4">Sélectionner une date</h2>
                        <div className='w-full flex gap-2 items-center justify-center'>
                            <input
                                type="month"
                                className="border p-2 rounded-md"
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                            <button
                                className="px-4 py-2 bg-pink-500 text-white rounded-md cursor-pointer"
                                onClick={() => setShowPopup(false)}
                            >
                                Appliquer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Nav */}
            <div className="flex border-b mb-6">
                <button
                    onClick={() => setActiveTab('apercu')}
                    className={`py-3 px-6 font-medium ${activeTab === 'apercu' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-black'} cursor-pointer hover:bg-white/50`}
                >
                    Aperçu
                </button>
                <button
                    onClick={() => setActiveTab('analytics')}
                    className={`py-3 px-6 font-medium ${activeTab === 'analytics' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-black'} cursor-pointer hover:bg-white/50`}
                >
                    Analytics détaillés
                </button>
            </div>

            {/* Reneus/Depenses */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-black font-medium">Total des revenus</h3>
                        <div className="p-2 bg-green-100 rounded-full">
                            <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-green-600 mb-2">
                        {totalRevenus.toLocaleString()} DHs
                    </p>
                    <div className="flex items-center text-sm">
                        <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-500 font-medium">+8.2%</span>
                        <span className="text-black ml-2">vs mois précédent</span>
                    </div>
                </div>

                <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-black font-medium">Total des dépenses</h3>
                        <div className="p-2 bg-red-100 rounded-full">
                            <Activity className="w-5 h-5 text-pink-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-pink-600 mb-2">
                        {totalDepenses.toLocaleString()} DHs
                    </p>
                    <div className="flex items-center text-sm">
                        <ArrowDown className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-500 font-medium">-3.5%</span>
                        <span className="text-black ml-2">vs mois précédent</span>
                    </div>
                </div>

                <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-black font-medium">Total des dettes</h3>
                        <div className="p-2 bg-orange-100 rounded-full">
                            <Briefcase className="w-5 h-5 text-red-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-red-600 mb-2">
                        {totalDettes.toLocaleString()} DHs
                    </p>
                    <div className="flex items-center text-sm">
                        <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-500 font-medium">-12.3%</span>
                        <span className="text-black ml-2">vs mois précédent</span>
                    </div>
                </div>
            </div>

            {activeTab === 'apercu' ? (
                <>
                    {/* Graphs */}
                    <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl mb-8">
                        <h3 className="text-lg font-semibold mb-6">Évolution Revenus vs Dépenses</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={evolutionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0.2} />
                                    </linearGradient>
                                    <linearGradient id="colorDepenses" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="mois" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="revenus" stroke="#22c55e" fillOpacity={1} fill="url(#colorRevenus)" />
                                <Area type="monotone" dataKey="depenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorDepenses)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Down */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Budget */}
                        <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl">
                            <h3 className="font-semibold mb-6 flex items-center text-lg">
                                <PieChart className="w-5 h-5 mr-2" />
                                Budget calculé
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b">
                                    <span>Budget brut</span>
                                    <span className={`font-bold ${budget.total >= 0 ? 'text-green-600' : 'text-pink-600'}`}>
                                        {budget.total.toLocaleString()} DHs
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pb-3 border-b">
                                    <span>Salaires non payés</span>
                                    <span className="font-bold text-pink-600">
                                        - 5,000 DHs
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pt-3">
                                    <span className="font-semibold">Budget réel</span>
                                    <span className={`font-bold text-xl ${budget.reel >= 0 ? 'text-green-600' : 'text-pink-600'}`}>
                                        {budget.reel.toLocaleString()} DHs
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Recommandations */}
                        <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl">
                            <h3 className="font-semibold mb-6 flex items-center text-lg">
                                <AlertCircle className="w-5 h-5 mr-2" />
                                Recommandations
                            </h3>

                            <div className="bg-green-50 p-5 rounded-lg text-green-700">
                                <p className="font-medium mb-3 flex gap-2">
                                    <Bot />
                                    recommendations par le Bot
                                </p>
                                <ul className="space-y-2 list-disc list-inside">
                                    {recommendations.map((rec, index) => (
                                        <li key={index}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* Analytics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Dépenses */}
                        <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl">
                            <h3 className="text-lg font-semibold mb-6">Répartition des dépenses</h3>
                            <div className="flex flex-col md:flex-row items-center justify-between">
                                <div className="w-full md:w-1/2">
                                    <ResponsiveContainer width="100%" height={250}>
                                        <RPieChart>
                                            <Pie
                                                data={depensesParCategorie}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {depensesParCategorie.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </RPieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <div className="space-y-3">
                                        {depensesParCategorie.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                                                    <span>{item.name}</span>
                                                </div>
                                                <span className="font-medium">{item.value.toLocaleString()} DHs</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Revenus */}
                        <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl">
                            <h3 className="text-lg font-semibold mb-6">Sources de revenus</h3>
                            <div className="flex flex-col md:flex-row items-center justify-between">
                                <div className="w-full md:w-1/2">
                                    <ResponsiveContainer width="100%" height={250}>
                                        <RPieChart>
                                            <Pie
                                                data={revenusParCategorie}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {revenusParCategorie.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </RPieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <div className="space-y-3">
                                        {revenusParCategorie.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                                                    <span>{item.name}</span>
                                                </div>
                                                <span className="font-medium">{item.value.toLocaleString()} DHs</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Analyses */}
                    <div className="grid grid-cols-1 gap-8">
                        <div className="bg-white/60 backdrop-blur-xs p-6 rounded-xl shadow-xl">
                            <h3 className="text-lg font-semibold mb-6">Analyse comparée des 6 derniers mois</h3>
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart
                                    data={evolutionData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="mois" />
                                    <YAxis />
                                    <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
                                    <Legend />
                                    <Bar name="Revenus" dataKey="revenus" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                    <Bar name="Dépenses" dataKey="depenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
