'use client'

import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import { FaMobileAlt, FaMoneyBillWave, FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState('')

  const paymentMethods = [
    {
      id: 'orange_money',
      name: 'Orange Money',
      icon: FaMobileAlt,
      description: 'Paiement via votre compte Orange Money Sénégal'
    },
    {
      id: 'wave',
      name: 'Wave',
      icon: FaMoneyBillWave,
      description: 'Paiement mobile rapide et sécurisé'
    },
    {
      id: 'free_money',
      name: 'Free Money',
      icon: FaMobileAlt,
      description: 'Paiement via votre compte Free Money'
    },
    {
      id: 'cash',
      name: 'Espèces',
      icon: FaMoneyBillWave,
      description: 'Paiement en espèces au chauffeur (FCFA)'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: FaWhatsapp,
      description: 'Recevez votre facture sur WhatsApp'
    }
  ]

  const handlePayment = () => {
    // Logique de paiement à implémenter
    console.log('Méthode de paiement sélectionnée:', selectedMethod)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Paiement
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Détails de la facture
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Trajet</span>
                <span className="font-medium">Aéroport Blaise Diagne → Hôtel Terrou-Bi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">15 Avril 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Heure</span>
                <span className="font-medium">14:30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type de véhicule</span>
                <span className="font-medium">Confort</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="text-xl font-bold text-blue-600">15 000 FCFA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Choisissez votre méthode de paiement
            </h2>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <motion.button
                  key={method.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-lg border-2 flex items-center space-x-4 ${
                    selectedMethod === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <method.icon className="w-6 h-6 text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium text-gray-800">{method.name}</p>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full mt-6 py-3 px-4 rounded-lg text-white font-medium ${
                selectedMethod
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={handlePayment}
              disabled={!selectedMethod}
            >
              Confirmer le paiement
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  )
} 