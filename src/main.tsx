import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import Providers from './components/Providers.tsx';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Providers>
        <App />
      </Providers>
    </ErrorBoundary>
  </React.StrictMode>
);
