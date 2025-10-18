import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../utils/index";
import { IDataListResult } from "../../interface/dataListResult";
import { RootState } from "../../store";
import {
  State,
  toDataSourceRequestString,
  translateDataSourceResultGroups,
} from "@progress/kendo-data-query";
import { IUser } from "../../interface/user";

type TResponse = IDataListResult<IUser>;

const getUserList = createAsyncThunk(
  "userList/getUserList",
  async (state: State, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;

    try {
      const token = (getState() as RootState).auth.accessToken;
      const queryStr = `${toDataSourceRequestString(state)}`;
      const hasGroups = state.group && state.group.length;
      const response = await axios.get<TResponse>(
        `/api/user/GetUsers?${queryStr}`,
        {
          // params: queryString,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        ...response.data,
        data: hasGroups
          ? translateDataSourceResultGroups(response.data.data)
          : response.data.data,
      };
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default getUserList;
