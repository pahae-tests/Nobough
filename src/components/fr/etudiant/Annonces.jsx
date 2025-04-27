import { 
  Calendar, Tag, User, MapPin, Info, ArrowRight, Home, ChevronRight 
} from 'lucide-react'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Annonces() {
  const annonces = [
      {
          id: 1,
          titre: "Changement de programme en Ramadan",
          description: "test test test test test test test test test test test test test test test test test test test test test test test test test",
          img: "/formation.jpg",
          date: "18/04/2025",
      },
      {
          id: 2,
          titre: "Nouvelle formation : Langue Espangne",
          description: "test test test test test test test test test test test test test test test test test test test test test test test test test",
          img: "/formation.jpg",
          date: "15/04/2025",
      }
  ]

  return (
      <>
          <Head>
              <title>Annonces - Académie Nobough</title>
              <link rel="icon" href="/logo2-nobg.png" />
          </Head>

          <div className="max-w-full">
              <div className="space-y-6 md:px-4 lg:px-4 mb-8">
                  {annonces.map((annonce) => (
                      <div key={annonce.id} className="w-full bg-white/60 backdrop-blur-xs rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                          <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/4 h-64 md:h-auto relative overflow-hidden">
                                  <img
                                      src={annonce.img}
                                      alt={annonce.titre}
                                      className="w-full h-full object-cover"
                                  />
                              </div>
                              
                              <div className="p-6 md:w-3/4">
                                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{annonce.titre}</h3>
                                  <p className="text-gray-600 mb-6">{annonce.description}</p>
                                  
                                  <div className="flex flex-wrap md:items-center gap-4 mb-6">
                                      <div className="flex items-center text-gray-600">
                                          <Calendar className="w-5 h-5 text-pink-600 mr-2" />
                                          <span>Publié le {annonce.date}</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </>
  )
}