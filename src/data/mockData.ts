import { User, Driver, Vehicle, Trip, Promotion, Notification, AppSettings } from '../types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Moussa Diop',
  email: 'moussa.diop@example.com',
  phone: '+221 77 123 45 67',
  loyaltyPoints: 250,
  level: 'Bronze',
  nextLevelPoints: 500,
  profileImage: '/images/user-avatar.jpg'
};

export const mockDrivers: Driver[] = [
  {
    id: 'driver-1',
    name: 'Jean Dupont',
    phone: '+221 77 234 56 78',
    email: 'jean.dupont@example.com',
    rating: 4.8,
    totalTrips: 156,
    vehicle: {
      id: 'vehicle-1',
      type: 'Confort',
      model: 'Mercedes Classe E',
      licensePlate: 'AB-123-CD',
      capacity: 4,
      features: ['Climatisation', 'WiFi', 'Chargement USB'],
      image: '/images/mercedes-e.jpg'
    },
    isAvailable: true,
    currentLocation: {
      lat: 14.7167,
      lng: -17.4677
    }
  },
  {
    id: 'driver-2',
    name: 'Marie Fall',
    phone: '+221 77 345 67 89',
    email: 'marie.fall@example.com',
    rating: 4.9,
    totalTrips: 89,
    vehicle: {
      id: 'vehicle-2',
      type: 'Standard',
      model: 'Toyota Corolla',
      licensePlate: 'EF-456-GH',
      capacity: 4,
      features: ['Climatisation', 'Chargement USB'],
      image: '/images/toyota-corolla.jpg'
    },
    isAvailable: true,
    currentLocation: {
      lat: 14.6928,
      lng: -17.4477
    }
  }
];

export const mockTrips: Trip[] = [
  {
    id: 'trip-1',
    userId: 'user-1',
    driverId: 'driver-1',
    vehicleId: 'vehicle-1',
    status: 'completed',
    pickupLocation: {
      address: 'Aéroport Blaise Diagne',
      lat: 14.7397,
      lng: -17.4902
    },
    dropoffLocation: {
      address: 'Hôtel Terrou-Bi',
      lat: 14.6928,
      lng: -17.4477
    },
    scheduledTime: '2024-03-15T14:30:00Z',
    actualPickupTime: '2024-03-15T14:35:00Z',
    actualDropoffTime: '2024-03-15T15:15:00Z',
    price: 15000,
    paymentMethod: 'wave',
    paymentStatus: 'paid',
    rating: 4.8,
    comment: 'Excellent service, chauffeur très professionnel',
    createdAt: '2024-03-15T12:00:00Z',
    updatedAt: '2024-03-15T15:15:00Z'
  },
  {
    id: 'trip-2',
    userId: 'user-1',
    driverId: 'driver-2',
    vehicleId: 'vehicle-2',
    status: 'completed',
    pickupLocation: {
      address: 'Gare Routière',
      lat: 14.7167,
      lng: -17.4677
    },
    dropoffLocation: {
      address: 'Université Cheikh Anta Diop',
      lat: 14.6928,
      lng: -17.4477
    },
    scheduledTime: '2024-03-10T08:00:00Z',
    actualPickupTime: '2024-03-10T08:05:00Z',
    actualDropoffTime: '2024-03-10T08:30:00Z',
    price: 8000,
    paymentMethod: 'orange_money',
    paymentStatus: 'paid',
    rating: 5.0,
    comment: 'Ponctuel et très agréable',
    createdAt: '2024-03-09T20:00:00Z',
    updatedAt: '2024-03-10T08:30:00Z'
  }
];

export const mockPromotions: Promotion[] = [
  {
    id: 'promo-1',
    title: 'Trajet régulier',
    description: '10% de réduction sur votre 5ème trajet',
    type: 'percentage',
    value: 10,
    conditions: {
      minTrips: 5,
      validUntil: '2024-04-30T23:59:59Z'
    },
    isActive: true
  },
  {
    id: 'promo-2',
    title: 'Premier trajet',
    description: '15% de réduction sur votre premier trajet',
    type: 'percentage',
    value: 15,
    conditions: {
      validUntil: '2024-04-15T23:59:59Z'
    },
    isActive: true
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'trip_update',
    title: 'Trajet confirmé',
    message: 'Votre trajet vers Hôtel Terrou-Bi a été confirmé',
    isRead: true,
    createdAt: '2024-03-15T12:05:00Z'
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    type: 'promotion',
    title: 'Nouvelle promotion',
    message: 'Profitez de 10% de réduction sur votre 5ème trajet',
    isRead: false,
    createdAt: '2024-03-14T10:00:00Z'
  }
];

export const appSettings: AppSettings = {
  basePrice: 5000,
  pricePerKm: 500,
  minFare: 3000,
  maxPassengers: {
    standard: 4,
    comfort: 4,
    minibus: 8
  },
  supportPhone: '+221 77 123 45 67',
  supportWhatsApp: '+221 77 123 45 67',
  businessHours: {
    start: '06:00',
    end: '22:00'
  }
}; 