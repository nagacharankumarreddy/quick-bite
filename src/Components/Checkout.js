import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useFirebase } from "../firebase";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { database } from "../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, firebaseApp } = useFirebase();
  const cartItems = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [deleteAddressId, setDeleteAddressId] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const addressesRef = database.ref(`users/${currentUser.uid}/addresses`);
      addressesRef.on("value", (snapshot) => {
        const addressesData = snapshot.val();
        if (addressesData) {
          const addressesList = Object.entries(addressesData).map(
            ([key, value]) => ({ id: key, address: value })
          );
          setAddresses(addressesList);
          setSelectedAddress(addressesList[0]);
        }
      });
    }
  }, [currentUser, firebaseApp, deleteAddressId]);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const orderRef = database.ref(`orders/${currentUser.uid}`).push();
      const orderData = {
        userId: currentUser.uid,
        items: cartItems,
        totalPrice: calculateTotalPrice(),
        timestamp: new Date().toISOString(),
        address: selectedAddress.address,
      };

      await orderRef.set(orderData);

      dispatch(clearCart());

      toast.success(
        "Congratulations! Your order has been placed. We're not asking for money!",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      setTimeout(() => navigate("/"), 4000);
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleAddAddress = async () => {
    if (newAddress.trim() !== "") {
      const addressesRef = database.ref(`users/${currentUser.uid}/addresses`);
      const newAddressRef = addressesRef.push();
      await newAddressRef.set(newAddress.trim());
      setNewAddress("");
      setShowModal(false);
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setShowModal(false);
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const addressRef = database.ref(
        `users/${currentUser.uid}/addresses/${addressId}`
      );
      await addressRef.remove();
      setDeleteAddressId(addressId); /
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
        <h3 className="text-gray-900 font-bold text-xl mb-2">Order Summary:</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-2">
            <span className="text-gray-900">{item.name}</span>
            <span className="text-gray-600">
              ${item.price} x {item.quantity}
            </span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-bold">Total:</span>
          <span className="text-gray-900 font-bold">
            ${calculateTotalPrice().toFixed(2)}
          </span>
        </div>
        <div className="mt-4">
          <h3 className="text-gray-900 font-bold mb-2">Select Address:</h3>
          <div className="space-y-2">
            {addresses.map((address, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
                onClick={() => handleAddressSelect(address)}
              >
                <span>{address.address}</span>
                <div>
                  {selectedAddress === address && (
                    <span className="text-green-500 mr-10">✔️</span>
                  )}
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-red-500 "
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleCheckout}
          className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded mt-2"
        >
          Add New Address
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="p-4">
          <label className="block text-gray-700 font-bold mb-2">
            New Address:
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Enter new address"
          />
          <button
            onClick={handleAddAddress}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Add Address
          </button>
        </div>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Checkout;
