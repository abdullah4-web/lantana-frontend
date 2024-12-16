import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { useUserContext } from './UserContext';

export default function AdminRoute({ children }) {
  const { state } = useUserContext();
  const { user } = state;
  
  // Check if the user is an admin
  const isAdmin = user && user.isAdmin;

  return isAdmin ? children : <Navigate to="/login" />;
}
