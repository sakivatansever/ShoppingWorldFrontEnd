import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import actAuthLogin, { IPermission } from "../../services/auth/authLogin";
import { TLoading, isString } from "../../interface";
import { IUser } from "../../interface/user";
import { jwtDecode } from "jwt-decode";
import createUser from "../../services/auth/authRegister"; // Kullanıcı oluşturma servisi
import changePassword from "../../services/auth/authChangePassword";
import authForgotPassword from "../../services/auth/authForgotPassword";
import authResetPassword from "../../services/auth/authResetPassword";

interface IAuthState {
  refreshToken: string | null;
  accessToken: string | null;
  permissions: IPermission[] | [];
  user: IUser | null;
  loading: TLoading;
  error: string | null;
}

const initialState: IAuthState = {
  refreshToken: null,
  accessToken: null,
  permissions: [],
  user: null,
  loading: "idle", // Başlangıçta "idle"
  error: null, // Başlangıçta hata mesajı yok
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.loading = "idle"; // UI sıfırlanıyor
      state.error = null;
    },
    authLogout: (state) => {
      state.refreshToken = null;
      state.accessToken = null;
      state.user = null;
      state.permissions = [];
    },
    setAuthData: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.loading = "succeeded"; // Veri başarıyla geldi
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload; // Hata mesajını set et
    },
  },
  extraReducers: (builder) => {
    // Login işlemi
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending"; // Login beklemede
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded"; // Login başarılı
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.permissions = action.payload.permissions;

      try {
        const decodedToken: IUser = jwtDecode(action.payload.accessToken);
        state.user = decodedToken;
      } catch (error) {
        console.error("JWT Decode Hatası:", error);
        state.user = null;
      }
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed"; // Login başarısız
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // Kullanıcı oluşturma işlemi
    builder.addCase(createUser.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = "failed";
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        state.error =
          action.payload[0]?.description || "Bilinmeyen bir hata oluştu.";
      } else if (isString(action.payload)) {
        state.error = action.payload;
      } else {
        state.error = "Bilinmeyen bir hata oluştu.";
      }
    });


     // Şifre Değiştirme işlemi
    builder.addCase(changePassword.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(changePassword.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.loading = "failed";
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        state.error =
          action.payload.title || "Bilinmeyen bir hata oluştu.";
      } else if (isString(action.payload)) {
        state.error = action.payload.title;
      } else {
        state.error = "Bilinmeyen bir hata oluştu.";
      }
    });

    // Şifre Unuttum işlemi
    builder.addCase(authForgotPassword.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(authForgotPassword.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(authForgotPassword.rejected, (state, action) => {
      state.loading = "failed";
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        state.error =
          action.payload[0]?.description || "Bilinmeyen bir hata oluştu.";
      } else if (isString(action.payload)) {
        state.error = action.payload;
      } else {
        state.error = "Bilinmeyen bir hata oluştu.";
      }
    });

    // Şifre Sıfırlama işlemi
    builder.addCase(authResetPassword.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(authResetPassword.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      
      try {
        const decodedToken: IUser = jwtDecode(action.payload.accessToken);
        state.user = decodedToken;
      } catch (error) {
        console.error("JWT Decode Hatası:", error);
        state.user = null;
      }
    });
    builder.addCase(authResetPassword.rejected, (state, action) => {
      state.loading = "failed";
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        state.error =
          action.payload[0]?.description || "Bilinmeyen bir hata oluştu.";
      } else if (isString(action.payload)) {
        state.error = action.payload;
      } else {
        state.error = "Bilinmeyen bir hata oluştu.";
      }
    });

  },
});

export { actAuthLogin };
export const { resetUI, authLogout, setAuthData, setError } = authSlice.actions;
export default authSlice.reducer;
