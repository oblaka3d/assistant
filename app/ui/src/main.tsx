import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import './i18n/config'; // Инициализация i18n
import './index.css';
import { store } from './store';
import { createLogger } from './utils/logger';

const log = createLogger('main.tsx');

// Обработка ошибок React
const rootElement = document.getElementById('root');

if (!rootElement) {
  log.error('Root element not found!');
  document.body.innerHTML =
    '<div style="padding: 20px; color: red;">Error: Root element not found</div>';
} else {
  try {
    log.debug('Initializing React app', {
      location: window.location.href,
      readyState: document.readyState,
      electronAPI: window.api ? Object.keys(window.api) : null,
    });

    const root = createRoot(rootElement);

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
