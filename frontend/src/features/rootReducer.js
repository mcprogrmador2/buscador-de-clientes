import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import registerReducer from "./registerSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
});

export default rootReducer;