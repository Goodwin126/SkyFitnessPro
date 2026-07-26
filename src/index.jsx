import '../src/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App.jsx';
// 1. Берем провайдер ТОЛЬКО из AuthContext
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </StrictMode>
  </Provider>
);
