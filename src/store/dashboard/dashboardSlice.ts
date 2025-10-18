import { createSlice } from '@reduxjs/toolkit';
import {
  IDashboardStats,
  ISalesData,
  ITopProduct,
  IOrderStatusSummary,
  IRevenueByCategory
} from '../../interface/dashboard';
import { TLoading } from '../../interface';
import {
  getDashboardStats,
  getSalesData,
  getTopProducts,
  getOrderStatusSummary,
  getRevenueByCategory
} from '../../services/dashboard/dashboardService';

interface IDashboardState {
  stats: IDashboardStats | null;
  salesData: ISalesData[];
  topProducts: ITopProduct[];
  orderStatusSummary: IOrderStatusSummary[];
  revenueByCategory: IRevenueByCategory[];
  loading: TLoading;
  error: string | null;
}

const initialState: IDashboardState = {
  stats: null,
  salesData: [],
  topProducts: [],
  orderStatusSummary: [],
  revenueByCategory: [],
  loading: 'idle',
  error: null
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetDashboardUI: (state) => {
      state.loading = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getDashboardStats.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(getDashboardStats.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.stats = action.payload;
    });
    builder.addCase(getDashboardStats.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    builder.addCase(getSalesData.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(getSalesData.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.salesData = action.payload;
    });
    builder.addCase(getSalesData.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    builder.addCase(getTopProducts.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(getTopProducts.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.topProducts = action.payload;
    });
    builder.addCase(getTopProducts.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    builder.addCase(getOrderStatusSummary.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(getOrderStatusSummary.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.orderStatusSummary = action.payload;
    });
    builder.addCase(getOrderStatusSummary.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    builder.addCase(getRevenueByCategory.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(getRevenueByCategory.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.revenueByCategory = action.payload;
    });
    builder.addCase(getRevenueByCategory.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });
  }
});

export const { resetDashboardUI } = dashboardSlice.actions;
export default dashboardSlice.reducer;
