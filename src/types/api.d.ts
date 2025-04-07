// Types pour les réponses API
export interface ApiError {
  error: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Types pour les requêtes
export interface CreateUserRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface CreateTripRequest {
  userId: string;
  pickupLocation: LocationInput;
  dropoffLocation: LocationInput;
  scheduledTime: string;
  vehicleType: 'STANDARD' | 'CONFORT' | 'MINIBUS';
  paymentMethod: 'WAVE' | 'ORANGE_MONEY' | 'CASH' | 'WHATSAPP_INVOICE';
}

export interface LocationInput {
  address: string;
  lat: number;
  lng: number;
}

export interface CreateDriverRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  vehicleData: {
    type: 'STANDARD' | 'CONFORT' | 'MINIBUS';
    model: string;
    licensePlate: string;
    capacity: number;
    features?: string[];
  };
}

export interface CreatePromotionRequest {
  title: string;
  description: string;
  type: 'PERCENTAGE' | 'FIXED' | 'FREE_RIDE';
  value: number;
  conditions: {
    minAmount?: number;
    maxDiscount?: number;
    validRoutes?: string[];
    [key: string]: any;
  };
  validUntil: string;
}

export interface UpdateLocationRequest {
  lat: number;
  lng: number;
  address: string;
}

export interface UpdatePromotionRequest {
  isActive?: boolean;
  validUntil?: string;
} 