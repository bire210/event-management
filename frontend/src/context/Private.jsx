import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Private = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (!user) {
    return <Navigate to="/auth" />;
  }
  return <>{children}</>;
};

export default Private;
