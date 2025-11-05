import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./loaderSlice";
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    mainLoader: loaderSlice,
    profile: profileReducer,
  },
});
