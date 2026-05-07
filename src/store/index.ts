import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "@/lib/redux-storage";
import authSlice from "./slices/auth-slice";
import contentSlice from "./slices/content-slice";
import blogSlice from "./slices/blog-slice";

// Persist configuration
const persistConfig = {
  key: "skillcollege-v1",
  storage,
  whitelist: ["auth", "blog"],
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authSlice,
  content: contentSlice,
  blog: blogSlice,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/FLUSH",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PERSIST",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
