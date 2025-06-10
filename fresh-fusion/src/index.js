import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Handle redirect from 404.html for GitHub Pages SPA with BrowserRouter
(function() {
  const redirectPath = new URLSearchParams(window.location.search).get('path');
  if (redirectPath && window.history.replaceState) {
    window.history.replaceState(null, null, redirectPath);
  }
})();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
