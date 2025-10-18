import { createSlice } from "@reduxjs/toolkit";
import { TLoading, isString } from "../../interface/index";
import { IDropDownListForIdString } from "../../interface/dropdownList";
import { GroupResult } from "@progress/kendo-data-query";
import getUserDropdownList from "../../services/user/getUserDropDownList";
import { authLogout } from "../auth/authSlice";

interface IUserDropdownList {
  records: IDropDownListForIdString[] | GroupResult[];
  total: number;
  loading: TLoading;
  error: string | null;
}

const initialState: IUserDropdownList = {
  records: [],
  total: 0,
  error: null,
  loading: "idle",
};

const userDropdownListSlice = createSlice({
  name: "userDropdownList",
  initialState,
  reducers: {
    cleanEventlistRecordsFullInfo: (state) => {
      state.records = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDropdownList.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getUserDropdownList.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (Array.isArray(action.payload.data)) {
        state.records = action.payload.data;
        state.total = action.payload.total;
      }
    });
    builder.addCase(getUserDropdownList.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    builder.addCase(authLogout, (state) => {
      state.records = initialState.records;
      state.total = initialState.total;
      state.loading = initialState.loading;
      state.error = initialState.error;
    });
  },
});

export { getUserDropdownList };
export const { cleanEventlistRecordsFullInfo } = userDropdownListSlice.actions;
export default userDropdownListSlice.reducer;
