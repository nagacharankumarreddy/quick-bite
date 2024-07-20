import { configureStore } from "@reduxjs/toolkit";
import { restaurantApi } from "../api/restaurantApi";
import cartReducer from "../features/cart/cartSlice";

const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
  return result;
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    restaurantApi: restaurantApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(restaurantApi.middleware, persistMiddleware),
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
});

export default store;
