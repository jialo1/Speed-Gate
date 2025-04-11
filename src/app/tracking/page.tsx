'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import {
  FaPhone,
  FaWhatsapp,
  FaTimes,
  FaCar,
  FaUser,
  FaClock,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaMoneyBillWave,
  FaMobileAlt,
  FaFileInvoice,
  FaStar,
  FaHistory,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

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
    lng: 2.3522,
  },
  destination: {
    lat: 48.8584,
    lng: 2.2945,
  },
};

export default function Tracking() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5); // en minutes
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [tripHistory, setTripHistory] = useState([
    {
      id: 1,
      date: '2024-03-15',
      from: 'Aéroport Blaise Diagne',
      to: 'Hôtel Terrou-Bi',
      driver: 'Jean Dupont',
      rating: 4.8,
      price: '15 000 FCFA',
    },
    {
      id: 2,
      date: '2024-03-10',
      from: 'Gare Routière',
      to: 'Université Cheikh Anta Diop',
      driver: 'Marie Fall',
      rating: 5.0,
      price: '8 000 FCFA',
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 60000); // Mise à jour toutes les minutes

    return () => clearInterval(timer);
  }, []);

  const handleCancel = async () => {
    setIsLoading(true);
    // Simulation d'un appel API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setShowCancelModal(false);
    // Redirection vers la page d'accueil
    window.location.href = '/';
  };

  const handlePaymentSelection = (method: string) => {
    setSelectedPaymentMethod(method);
    // Simuler le traitement du paiement
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Rediriger vers la page d'accueil après le paiement
      window.location.href = '/';
    }, 2000);
  };

  const handleRatingSubmit = () => {
    // Simuler l'envoi de l'avis
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Rediriger vers la page d'accueil
      window.location.href = '/';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-800 mb-6"
          >
            Suivi de votre course
          </motion.h1>

          {/* Carte statique avec animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 h-96 relative"
          >
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center"
                >
                  <FaCar className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-gray-600">Carte en cours de chargement...</p>
                <p className="text-sm text-gray-500 mt-2">Configuration Google Maps en cours</p>
              </div>
            </div>
            {/* Indicateur de position du chauffeur */}
            <motion.div
              animate={{
                x: [0, 10, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                <FaMapMarkerAlt className="w-3 h-3" />
                <span>Position actuelle</span>
              </div>
            </motion.div>
            {/* Indicateur de destination */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-4 right-4"
            >
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                <FaMapMarkerAlt className="w-3 h-3" />
                <span>Destination</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Informations du chauffeur */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center"
                >
                  <FaUser className="w-8 h-8 text-gray-400" />
                </motion.div>
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
                  <FaCar className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{driverData.name}</h2>
                <p className="text-sm text-gray-600">
                  {driverData.vehicleModel} - {driverData.vehicleNumber}
                </p>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-sm text-gray-600">{driverData.rating}</span>
                </div>
              </div>
            </div>

            {/* Temps d'arrivée avec animation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between p-4 bg-blue-50 rounded-lg mb-4"
            >
              <div className="flex items-center space-x-3">
                <FaClock className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Temps d'arrivée estimé</p>
                  <motion.p
                    key={timeLeft}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-lg font-semibold text-gray-800"
                  >
                    {timeLeft} min
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center space-x-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                onClick={() => (window.location.href = `tel:+1234567890`)}
              >
                <FaPhone className="w-5 h-5" />
                <span>Appeler</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center space-x-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                onClick={() => (window.location.href = `https://wa.me/1234567890`)}
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>WhatsApp</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Section de paiement */}
          {timeLeft === 0 && !showPaymentOptions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Course terminée</h2>
              <p className="text-gray-600 mb-4">Veuillez choisir votre méthode de paiement :</p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 bg-blue-500 text-white rounded-lg mb-4 flex items-center justify-center space-x-2"
                onClick={() => setShowPaymentOptions(true)}
              >
                <FaMoneyBillWave className="w-5 h-5" />
                <span>Choisir le mode de paiement</span>
              </motion.button>
            </motion.div>
          )}

          {/* Options de paiement */}
          {showPaymentOptions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Options de paiement</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Paiement avant le trajet */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">Paiement avant le trajet</h3>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-lg flex items-center space-x-3 ${
                      selectedPaymentMethod === 'wave'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                    onClick={() => handlePaymentSelection('wave')}
                    disabled={isLoading}
                  >
                    <FaMobileAlt className="w-6 h-6" />
                    <span>Wave</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-lg flex items-center space-x-3 ${
                      selectedPaymentMethod === 'orange'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                    onClick={() => handlePaymentSelection('orange')}
                    disabled={isLoading}
                  >
                    <FaMobileAlt className="w-6 h-6" />
                    <span>Orange Money</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-lg flex items-center space-x-3 ${
                      selectedPaymentMethod === 'cash'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                    onClick={() => handlePaymentSelection('cash')}
                    disabled={isLoading}
                  >
                    <FaMoneyBillWave className="w-6 h-6" />
                    <span>Espèces</span>
                  </motion.button>
                </div>

                {/* Paiement après le trajet */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">Paiement après le trajet</h3>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-lg flex items-center space-x-3 ${
                      selectedPaymentMethod === 'whatsapp'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                    onClick={() => handlePaymentSelection('whatsapp')}
                    disabled={isLoading}
                  >
                    <FaWhatsapp className="w-6 h-6" />
                    <span>Facture par WhatsApp</span>
                  </motion.button>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      La facture vous sera envoyée par WhatsApp dans les 24 heures suivant votre
                      trajet.
                    </p>
                  </div>
                </div>
              </div>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-4 bg-blue-50 rounded-lg text-center"
                >
                  <p className="text-blue-600">Traitement du paiement en cours...</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Section de confirmation et avis */}
          {selectedPaymentMethod && !showRating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 mb-6"
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center"
                >
                  <FaStar className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Merci pour votre confiance !
                </h2>
                <p className="text-gray-600">Votre paiement a été effectué avec succès.</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 bg-blue-500 text-white rounded-lg mb-6 flex items-center justify-center space-x-2"
                onClick={() => setShowRating(true)}
              >
                <FaStar className="w-5 h-5" />
                <span>Donner votre avis</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg flex items-center justify-center space-x-2"
                onClick={() => (window.location.href = '/')}
              >
                <FaHistory className="w-5 h-5" />
                <span>Retour à l'accueil</span>
              </motion.button>
            </motion.div>
          )}

          {/* Section d'évaluation */}
          {showRating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Évaluez votre trajet</h2>

              <div className="flex justify-center space-x-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      star <= rating ? 'bg-yellow-400' : 'bg-gray-200'
                    }`}
                    onClick={() => setRating(star)}
                  >
                    <FaStar
                      className={`w-5 h-5 ${star <= rating ? 'text-white' : 'text-gray-400'}`}
                    />
                  </motion.button>
                ))}
              </div>

              <textarea
                className="w-full p-4 border rounded-lg mb-4"
                rows={4}
                placeholder="Partagez votre expérience (optionnel)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 bg-blue-500 text-white rounded-lg mb-4"
                onClick={handleRatingSubmit}
                disabled={isLoading || rating === 0}
              >
                {isLoading ? 'Envoi en cours...' : "Envoyer l'avis"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg"
                onClick={() => (window.location.href = '/')}
              >
                Retour à l'accueil
              </motion.button>
            </motion.div>
          )}

          {/* Historique des trajets */}
          {showRating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Historique des trajets</h2>

              <div className="space-y-4">
                {tripHistory.map((trip) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-800">{trip.date}</p>
                        <p className="text-sm text-gray-600">
                          {trip.from} → {trip.to}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">{trip.price}</p>
                        <div className="flex items-center justify-end">
                          <FaStar className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600">{trip.rating}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Chauffeur: {trip.driver}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Bouton d'annulation */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            onClick={() => setShowCancelModal(true)}
          >
            <FaTimes className="w-5 h-5" />
            <span>Annuler la course</span>
          </motion.button>
        </div>
      </main>

      {/* Modal d'annulation */}
      {showCancelModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Annuler la course</h3>
            <p className="text-sm text-gray-600 mb-4">
              Veuillez noter que l'annulation d'une course peut entraîner des frais selon les
              conditions de notre politique d'annulation.
            </p>
            <textarea
              className="w-full p-3 border rounded-lg mb-4"
              placeholder="Raison de l'annulation (optionnel)"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 p-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => setShowCancelModal(false)}
              >
                Retour
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                onClick={handleCancel}
                disabled={isLoading}
              >
                {isLoading ? 'Annulation en cours...' : "Confirmer l'annulation"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
