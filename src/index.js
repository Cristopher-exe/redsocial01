import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';


const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-nswoyn8qgfzfeo5c.us.auth0.com"
    clientId="1XTmWvt3OJAN3SPR8HUC6Jp9GAqfFd5j"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);
