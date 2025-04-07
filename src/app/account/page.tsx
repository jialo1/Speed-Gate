'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
}

// Données de test pour les réservations
const mockReservations = [
  {
    id: 1,
    date: '2024-04-15',
    departure: 'Paris, 75001',
    destination: 'Aéroport Charles de Gaulle',
    status: 'Confirmée',
    price: '45,00 €'
  },
  {
    id: 2,
    date: '2024-04-10',
    departure: 'Lyon, 69001',
    destination: 'Aéroport Lyon-Saint Exupéry',
    status: 'Terminée',
    price: '35,00 €'
  }
]

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="max-w-6xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Mon compte
            </h1>
            <div className="flex space-x-4">
              <Link
                href="/reservation"
                className="btn btn-primary"
              >
                Nouvelle réservation
              </Link>
              <Link
                href="/auth/login"
                className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Se déconnecter
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === 'profile'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Profil
                </button>
                <button
                  onClick={() => setActiveTab('reservations')}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === 'reservations'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Mes réservations
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === 'settings'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Paramètres
                </button>
              </nav>
            </div>

            <div className="p-8">
              {activeTab === 'profile' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                      Informations personnelles
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Nom complet
                        </label>
                        <p className="mt-1 text-gray-900">Jean Dupont</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <p className="mt-1 text-gray-900">jean.dupont@example.com</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Téléphone
                        </label>
                        <p className="mt-1 text-gray-900">06 12 34 56 78</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                      Préférences
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="notifications"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                          Recevoir les notifications par email
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="newsletter"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                          S'abonner à la newsletter
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reservations' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Historique des réservations
                    </h2>
                    <Link
                      href="/reservation"
                      className="btn btn-primary"
                    >
                      Nouvelle réservation
                    </Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Trajet
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Statut
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Prix
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockReservations.map((reservation) => (
                          <tr key={reservation.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {reservation.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {reservation.departure} → {reservation.destination}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                reservation.status === 'Confirmée'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {reservation.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {reservation.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <Link
                                href={`/reservation/${reservation.id}`}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                Voir les détails
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Paramètres du compte
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Changer le mot de passe
                      </h3>
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                            Mot de passe actuel
                          </label>
                          <input
                            type="password"
                            id="currentPassword"
                            className="input mt-1"
                          />
                        </div>
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            Nouveau mot de passe
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            className="input mt-1"
                          />
                        </div>
                        <div>
                          <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
                            Confirmer le nouveau mot de passe
                          </label>
                          <input
                            type="password"
                            id="confirmNewPassword"
                            className="input mt-1"
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Mettre à jour le mot de passe
                        </button>
                      </form>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Supprimer le compte
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Cette action est irréversible. Toutes vos données seront supprimées.
                      </p>
                      <button
                        type="button"
                        className="btn bg-red-600 text-white hover:bg-red-700"
                      >
                        Supprimer mon compte
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
} 