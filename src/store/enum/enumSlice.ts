import { createSlice } from "@reduxjs/toolkit";
import { TLoading, isString } from "../../interface/index";
import { IDropDownList } from "../../interface/dropdownList";
import { authLogout } from "../auth/authSlice";

interface IEnumList {
  loading: TLoading;
  error: string | null;
}

const initialState: IEnumList = {
  error: null,
  loading: "idle",
};

const enumSlice = createSlice({
  name: "enumList",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(authLogout, (state) => {
      state.error = initialState.error;
      state.loading = initialState.loading;
    });
  },
});

export { enumSlice };
export default enumSlice.reducer;
