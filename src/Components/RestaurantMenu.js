import React from "react";
import { useParams } from "react-router-dom";
import { useGetRestaurantMenuQuery } from "../api/restaurantApi";
import { IMAGE_BASE_URL } from "../Utils/constants";
import Loader from "../Utils/Loader";
import dummyImage from "../Images/noImage.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartSlice";

const RestaurantMenu = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const {
    data: menuItems = { itemCards: [] },
    error,
    isLoading,
  } = useGetRestaurantMenuQuery({ id });

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

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
              <div className="flex items-center mt-4">
                <button
                  onClick={() => handleDecreaseQuantity(item.id)}
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l"
                >
                  -
                </button>
                <span className="px-4">{getItemQuantity(item.id)}</span>
                <button
                  onClick={() => handleIncreaseQuantity(item)}
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r"
                >
                  +
                </button>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
