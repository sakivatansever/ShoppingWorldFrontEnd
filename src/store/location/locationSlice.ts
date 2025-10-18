import { createSlice } from "@reduxjs/toolkit";
import { TLoading, isString } from "../../interface/index";
import { IDropDownList } from "../../interface/dropdownList";
import { authLogout } from "../auth/authSlice";
import { GroupResult } from "@progress/kendo-data-query";
import getLocationDropdownList from "../../services/location/getLocationDropdownList";

interface ILocationList {
  locationDropdownList: IDropDownList[] | GroupResult[];
  loading: TLoading;
  error: string | null;
  total: number;
}

const initialState: ILocationList = {
  locationDropdownList: [],
  error: null,
  loading: "idle",
  total: 0,
};

const locationSlice = createSlice({
  name: "locationList",
  initialState,
  reducers: {
    cleanLocationlistRecordsFullInfo: (state) => {
      state.locationDropdownList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLocationDropdownList.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (Array.isArray(action.payload.data)) {
        state.locationDropdownList = action.payload.data;
        state.total = action.payload.total;
      }
    });
    builder.addCase(getLocationDropdownList.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    builder.addCase(authLogout, (state) => {
      state.locationDropdownList = initialState.locationDropdownList;
      state.error = initialState.error;
      state.loading = initialState.loading;
    });
  },
});

export { locationSlice, getLocationDropdownList };
export const { cleanLocationlistRecordsFullInfo } = locationSlice.actions;
export default locationSlice.reducer;
