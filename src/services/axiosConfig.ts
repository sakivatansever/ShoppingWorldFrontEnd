// services/axios.ts
import axios from "axios";
import { authLogout } from "../store/auth/authSlice";
import { store } from "../store";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const user = state.auth.user;

    if (user && user.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (user.exp < currentTime) {
        store.dispatch(authLogout());
        return Promise.reject(new axios.Cancel("Oturum süresi doldu."));
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

