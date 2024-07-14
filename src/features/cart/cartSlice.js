import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
    console.log("Saved state to localStorage:", serializedState);
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
      console.log("Added to cart:", newItem);
      saveToLocalStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      console.log("Cleared cart");
      saveToLocalStorage(state);
    },
    increaseQuantity: (state, action) => {
      const item = action.payload;
      console.log("Increasing quantity:item ", item);
      const itemToUpdate = state.items.find(
        (stateItem) => item.id === stateItem.id
      );
      if (itemToUpdate) {
        itemToUpdate.quantity++;
        console.log("Increased quantity for item:", itemToUpdate);
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
        console.log("Decreased quantity for item:", item.id);
        saveToLocalStorage(state);
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      console.log("Removed from cart:", itemId);
      saveToLocalStorage(state);
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
