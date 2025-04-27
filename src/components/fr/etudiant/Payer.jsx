import {
    Phone, CreditCard, Upload, Send, Banknote, Copy, CheckCircle, CreditCard as PaymentIcon
} from 'lucide-react'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Paiement() {
    const montantAPayer = 1500

    const [formData, setFormData] = useState({
        tel: '',
        montant: '',
        preuve: null
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [copied, setCopied] = useState(false)
    const [fileName, setFileName] = useState('')
    const ribInfo = {
        titulaire: "Académie Nobough",
        banque: "Bank Al-Maghrib",
        rib: "007 810 0001234567890123456",
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData(prevState => ({
                ...prevState,
                preuve: file
            }))
            setFileName(file.name)
        }
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
    }

    return (
        <>
            <Head>
                <title>Paiement en ligne - Académie Nobough</title>
                <link rel="icon" href="/logo2-nobg.png" />
            </Head>

            <div className="max-w-full">
                <div className="md:px-4 lg:px-4">
                    <div className="w-full bg-white/60 backdrop-blur-xs rounded-xl shadow-xl overflow-hidden p-6">
                        <h1 className="text-3xl font-bold mb-4 text-gray-800">Paiement en ligne</h1>

                        {/* Montant */}
                        <div className="mb-8 p-6 bg-pink-50 rounded-lg border border-pink-200 text-center">
                            <div className="flex items-center justify-center mb-2">
                                <PaymentIcon className="h-8 w-8 text-pink-600 mr-2" />
                                <h2 className="text-xl font-semibold text-gray-700">Montant à payer</h2>
                            </div>
                            <p className="text-4xl font-bold text-pink-600">{montantAPayer.toLocaleString('fr-MA')} MAD</p>
                        </div>

                        <p className="text-gray-600 mb-8">
                            Veuillez effectuer votre paiement par virement bancaire en utilisant les coordonnées ci-dessous, puis téléchargez une capture d'écran comme preuve de votre transaction.
                        </p>

                        {/* RIB */}
                        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
                                <Banknote className="h-6 w-6 text-pink-600" />
                                Coordonnées bancaires
                            </h2>

                            <div className="space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Titulaire</p>
                                        <p className="text-gray-800">{ribInfo.titulaire}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Banque</p>
                                        <p className="text-gray-800">{ribInfo.banque}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">RIB</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-800 font-mono bg-white p-2 rounded border border-gray-200 flex-grow">{ribInfo.rib}</p>
                                        <button
                                            onClick={() => copyToClipboard(ribInfo.rib)}
                                            className="p-2 rounded-md hover:bg-gray-200 transition-colors"
                                            title="Copier le RIB"
                                        >
                                            {copied ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-gray-500" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="montant" className="block text-sm font-medium text-gray-700">Montant payé (en MAD)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <CreditCard className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        id="montant"
                                        name="montant"
                                        value={formData.montant}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        className="pl-10 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 bg-white/80"
                                        placeholder={montantAPayer.toString()}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="preuve" className="block text-sm font-medium text-gray-700">Preuve de paiement</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-white/80 hover:bg-white transition-colors">
                                    <div className="space-y-1 text-center">
                                        <div className="flex justify-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        </div>
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="preuve" className="relative cursor-pointer rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none">
                                                <span>Télécharger un fichier</span>
                                                <input
                                                    type="file"
                                                    id="preuve"
                                                    name="preuve"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="sr-only"
                                                    required
                                                />
                                            </label>
                                            <p className="pl-1">ou glisser-déposer</p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF jusqu'à 10MB
                                        </p>
                                        {fileName && (
                                            <p className="text-sm text-green-600 font-medium mt-2">
                                                Fichier sélectionné: {fileName}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex gap-4 items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    Confirmer le paiement
                                    {isSubmitting ? (
                                        <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <Send className="ml-2 -mr-1 h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}