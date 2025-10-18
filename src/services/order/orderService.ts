import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataListResult } from '../../interface/DataListResult';
import { IOrder, OrderStatus } from '../../interface/order';
import { mockOrders } from '../mock/mockData';

interface IOrderQueryParams {
  page?: number;
  pageSize?: number;
  status?: OrderStatus;
  searchTerm?: string;
  startDate?: Date;
  endDate?: Date;
}

export const getOrders = createAsyncThunk<IDataListResult<IOrder>, IOrderQueryParams>(
  'order/getOrders',
  async (params, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredOrders = [...mockOrders];

      if (params.status !== undefined) {
        filteredOrders = filteredOrders.filter(o => o.status === params.status);
      }

      if (params.searchTerm) {
        const term = params.searchTerm.toLowerCase();
        filteredOrders = filteredOrders.filter(
          o => o.code.toLowerCase().includes(term) ||
               o.customer.name.toLowerCase().includes(term) ||
               o.customer.phone.includes(term)
        );
      }

      if (params.startDate) {
        filteredOrders = filteredOrders.filter(o => new Date(o.createdAt) >= params.startDate!);
      }

      if (params.endDate) {
        filteredOrders = filteredOrders.filter(o => new Date(o.createdAt) <= params.endDate!);
      }

      const page = params.page || 1;
      const pageSize = params.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      return {
        data: filteredOrders.slice(startIndex, endIndex),
        total: filteredOrders.length,
        page,
        pageSize
      };
    } catch (error) {
      return thunkAPI.rejectWithValue('Siparişler yüklenirken hata oluştu');
    }
  }
);

export const getOrderById = createAsyncThunk<IOrder, string>(
  'order/getOrderById',
  async (orderId, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const order = mockOrders.find(o => o.id === orderId);
      if (!order) {
        return thunkAPI.rejectWithValue('Sipariş bulunamadı');
      }

      return order;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sipariş detayı yüklenirken hata oluştu');
    }
  }
);

interface IUpdateOrderStatusPayload {
  orderId: string;
  status: OrderStatus;
  note?: string;
}

export const updateOrderStatus = createAsyncThunk<IOrder, IUpdateOrderStatusPayload>(
  'order/updateOrderStatus',
  async (payload, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const order = mockOrders.find(o => o.id === payload.orderId);
      if (!order) {
        return thunkAPI.rejectWithValue('Sipariş bulunamadı');
      }

      order.status = payload.status;
      order.updatedAt = new Date();
      order.timeline.push({
        id: `tl${Date.now()}`,
        status: payload.status,
        note: payload.note || '',
        createdAt: new Date(),
        createdBy: 'Admin'
      });

      return { ...order };
    } catch (error) {
      return thunkAPI.rejectWithValue('Sipariş durumu güncellenirken hata oluştu');
    }
  }
);

interface IAssignCourierPayload {
  orderId: string;
  courierId: string;
  courierName: string;
  courierPhone: string;
}

export const assignCourier = createAsyncThunk<IOrder, IAssignCourierPayload>(
  'order/assignCourier',
  async (payload, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const order = mockOrders.find(o => o.id === payload.orderId);
      if (!order) {
        return thunkAPI.rejectWithValue('Sipariş bulunamadı');
      }

      order.delivery = {
        ...order.delivery,
        courierId: payload.courierId,
        courierName: payload.courierName,
        courierPhone: payload.courierPhone,
        estimatedDeliveryTime: new Date(Date.now() + 30 * 60000)
      };

      return { ...order };
    } catch (error) {
      return thunkAPI.rejectWithValue('Kurye ataması yapılırken hata oluştu');
    }
  }
);

export default getOrders;
