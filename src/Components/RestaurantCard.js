// RestaurantCard.jsx

import React from "react";
import { IMAGE_BASE_URL } from "../Utils/constants";
import GenerateStars from "./GenerateStars";

const RestaurantCard = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 w-3/12">
      <img
        src={`${IMAGE_BASE_URL}/${data.cloudinaryImageId}`}
        alt={data.name}
        className="w-full h-48 object-cover"
      />
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
