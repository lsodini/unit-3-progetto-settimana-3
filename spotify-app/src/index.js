import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Crea la radice del rendering

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
