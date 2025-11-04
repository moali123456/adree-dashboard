import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfileData: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserProfileData: (state, action) => {
      state.userProfileData = action.payload;
    },
  },
});

export const { setUserProfileData } = profileSlice.actions;

export default profileSlice.reducer;
