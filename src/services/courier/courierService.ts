import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataListResult } from '../../interface/DataListResult';
import { ICourier, CourierStatus } from '../../interface/courier';
import { mockCouriers } from '../mock/mockData';

interface ICourierQueryParams {
  page?: number;
  pageSize?: number;
  status?: CourierStatus;
  active?: boolean;
}

export const getCouriers = createAsyncThunk<IDataListResult<ICourier>, ICourierQueryParams>(
  'courier/getCouriers',
  async (params, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredCouriers = [...mockCouriers];

      if (params.status) {
        filteredCouriers = filteredCouriers.filter(c => c.status === params.status);
      }

      if (params.active !== undefined) {
        filteredCouriers = filteredCouriers.filter(c => c.active === params.active);
      }

      const page = params.page || 1;
      const pageSize = params.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      return {
        data: filteredCouriers.slice(startIndex, endIndex),
        total: filteredCouriers.length,
        page,
        pageSize
      };
    } catch (error) {
      return thunkAPI.rejectWithValue('Kuryeler yüklenirken hata oluştu');
    }
  }
);

export const saveCourier = createAsyncThunk<ICourier, Partial<ICourier>>(
  'courier/saveCourier',
  async (courierData, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      if (courierData.id) {
        const index = mockCouriers.findIndex(c => c.id === courierData.id);
        if (index !== -1) {
          mockCouriers[index] = { ...mockCouriers[index], ...courierData, updatedAt: new Date() };
          return mockCouriers[index];
        }
      }

      const newCourier: ICourier = {
        id: Date.now().toString(),
        name: courierData.name || '',
        phone: courierData.phone || '',
        email: courierData.email,
        vehicleType: courierData.vehicleType!,
        vehiclePlate: courierData.vehiclePlate,
        status: CourierStatus.Idle,
        assignedOrdersCount: 0,
        totalDeliveries: 0,
        active: courierData.active ?? true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockCouriers.push(newCourier);
      return newCourier;
    } catch (error) {
      return thunkAPI.rejectWithValue('Kurye kaydedilirken hata oluştu');
    }
  }
);

export default getCouriers;
