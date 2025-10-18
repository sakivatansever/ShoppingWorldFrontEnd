import { createSlice } from '@reduxjs/toolkit';
import { ICategory } from '../../interface/product';
import { TLoading } from '../../interface';
import {
  getCategories,
  saveCategory,
  deleteCategory
} from '../../services/category/categoryService';

interface ICategoryState {
  categories: ICategory[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoryState = {
  categories: [],
  loading: 'idle',
  error: null
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    resetCategoryUI: (state) => {
      state.loading = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    builder.addCase(saveCategory.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(saveCategory.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      const index = state.categories.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      } else {
        state.categories.push(action.payload);
      }
    });
    builder.addCase(saveCategory.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.categories = state.categories.filter(c => c.id !== action.payload);
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });
  }
});

export const { resetCategoryUI } = categorySlice.actions;
export default categorySlice.reducer;
