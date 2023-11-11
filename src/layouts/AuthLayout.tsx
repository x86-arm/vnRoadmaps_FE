import React from 'react';
import AuthIntroduce from '@/components/AuthIntroduce';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      <AuthIntroduce />
      {children}
    </div>
  );
}
