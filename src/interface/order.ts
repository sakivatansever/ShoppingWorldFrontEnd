export interface IOrder {
  id: string;
  code: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  items: IOrderItem[];
  customer: IOrderCustomer;
  address: IOrderAddress;
  payment: IOrderPayment;
  delivery?: IOrderDelivery;
  timeline: IOrderTimeline[];
  notes?: string;
  cancelReason?: string;
}

export interface IOrderItem {
  id: string;
  productId: string;
  productName: string;
  categoryName: string;
  variantId?: string;
  variantName?: string;
  options: IOrderItemOption[];
  quantity: number;
  unitPrice: number;
  total: number;
  notes?: string;
}

export interface IOrderItemOption {
  id: string;
  groupName: string;
  optionName: string;
  price: number;
}

export interface IOrderCustomer {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

export interface IOrderAddress {
  id?: string;
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
  latitude?: number;
  longitude?: number;
}

export interface IOrderPayment {
  method: 'creditCard' | 'cash' | 'onlinePayment';
  subtotal: number;
  deliveryFee: number;
  discount: number;
  taxAmount: number;
  finalTotal: number;
  couponCode?: string;
  isPaid: boolean;
  paidAt?: Date;
}

export interface IOrderDelivery {
  courierId?: string;
  courierName?: string;
  courierPhone?: string;
  estimatedDeliveryTime?: Date;
  deliveredAt?: Date;
  distance?: number;
}

export interface IOrderTimeline {
  id: string;
  status: OrderStatus;
  note?: string;
  createdAt: Date;
  createdBy: string;
}

export enum OrderStatus {
  New = 0,
  Confirmed = 1,
  Preparing = 2,
  Ready = 3,
  OnDelivery = 4,
  Delivered = 5,
  Cancelled = 6,
  Refunded = 7
}

export const OrderStatusLabels: Record<OrderStatus, string> = {
  [OrderStatus.New]: 'Yeni Sipariş',
  [OrderStatus.Confirmed]: 'Onaylandı',
  [OrderStatus.Preparing]: 'Hazırlanıyor',
  [OrderStatus.Ready]: 'Hazır',
  [OrderStatus.OnDelivery]: 'Kuryede',
  [OrderStatus.Delivered]: 'Teslim Edildi',
  [OrderStatus.Cancelled]: 'İptal Edildi',
  [OrderStatus.Refunded]: 'İade Edildi'
};
