import React from "react";
import GenerateStars from "./GenerateStars";
import { IMAGE_BASE_URL } from "../Utils/constants";

const RestaurantCard = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-2 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="relative h-40 sm:h-48">
        <img
          src={`${IMAGE_BASE_URL}/${data.cloudinaryImageId}`}
          alt={data.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <p className="text-gray-900 font-bold text-xl">{data.name}</p>
        <p className="text-gray-600">{data.cuisine}</p>
        <div className="flex items-center mt-2">
          <p className="text-gray-600 inline">Rating:</p>
          <GenerateStars avgRating={data.avgRating} />
          <p className="ml-2 text-gray-600 inline">({data.avgRating})</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
