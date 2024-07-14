import { configureStore } from "@reduxjs/toolkit";
import { restaurantApi } from "../api/restaurantApi";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    restaurantApi: restaurantApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(restaurantApi.middleware),
});

export default store;
