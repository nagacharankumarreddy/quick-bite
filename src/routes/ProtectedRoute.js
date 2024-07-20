import React from "react";
import { Navigate } from "react-router-dom";
import { useFirebase } from "../firebase";
import Loader from "../Utils/Loader";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useFirebase();

  if (loading) {
    return <Loader />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
