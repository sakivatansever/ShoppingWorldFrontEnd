export interface IDashboardStats {
  todayOrders: number;
  todayRevenue: number;
  activeOrders: number;
  pendingOrders: number;
  completedOrdersToday: number;
  cancelledOrdersToday: number;
  averageOrderValue: number;
  averageDeliveryTime: number;
}

export interface ISalesData {
  date: string;
  revenue: number;
  orderCount: number;
  averageOrderValue: number;
}

export interface ITopProduct {
  productId: string;
  productName: string;
  categoryName: string;
  totalQuantity: number;
  totalRevenue: number;
  orderCount: number;
}

export interface IOrderStatusSummary {
  status: number;
  statusName: string;
  count: number;
  percentage: number;
}

export interface IRevenueByCategory {
  categoryId: string;
  categoryName: string;
  revenue: number;
  percentage: number;
}
