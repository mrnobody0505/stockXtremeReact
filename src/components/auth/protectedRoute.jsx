import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../../context/authContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = UserAuth();
  const check = isAuthenticated();
  console.log(check);
  if (!check) {
    return <Navigate to='/' />;
  }
  return children;
};

