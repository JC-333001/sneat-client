import React from "react";
import { Route, Navigate } from "react-router-dom";

// Function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("User"); // or get token from a cookie
  return token ? true : false;
};

// PrivateRoute component to protect routes
const PrivateRoute = ({ element: Element, ...rest }) => (
  <Route
    {...rest}
    element={isAuthenticated() ? <Element /> : <Navigate to='/login' />}
  />
);

export default PrivateRoute;
