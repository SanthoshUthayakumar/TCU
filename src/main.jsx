import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
/* Self-hosted fonts, bundled from npm (no third-party requests). */
import '@fontsource/bangers/400.css';
import '@fontsource/archivo-black/400.css';
import '@fontsource/archivo/400.css';
import '@fontsource/archivo/700.css';
import '@fontsource/patrick-hand/400.css';
import './styles/index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
