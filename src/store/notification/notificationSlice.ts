import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authLogout } from "../auth/authSlice";

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationState {
  show: boolean;
  type: NotificationType;
  message: string;
  autoHideAfter: number;
  closable: boolean;
  showIcon: boolean;
  animation: "fade" | "slide" | "none";
  position: {
    horizontal: "left" | "right" | "center";
    vertical: "top" | "bottom";
  };
}

const initialState: NotificationState = {
  show: false,
  type: "info",
  message: "",
  autoHideAfter: 5000,
  closable: true,
  showIcon: true,
  animation: "fade",
  position: {
    horizontal: "right",
    vertical: "top",
  },
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<Partial<NotificationState>>
    ) => {
      Object.assign(state, action.payload);
      state.show = true;
    },
    hideNotification: (state) => {
      state.show = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(authLogout, (state) => {
      state.show = initialState.show;
      state.type = initialState.type;
      state.message = initialState.message;
      state.autoHideAfter = initialState.autoHideAfter;
      state.closable = initialState.closable;
      state.showIcon = initialState.showIcon;
      state.animation = initialState.animation;
      state.position = initialState.position;
    });
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
