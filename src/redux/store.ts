import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import loaderSlice from "./loaderSlice";
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mainLoader: loaderSlice,
    profile: profileReducer,
  },
});
