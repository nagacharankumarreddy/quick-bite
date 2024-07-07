import React, { useState } from "react";
import { useFirebase } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { sendPasswordReset } = useFirebase();
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordReset(email);
      toast.success("Password reset email sent. Check your inbox.");
      setTimeout(() => navigate("/login"), 800);
    } catch (error) {
      alert("Error sending password reset email: " + error.message);
    }
  };

  return (
    <div className="forgot-password-container max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
