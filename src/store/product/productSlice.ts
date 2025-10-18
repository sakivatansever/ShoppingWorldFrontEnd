import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../interface/product';
import { TLoading } from '../../interface';
import {
  getProducts,
  getProductById,
  saveProduct,
  deleteProduct
} from '../../services/product/productService';

interface IProductState {
  products: IProduct[];
  selectedProduct: IProduct | null;
  total: number;
  page: number;
  pageSize: number;
  loading: TLoading;
  error: string | null;
}

const initialState: IProductState = {
  products: [],
  selectedProduct: null,
  total: 0,
  page: 1,
  pageSize: 10,
  loading: 'idle',
  error: null
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProductUI: (state) => {
      state.loading = 'idle';
      state.error = null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.products = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    builder.addCase(getProductById.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.selectedProduct = action.payload;
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    builder.addCase(saveProduct.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(saveProduct.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      } else {
        state.products.push(action.payload);
      }
    });
    builder.addCase(saveProduct.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.products = state.products.filter(p => p.id !== action.payload);
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });
  }
});

export const { resetProductUI, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
