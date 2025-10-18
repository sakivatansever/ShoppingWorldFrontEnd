import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICategory } from '../../interface/product';
import { mockCategories } from '../mock/mockData';

export const getCategories = createAsyncThunk<ICategory[], void>(
  'category/getCategories',
  async (_, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...mockCategories].sort((a, b) => a.displayOrder - b.displayOrder);
    } catch (error) {
      return thunkAPI.rejectWithValue('Kategoriler yüklenirken hata oluştu');
    }
  }
);

export const saveCategory = createAsyncThunk<ICategory, Partial<ICategory>>(
  'category/saveCategory',
  async (categoryData, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      if (categoryData.id) {
        const index = mockCategories.findIndex(c => c.id === categoryData.id);
        if (index !== -1) {
          mockCategories[index] = { ...mockCategories[index], ...categoryData, updatedAt: new Date() };
          return mockCategories[index];
        }
      }

      const newCategory: ICategory = {
        id: Date.now().toString(),
        name: categoryData.name || '',
        description: categoryData.description,
        displayOrder: categoryData.displayOrder || mockCategories.length + 1,
        active: categoryData.active ?? true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockCategories.push(newCategory);
      return newCategory;
    } catch (error) {
      return thunkAPI.rejectWithValue('Kategori kaydedilirken hata oluştu');
    }
  }
);

export const deleteCategory = createAsyncThunk<string, string>(
  'category/deleteCategory',
  async (categoryId, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const index = mockCategories.findIndex(c => c.id === categoryId);
      if (index === -1) {
        return thunkAPI.rejectWithValue('Kategori bulunamadı');
      }

      mockCategories.splice(index, 1);
      return categoryId;
    } catch (error) {
      return thunkAPI.rejectWithValue('Kategori silinirken hata oluştu');
    }
  }
);

export default getCategories;
