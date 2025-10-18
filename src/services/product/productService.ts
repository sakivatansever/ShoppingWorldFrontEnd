import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataListResult } from '../../interface/DataListResult';
import { IProduct } from '../../interface/product';
import { mockProducts } from '../mock/mockData';

interface IProductQueryParams {
  page?: number;
  pageSize?: number;
  categoryId?: string;
  searchTerm?: string;
  active?: boolean;
}

export const getProducts = createAsyncThunk<IDataListResult<IProduct>, IProductQueryParams>(
  'product/getProducts',
  async (params, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredProducts = [...mockProducts];

      if (params.categoryId) {
        filteredProducts = filteredProducts.filter(p => p.categoryId === params.categoryId);
      }

      if (params.active !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.active === params.active);
      }

      if (params.searchTerm) {
        const term = params.searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(
          p => p.name.toLowerCase().includes(term) ||
               p.description?.toLowerCase().includes(term)
        );
      }

      const page = params.page || 1;
      const pageSize = params.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      return {
        data: filteredProducts.slice(startIndex, endIndex),
        total: filteredProducts.length,
        page,
        pageSize
      };
    } catch (error) {
      return thunkAPI.rejectWithValue('Ürünler yüklenirken hata oluştu');
    }
  }
);

export const getProductById = createAsyncThunk<IProduct, string>(
  'product/getProductById',
  async (productId, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const product = mockProducts.find(p => p.id === productId);
      if (!product) {
        return thunkAPI.rejectWithValue('Ürün bulunamadı');
      }

      return product;
    } catch (error) {
      return thunkAPI.rejectWithValue('Ürün detayı yüklenirken hata oluştu');
    }
  }
);

export const saveProduct = createAsyncThunk<IProduct, Partial<IProduct>>(
  'product/saveProduct',
  async (productData, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      if (productData.id) {
        const index = mockProducts.findIndex(p => p.id === productData.id);
        if (index !== -1) {
          mockProducts[index] = { ...mockProducts[index], ...productData, updatedAt: new Date() };
          return mockProducts[index];
        }
      }

      const newProduct: IProduct = {
        id: Date.now().toString(),
        name: productData.name || '',
        description: productData.description,
        categoryId: productData.categoryId || '',
        price: productData.price || 0,
        stock: productData.stock || 0,
        images: productData.images || [],
        active: productData.active ?? true,
        featured: productData.featured ?? false,
        variants: productData.variants || [],
        optionGroups: productData.optionGroups || [],
        allergens: productData.allergens || [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockProducts.push(newProduct);
      return newProduct;
    } catch (error) {
      return thunkAPI.rejectWithValue('Ürün kaydedilirken hata oluştu');
    }
  }
);

export const deleteProduct = createAsyncThunk<string, string>(
  'product/deleteProduct',
  async (productId, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const index = mockProducts.findIndex(p => p.id === productId);
      if (index === -1) {
        return thunkAPI.rejectWithValue('Ürün bulunamadı');
      }

      mockProducts.splice(index, 1);
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue('Ürün silinirken hata oluştu');
    }
  }
);

export default getProducts;
