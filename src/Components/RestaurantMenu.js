import React from "react";
import { useParams } from "react-router-dom";
import { useGetRestaurantMenuQuery } from "../api/restaurantApi";
import { IMAGE_BASE_URL } from "../Utils/constants";
import Loader from "../Utils/Loader";
import dummyImage from "../Images/noImage.jpg";

const RestaurantMenu = () => {
  const { id } = useParams();
  const {
    data: menuItems = { itemCards: [] },
    error,
    isLoading,
  } = useGetRestaurantMenuQuery({ id });

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading menu: {error.message}</div>;

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-center">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="menu-item-container bg-white shadow-lg rounded-lg overflow-hidden m-2 md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <div className="relative h-40 sm:h-48 flex justify-center items-center">
              <img
                src={`${IMAGE_BASE_URL}/${item.imageId}`}
                alt={item.name}
                onError={(e) => {
                  e.target.src = dummyImage;
                }}
                className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
            </div>
            <div className="p-4">
              <p className="text-gray-900 font-bold text-xl">{item.name}</p>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-600">Price: {item.price}</p>
              <p className="text-gray-600">Category: {item.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
