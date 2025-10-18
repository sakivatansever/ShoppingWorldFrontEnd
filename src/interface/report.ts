export interface ISalesReport {
  startDate: Date;
  endDate: Date;
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalDiscount: number;
  totalTax: number;
  netRevenue: number;
  categoryBreakdown: ICategoryReportItem[];
  productBreakdown: IProductReportItem[];
  paymentMethodBreakdown: IPaymentMethodReportItem[];
  dailyBreakdown: IDailyReportItem[];
}

export interface ICategoryReportItem {
  categoryId: string;
  categoryName: string;
  orderCount: number;
  quantity: number;
  revenue: number;
  percentage: number;
}

export interface IProductReportItem {
  productId: string;
  productName: string;
  categoryName: string;
  orderCount: number;
  quantity: number;
  revenue: number;
  averagePrice: number;
}

export interface IPaymentMethodReportItem {
  method: string;
  methodName: string;
  orderCount: number;
  totalAmount: number;
  percentage: number;
}

export interface IDailyReportItem {
  date: string;
  orderCount: number;
  revenue: number;
  averageOrderValue: number;
  cancelledOrders: number;
}

export interface IDeliveryReport {
  startDate: Date;
  endDate: Date;
  totalDeliveries: number;
  averageDeliveryTime: number;
  onTimeDeliveries: number;
  lateDeliveries: number;
  cancelledDeliveries: number;
  courierPerformance: ICourierPerformanceItem[];
}

export interface ICourierPerformanceItem {
  courierId: string;
  courierName: string;
  totalDeliveries: number;
  averageDeliveryTime: number;
  onTimePercentage: number;
  rating: number;
}
