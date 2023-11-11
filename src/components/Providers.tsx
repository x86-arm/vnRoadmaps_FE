import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReduxProvider store={store}>
        <HelmetProvider>
          <ThemeProvider defaultTheme="dark" storageKey="theme">
            {children}
          </ThemeProvider>
        </HelmetProvider>
      </ReduxProvider>
    </>
  );
}
