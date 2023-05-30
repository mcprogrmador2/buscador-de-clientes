import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../features/rootReducer";
import authReducer from "../features/authSlice";
import registerReducer from "../features/registerSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});