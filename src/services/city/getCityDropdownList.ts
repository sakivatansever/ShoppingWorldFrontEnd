import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../utils/index";
import { IDataListResult } from "../../interface/DataListResult";
import { RootState } from "../../store";
import { IDropDownList } from "../../interface/dropdownList";


type TResponse = IDataListResult<IDropDownList>;

const getCityDropdownList = createAsyncThunk(
  "enumList/getCityDropdownList",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;

    try {

      const token = (getState() as RootState).auth.accessToken;

      const response = await axios.get<TResponse>(
        "/api/city/GetAll",
        {
          // params: queryString,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default getCityDropdownList;
