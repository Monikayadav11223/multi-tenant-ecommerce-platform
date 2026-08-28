import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import adminReducer from './slices/adminSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    admin: adminReducer,
    cart: cartReducer,
  },
});
