import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from "react-cookie";
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
    <App />
    </CookiesProvider>
    </Provider>
  </React.StrictMode>
);


