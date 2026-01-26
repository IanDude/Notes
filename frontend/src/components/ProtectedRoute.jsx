import React from "react";
import { Navigate } from "react-router";
import { UseAuth } from "../contexts/AuthContext";
import LoadingSpinner from "./LoadingComponent";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = UseAuth();
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
