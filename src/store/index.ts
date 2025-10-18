import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import sidebarSlice from "./sidebar/sidebarSlice";
import auth from "./auth/authSlice";
import enumSlice from "./enum/enumSlice";
import userListSlice from "./user/userSlice";
import userDropDownListSlice from "./user/userDropDownList";
import notificationSlice from "./notification/notificationSlice";
import districtSlice from "./district/districtSlice";
import locationSlice from "./location/locationSlice";

// const rootPersistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["cart", "auth"],
// };

const authPersistConfig = {
  key: "auth",
  storage,
  whiteList: ["user", "accessToken", "profile"],
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["enumList"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  enumList: enumSlice,
  notification: notificationSlice,
  sidebar: sidebarSlice,
  userList: userListSlice,
  userDropdownList: userDropDownListSlice,
  districtList: districtSlice,
  locationList: locationSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
