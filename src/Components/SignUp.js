import React, { useState } from "react";
import { useFirebase } from "../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUpUserWithEmailAndPassword, signInWithGoogle } = useFirebase();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpUserWithEmailAndPassword(email, password);
      alert("User signed up successfully");
    } catch (error) {
      alert("Error signing up user: " + error.message);
    }
  };

  return (
    <div className="SignUp-container max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">SignUp</h2>
      <form onSubmit={handleSignUp}>
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md mb-4"
        >
          SignUp
        </button>
      </form>
      <button
        onClick={signInWithGoogle}
        className="w-full bg-red-500 text-white py-2 rounded-md"
      >
        Sign Up with Google
      </button>
    </div>
  );
};

export default SignUp;
