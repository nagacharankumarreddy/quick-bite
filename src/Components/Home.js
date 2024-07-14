import { useGetRestaurantsQuery } from "../api/restaurantApi";
import RestaurantCard from "../Components/RestaurantCard";
import Loader from "../Utils/Loader";

function Home() {
  const { data, error, isLoading } = useGetRestaurantsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error.message}</div>;
  }

  return (
    <div className="bg-red-50 p-4">
      <div className="flex flex-wrap justify-center gap-4">
        {data.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            data={restaurant}
            className="flex justify-between flex-wrap"
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
