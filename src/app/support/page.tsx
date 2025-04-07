'use client'

import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import { FaWhatsapp, FaPhone, FaEnvelope, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Support() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Comment annuler une réservation ?',
      answer: 'Vous pouvez annuler votre réservation jusqu\'à 1 heure avant l\'heure prévue. Pour annuler, allez dans "Mes trajets" et cliquez sur le bouton "Annuler" à côté de votre réservation.'
    },
    {
      question: 'Quels sont les modes de paiement acceptés ?',
      answer: 'Nous acceptons les paiements par Wave, Orange Money, en espèces au chauffeur, et par facture WhatsApp.'
    },
    {
      question: 'Comment modifier une réservation ?',
      answer: 'Pour modifier une réservation, contactez notre support client via WhatsApp ou téléphone. Les modifications sont possibles jusqu\'à 2 heures avant l\'heure prévue.'
    },
    {
      question: 'Que faire si mon chauffeur est en retard ?',
      answer: 'Si votre chauffeur a plus de 15 minutes de retard, contactez notre support client. Nous nous engageons à vous trouver une solution alternative rapidement.'
    },
    {
      question: 'Comment fonctionne le système de points de fidélité ?',
      answer: 'Vous gagnez 10 points pour chaque trajet effectué. Ces points peuvent être convertis en réductions sur vos prochains trajets.'
    }
  ]

  const contactMethods = [
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="w-6 h-6" />,
      description: 'Chat instantané avec notre support',
      action: () => window.location.href = 'https://wa.me/221771234567'
    },
    {
      name: 'Téléphone',
      icon: <FaPhone className="w-6 h-6" />,
      description: 'Appelez notre support client',
      action: () => window.location.href = 'tel:+221771234567'
    },
    {
      name: 'Email',
      icon: <FaEnvelope className="w-6 h-6" />,
      description: 'Envoyez-nous un email',
      action: () => window.location.href = 'mailto:support@speedgate.com'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Support client
          </h1>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Contactez-nous
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contactMethods.map((method, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 border rounded-lg flex flex-col items-center space-y-2"
                  onClick={method.action}
                >
                  <div className="text-blue-500">{method.icon}</div>
                  <div className="font-medium text-gray-800">{method.name}</div>
                  <div className="text-sm text-gray-500 text-center">
                    {method.description}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full p-4 flex justify-between items-center"
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  >
                    <span className="font-medium text-gray-800">
                      {faq.question}
                    </span>
                    {activeFaq === index ? (
                      <FaChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  {activeFaq === index && (
                    <div className="p-4 bg-gray-50">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
} 