import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../utils/index";
import { RootState } from "../../store";

type TResponse = {
  statusCode: string;
  message: string;
};

const changeUser = createAsyncThunk(
  "userList/changeUser",
  async (id: string, thunk) => {
    const { rejectWithValue, getState } = thunk;
    try {
      const token = (getState() as RootState).auth.accessToken;
      const res = await axios.post<TResponse>("/api/user/UserChange", null, {
        params: { id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default changeUser;