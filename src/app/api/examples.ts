// Exemples d'utilisation des API

import type {
  ApiError,
  ApiResponse,
  CreateUserRequest,
  CreateTripRequest,
  CreateDriverRequest,
  CreatePromotionRequest,
  UpdateLocationRequest,
  UpdatePromotionRequest,
} from '@/types'

// 1. Gestion des utilisateurs
async function userExamples() {
  try {
    // Créer un nouvel utilisateur
    const userData: CreateUserRequest = {
      name: 'Moussa Diop',
      email: 'moussa.diop@example.com',
      phone: '+221 77 123 45 67',
      password: 'MotDePasse123!',
    }

    const createUser = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })

    if (!createUser.ok) {
      const error = (await createUser.json()) as ApiError
      throw new Error(error.error)
    }

    const newUser = await createUser.json()
    console.log('Nouvel utilisateur créé:', newUser)

    // Récupérer tous les utilisateurs
    const users = await fetch('/api/users').then(res => res.json())
    console.log('Liste des utilisateurs:', users)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erreur:', error.message)
    }
  }
}

// 2. Gestion des trajets
async function tripExamples() {
  try {
    // Créer un nouveau trajet
    const tripData: CreateTripRequest = {
      userId: 'user-id-123',
      pickupLocation: {
        address: 'Aéroport International Blaise Diagne',
        lat: 14.7969,
        lng: -17.0375,
      },
      dropoffLocation: {
        address: 'Plateau, Dakar',
        lat: 14.6937,
        lng: -17.4441,
      },
      scheduledTime: '2024-04-10T14:30:00Z',
      vehicleType: 'CONFORT',
      paymentMethod: 'WAVE',
    }

    const createTrip = await fetch('/api/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tripData),
    })

    if (!createTrip.ok) {
      const error = (await createTrip.json()) as ApiError
      throw new Error(error.error)
    }

    const newTrip = await createTrip.json()
    console.log('Nouveau trajet créé:', newTrip)

    // Récupérer les trajets d'un utilisateur
    const userTrips = await fetch('/api/trips?userId=user-id-123').then(res => res.json())
    console.log('Trajets de l\'utilisateur:', userTrips)

    // Récupérer les trajets par statut
    const pendingTrips = await fetch('/api/trips?status=PENDING').then(res => res.json())
    console.log('Trajets en attente:', pendingTrips)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erreur:', error.message)
    }
  }
}

// 3. Gestion des chauffeurs
async function driverExamples() {
  try {
    // Créer un nouveau chauffeur
    const driverData: CreateDriverRequest = {
      name: 'Abdou Sow',
      email: 'abdou.sow@example.com',
      phone: '+221 77 234 56 78',
      password: 'MotDePasse456!',
      vehicleData: {
        type: 'CONFORT',
        model: 'Toyota Camry',
        licensePlate: 'DK-1234-AA',
        capacity: 4,
        features: ['Climatisation', 'Wifi', 'Chargeur USB'],
      },
    }

    const createDriver = await fetch('/api/drivers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(driverData),
    })

    if (!createDriver.ok) {
      const error = (await createDriver.json()) as ApiError
      throw new Error(error.error)
    }

    const newDriver = await createDriver.json()
    console.log('Nouveau chauffeur créé:', newDriver)

    // Récupérer les chauffeurs disponibles d'un type spécifique
    const availableDrivers = await fetch('/api/drivers?available=true&vehicleType=CONFORT').then(res => res.json())
    console.log('Chauffeurs disponibles:', availableDrivers)

    // Mettre à jour la position d'un chauffeur
    const locationData: UpdateLocationRequest = {
      lat: 14.7167,
      lng: -17.4677,
      address: 'Almadies, Dakar',
    }

    const updateLocation = await fetch('/api/drivers/driver-id-123/location', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(locationData),
    })

    if (!updateLocation.ok) {
      const error = (await updateLocation.json()) as ApiError
      throw new Error(error.error)
    }

    const updatedDriver = await updateLocation.json()
    console.log('Position du chauffeur mise à jour:', updatedDriver)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erreur:', error.message)
    }
  }
}

// 4. Gestion des promotions
async function promotionExamples() {
  try {
    // Créer une nouvelle promotion
    const promotionData: CreatePromotionRequest = {
      title: 'Promotion Tabaski',
      description: '25% de réduction sur tous les trajets',
      type: 'PERCENTAGE',
      value: 25,
      conditions: {
        minAmount: 2000,
        maxDiscount: 5000,
        validRoutes: ['all'],
      },
      validUntil: '2024-06-30T23:59:59Z',
    }

    const createPromotion = await fetch('/api/promotions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(promotionData),
    })

    if (!createPromotion.ok) {
      const error = (await createPromotion.json()) as ApiError
      throw new Error(error.error)
    }

    const newPromotion = await createPromotion.json()
    console.log('Nouvelle promotion créée:', newPromotion)

    // Récupérer les promotions actives
    const activePromotions = await fetch('/api/promotions').then(res => res.json())
    console.log('Promotions actives:', activePromotions)

    // Désactiver une promotion
    const updateData: UpdatePromotionRequest = {
      isActive: false,
    }

    const updatePromotion = await fetch('/api/promotions/promo-id-123', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    })

    if (!updatePromotion.ok) {
      const error = (await updatePromotion.json()) as ApiError
      throw new Error(error.error)
    }

    const updatedPromotion = await updatePromotion.json()
    console.log('Promotion mise à jour:', updatedPromotion)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erreur:', error.message)
    }
  }
}

// Exemple d'utilisation avec gestion des erreurs complète
async function exampleWithErrorHandling() {
  try {
    // Créer un utilisateur
    const userData: CreateUserRequest = {
      name: 'Fatou Ndiaye',
      email: 'fatou.ndiaye@example.com',
      phone: '+221 77 345 67 89',
      password: 'MotDePasse789!',
    }

    const createUserResponse = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })

    if (!createUserResponse.ok) {
      const error = (await createUserResponse.json()) as ApiError
      throw new Error(error.error)
    }

    const user = await createUserResponse.json()

    // Créer un trajet pour cet utilisateur
    const tripData: CreateTripRequest = {
      userId: user.id,
      pickupLocation: {
        address: 'Sacré Cœur, Dakar',
        lat: 14.7128,
        lng: -17.4548,
      },
      dropoffLocation: {
        address: 'Point E, Dakar',
        lat: 14.6985,
        lng: -17.4619,
      },
      scheduledTime: new Date(Date.now() + 3600000).toISOString(), // Dans 1 heure
      vehicleType: 'STANDARD',
      paymentMethod: 'ORANGE_MONEY',
    }

    const createTripResponse = await fetch('/api/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tripData),
    })

    if (!createTripResponse.ok) {
      const error = (await createTripResponse.json()) as ApiError
      throw new Error(error.error)
    }

    const trip = await createTripResponse.json()
    console.log('Trajet créé avec succès:', trip)

  } catch (error) {
    if (error instanceof Error) {
      console.error('Une erreur est survenue:', error.message)
    } else {
      console.error('Une erreur inconnue est survenue')
    }
  }
} 