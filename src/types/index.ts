// Types pour les utilisateurs
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  nextLevelPoints: number;
  profileImage?: string;
}

// Types pour les chauffeurs
export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  rating: number;
  totalTrips: number;
  vehicle: Vehicle;
  profileImage?: string;
  isAvailable: boolean;
  currentLocation?: {
    lat: number;
    lng: number;
  };
}

// Types pour les véhicules
export interface Vehicle {
  id: string;
  type: 'Standard' | 'Confort' | 'Minibus';
  model: string;
  licensePlate: string;
  capacity: number;
  features: string[];
  image?: string;
}

// Types pour les trajets
export interface Trip {
  id: string;
  userId: string;
  driverId: string;
  vehicleId: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  pickupLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  dropoffLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  scheduledTime: string;
  actualPickupTime?: string;
  actualDropoffTime?: string;
  price: number;
  paymentMethod: 'wave' | 'orange_money' | 'cash' | 'whatsapp_invoice';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  rating?: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

// Types pour les promotions
export interface Promotion {
  id: string;
  title: string;
  description: string;
  type: 'percentage' | 'fixed' | 'free_ride';
  value: number;
  conditions: {
    minTrips?: number;
    minAmount?: number;
    validUntil: string;
  };
  isActive: boolean;
}

// Types pour les notifications
export interface Notification {
  id: string;
  userId: string;
  type: 'trip_update' | 'promotion' | 'payment' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// Types pour les paramètres de l'application
export interface AppSettings {
  basePrice: number;
  pricePerKm: number;
  minFare: number;
  maxPassengers: {
    standard: number;
    comfort: number;
    minibus: number;
  };
  supportPhone: string;
  supportWhatsApp: string;
  businessHours: {
    start: string;
    end: string;
  };
}

export * from './api';
export * from './api.d';
