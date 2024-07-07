import React, { useEffect, useState } from "react";
import useFirebase from "../firebase";
import RestaurantCard from "./RestaurantCard";

function Home() {
  const { getData } = useFirebase();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const fetchedRestaurants = await getData("restaurants");
        setRestaurants(fetchedRestaurants);
        console.log(fetchedRestaurants); // Ensure data is fetched correctly
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
    return () => {};
  }, [getData]);

  return (
    <div className="bg-red-50 border-red-100">
      <div className="flex flex-wrap justify-center">
        {Object.keys(restaurants).map((restaurantId) => (
          <RestaurantCard
            key={restaurantId}
            data={restaurants[restaurantId]}
            className="flex justify-between flex-wrap"
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
