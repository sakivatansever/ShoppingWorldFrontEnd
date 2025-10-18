import { createSlice } from '@reduxjs/toolkit';
import { ICoupon } from '../../interface/coupon';
import { TLoading } from '../../interface';
import {
  getCoupons,
  saveCoupon,
  deleteCoupon
} from '../../services/coupon/couponService';

interface ICouponState {
  coupons: ICoupon[];
  total: number;
  page: number;
  pageSize: number;
  loading: TLoading;
  error: string | null;
}

const initialState: ICouponState = {
  coupons: [],
  total: 0,
  page: 1,
  pageSize: 10,
  loading: 'idle',
  error: null
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    resetCouponUI: (state) => {
      state.loading = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCoupons.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(getCoupons.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.coupons = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    });
    builder.addCase(getCoupons.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    builder.addCase(saveCoupon.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(saveCoupon.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      const index = state.coupons.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.coupons[index] = action.payload;
      } else {
        state.coupons.push(action.payload);
      }
    });
    builder.addCase(saveCoupon.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    builder.addCase(deleteCoupon.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(deleteCoupon.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.coupons = state.coupons.filter(c => c.id !== action.payload);
    });
    builder.addCase(deleteCoupon.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });
  }
});

export const { resetCouponUI } = couponSlice.actions;
export default couponSlice.reducer;
