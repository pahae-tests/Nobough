import {
    Video, KeyRound, LogIn, CheckCircle, AlertCircle, Check
} from 'lucide-react'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Room() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [validation, setValidation] = useState({
        status: null,
        message: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
    }

    return (
        <>
            <Head>
                <title>Démarrer une Séance - Académie Nobough</title>
                <link rel="icon" href="/logo2-nobg.png" />
            </Head>

            <div className="max-w-full">
                <div className="md:px-4 lg:px-4">
                    <div className="w-full bg-white/60 backdrop-blur-xs rounded-xl shadow-xl overflow-hidden p-6">
                        <div className="max-w-md mx-auto">
                            <div className="text-center mb-8">
                                <Video className="h-16 w-16 text-pink-600 mx-auto mb-4" />
                                <h1 className="text-3xl font-bold mb-3 text-gray-800">Démarrer une Séance</h1>
                                <p className="text-gray-600">
                                    Créer une séance en ligne et invitez vos étudiant via un lien.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <>
                                    {validation.status === 'error' && (
                                        <p className="text-red-500 text-sm flex items-center justify-center gap-1">
                                            <AlertCircle className="h-4 w-4" />
                                            {validation.message}
                                        </p>
                                    )}
                                    {validation.status === 'success' && (
                                        <p className="text-green-500 text-sm flex items-center justify-center gap-1">
                                            <CheckCircle className="h-4 w-4" />
                                            {validation.message}
                                        </p>
                                    )}
                                </>

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
                                                Créer une séance
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
                                Comment créer une séance
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="bg-pink-100 p-2 rounded-full">
                                        <KeyRound className="h-5 w-5 text-pink-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">Générez un code</p>
                                        <p className="text-gray-600">Cliquez sur le bouton pour générer un code de séance unique.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="bg-pink-100 p-2 rounded-full">
                                        <Check className="h-5 w-5 text-pink-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">Partagez le code</p>
                                        <p className="text-gray-600">Communiquez le code de séance à vos étudiants par email ou tout autre moyen.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="bg-pink-100 p-2 rounded-full">
                                        <LogIn className="h-5 w-5 text-pink-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">Démarrez la séance</p>
                                        <p className="text-gray-600">Cliquez sur le bouton pour démarrer la séance et accédez à la salle de classe virtuelle.</p>
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