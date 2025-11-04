import { createSlice } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
    name: 'mainLoader',
    initialState: {
        isLoading: false,
    },
    reducers: {
        showLoader: (state) => {
            state.isLoading = true;
        },
        hideLoader: (state) => {
            state.isLoading = false;
        },
    },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
