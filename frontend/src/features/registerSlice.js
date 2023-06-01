import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    register: localStorage.getItem("registerStatus") ? localStorage.getItem("registerStatus") : [],
    error: null,
    loading: false,
  },
  reducers: {
    addRegisterStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addRegisterSuccess: (state, action) => {
      state.loading = false;
      state.register = action.payload;
      localStorage.setItem("registerStatus", action.payload);
    },
    addRegisterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addRegisterStart,
  addRegisterSuccess,
  addRegisterFailure,
} = registerSlice.actions;

export default registerSlice.reducer;