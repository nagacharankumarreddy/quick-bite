import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { database } from "../firebase/firebase";

export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getRestaurants: builder.query({
      async queryFn() {
        try {
          const snapshot = await database.ref("restaurants").once("value");
          const restaurants = Object.values(snapshot.val() || {});
          return { data: restaurants };
        } catch (error) {
          console.error("Error fetching restaurants:", error);
          return { error };
        }
      },
    }),
    getRestaurantMenu: builder.query({
      async queryFn({ id }) {
        try {
          const snapshot = await database
            .ref(`restaurantMenu/${id}`)
            .once("value");
          const menu = snapshot.val() || { itemCards: [] };

          const results = Array.isArray(menu.itemCards)
            ? menu.itemCards.map((item) => ({
                id: item.id,
                name: item.name,
                category: item.category,
                description: item.description || "",
                imageId: item.imageId,
                isVeg: item.isVeg,
                price: item.price,
                ratings: item.ratings || 0,
              }))
            : [];

          return { data: results };
        } catch (error) {
          console.error("Error fetching restaurant menu:", error);
          return { error };
        }
      },
    }),
  }),
});

export const { useGetRestaurantsQuery, useGetRestaurantMenuQuery } =
  restaurantApi;
