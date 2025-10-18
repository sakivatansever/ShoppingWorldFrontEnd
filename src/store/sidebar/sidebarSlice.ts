import { createSlice } from "@reduxjs/toolkit";
import { authLogout } from "../auth/authSlice";

interface ISidebarSlice {
  expanded: boolean;
  selectedIndex: number | null;
}

const initialState: ISidebarSlice = {
  expanded: true,
  selectedIndex: null,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.expanded = !state.expanded;
    },
    openSidebar: (state) => {
      state.expanded = true; // Sidebar'ı aç
    },
    closeSidebar: (state) => {
      state.expanded = false; // Sidebar'ı kapat
    },
    changeSelectedValue: (state, action) => {
      state.selectedIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authLogout, (state) => {
      state.selectedIndex = 0;
    });
  },
});

export const { toggleSidebar, openSidebar, closeSidebar, changeSelectedValue } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
