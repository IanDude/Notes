import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "./LoadingComponent";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
