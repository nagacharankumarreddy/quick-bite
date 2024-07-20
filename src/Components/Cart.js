import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";
import { IMAGE_BASE_URL } from "../Utils/constants";
import { useNavigate } from "react-router-dom";
import dummyImage from "../Images/noImage.jpg";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item));
    if (getItemQuantity(item.id) === 1) {
      handleRemoveFromCart(item.id);
    }
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate("/confirmation");
  };

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getItemTotalPrice = (item) => {
    return (item.price * getItemQuantity(item.id)).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        <p className="text-gray-600">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-center">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="cart-item-container bg-white shadow-lg rounded-lg overflow-hidden m-2 p-4 md:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col"
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
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-gray-900 font-bold text-xl truncate">
                {item.name}
              </p>
              <p className="text-gray-600">Price: ₹{item.price}</p>
              <p className="text-gray-600">Category: {item.category}</p>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecreaseQuantity(item)}
                    className={`bg-gray-300 text-gray-700 px-3 py-1 rounded-lg shadow-sm hover:bg-gray-400 transition duration-150 ease-in-out`}
                    disabled={getItemQuantity(item.id) === 0}
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">
                    {getItemQuantity(item.id)}
                  </span>
                  <button
                    onClick={() => handleIncreaseQuantity(item)}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg shadow-sm hover:bg-gray-400 transition duration-150 ease-in-out"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-150 ease-in-out"
                >
                  Remove
                </button>
              </div>
              <p className="text-gray-600 mt-2">
                Total: {item.quantity} x ₹{item.price} = ₹
                {getItemTotalPrice(item)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8 bg-white shadow-2xl rounded-lg p-6 max-w-md mx-auto">
        <h3 className="text-gray-900 font-bold text-2xl mb-4">Bill Summary</h3>
        <ul className="text-gray-600 mb-4">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center mb-2"
            >
              <div className="flex-1 text-left">
                {item.name} ({item.quantity} x ₹{item.price})
              </div>
              <div className="text-right">₹{getItemTotalPrice(item)}</div>
            </li>
          ))}
        </ul>
        <p className="text-gray-900 font-bold text-xl mt-4">
          Grand Total: ₹{calculateTotalPrice().toFixed(2)}
        </p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleClearCart}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-red-600 transition duration-150 ease-in-out mr-4"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
