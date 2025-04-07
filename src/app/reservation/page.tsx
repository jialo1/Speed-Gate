'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { FaCar, FaCarSide, FaBus, FaExchangeAlt, FaLongArrowAltRight, FaCheck, FaUsers, FaClock, FaCalendarAlt, FaMinus, FaPlus, FaMapMarkerAlt, FaSearch } from 'react-icons/fa'

// Données de test pour les suggestions
const locations = [
  'Aéroport Charles de Gaulle (CDG)',
  'Aéroport d\'Orly (ORY)',
  'Paris, 75001',
  'Paris, 75008',
  'Paris, 75016',
  'Paris, 75017',
  'Paris, 75018',
  'Paris, 75019',
  'Paris, 75020',
  'Paris, 75015',
  'Paris, 75014',
  'Paris, 75013',
  'Paris, 75012',
  'Paris, 75011',
  'Paris, 75010',
  'Paris, 75009',
  'Paris, 75007',
  'Paris, 75006',
  'Paris, 75005',
  'Paris, 75004',
  'Paris, 75003',
  'Paris, 75002',
]

const vehicleTypes = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Véhicule confortable pour 1-3 personnes',
    priceOneWay: 22000,
    priceRoundTrip: 27000,
    maxPassengers: 3,
    icon: <FaCar className="w-8 h-8 text-yellow-500" />,
    recommended: false
  },
  {
    id: 'comfort',
    name: 'Confort',
    description: 'Véhicule haut de gamme pour 1-3 personnes',
    priceOneWay: 25000,
    priceRoundTrip: 29000,
    maxPassengers: 3,
    icon: <FaCarSide className="w-8 h-8 text-yellow-500" />,
    recommended: true
  },
  {
    id: 'minibus',
    name: 'Minibus',
    description: 'Véhicule spacieux pour 4-8 personnes',
    priceOneWay: 35000,
    priceRoundTrip: 45000,
    maxPassengers: 8,
    icon: <FaBus className="w-8 h-8 text-yellow-500" />,
    recommended: false
  }
]

