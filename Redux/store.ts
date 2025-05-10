import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "./Storage";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import languageReducer from "./languageSlice";
import productSlice from "./product";
import userSlice from "./auth";
import cartSlice from "./cart";
import navReducer from "./nav";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["user", "product"],
};
export const rootReducer = combineReducers({
  product: productSlice,
  user: userSlice,
  cart: cartSlice,
  language: languageReducer,
  nav: navReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the type of makeStore
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
