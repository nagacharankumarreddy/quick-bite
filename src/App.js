import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import { getDatabase, set, ref } from "firebase/database";
import { db } from "./firebase";
import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/ForgotPassword";

function App() {
  const [userName, setUserName] = useState("");

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <input
        type="text"
        name="name"
        id="username"
        className="box-border"
        onChange={(e) => setUserName(e.target.value)}
      />
    </div>
  );
}

export default App;
