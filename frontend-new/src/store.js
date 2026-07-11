// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./modules/auth/slices/authSlice";
import cartReducer from './modules/cart/slices/cartSlice'

import aiReducer from "./modules/ai/slices/aiSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
	cart:cartReducer,
	ai:aiReducer
  },
});