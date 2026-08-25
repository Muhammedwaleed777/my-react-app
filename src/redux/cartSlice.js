import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [], totalQuantity: 0, totalPrice: 0 };

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) { existing.quantity += 1; }
      else { state.items.push({ ...action.payload, quantity: 1 }); }
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        if (existing.quantity === 1) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        } else { existing.quantity -= 1; }
        state.totalQuantity -= 1;
        state.totalPrice -= existing.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;