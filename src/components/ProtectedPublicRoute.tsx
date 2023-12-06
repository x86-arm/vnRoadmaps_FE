import { Navigate } from 'react-router-dom';
import React from 'react';
import { store } from '@/store';

export default function ProtectedPublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = store.getState().userReducer.tokens.refreshToken;
  // if (load) {
  //   return <LoadingScreen />;
  // }
  if (token) {
    return <Navigate to="/roadmaps" replace />;
  }
  return <>{children}</>;
}
