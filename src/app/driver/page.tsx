'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import {
  FaCar,
  FaStar,
  FaUser,
  FaHistory,
  FaChartLine,
  FaToggleOn,
  FaToggleOff,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Driver() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState('current');

  const driverStats = {
    name: 'Jean Dupont',
    rating: 4.8,
    totalTrips: 156,
    completedTrips: 150,
    cancellationRate: '2%',
    averageRating: 4.7,
    earnings: '1 250 000 FCFA',
  };

  const currentTrip = {
    id: 'TRIP-2024-001',
    passenger: 'Moussa Diop',
    pickup: 'Aéroport Blaise Diagne',
    dropoff: 'Hôtel Terrou-Bi',
    scheduledTime: '14:30',
    status: 'En route',
  };

  const recentTrips = [
    {
      id: 'TRIP-2024-002',
      date: '2024-04-05',
      passenger: 'Marie Fall',
      from: 'Gare Routière',
      to: 'Université Cheikh Anta Diop',
      rating: 5.0,
    },
    {
      id: 'TRIP-2024-003',
      date: '2024-04-04',
      passenger: 'Alioune Diop',
      from: 'Plateau',
      to: 'Aéroport Blaise Diagne',
      rating: 4.5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Profil chauffeur</h1>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white shadow"
              onClick={() => setIsAvailable(!isAvailable)}
            >
              {isAvailable ? (
                <>
                  <FaToggleOn className="w-5 h-5 text-green-500" />
                  <span className="text-green-500">Disponible</span>
                </>
              ) : (
                <>
                  <FaToggleOff className="w-5 h-5 text-red-500" />
                  <span className="text-red-500">Non disponible</span>
                </>
              )}
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaUser className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{driverStats.name}</h2>
                  <div className="flex items-center">
                    <FaStar className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-gray-600">{driverStats.rating}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Trajets effectués:</span> {driverStats.totalTrips}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Taux d'annulation:</span>{' '}
                  {driverStats.cancellationRate}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Gains totaux:</span> {driverStats.earnings}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Trajet en cours</h2>
              {currentTrip ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Passager</p>
                    <p className="font-medium">{currentTrip.passenger}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Trajet</p>
                    <p className="font-medium">
                      {currentTrip.pickup} → {currentTrip.dropoff}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Heure prévue</p>
                    <p className="font-medium">{currentTrip.scheduledTime}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {currentTrip.status}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">Aucun trajet en cours</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistiques</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Note moyenne</p>
                  <div className="flex items-center">
                    <FaStar className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="text-xl font-bold">{driverStats.averageRating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600">Trajets complétés</p>
                  <p className="text-xl font-bold">{driverStats.completedTrips}</p>
                </div>
                <div>
                  <p className="text-gray-600">Taux de complétion</p>
                  <p className="text-xl font-bold">
                    {((driverStats.completedTrips / driverStats.totalTrips) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'current' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => setActiveTab('current')}
              >
                Trajet en cours
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'history' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => setActiveTab('history')}
              >
                Historique
              </button>
            </div>

            {activeTab === 'current' && currentTrip && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{currentTrip.passenger}</p>
                    <p className="text-gray-600">
                      {currentTrip.pickup} → {currentTrip.dropoff}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {currentTrip.status}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                {recentTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{trip.passenger}</p>
                      <p className="text-gray-600">
                        {trip.from} → {trip.to}
                      </p>
                      <p className="text-sm text-gray-500">{trip.date}</p>
                    </div>
                    <div className="flex items-center">
                      <FaStar className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{trip.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
