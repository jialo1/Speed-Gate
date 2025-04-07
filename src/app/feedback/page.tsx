'use client'

import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import { FaStar, FaThumbsUp, FaThumbsDown } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Feedback() {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const tripDetails = {
    date: '15 Avril 2024',
    from: 'Aéroport Blaise Diagne',
    to: 'Hôtel Terrou-Bi',
    driver: 'Jean Dupont'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Logique de soumission à implémenter
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Feedback soumis:', { rating, comment })
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Évaluer votre trajet
          </h1>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Détails du trajet
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Date:</span> {tripDetails.date}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Trajet:</span> {tripDetails.from} → {tripDetails.to}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Chauffeur:</span> {tripDetails.driver}
              </p>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Notez votre expérience
              </h2>
              
              <div className="flex justify-center space-x-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <FaStar
                      className={`w-8 h-8 ${
                        star <= (hoverRating || rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Commentaire (optionnel)
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Partagez votre expérience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <div className="flex space-x-4 mb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="flex-1 p-4 border border-green-500 text-green-500 rounded-lg flex items-center justify-center space-x-2"
                >
                  <FaThumbsUp className="w-5 h-5" />
                  <span>Recommander</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="flex-1 p-4 border border-red-500 text-red-500 rounded-lg flex items-center justify-center space-x-2"
                >
                  <FaThumbsDown className="w-5 h-5" />
                  <span>Ne pas recommander</span>
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting || rating === 0}
                className={`w-full p-4 rounded-lg text-white font-medium ${
                  isSubmitting || rating === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer l\'évaluation'}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </main>
    </div>
  )
} 