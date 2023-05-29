import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../features/authSlice";
import persistConfig from "./persistConfigUser";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const storePersistor = persistStore(store);