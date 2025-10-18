export interface ICourier {
  id: string;
  name: string;
  phone: string;
  email?: string;
  vehicleType: VehicleType;
  vehiclePlate?: string;
  status: CourierStatus;
  currentLocation?: ILocation;
  assignedOrdersCount: number;
  totalDeliveries: number;
  averageDeliveryTime?: number;
  rating?: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum CourierStatus {
  Idle = 'idle',
  Busy = 'busy',
  Offline = 'offline'
}

export enum VehicleType {
  Bicycle = 'bicycle',
  Motorcycle = 'motorcycle',
  Car = 'car'
}

export interface ILocation {
  latitude: number;
  longitude: number;
  lastUpdated: Date;
}

export const CourierStatusLabels: Record<CourierStatus, string> = {
  [CourierStatus.Idle]: 'Müsait',
  [CourierStatus.Busy]: 'Meşgul',
  [CourierStatus.Offline]: 'Çevrimdışı'
};

export const VehicleTypeLabels: Record<VehicleType, string> = {
  [VehicleType.Bicycle]: 'Bisiklet',
  [VehicleType.Motorcycle]: 'Motosiklet',
  [VehicleType.Car]: 'Araba'
};
