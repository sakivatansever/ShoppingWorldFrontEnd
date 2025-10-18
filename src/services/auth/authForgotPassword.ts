import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../utils/index";
import { IPostResponse } from "../../interface/postResponse";
import { IForgotPassword, IForgotPasswordResponse } from "../../interface/forgotPassword";

type TFormData = {
  email: string;
};

type TResponse = IPostResponse<IForgotPasswordResponse>;

const authForgotPassword = createAsyncThunk(
  "auth/authForgotPassword",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await axios.post<TResponse>("/api/Auth/forgot-password", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default authForgotPassword;
