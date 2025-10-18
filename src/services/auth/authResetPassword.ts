import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../utils/index";
import { IPostResponse } from "../../interface/postResponse";
import { IResetPassword, IResetPasswordResponse } from "../../interface/resetPassword";

interface IResetPasswordResponseData {
  message: string;
  accessToken: string;
  refreshToken: string;
}

type TFormData = {
  email: string;
  token: string;
  newPassword: string;
};

type TResponse = IPostResponse<IResetPasswordResponseData>;

const authResetPassword = createAsyncThunk(
  "auth/authResetPassword",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await axios.post<TResponse>("/api/Auth/reset-password", formData);
      return {
        message: res.data.message,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken
      };
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default authResetPassword;
