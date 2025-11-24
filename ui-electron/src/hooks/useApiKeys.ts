import { useEffect } from 'react';

import { API_PROVIDERS } from '../constants/apiProviders';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAPIKeys, setLoading, setError, clearError } from '../store/slices/apiKeysSlice';
import { createLogger } from '../utils/logger';

const log = createLogger('useApiKeys');

/**
 * Преобразует объект API ключей из IPC в формат Redux store
 */
function mapKeysToProviders(apiKeys: Record<string, string>) {
  return Object.keys(apiKeys).reduce(
    (acc, key) => {
      const provider = API_PROVIDERS.find((p) => p.apiKeyName === key);
      if (provider && apiKeys[key]) {
        acc[provider.id] = {
          provider: provider.id,
          key: apiKeys[key],
          name: provider.name,
          description: provider.description,
        };
      }
      return acc;
    },
    {} as Record<string, { provider: string; key: string; name?: string; description?: string }>
  );
}

/**
 * Хук для управления API ключами
 */
export function useApiKeys() {
  const dispatch = useAppDispatch();
  const { keys, isLoading, error } = useAppSelector((state) => state.apiKeys);

  // Загружаем API ключи при монтировании компонента
  useEffect(() => {
    const loadAPIKeys = async () => {
      if (!window.api) {
        log.warn('Electron API not available');
        return;
      }

      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const apiKeys = await window.api.getAPIKeys();
        const mappedKeys = mapKeysToProviders(apiKeys);
        dispatch(setAPIKeys(mappedKeys));
        log.debug('API keys loaded:', mappedKeys);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        dispatch(setError(`Failed to load API keys: ${errorMessage}`));
        log.error('Failed to load API keys:', err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadAPIKeys();
  }, [dispatch]);

  const saveAPIKeys = async (localKeys: Record<string, string>) => {
    if (!window.api) {
      log.warn('Electron API not available');
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      await window.api.saveAPIKeys(localKeys);

      // Обновляем Redux store
      const mappedKeys = mapKeysToProviders(localKeys);
      dispatch(setAPIKeys(mappedKeys));

      log.log('API keys saved successfully');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      dispatch(setError(`Failed to save API keys: ${errorMessage}`));
      log.error('Failed to save API keys:', err);
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    keys,
    isLoading,
    error,
    saveAPIKeys,
  };
}
