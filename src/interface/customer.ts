export interface ICustomer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  addresses: ICustomerAddress[];
  tags: string[];
  segment?: string;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate?: Date;
  registeredAt: Date;
  notes?: string;
  preferences: ICustomerPreferences;
  active: boolean;
}

export interface ICustomerAddress {
  id: string;
  title: string;
  fullAddress: string;
  cityId: string;
  cityName: string;
  districtId: string;
  districtName: string;
  buildingNo?: string;
  floor?: string;
  apartmentNo?: string;
  doorCode?: string;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
}

export interface ICustomerPreferences {
  allowSmsNotifications: boolean;
  allowEmailNotifications: boolean;
  allowPushNotifications: boolean;
  favoriteProducts?: string[];
}
