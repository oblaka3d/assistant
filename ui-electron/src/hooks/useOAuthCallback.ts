import { useEffect } from 'react';

import { useAppDispatch } from '../store/hooks';
import { oauthLogin } from '../store/thunks/userThunks';
import { createLogger } from '../utils/logger';

const log = createLogger('useOAuthCallback');

/**
 * Хук для обработки OAuth callback
 */
export const useOAuthCallback = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Обработка токенов из URL параметров
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const refreshToken = urlParams.get('refreshToken');

    if (token && refreshToken) {
      // Очищаем URL от параметров
      window.history.replaceState({}, document.title, window.location.pathname);

      // Выполняем OAuth авторизацию
      dispatch(oauthLogin({ token, refreshToken }))
        .unwrap()
        .then(() => {
          log.debug('OAuth login successful');
        })
        .catch((error) => {
          log.error('OAuth login failed:', error);
        });
      return;
    }

    // Обработка postMessage от OAuth callback страницы
    const handleMessage = (event: MessageEvent) => {
      // Проверяем origin для безопасности (разрешаем сообщения от backend)
      const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const baseOrigin = apiBaseUrl.replace('/api/v1', '');

      if (event.origin.startsWith(baseOrigin) || event.origin === 'null') {
        try {
          const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
          if (data.type === 'oauth-callback' && data.token && data.refreshToken) {
            dispatch(oauthLogin({ token: data.token, refreshToken: data.refreshToken }))
              .unwrap()
              .then(() => {
                log.debug('OAuth login successful via postMessage');
              })
              .catch((error) => {
                log.error('OAuth login failed:', error);
              });
          }
        } catch {
          // Игнорируем ошибки парсинга
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [dispatch]);
};
