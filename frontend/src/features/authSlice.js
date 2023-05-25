import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    loading: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart());
    // Aquí puedes realizar la petición a tu backend
    const response = await api.post("/login", { email, password });
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export default authSlice;
