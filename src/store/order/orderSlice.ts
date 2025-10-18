import { createSlice } from '@reduxjs/toolkit';
import { IOrder } from '../../interface/order';
import { TLoading } from '../../interface';
import {
  getOrders,
  getOrderById,
  updateOrderStatus,
  assignCourier
} from '../../services/order/orderService';

interface IOrderState {
  orders: IOrder[];
  selectedOrder: IOrder | null;
  total: number;
  page: number;
  pageSize: number;
  loading: TLoading;
  error: string | null;
}

const initialState: IOrderState = {
  orders: [],
  selectedOrder: null,
  total: 0,
  page: 1,
  pageSize: 10,
  loading: 'idle',
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderUI: (state) => {
      state.loading = 'idle';
      state.error = null;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.orders = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    builder.addCase(getOrderById.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.selectedOrder = action.payload;
    });
    builder.addCase(getOrderById.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    builder.addCase(updateOrderStatus.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.selectedOrder = action.payload;
      const index = state.orders.findIndex(o => o.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    builder.addCase(assignCourier.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(assignCourier.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.selectedOrder = action.payload;
      const index = state.orders.findIndex(o => o.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    });
    builder.addCase(assignCourier.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });
  }
});

export const { resetOrderUI, clearSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
