import React from 'react';
import Header from './components/Header';
import { Helmet } from 'react-helmet-async';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <Helmet>{/* <title>abc</title> */}</Helmet>
      <Header />
      {children}
    </div>
  );
}
