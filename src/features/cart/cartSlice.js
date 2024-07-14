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
      console.log("Added to cart:", newItem);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      console.log("Removed from cart:", itemId);
    },
    increaseQuantity: (state, action) => {
      console.log("state", JSON.stringify(state));
      const item = action.payload;
      console.log("Increasing quantity:item ", item);
      const itemToUpdate = state.items.find(
        (stateItem) => item.id === stateItem.id
      );
      console.log(
        "Increasing quantity: itemToUpdate",
        JSON.stringify(itemToUpdate)
      );
      if (itemToUpdate) {
        itemToUpdate.quantity++;
        console.log("Increased quantity for item:", itemToUpdate);
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
        console.log("Decreased quantity for item:", item.id);
      }
    },
    clearCart: (state) => {
      state.items = [];
      console.log("Cleared cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
