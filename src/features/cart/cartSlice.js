import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) return initialState;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return initialState;
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: loadFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      saveToLocalStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      saveToLocalStorage(state);
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
      saveToLocalStorage(state);
    },
    decreaseQuantity: (state, action) => {
      const item = action.payload;
      const itemToUpdate = state.items.find(
        (stateItem) => item.id === stateItem.id
      );
      if (itemToUpdate && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity--;
        saveToLocalStorage(state);
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      saveToLocalStorage(state);
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
