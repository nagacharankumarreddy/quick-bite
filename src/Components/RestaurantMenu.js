import React, { useState, useEffect } from "react";
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

  const [searchTerm, setSearchTerm] = useState("");
  const [itemsWithFailedImages, setItemsWithFailedImages] = useState(new Set());
  const [filteredItems, setFilteredItems] = useState([]);
  const [loadingShuffledItems, setLoadingShuffledItems] = useState(true);

  const {
    data: menuItems = [],
    error,
    isLoading,
  } = useGetRestaurantMenuQuery({ id });

  useEffect(() => {
    if (menuItems.length > 0) {
      setLoadingShuffledItems(true);
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = menuItems.filter((item) =>
        item.name.toLowerCase().includes(lowercasedSearchTerm)
      );

      // Separate valid and failed image items
      const validItems = filtered.filter(
        (item) => !itemsWithFailedImages.has(item.id)
      );
      const failedItems = filtered.filter((item) =>
        itemsWithFailedImages.has(item.id)
      );

      // Shuffle valid items
      const shuffledValidItems = validItems.sort(() => Math.random() - 0.5);

      // Combine shuffled valid items with failed image items
      setFilteredItems([...shuffledValidItems, ...failedItems]);
      setLoadingShuffledItems(false);
    }
  }, [menuItems, searchTerm, itemsWithFailedImages]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item));
  };

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleImageError = (itemId) => {
    setItemsWithFailedImages((prev) => new Set(prev).add(itemId));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading || loadingShuffledItems) return <Loader />;
  if (error) return <div>Error loading menu: {error.message}</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded p-2 w-full sm:w-80"
          style={{ maxWidth: "500px" }}
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`} // Use a combination of item ID and index to ensure uniqueness
            className="menu-item-container bg-white shadow-lg rounded-lg overflow-hidden m-2 md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <div className="relative h-40 sm:h-48 flex justify-center items-center">
              <img
                src={
                  itemsWithFailedImages.has(item.id)
                    ? dummyImage
                    : `${IMAGE_BASE_URL}/${item.imageId}`
                }
                alt={item.name}
                onError={() => handleImageError(item.id)}
                className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                style={{ objectFit: "cover", borderRadius: "8px" }}
                loading="lazy" // Lazy load the image
              />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <p className="text-gray-900 font-bold text-xl break-words">
                  {item.name}
                </p>
                <p className="text-gray-600">Price: ₹{item?.price || 299}</p>
                <p className="text-gray-600">Category: {item.category}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecreaseQuantity(item)}
                    className={`bg-gray-300 text-gray-700 px-3 py-1 rounded-lg shadow-sm hover:bg-gray-400 transition duration-150 ease-in-out ${
                      getItemQuantity(item.id) === 0
                        ? "opacity-30 cursor-not-allowed"
                        : ""
                    }`}
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
                  onClick={() => handleAddToCart(item)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-150 ease-in-out"
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
