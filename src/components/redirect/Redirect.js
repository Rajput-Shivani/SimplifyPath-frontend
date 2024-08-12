import React from "react";
import { Navigate } from "react-router-dom";
import { PAGE_ROUTES } from "../../utils/constants";
import AppSecureStorage from "../../services/secureStorage";
const storage = new AppSecureStorage();

const Redirect = () => {
  const accessToken = storage.get("token");

  return accessToken ? (
    <Navigate to={PAGE_ROUTES.CHAT} />
  ) : (
    <Navigate to={PAGE_ROUTES.LOGIN} />
  );
};

export default Redirect;
