import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFirebase } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInUserWithEmailAndPassword, signInWithGoogle } = useFirebase();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInUserWithEmailAndPassword(email, password);
      toast.success("User logged in successfully");
      const redirectPath = localStorage.getItem("redirectPath");
      if (redirectPath) {
        localStorage.removeItem("redirectPath");
        navigate(redirectPath, { replace: true });
      }
    } catch (error) {
      toast.error("Error logging in user: " + error.message);
    }
  };

  return (
    <div className="login-container max-w-md mx-auto p-4">
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
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin}>
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
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
          >
            LogIn
          </button>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              signInWithGoogle();
            }}
            className="w-full bg-red-500 text-white py-2 rounded-md"
          >
            LogIn with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
