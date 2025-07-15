// src/components/RequireAuth.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const RequireAuth = ({ children }) => {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
