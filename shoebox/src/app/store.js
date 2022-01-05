import { configureStore } from '@reduxjs/toolkit';
import CartReducer from '../features/cart/cartReducer';
import ExploreReducer from '../features/explore/ExploreReducer';
import authReducer from '../features/Profile/authReducer';
import toastReducer from '../features/Profile/toastReducer'

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    explore: ExploreReducer,
    auth: authReducer,
    toast: toastReducer

  },
});
