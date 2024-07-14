import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";
import { IMAGE_BASE_URL } from "../Utils/constants";
import dummyImage from "../Images/noImage.jpg";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item));
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };
  const getItemQuantity = (itemId) => {
    console.log("Naga getItem", itemId);
    console.log("Naga cartItems", cartItems);
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      <div className="flex flex-wrap justify-center">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="cart-item-container bg-white shadow-lg rounded-lg overflow-hidden m-2 p-4 md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <div className="relative h-40 sm:h-48 flex justify-center items-center">
              <img
                src={
                  item.imageId
                    ? `${IMAGE_BASE_URL}/${item.imageId}`
                    : dummyImage
                }
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
            </div>
            <div className="p-4">
              <p className="text-gray-900 font-bold text-xl">{item.name}</p>
              <p className="text-gray-600">Price: {item.price}</p>
              <p className="text-gray-600">Category: {item.category}</p>
              <div className="flex items-center mt-4">
                <button
                  onClick={() => handleDecreaseQuantity(item)}
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
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
