import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TLoading, isString } from "../../interface/index";
import { authLogout } from "../auth/authSlice";
import { GroupResult, State } from "@progress/kendo-data-query";
import { IUser } from "../../interface/user";
import getUserList from "../../services/user/getUserList";
import deleteUser from "../../services/user/deleteUser";
import { IDropDownList } from "../../interface/dropdownList";
import createUserWithLdap from "../../services/user/createUserWithLdap";

const initGridState: State = {
  sort: [],
  take: 25,
  skip: 0,
  filter: undefined,
};

interface IUserList {
  records: IUser[] | GroupResult[];
  isPopupOpen: boolean;
  userListGridState: State;
  total: number;
  loading: TLoading;
  error: string | null;
}

const initialState: IUserList = {
  records: [],
  isPopupOpen: false,
  userListGridState: initGridState,
  total: 0,
  error: null,
  loading: "idle",
};

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    cleanEventlistRecordsFullInfo: (state) => {
      state.records = [];
    },
    setIsPopupState: (state, action: { payload: boolean }) => {
      state.isPopupOpen = action.payload;
    },
    setUserListGridState: (state, action: PayloadAction<Partial<State>>) => {
      state.userListGridState = {
        ...state.userListGridState,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserList.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (Array.isArray(action.payload.data)) {
        state.records = action.payload.data;
        state.total = action.payload.total;
      }
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    //ldap için olan ıslemler bıtıs

    // builder.addCase(createEvent.pending, (state) => {
    //   state.loading = "pending";
    //   state.error = null;
    // });
    // builder.addCase(createEvent.fulfilled, (state) => {
    //   state.loading = "succeeded";
    // });
    // builder.addCase(createEvent.rejected, (state, action) => {
    //   state.loading = "failed";
    //   if (isString(action.payload)) {
    //     state.error = action.payload;
    //   }
    // });

    builder.addCase(deleteUser.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    builder.addCase(authLogout, (state) => {
      state.isPopupOpen = initialState.isPopupOpen;
      state.records = initialState.records;
      state.total = initialState.total;
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.userListGridState = initialState.userListGridState;
    });
  },
});

export {
  getUserList,
  deleteUser,
  createUserWithLdap,
};
export const {
  cleanEventlistRecordsFullInfo,
  setIsPopupState,
  setUserListGridState,
} = userListSlice.actions;
export default userListSlice.reducer;
