'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import {
  FaHistory,
  FaWhatsapp,
  FaPhone,
  FaTicketAlt,
  FaStar,
  FaCar,
  FaUser,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

// Données de test
const userData = {
  name: 'Moussa Diop',
  email: 'moussa.diop@example.com',
  phone: '+221 77 123 45 67',
  loyaltyPoints: 250,
  nextLevel: 500,
  level: 'Bronze',
};

const tripHistory = [
  {
    id: 1,
    date: '2024-03-15',
    from: 'Aéroport Blaise Diagne',
    to: 'Hôtel Terrou-Bi',
    driver: 'Jean Dupont',
    rating: 4.8,
    price: '15 000 FCFA',
    status: 'completed',
  },
  {
    id: 2,
    date: '2024-03-10',
    from: 'Gare Routière',
    to: 'Université Cheikh Anta Diop',
    driver: 'Marie Fall',
    rating: 5.0,
    price: '8 000 FCFA',
    status: 'completed',
  },
];

const promotions = [
  {
    id: 1,
    title: 'Trajet régulier',
    description: '10% de réduction sur votre 5ème trajet',
    progress: 3,
    total: 5,
    expiry: '2024-04-30',
  },
  {
    id: 2,
    title: 'Premier trajet',
    description: '15% de réduction sur votre premier trajet',
    progress: 0,
    total: 1,
    expiry: '2024-04-15',
  },
];

export default function Account() {
  const [activeTab, setActiveTab] = useState('history');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* En-tête du profil */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-6"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
                <FaUser className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
                <p className="text-gray-600">{userData.email}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-500">Niveau {userData.level}</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full mx-2">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(userData.loyaltyPoints / userData.nextLevel) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {userData.loyaltyPoints}/{userData.nextLevel} pts
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex space-x-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 p-4 rounded-lg flex items-center justify-center space-x-2 ${
                activeTab === 'history' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
              }`}
              onClick={() => setActiveTab('history')}
            >
              <FaHistory className="w-5 h-5" />
              <span>Historique</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 p-4 rounded-lg flex items-center justify-center space-x-2 ${
                activeTab === 'support' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
              }`}
              onClick={() => setActiveTab('support')}
            >
              <FaWhatsapp className="w-5 h-5" />
              <span>Support</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 p-4 rounded-lg flex items-center justify-center space-x-2 ${
                activeTab === 'promotions' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
              }`}
              onClick={() => setActiveTab('promotions')}
            >
              <FaTicketAlt className="w-5 h-5" />
              <span>Promotions</span>
            </motion.button>
          </div>

          {/* Contenu des onglets */}
          {activeTab === 'history' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {tripHistory.map((trip) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-medium text-gray-800">{trip.date}</p>
                      <div className="flex items-center mt-2">
                        <FaMapMarkerAlt className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{trip.from}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <FaMapMarkerAlt className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{trip.to}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">{trip.price}</p>
                      <div className="flex items-center justify-end mt-2">
                        <FaStar className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{trip.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Chauffeur: {trip.driver}</p>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Terminé
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'support' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Support client</h2>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 bg-green-500 text-white rounded-lg flex items-center justify-center space-x-2"
                  onClick={() => (window.location.href = 'https://wa.me/221771234567')}
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>Chat WhatsApp</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 bg-blue-500 text-white rounded-lg flex items-center justify-center space-x-2"
                  onClick={() => (window.location.href = 'tel:+221771234567')}
                >
                  <FaPhone className="w-5 h-5" />
                  <span>Assistance téléphonique</span>
                </motion.button>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Notre équipe est disponible 24/7 pour vous assister. Temps de réponse moyen : 5
                    minutes.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'promotions' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {promotions.map((promo) => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{promo.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{promo.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      Valide jusqu'au {promo.expiry}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progression</span>
                      <span>
                        {promo.progress}/{promo.total} trajets
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(promo.progress / promo.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
