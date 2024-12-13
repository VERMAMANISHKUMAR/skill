import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { store, persistor } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);