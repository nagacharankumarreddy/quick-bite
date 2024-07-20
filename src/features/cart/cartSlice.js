import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    increaseQuantity: (state, action) => {
      const item = action.payload;
      const itemToUpdate = state.items.find(
        (stateItem) => item.id === stateItem.id
      );
      if (itemToUpdate) {
        itemToUpdate.quantity++;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    decreaseQuantity: (state, action) => {
      const item = action.payload;
      const itemToUpdate = state.items.find(
        (stateItem) => item.id === stateItem.id
      );
      if (itemToUpdate && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity--;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
