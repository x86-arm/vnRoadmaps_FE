import { Navigate } from 'react-router-dom';
import React from 'react';
import { store } from '@/store';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = store.getState().userReducer.tokens.refreshToken;

  // if (load) {
  //   return <LoadingScreen />;
  // }

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
