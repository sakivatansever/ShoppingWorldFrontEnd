import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataListResult } from '../../interface/DataListResult';
import { ICoupon } from '../../interface/coupon';
import { mockCoupons } from '../mock/mockData';

interface ICouponQueryParams {
  page?: number;
  pageSize?: number;
  active?: boolean;
  searchTerm?: string;
}

export const getCoupons = createAsyncThunk<IDataListResult<ICoupon>, ICouponQueryParams>(
  'coupon/getCoupons',
  async (params, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredCoupons = [...mockCoupons];

      if (params.active !== undefined) {
        filteredCoupons = filteredCoupons.filter(c => c.active === params.active);
      }

      if (params.searchTerm) {
        const term = params.searchTerm.toLowerCase();
        filteredCoupons = filteredCoupons.filter(
          c => c.code.toLowerCase().includes(term) ||
               c.name.toLowerCase().includes(term)
        );
      }

      const page = params.page || 1;
      const pageSize = params.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      return {
        data: filteredCoupons.slice(startIndex, endIndex),
        total: filteredCoupons.length,
        page,
        pageSize
      };
    } catch (error) {
      return thunkAPI.rejectWithValue('Kuponlar yüklenirken hata oluştu');
    }
  }
);

export const saveCoupon = createAsyncThunk<ICoupon, Partial<ICoupon>>(
  'coupon/saveCoupon',
  async (couponData, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      if (couponData.id) {
        const index = mockCoupons.findIndex(c => c.id === couponData.id);
        if (index !== -1) {
          mockCoupons[index] = { ...mockCoupons[index], ...couponData, updatedAt: new Date() };
          return mockCoupons[index];
        }
      }

      const newCoupon: ICoupon = {
        id: Date.now().toString(),
        code: couponData.code || '',
        name: couponData.name || '',
        description: couponData.description,
        type: couponData.type!,
        value: couponData.value || 0,
        minBasketAmount: couponData.minBasketAmount,
        maxDiscountAmount: couponData.maxDiscountAmount,
        usageLimit: couponData.usageLimit,
        usageCount: 0,
        usagePerCustomer: couponData.usagePerCustomer,
        startDate: couponData.startDate || new Date(),
        endDate: couponData.endDate || new Date(),
        active: couponData.active ?? true,
        target: couponData.target || { applyToAll: true },
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockCoupons.push(newCoupon);
      return newCoupon;
    } catch (error) {
      return thunkAPI.rejectWithValue('Kupon kaydedilirken hata oluştu');
    }
  }
);

export const deleteCoupon = createAsyncThunk<string, string>(
  'coupon/deleteCoupon',
  async (couponId, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const index = mockCoupons.findIndex(c => c.id === couponId);
      if (index === -1) {
        return thunkAPI.rejectWithValue('Kupon bulunamadı');
      }

      mockCoupons.splice(index, 1);
      return couponId;
    } catch (error) {
      return thunkAPI.rejectWithValue('Kupon silinirken hata oluştu');
    }
  }
);

export default getCoupons;
