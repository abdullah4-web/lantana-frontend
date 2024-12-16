import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { useUserContext } from './UserContext';

export default function ProtectedRoute({ children }) {
  const { state } = useUserContext();
  const { user } = state;
  return user ? children : <Navigate to="/login" />;
}