import { createSlice } from '@reduxjs/toolkit';
import { ICourier } from '../../interface/courier';
import { TLoading } from '../../interface';
import {
  getCouriers,
  saveCourier
} from '../../services/courier/courierService';

interface ICourierState {
  couriers: ICourier[];
  total: number;
  page: number;
  pageSize: number;
  loading: TLoading;
  error: string | null;
}

const initialState: ICourierState = {
  couriers: [],
  total: 0,
  page: 1,
  pageSize: 10,
  loading: 'idle',
  error: null
};

const courierSlice = createSlice({
  name: 'courier',
  initialState,
  reducers: {
    resetCourierUI: (state) => {
      state.loading = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCouriers.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(getCouriers.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.couriers = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    });
    builder.addCase(getCouriers.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    builder.addCase(saveCourier.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(saveCourier.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      const index = state.couriers.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.couriers[index] = action.payload;
      } else {
        state.couriers.push(action.payload);
      }
    });
    builder.addCase(saveCourier.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });
  }
});

export const { resetCourierUI } = courierSlice.actions;
export default courierSlice.reducer;
