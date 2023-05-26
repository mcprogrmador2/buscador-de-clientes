import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../features/authSlice";

const store = configureStore({
  reducer: rootReducer,
});

export default store;