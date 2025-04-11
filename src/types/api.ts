export interface ApiError {
  error: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

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
  vehicleType: string;
  paymentMethod: string;
}

export interface LocationInput {
  address: string;
  latitude: number;
  longitude: number;
}

export interface CreateDriverRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  licenseNumber: string;
  vehicle: {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
    type: string;
  };
}

export interface CreatePromotionRequest {
  title: string;
  description: string;
  type: string;
  value: number;
  conditions: Record<string, any>;
  validFrom: string;
  validUntil: string;
}

export interface UpdateLocationRequest {
  latitude: number;
  longitude: number;
}

export interface UpdatePromotionRequest {
  isActive?: boolean;
  validUntil?: string;
}
