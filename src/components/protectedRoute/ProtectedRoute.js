import React from "react";
import { Navigate } from "react-router-dom";
import { PAGE_ROUTES } from "../../utils/constants";
import AppSecureStorage from "../../services/secureStorage";

const ProtectedRoute = ({ children }) => {
  const storage = new AppSecureStorage();
  const tokenExpiry = storage.get("tokenExpiry");
  const isAuthenticated =
    storage.get("token") && new Date() < new Date(tokenExpiry);

  console.log("isAuthenticated", isAuthenticated, "chil", children);

  return isAuthenticated ? children : <Navigate to={PAGE_ROUTES.LOGIN} />;
};

export default ProtectedRoute;
