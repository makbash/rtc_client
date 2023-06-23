import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';

import App from './App';
import SocketsProvider from './context/socket.context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode></React.StrictMode>
  <SocketsProvider>
    <App />
  </SocketsProvider>
);
