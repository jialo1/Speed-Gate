'use client'

import React from 'react'
import Navbar from '@/components/Navbar'
import { FaCheckCircle, FaShareAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Confirmation() {
  const reservationDetails = {
    id: 'RES-2024-001',
    date: '15 Avril 2024',
    time: '14:30',
    from: 'Aéroport Blaise Diagne',
    to: 'Hôtel Terrou-Bi',
    vehicle: 'Confort',
    price: '15 000 FCFA',
    driver: 'Jean Dupont',
    phone: '+221 77 123 45 67'
  }

  const handleShare = (method: string) => {
    // Logique de partage à implémenter
    console.log('Partage via:', method)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Réservation confirmée !
            </h1>
            <p className="text-gray-600">
              Votre trajet a été confirmé avec succès
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Détails de la réservation
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Numéro de réservation</span>
                <span className="font-medium">{reservationDetails.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date et heure</span>
                <span className="font-medium">{reservationDetails.date} à {reservationDetails.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trajet</span>
                <span className="font-medium">{reservationDetails.from} → {reservationDetails.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type de véhicule</span>
                <span className="font-medium">{reservationDetails.vehicle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Prix</span>
                <span className="font-medium">{reservationDetails.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Chauffeur</span>
                <span className="font-medium">{reservationDetails.driver}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contact chauffeur</span>
                <span className="font-medium">{reservationDetails.phone}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Partager la réservation
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 border rounded-lg flex items-center justify-center space-x-2"
                onClick={() => handleShare('whatsapp')}
              >
                <FaWhatsapp className="w-5 h-5 text-green-500" />
                <span>WhatsApp</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 border rounded-lg flex items-center justify-center space-x-2"
                onClick={() => handleShare('email')}
              >
                <FaEnvelope className="w-5 h-5 text-blue-500" />
                <span>Email</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
} 