// index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.js'; // Ensure .js extension is present
import './index.css';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <Auth0Provider
  domain="dev-3poehk7skgdn1ul6.us.auth0.com"
  clientId="8udVWXJdcT1IH4cFHdvylgYGxnR8u9Ek"
  authorizationParams={{ redirect_uri: window.location.origin }}
  useRefreshTokens={true} // Enabling refresh tokens
>


    
    <Router>
      <App />
    </Router>
  </Auth0Provider>
);
