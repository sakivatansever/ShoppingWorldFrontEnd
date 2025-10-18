import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataListResult } from '../../interface/DataListResult';
import { ICustomer } from '../../interface/customer';
import { mockCustomers } from '../mock/mockData';

interface ICustomerQueryParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  segment?: string;
}

export const getCustomers = createAsyncThunk<IDataListResult<ICustomer>, ICustomerQueryParams>(
  'customer/getCustomers',
  async (params, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredCustomers = [...mockCustomers];

      if (params.segment) {
        filteredCustomers = filteredCustomers.filter(c => c.segment === params.segment);
      }

      if (params.searchTerm) {
        const term = params.searchTerm.toLowerCase();
        filteredCustomers = filteredCustomers.filter(
          c => c.name.toLowerCase().includes(term) ||
               c.phone.includes(term) ||
               c.email?.toLowerCase().includes(term)
        );
      }

      const page = params.page || 1;
      const pageSize = params.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      return {
        data: filteredCustomers.slice(startIndex, endIndex),
        total: filteredCustomers.length,
        page,
        pageSize
      };
    } catch (error) {
      return thunkAPI.rejectWithValue('Müşteriler yüklenirken hata oluştu');
    }
  }
);

export const getCustomerById = createAsyncThunk<ICustomer, string>(
  'customer/getCustomerById',
  async (customerId, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const customer = mockCustomers.find(c => c.id === customerId);
      if (!customer) {
        return thunkAPI.rejectWithValue('Müşteri bulunamadı');
      }

      return customer;
    } catch (error) {
      return thunkAPI.rejectWithValue('Müşteri detayı yüklenirken hata oluştu');
    }
  }
);

export default getCustomers;
