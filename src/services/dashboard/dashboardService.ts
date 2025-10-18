import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IDashboardStats,
  ISalesData,
  ITopProduct,
  IOrderStatusSummary,
  IRevenueByCategory
} from '../../interface/dashboard';
import { mockDashboardStats, mockOrders, mockProducts } from '../mock/mockData';
import { OrderStatus, OrderStatusLabels } from '../../interface/order';

export const getDashboardStats = createAsyncThunk<IDashboardStats, void>(
  'dashboard/getStats',
  async (_, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockDashboardStats;
    } catch (error) {
      return thunkAPI.rejectWithValue('Dashboard istatistikleri yüklenirken hata oluştu');
    }
  }
);

interface ISalesDataParams {
  startDate: Date;
  endDate: Date;
}

export const getSalesData = createAsyncThunk<ISalesData[], ISalesDataParams>(
  'dashboard/getSalesData',
  async (params, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockSalesData: ISalesData[] = [
        { date: '2025-10-12', revenue: 4250.50, orderCount: 28, averageOrderValue: 151.80 },
        { date: '2025-10-13', revenue: 5120.30, orderCount: 32, averageOrderValue: 160.01 },
        { date: '2025-10-14', revenue: 3890.75, orderCount: 25, averageOrderValue: 155.63 },
        { date: '2025-10-15', revenue: 6340.20, orderCount: 41, averageOrderValue: 154.64 },
        { date: '2025-10-16', revenue: 5670.45, orderCount: 36, averageOrderValue: 157.51 },
        { date: '2025-10-17', revenue: 4980.90, orderCount: 30, averageOrderValue: 166.03 },
        { date: '2025-10-18', revenue: 5847.65, orderCount: 34, averageOrderValue: 172.05 }
      ];

      return mockSalesData;
    } catch (error) {
      return thunkAPI.rejectWithValue('Satış verileri yüklenirken hata oluştu');
    }
  }
);

export const getTopProducts = createAsyncThunk<ITopProduct[], number>(
  'dashboard/getTopProducts',
  async (limit, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockTopProducts: ITopProduct[] = [
        {
          productId: '1',
          productName: 'Klasik Burger',
          categoryName: 'Burgerler',
          totalQuantity: 145,
          totalRevenue: 13035.50,
          orderCount: 98
        },
        {
          productId: '2',
          productName: 'Margarita Pizza',
          categoryName: 'Pizzalar',
          totalQuantity: 112,
          totalRevenue: 13428.80,
          orderCount: 87
        },
        {
          productId: '3',
          productName: 'Kola',
          categoryName: 'İçecekler',
          totalQuantity: 234,
          totalRevenue: 3720.60,
          orderCount: 187
        }
      ];

      return mockTopProducts.slice(0, limit);
    } catch (error) {
      return thunkAPI.rejectWithValue('En çok satan ürünler yüklenirken hata oluştu');
    }
  }
);

export const getOrderStatusSummary = createAsyncThunk<IOrderStatusSummary[], void>(
  'dashboard/getOrderStatusSummary',
  async (_, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const statusCounts: Record<number, number> = {};
      let total = 0;

      mockOrders.forEach(order => {
        statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
        total++;
      });

      const summary: IOrderStatusSummary[] = Object.entries(statusCounts).map(([status, count]) => ({
        status: Number(status),
        statusName: OrderStatusLabels[Number(status) as OrderStatus],
        count,
        percentage: (count / total) * 100
      }));

      return summary;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sipariş durum özeti yüklenirken hata oluştu');
    }
  }
);

export const getRevenueByCategory = createAsyncThunk<IRevenueByCategory[], void>(
  'dashboard/getRevenueByCategory',
  async (_, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockRevenueByCategory: IRevenueByCategory[] = [
        { categoryId: '1', categoryName: 'Burgerler', revenue: 13035.50, percentage: 36.2 },
        { categoryId: '2', categoryName: 'Pizzalar', revenue: 13428.80, percentage: 37.3 },
        { categoryId: '3', categoryName: 'İçecekler', revenue: 3720.60, percentage: 10.3 },
        { categoryId: '4', categoryName: 'Tatlılar', revenue: 5815.20, percentage: 16.2 }
      ];

      return mockRevenueByCategory;
    } catch (error) {
      return thunkAPI.rejectWithValue('Kategoriye göre gelir yüklenirken hata oluştu');
    }
  }
);

export default getDashboardStats;
