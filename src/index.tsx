import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import SocketsProvider from './context/socket.context';
import { AuthProvider } from './context/auth.context';
import AuthMiddleware from './middleware/AuthMiddleware';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode></React.StrictMode>

  <BrowserRouter>
    <SocketsProvider>
      <AuthProvider>
        <AuthMiddleware>
          <App />
        </AuthMiddleware>
      </AuthProvider>
    </SocketsProvider>
    <ToastContainer />
  </BrowserRouter>
);
