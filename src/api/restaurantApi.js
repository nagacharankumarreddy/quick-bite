import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { database } from "../firebase/firebase";

export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getRestaurants: builder.query({
      async queryFn() {
        try {
          console.log(
            "Fetching restaurants from Firebase Realtime Database..."
          );
          const snapshot = await database.ref("restaurants").once("value");
          const restaurants = Object.values(snapshot.val() || {});
          console.log("Restaurants fetched:", restaurants);
          return { data: restaurants };
        } catch (error) {
          console.error("Error fetching restaurants:", error);
          return { error };
        }
      },
    }),
  }),
});

export const { useGetRestaurantsQuery } = restaurantApi;
