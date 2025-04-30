import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
  
};

const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  

export default PrivateRoute;
