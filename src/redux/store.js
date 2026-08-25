import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import counterReducer from './counterSlice';
import wishlistReducer from './wishlistSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    counter: counterReducer,
    wishlist: wishlistReducer,
  },
});