import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAPIKeys, setLoading, setError, clearError } from '../store/slices/apiKeysSlice';
import { getApiKeys as fetchApiKeys, saveApiKeys as persistApiKeys } from '../utils/api';
import { createLogger } from '../utils/logger';

const log = createLogger('useApiKeys');

/**
 * Хук для управления API ключами
 */
export function useApiKeys() {
  const dispatch = useAppDispatch();
  const { keys, isLoading, error } = useAppSelector((state) => state.apiKeys);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  // Загружаем API ключи при монтировании компонента
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setAPIKeys({}));
      return;
    }

    const loadAPIKeys = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await fetchApiKeys();
        dispatch(setAPIKeys(response.data.keys || {}));
        log.debug('API keys loaded:', response.data.keys);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        dispatch(setError(`Failed to load API keys: ${errorMessage}`));
        log.error('Failed to load API keys:', err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadAPIKeys();
  }, [dispatch, isAuthenticated]);

  const saveAPIKeys = async (localKeys: Record<string, string>) => {
    if (!isAuthenticated) {
      dispatch(setError('Please sign in to save API keys'));
      return false;
    }

    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const response = await persistApiKeys(localKeys);
      dispatch(setAPIKeys(response.data.keys || {}));

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
