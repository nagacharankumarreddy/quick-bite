import React, { useState } from "react";

const AddressForm = ({ onSubmit }) => {
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2">Add/Edit Address</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border rounded p-2"
          placeholder="Enter your address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={4}
        ></textarea>
        <div className="mt-2 text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
