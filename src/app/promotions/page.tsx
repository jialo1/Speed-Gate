'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { FaTicketAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Promotions() {
  const activePromotions = [
    {
      id: 'PROMO-001',
      title: 'Premier trajet',
      description: '15% de réduction sur votre premier trajet',
      code: 'WELCOME15',
      validUntil: '2024-04-30',
      conditions: [
        'Valable pour les nouveaux utilisateurs',
        'Minimum de 5000 FCFA de trajet',
        "Non cumulable avec d'autres promotions",
      ],
    },
    {
      id: 'PROMO-002',
      title: 'Trajet régulier',
      description: '10% de réduction sur votre 5ème trajet',
      code: 'REGULAR10',
      validUntil: '2024-05-15',
      conditions: [
        'Valable après 4 trajets effectués',
        'Applicable sur tous les types de véhicules',
        "Non cumulable avec d'autres promotions",
      ],
    },
    {
      id: 'PROMO-003',
      title: 'Week-end spécial',
      description: '20% de réduction sur les trajets du week-end',
      code: 'WEEKEND20',
      validUntil: '2024-04-14',
      conditions: [
        'Valable uniquement les samedis et dimanches',
        'Minimum de 8000 FCFA de trajet',
        "Non cumulable avec d'autres promotions",
      ],
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Promotions</h1>

          <div className="space-y-6">
            {activePromotions.map((promo) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{promo.title}</h2>
                      <p className="text-gray-600 mt-1">{promo.description}</p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {promo.code}
                    </div>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <FaClock className="w-4 h-4 mr-2" />
                    <span>Valable jusqu'au {formatDate(promo.validUntil)}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-800">Conditions d'utilisation :</h3>
                    <ul className="space-y-2">
                      {promo.conditions.map((condition, index) => (
                        <li key={index} className="flex items-start">
                          <FaCheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2" />
                          <span className="text-gray-600">{condition}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full p-4 bg-blue-500 text-white rounded-lg font-medium"
                    onClick={() => {
                      // Logique de copie du code promo
                      navigator.clipboard.writeText(promo.code);
                    }}
                  >
                    Copier le code promo
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Comment utiliser un code promo ?
            </h2>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium mr-3">
                  1
                </span>
                <span className="text-gray-600">Copiez le code promo de votre choix</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium mr-3">
                  2
                </span>
                <span className="text-gray-600">
                  Allez sur la page de réservation et remplissez les détails de votre trajet
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium mr-3">
                  3
                </span>
                <span className="text-gray-600">
                  Collez le code promo dans le champ prévu à cet effet avant de finaliser votre
                  réservation
                </span>
              </li>
            </ol>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
