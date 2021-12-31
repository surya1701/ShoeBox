import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import CartReducer from '../features/cart/cartReducer';
import ExploreReducer from '../features/explore/ExploreReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: CartReducer,
    explore: ExploreReducer
  },
});
