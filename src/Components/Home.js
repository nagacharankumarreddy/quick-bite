import React, { useEffect, useState } from "react";
import useFirebase from "../firebase";
import RestaurantCard from "./RestaurantCard";

function Home() {
  const { getData } = useFirebase();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const restaurantsData = await getData("restaurants");
      setRestaurants(restaurantsData);
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="bg-red-50 p-4">
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
