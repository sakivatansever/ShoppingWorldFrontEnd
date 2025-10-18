import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../utils/index";
import { RootState } from "../../store"; // Redux store'u tipi
import { IValidationErrorResponse } from "../../interface/validationError"; // Hata tipini ekleyin
type TResponse = {
  statusCode: string;
  message: string;
};
type TFormData = {
  currentPassword: string;
  newPassword: string;
};

const changePassword = createAsyncThunk<
  TResponse, 
  TFormData, 
  {
    state: RootState; 
    rejectValue: IValidationErrorResponse; 
  }
>(
  "auth/actAuthChangePassword", 
  async (formData: TFormData, { rejectWithValue, getState }) => {
    try {

      const token = getState().auth.accessToken;

      const res = await axios.post(
        "/api/Auth/change-password",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default changePassword;