export default function Reservation() {
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    vehicleType: '',
    tripType: 'one-way',
    date: '',
    time: '',
    passengers: 1
  })

  const [errors, setErrors] = useState({
    departure: '',
    destination: '',
    vehicleType: '',
    date: '',
    time: '',
    passengers: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [suggestions, setSuggestions] = useState({
    departure: [],
    destination: []
  })

  const [showSuggestions, setShowSuggestions] = useState({
    departure: false,
    destination: false
  })

  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)

  // Validation des champs
  const validateForm = () => {
    const newErrors = {
      departure: '',
      destination: '',
      vehicleType: '',
      date: '',
      time: '',
      passengers: ''
    }

    if (!formData.departure) {
      newErrors.departure = 'Le point de départ est requis'
    }

    if (!formData.destination) {
      newErrors.destination = 'La destination est requise'
    }

    if (!formData.vehicleType) {
      newErrors.vehicleType = 'Le type de véhicule est requis'
    }

    if (!formData.date) {
      newErrors.date = 'La date est requise'
    } else {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.date = 'La date ne peut pas être dans le passé'
      }
    }

    if (!formData.time) {
      newErrors.time = 'L\'heure est requise'
    }

    if (formData.passengers < 1) {
      newErrors.passengers = 'Le nombre de passagers doit être au moins 1'
    } else {
      const selectedVehicle = vehicleTypes.find(v => v.id === formData.vehicleType)
      if (selectedVehicle && formData.passengers > selectedVehicle.maxPassengers) {
        newErrors.passengers = `Le nombre maximum de passagers pour ce véhicule est ${selectedVehicle.maxPassengers}`
      }
    }

    setErrors(newErrors)
    return Object.values(newErrors).every(error => !error)
  }

  // Fonction pour vérifier si un véhicule est recommandé pour le nombre de passagers
  const isVehicleRecommended = (vehicleId: string) => {
    const vehicle = vehicleTypes.find(v => v.id === vehicleId)
    if (!vehicle) return false

    // Logique de recommandation basée sur le nombre de passagers
    if (formData.passengers <= 3) {
      return vehicle.id === 'comfort' // Recommande le confort pour 1-3 passagers
    } else {
      return vehicle.id === 'minibus' // Recommande le minibus pour 4+ passagers
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Réinitialiser l'erreur du champ modifié
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }

    // Logique spécifique pour le changement de nombre de passagers
    if (name === 'passengers') {
      const passengers = parseInt(value)
      if (passengers > 3 && formData.vehicleType !== 'minibus') {
        setFormData(prev => ({ ...prev, vehicleType: 'minibus' }))
      } else if (passengers <= 3 && formData.vehicleType === 'minibus') {
        setFormData(prev => ({ ...prev, vehicleType: 'comfort' }))
      }
    }

    // Gestion des suggestions
    if (name === 'departure' || name === 'destination') {
      const filtered = locations.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(prev => ({ ...prev, [name]: filtered }))
      setShowSuggestions(prev => ({ ...prev, [name]: true }))
    }
  }

  const handleSuggestionClick = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setShowSuggestions(prev => ({ ...prev, [field]: false }))
  }

  const calculatePrice = () => {
    const vehicle = vehicleTypes.find(v => v.id === formData.vehicleType)
    if (!vehicle) return 0

    return formData.tripType === 'one-way' ? vehicle.priceOneWay : vehicle.priceRoundTrip
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Données du formulaire:', formData)
      setShowSuccess(true)
      
      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        setFormData({
          departure: '',
          destination: '',
          vehicleType: '',
          tripType: 'one-way',
          date: '',
          time: '',
          passengers: 1
        })
        setShowSuccess(false)
      }, 3000)
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Réserver votre transfert
          </h1>

          {showSuccess && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              Votre réservation a été confirmée avec succès !
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Point de départ */}
            <div className="relative">
              <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-1">
                Point de départ
              </label>
              <div className="relative">
                <div className="relative p-4 border rounded-lg bg-white shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="text-yellow-500">
                      <FaMapMarkerAlt className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      id="departure"
                      name="departure"
                      value={formData.departure}
                      onChange={handleInputChange}
                      className="w-full border-0 p-0 focus:ring-0 text-gray-900 placeholder-gray-400"
                      placeholder="Entrez votre point de départ"
                      required
                    />
                    {formData.departure && (
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, departure: '' }))}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <FaSearch className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                {errors.departure && (
                  <p className="mt-1 text-sm text-red-500">{errors.departure}</p>
                )}
                {showSuggestions.departure && suggestions.departure.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {suggestions.departure.map((location, index) => (
                      <li
                        key={index}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-3"
                        onClick={() => handleSuggestionClick('departure', location)}
                      >
                        <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{location}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Destination */}
            <div className="relative">
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <div className="relative">
                <div className="relative p-4 border rounded-lg bg-white shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="text-yellow-500">
                      <FaMapMarkerAlt className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      className="w-full border-0 p-0 focus:ring-0 text-gray-900 placeholder-gray-400"
                      placeholder="Entrez votre destination"
                      required
                    />
                    {formData.destination && (
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, destination: '' }))}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <FaSearch className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                {errors.destination && (
                  <p className="mt-1 text-sm text-red-500">{errors.destination}</p>
                )}
                {showSuggestions.destination && suggestions.destination.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {suggestions.destination.map((location, index) => (
                      <li
                        key={index}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-3"
                        onClick={() => handleSuggestionClick('destination', location)}
                      >
                        <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{location}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Type de trajet */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de trajet
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all transform hover:scale-[1.02] ${
                    formData.tripType === 'one-way'
                      ? 'border-yellow-500 bg-yellow-50 shadow-md'
                      : 'border-gray-200 hover:border-yellow-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="tripType"
                    value="one-way"
                    checked={formData.tripType === 'one-way'}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div className="flex items-center space-x-4 w-full">
                    <div className={`${formData.tripType === 'one-way' ? 'text-yellow-600' : 'text-yellow-500'}`}>
                      <FaLongArrowAltRight className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Aller simple</div>
                      <div className="text-sm text-gray-500">Un trajet unique vers votre destination</div>
                    </div>
                    {formData.tripType === 'one-way' && (
                      <div className="text-yellow-500">
                        <FaCheck className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </label>

                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all transform hover:scale-[1.02] ${
                    formData.tripType === 'round-trip'
                      ? 'border-yellow-500 bg-yellow-50 shadow-md'
                      : 'border-gray-200 hover:border-yellow-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="tripType"
                    value="round-trip"
                    checked={formData.tripType === 'round-trip'}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div className="flex items-center space-x-4 w-full">
                    <div className={`${formData.tripType === 'round-trip' ? 'text-yellow-600' : 'text-yellow-500'}`}>
                      <FaExchangeAlt className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Aller-retour</div>
                      <div className="text-sm text-gray-500">Trajet aller et retour inclus</div>
                    </div>
                    {formData.tripType === 'round-trip' && (
                      <div className="text-yellow-500">
                        <FaCheck className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Type de véhicule */}
            <div>
              <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">
                Type de véhicule
              </label>
              <div className="grid grid-cols-1 gap-2">
                {vehicleTypes.map(vehicle => {
                  const isRecommended = isVehicleRecommended(vehicle.id)
                  return (
                    <label
                      key={vehicle.id}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all transform hover:scale-[1.02] ${
                        formData.vehicleType === vehicle.id
                          ? 'border-yellow-500 bg-yellow-50 shadow-md'
                          : 'border-gray-200 hover:border-yellow-300'
                      } ${isRecommended ? 'ring-2 ring-yellow-300' : ''}`}
                    >
                      <input
                        type="radio"
                        name="vehicleType"
                        value={vehicle.id}
                        checked={formData.vehicleType === vehicle.id}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <div className="flex items-center space-x-4 w-full">
                        <div className={`${formData.vehicleType === vehicle.id ? 'text-yellow-600' : 'text-yellow-500'}`}>
                          {vehicle.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{vehicle.name}</span>
                            {isRecommended && (
                              <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                                Recommandé
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{vehicle.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            {formData.tripType === 'one-way' 
                              ? `${vehicle.priceOneWay.toLocaleString('fr-FR')} FCFA`
                              : `${vehicle.priceRoundTrip.toLocaleString('fr-FR')} FCFA`}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formData.tripType === 'one-way' ? 'Aller simple' : 'Aller-retour'}
                          </div>
                        </div>
                        {formData.vehicleType === vehicle.id && (
                          <div className="text-yellow-500 ml-2">
                            <FaCheck className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </label>
                  )
                })}
              </div>
              {errors.vehicleType && (
                <p className="mt-1 text-sm text-red-500">{errors.vehicleType}</p>
              )}
            </div>

            {/* Nombre de passagers */}
            <div>
              <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de passagers
              </label>
              <div className="relative p-4 border rounded-lg bg-white shadow-sm hover:shadow transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-yellow-500">
                      <FaUsers className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Passagers</div>
                      <div className="text-sm text-gray-500">
                        {vehicleTypes.find(v => v.id === formData.vehicleType)?.maxPassengers 
                          ? `Maximum ${vehicleTypes.find(v => v.id === formData.vehicleType)?.maxPassengers} passagers`
                          : 'Sélectionnez d\'abord un véhicule'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => handleInputChange({ 
                        target: { 
                          name: 'passengers', 
                          value: Math.max(1, formData.passengers - 1).toString() 
                        }
                      } as any)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-yellow-500 hover:text-yellow-500 transition-colors"
                      disabled={formData.passengers <= 1}
                    >
                      <FaMinus className="w-3 h-3" />
                    </button>
                    <span className="w-12 text-center font-semibold text-gray-900">
                      {formData.passengers}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleInputChange({
                        target: {
                          name: 'passengers',
                          value: Math.min(
                            formData.passengers + 1,
                            vehicleTypes.find(v => v.id === formData.vehicleType)?.maxPassengers || 8
                          ).toString()
                        }
                      } as any)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-yellow-500 hover:text-yellow-500 transition-colors"
                      disabled={formData.passengers >= (vehicleTypes.find(v => v.id === formData.vehicleType)?.maxPassengers || 8)}
                    >
                      <FaPlus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                {errors.passengers && (
                  <p className="mt-2 text-sm text-red-500">{errors.passengers}</p>
                )}
              </div>
            </div>

            {/* Date et heure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date de prise en charge
                </label>
                <div className="relative">
                  <div className="relative p-4 border rounded-lg bg-white shadow-sm hover:shadow transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className="text-yellow-500">
                        <FaCalendarAlt className="w-5 h-5" />
                      </div>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full border-0 p-0 focus:ring-0 ${errors.date ? 'text-red-500' : 'text-gray-900'}`}
                        required
                      />
                    </div>
                  </div>
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Heure de prise en charge
                </label>
                <div className="relative">
                  <div className="relative p-4 border rounded-lg bg-white shadow-sm hover:shadow transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className="text-yellow-500">
                        <FaClock className="w-5 h-5" />
                      </div>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className={`w-full border-0 p-0 focus:ring-0 ${errors.time ? 'text-red-500' : 'text-gray-900'}`}
                        required
                      />
                    </div>
                  </div>
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-500">{errors.time}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Prix estimé */}
            {formData.vehicleType && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Prix estimé
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {calculatePrice().toLocaleString('fr-FR')} FCFA
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.tripType === 'one-way' ? 'Aller simple' : 'Aller-retour'}
                </p>
              </div>
            )}

            {/* Bouton de confirmation */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Confirmation en cours...' : 'Confirmer la réservation'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
} 