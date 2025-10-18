import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../utils/index";
import { RootState } from "../../store";
import { IValidationErrorResponse } from "../../interface/validationError";
type TResponse = {
  statusCode: string;
  message: string;
};
type TFormData = {
  email: string
  userName: string
  password: string
  firstName: string
  lastName: string
  company: string
  phoneNumber: string
};

const actCreateUser = createAsyncThunk<
  TResponse, 
  TFormData, 
  {
    state: RootState; 
    rejectValue: IValidationErrorResponse; 
  }
>(
  "auth/actCreateUser", 
  async (formData: TFormData, { rejectWithValue, getState }) => {
    try {

      const token = getState().auth.accessToken;

      const res = await axios.post(
        "/api/Auth/register",
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

export default actCreateUser;
