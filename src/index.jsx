import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SeriesProvider } from './seriesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
  <SeriesProvider>
    <App />
  </SeriesProvider>
</React.StrictMode>

);
