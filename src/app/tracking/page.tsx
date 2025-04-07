'use client'

import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import { FaPhone, FaWhatsapp, FaTimes, FaCar, FaUser, FaClock } from 'react-icons/fa'

// Données de test pour le chauffeur
const driverData = {
  name: 'Jean Dupont',
  photo: '/images/driver.jpg',
  vehicleNumber: 'AB-123-CD',
  vehicleModel: 'Mercedes Classe E',
  rating: 4.8,
  estimatedArrival: '5 min',
  currentLocation: {
    lat: 48.8566,
    lng: 2.3522
  },
  destination: {
    lat: 48.8584,
    lng: 2.2945
  }
}

export default function Tracking() {
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelReason, setCancelReason] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCancel = async () => {
    setIsLoading(true)
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    setShowCancelModal(false)
    // Redirection vers la page d'accueil
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Suivi de votre course
          </h1>

          {/* Carte statique */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 h-96 relative">
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FaCar className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600">Carte en cours de chargement...</p>
                <p className="text-sm text-gray-500 mt-2">Configuration Google Maps en cours</p>
              </div>
            </div>
            {/* Indicateur de position du chauffeur */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                Position actuelle
              </div>
            </div>
            {/* Indicateur de destination */}
            <div className="absolute bottom-4 right-4">
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                Destination
              </div>
            </div>
          </div>

          {/* Informations du chauffeur */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaUser className="w-8 h-8 text-gray-400" />
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
                  <FaCar className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{driverData.name}</h2>
                <p className="text-sm text-gray-600">{driverData.vehicleModel} - {driverData.vehicleNumber}</p>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-sm text-gray-600">{driverData.rating}</span>
                </div>
              </div>
            </div>

            {/* Temps d'arrivée */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg mb-4">
              <div className="flex items-center space-x-3">
                <FaClock className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Temps d'arrivée estimé</p>
                  <p className="text-lg font-semibold text-gray-800">{driverData.estimatedArrival}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                className="flex items-center justify-center space-x-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                onClick={() => window.location.href = `tel:+1234567890`}
              >
                <FaPhone className="w-5 h-5" />
                <span>Appeler</span>
              </button>
              <button
                className="flex items-center justify-center space-x-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                onClick={() => window.location.href = `https://wa.me/1234567890`}
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Bouton d'annulation */}
          <button
            className="w-full flex items-center justify-center space-x-2 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            onClick={() => setShowCancelModal(true)}
          >
            <FaTimes className="w-5 h-5" />
            <span>Annuler la course</span>
          </button>
        </div>
      </main>

      {/* Modal d'annulation */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Annuler la course
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Veuillez noter que l'annulation d'une course peut entraîner des frais selon les conditions de notre politique d'annulation.
            </p>
            <textarea
              className="w-full p-3 border rounded-lg mb-4"
              placeholder="Raison de l'annulation (optionnel)"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
            <div className="flex space-x-4">
              <button
                className="flex-1 p-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => setShowCancelModal(false)}
              >
                Retour
              </button>
              <button
                className="flex-1 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                onClick={handleCancel}
                disabled={isLoading}
              >
                {isLoading ? 'Annulation en cours...' : 'Confirmer l\'annulation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 