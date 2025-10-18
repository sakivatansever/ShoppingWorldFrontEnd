import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../utils/index";
type TFormData = { userNameOrEmail: string; password: string };


export interface IPermission {
  controller: string;           
  operation: string; 
}

interface IAuthResponseData {
  refreshToken: string;
  accessToken: string;
  permissions: IPermission[];
  message?: string;
}

export const authLogin = createAsyncThunk(
  "auth/authLogin",
  async (formData: TFormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<IAuthResponseData>("/api/Auth/login", formData);
      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        permissions: data.permissions ?? [],
      };
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
export default authLogin;
