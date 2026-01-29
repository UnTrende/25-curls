import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './App';

// Initialize optional features with error handling
try {
  // Initialize Sentry only if configured
  if (import.meta.env.VITE_SENTRY_DSN && import.meta.env.PROD) {
    import('./lib/sentry').then(({ initSentry }) => initSentry());
  }
} catch (error) {
  console.warn('Failed to initialize Sentry:', error);
}

try {
  // Initialize analytics if configured
  if (import.meta.env.VITE_GA_TRACKING_ID) {
    import('./utils/analytics').then(({ initGA }) => initGA());
  }
} catch (error) {
  console.warn('Failed to initialize Analytics:', error);
}

try {
  // Initialize web vitals tracking
  import('./utils/webVitals').then(({ initWebVitals }) => initWebVitals());
} catch (error) {
  console.warn('Failed to initialize Web Vitals:', error);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);