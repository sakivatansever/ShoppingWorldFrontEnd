export interface IRestaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  taxNumber: string;
  taxRate: number;
  commissionRate: number;
  logo?: string;
  workingHours: IWorkingHours[];
  serviceAreas: IServiceArea[];
  paymentMethods: IPaymentMethod[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWorkingHours {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

export interface IServiceArea {
  id: string;
  cityId: string;
  cityName: string;
  districtId: string;
  districtName: string;
  deliveryFee: number;
  minOrderAmount: number;
  active: boolean;
}

export interface IPaymentMethod {
  id: string;
  type: 'creditCard' | 'cash' | 'onlinePayment';
  name: string;
  active: boolean;
  config?: Record<string, string>;
}
