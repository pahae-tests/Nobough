import {
    Video, KeyRound, LogIn, CheckCircle, AlertCircle, Check
} from 'lucide-react'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Room() {
    const [code, setCode] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [validation, setValidation] = useState({
        status: null,
        message: ''
    })

    const handleCodeChange = (e) => {
        let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')

        if (value.length <= 16) {
            setCode(value)
            setValidation({ status: null, message: '' })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
    }

    return (
        <>
            <Head>
                <title>Rejoindre une Séance - Académie Nobough</title>
                <link rel="icon" href="/logo2-nobg.png" />
            </Head>

            <div className="max-w-full">
                <div className="md:px-4 lg:px-4">
                    <div className="w-full bg-white/60 backdrop-blur-xs rounded-xl shadow-xl overflow-hidden p-6">
                        <div className="max-w-md mx-auto">
                            <div className="text-center mb-8">
                                <Video className="h-16 w-16 text-pink-600 mx-auto mb-4" />
                                <h1 className="text-3xl font-bold mb-3 text-gray-800">Rejoindre une Séance</h1>
                                <p className="text-gray-600">
                                    Entrez le code fourni par votre formateur pour accéder directement à votre cours en ligne.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-3">
                                    <label htmlFor="code" className="block text-base font-medium text-gray-700 text-center">Code de séance</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <KeyRound className="h-6 w-6 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="code"
                                            name="code"
                                            value={code}
                                            onChange={handleCodeChange}
                                            required
                                            className={`pl-12 py-4 block w-full rounded-lg shadow-sm focus:ring-pink-500 bg-white text-2xl font-mono tracking-wider text-center border ${validation.status === 'error'
                                                ? 'border-red-500 focus:border-red-500'
                                                : validation.status === 'success'
                                                    ? 'border-green-500 focus:border-green-500'
                                                    : 'border-gray-300 focus:border-pink-500'
                                                }`}
                                            placeholder="eQu8x65qO7aLks"
                                            autoFocus
                                        />
                                    </div>
                                    {validation.status === 'error' && (
                                        <p className="text-red-500 text-sm flex items-center justify-center gap-1 mt-2">
                                            <AlertCircle className="h-4 w-4" />
                                            {validation.message}
                                        </p>
                                    )}
                                    {validation.status === 'success' && (
                                        <p className="text-green-500 text-sm flex items-center justify-center gap-1 mt-2">
                                            <CheckCircle className="h-4 w-4" />
                                            {validation.message}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-500 mt-1 text-center">
                                        Le code est composé de 10 à 16 caractères (lettres et chiffres).
                                    </p>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || validation.status === 'success'}
                                        className="w-full inline-flex justify-center gap-3 items-center px-6 py-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors disabled:opacity-50 cursor-pointer"
                                    >
                                        {validation.status === 'success' ? (
                                            <>
                                                <CheckCircle className="h-5 w-5" />
                                                Validation en cours...
                                            </>
                                        ) : isSubmitting ? (
                                            <>
                                                <div className="h-5 w-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Vérification...
                                            </>
                                        ) : (
                                            <>
                                                Rejoindre la séance
                                                <LogIn className="h-5 w-5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="my-8 p-6 w-full bg-gray-50 rounded-lg border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
                                <Video className="h-6 w-6 text-pink-600" />
                                Comment rejoindre votre séance
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="bg-pink-100 p-2 rounded-full">
                                        <KeyRound className="h-5 w-5 text-pink-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">Obtenez votre code</p>
                                        <p className="text-gray-600">Le code de séance vous a été envoyé par email ou communiqué par votre formateur.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="bg-pink-100 p-2 rounded-full">
                                        <Check className="h-5 w-5 text-pink-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">Entre le code</p>
                                        <p className="text-gray-600">Entrez votre code de séance dans le champ ci-dessous.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="bg-pink-100 p-2 rounded-full">
                                        <LogIn className="h-5 w-5 text-pink-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">Accédez à votre cours</p>
                                        <p className="text-gray-600">Vous serez automatiquement redirigé vers la salle de classe virtuelle.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}