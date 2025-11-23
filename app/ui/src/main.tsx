import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import './index.css';
import { store } from './store';

// Обработка ошибок React
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML =
    '<div style="padding: 20px; color: red;">Error: Root element not found</div>';
} else {
  try {
    console.log('Initializing React app...');
    
    // Проверка доступности Electron API
    if (window.api) {
      console.log('Electron API is available:', Object.keys(window.api));
    } else {
      console.warn('Electron API is not available. Make sure preload script is loaded.');
    }
    
    const root = ReactDOM.createRoot(rootElement);

    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );

    console.log('React app initialized successfully');
  } catch (error) {
    console.error('Error initializing React app:', error);
    rootElement.innerHTML = `<div style="padding: 20px; color: red;">
      <h2>Error initializing application</h2>
      <pre>${error instanceof Error ? error.message : String(error)}</pre>
      <pre>${error instanceof Error ? error.stack : ''}</pre>
    </div>`;
  }
}
