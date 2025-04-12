// redux/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setAuthFromStorage: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setAuthFromStorage
} = authSlice.actions;

export default authSlice.reducer;
