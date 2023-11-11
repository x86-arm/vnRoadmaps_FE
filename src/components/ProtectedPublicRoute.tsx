import { Navigate } from 'react-router-dom';
import React from 'react';
import { store } from '@/store';

export default function ProtectedPublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;

  const token = store.getState().userReducer.tokens.accessToken;
  // if (load) {
  //   return <LoadingScreen />;
  // }
  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
