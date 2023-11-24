import React from "react";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
 
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (!user) {
    return <Navigate to="/auth" />;
  }
  return <>{children}</>;
};

export default Private;
