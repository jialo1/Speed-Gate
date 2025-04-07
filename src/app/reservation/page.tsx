'use client'

import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import { FaCar, FaCalendarAlt, FaClock, FaUser, FaMapMarkerAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Reservation() {
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
    passengers: 1,
    vehicleType: 'standard'
  })

  const popularDestinations = [
    { name: 'Aéroport Blaise Diagne', icon: <FaMapMarkerAlt /> },
    { name: 'Hôtel Terrou-Bi', icon: <FaMapMarkerAlt /> },
    { name: 'Université Cheikh Anta Diop', icon: <FaMapMarkerAlt /> },
    { name: 'Gare Routière de Dakar', icon: <FaMapMarkerAlt /> },
    { name: 'Plateau', icon: <FaMapMarkerAlt /> },
    { name: 'Almadies', icon: <FaMapMarkerAlt /> }
  ]

  const vehicleTypes = [
    {
      id: 'standard',
      name: 'Standard',
      description: 'Véhicule confortable pour 4 passagers',
      price: '5 000 FCFA',
      icon: <FaCar />
    },
    {
      id: 'comfort',
      name: 'Confort',
      description: 'Véhicule haut de gamme pour 4 passagers',
      price: '7 500 FCFA',
      icon: <FaCar />
    },
    {
      id: 'van',
      name: 'Van',
      description: 'Grand véhicule pour 7 passagers',
      price: '10 000 FCFA',
      icon: <FaCar />
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique de réservation à implémenter
    console.log('Données du formulaire:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Réserver un trajet
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Détails du trajet
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Point de départ
                      </label>
                      <input
                        type="text"
                        value={formData.pickup}
                        onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ex: Aéroport Blaise Diagne"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Destination
                      </label>
                      <input
                        type="text"
                        value={formData.dropoff}
                        onChange={(e) => setFormData({ ...formData, dropoff: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ex: Hôtel Terrou-Bi"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                            required
                          />
                          <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Heure
                        </label>
                        <div className="relative">
                          <input
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                            required
                          />
                          <FaClock className="absolute left-3 top-3 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre de passagers
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          max="7"
                          value={formData.passengers}
                          onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                          required
                        />
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Type de véhicule
                  </h2>
                  <div className="space-y-4">
                    {vehicleTypes.map((vehicle) => (
                      <motion.button
                        key={vehicle.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-4 rounded-lg border-2 flex items-center justify-between ${
                          formData.vehicleType === vehicle.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => setFormData({ ...formData, vehicleType: vehicle.id })}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-blue-500">{vehicle.icon}</div>
                          <div>
                            <p className="font-medium text-gray-800">{vehicle.name}</p>
                            <p className="text-sm text-gray-600">{vehicle.description}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-blue-600">{vehicle.price}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
                >
                  Réserver maintenant
                </motion.button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Destinations populaires
                </h2>
                <div className="space-y-2">
                  {popularDestinations.map((destination, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ x: 5 }}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                      onClick={() => {
                        if (index % 2 === 0) {
                          setFormData({ ...formData, pickup: destination.name })
                        } else {
                          setFormData({ ...formData, dropoff: destination.name })
                        }
                      }}
                    >
                      <span className="text-blue-500">{destination.icon}</span>
                      <span className="text-gray-700">{destination.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Informations importantes
                </h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Annulation gratuite jusqu'à 1 heure avant le trajet
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Paiement sécurisé Orange Money, Wave ou Free Money
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Service disponible 24h/24 dans toute la région de Dakar
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Chauffeurs professionnels et véhicules climatisés
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 