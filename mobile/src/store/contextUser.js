import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@features/user/userSlice";
import persistConfig from "./persistConfigUser";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import tokenExpirationMiddlewareUser from "@features/user/tokenExpirationMiddlewareUser";

const persistedReducer = persistReducer(persistConfig, userReducer);

export const userStore = configureStore({
  reducer:persistedReducer,
  devTools: true,
  middleware: [thunk],
});
export const userPersistor = persistStore(userStore);
