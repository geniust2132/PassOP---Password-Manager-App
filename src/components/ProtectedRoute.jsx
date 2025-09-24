import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check if user is logged in

  if (!token) {
    // if no token → redirect to login
    return <Navigate to="/" replace />;
  }

  // otherwise → render the protected page
  return children;
};

export default ProtectedRoute;
