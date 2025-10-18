import { createSlice } from "@reduxjs/toolkit";
import { TLoading, isString } from "../../interface/index";
import { IDropDownList } from "../../interface/dropdownList";
import { authLogout } from "../auth/authSlice";
import getDistrictDropdownList from "../../services/district/getDistrictDropdownList";
import { GroupResult } from "@progress/kendo-data-query";

interface IDistrictList {
  districDropdownList: IDropDownList[] | GroupResult[];
  loading: TLoading;
  error: string | null;
  total: number;
}

const initialState: IDistrictList = {
  districDropdownList: [],
  error: null,
  loading: "idle",
  total: 0,
};

const districtSlice = createSlice({
  name: "cityList",
  initialState,
  reducers: {
    cleanDistrictlistRecordsFullInfo: (state) => {
      state.districDropdownList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDistrictDropdownList.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (Array.isArray(action.payload.data)) {
        state.districDropdownList = action.payload.data;
        state.total=action.payload.total;
      }
    });
    builder.addCase(getDistrictDropdownList.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    builder.addCase(authLogout, (state) => {
      state.districDropdownList = initialState.districDropdownList;
      state.error = initialState.error;
      state.loading = initialState.loading;
    });
  },
});

export { districtSlice, getDistrictDropdownList };
export const { cleanDistrictlistRecordsFullInfo } = districtSlice.actions;
export default districtSlice.reducer;
