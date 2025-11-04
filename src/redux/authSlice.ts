import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for refreshing token
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { userData } = state.auth;
      
      if (!userData?.token || !userData?.refreshToken) {
        throw new Error('No tokens available');
      }

      const response = await fetch('https://kerolesmas-001-site7.atempurl.com/api/Account/refreshToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`,
          'accept': '*/*'
        },
        body: JSON.stringify({
          accessToken: userData.token,
          refreshToken: userData.refreshToken
        })
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userData: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData")).result
    : null,
  isLogged: localStorage.getItem("userData") ? true : false,
  isRefreshing: false,
  refreshError: null,
  tokenExpirationTime: localStorage.getItem("userData")
    ? new Date(JSON.parse(localStorage.getItem("userData")).result?.expiresOn).getTime()
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload.result;
      state.isLogged = true;
      state.refreshError = null;
      state.tokenExpirationTime = new Date(action.payload.result.expiresOn).getTime();
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLogged = false;
      state.userData = null;
      state.refreshError = null;
      state.tokenExpirationTime = null;
      state.isRefreshing = false;
      localStorage.removeItem("userData");
      window.location.href = "/login";
    },
    clearRefreshError: (state) => {
      state.refreshError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.pending, (state) => {
        state.isRefreshing = true;
        state.refreshError = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.userData = action.payload.result;
        state.isLogged = true;
        state.isRefreshing = false;
        state.refreshError = null;
        state.tokenExpirationTime = new Date(action.payload.result.expiresOn).getTime();
        localStorage.setItem("userData", JSON.stringify(action.payload));
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isRefreshing = false;
        state.refreshError = action.payload;
        // Don't logout immediately, let the TokenManager handle it
      });
  },
});

export const { login, logout, clearRefreshError } = authSlice.actions;

export default authSlice.reducer;
