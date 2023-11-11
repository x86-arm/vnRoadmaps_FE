import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import Providers from './components/Providers.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
