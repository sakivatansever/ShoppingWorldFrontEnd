import { createSlice } from '@reduxjs/toolkit';
import { ICustomer } from '../../interface/customer';
import { TLoading } from '../../interface';
import {
  getCustomers,
  getCustomerById
} from '../../services/customer/customerService';

interface ICustomerState {
  customers: ICustomer[];
  selectedCustomer: ICustomer | null;
  total: number;
  page: number;
  pageSize: number;
  loading: TLoading;
  error: string | null;
}

const initialState: ICustomerState = {
  customers: [],
  selectedCustomer: null,
  total: 0,
  page: 1,
  pageSize: 10,
  loading: 'idle',
  error: null
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    resetCustomerUI: (state) => {
      state.loading = 'idle';
      state.error = null;
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomers.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.customers = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    });
    builder.addCase(getCustomers.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    builder.addCase(getCustomerById.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(getCustomerById.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.selectedCustomer = action.payload;
    });
    builder.addCase(getCustomerById.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });
  }
});

export const { resetCustomerUI, clearSelectedCustomer } = customerSlice.actions;
export default customerSlice.reducer;
