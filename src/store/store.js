// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import medicineReducer from './slices/medicineSlice';
import faqReducer from './slices/faqSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    medicine: medicineReducer,
    faq: faqReducer,
    auth: authReducer
  },
  // Middleware configuration to disable serializable check for non-serializable data like functions or Promises
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for actions like thunks
    }),
});
