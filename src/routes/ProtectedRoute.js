import React from "react";
import { Navigate } from "react-router-dom";
import { useFirebase } from "../firebase";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useFirebase();

  //will enable this later development
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
