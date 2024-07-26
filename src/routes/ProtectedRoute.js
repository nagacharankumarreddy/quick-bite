import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFirebase } from "../firebase";
import Loader from "../Utils/Loader";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useFirebase();

  useEffect(() => {
    if (!loading && !currentUser) {
      toast.info("You need to log in to proceed.");
    }
  }, [loading, currentUser]);

  if (loading) {
    return <Loader />;
  }

  if (!currentUser) {
    const redirectPath = window.location.pathname;
    const sanitizedPath = redirectPath.replace("/quick-bite", "");
    localStorage.setItem("redirectPath", sanitizedPath);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
