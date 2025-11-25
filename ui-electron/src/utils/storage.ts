import { STORAGE_KEYS } from '../constants/app';

import { createLogger } from './logger';

const log = createLogger('storage');

const hasLocalStorage = () => typeof window !== 'undefined' && !!window.localStorage;

export const loadGuestApiKeys = (): Record<string, string> => {
  if (!hasLocalStorage()) {
    return {};
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.API_KEYS);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) {
      return {};
    }
    return Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => typeof value === 'string')
    );
  } catch (error) {
    log.error('Failed to load API keys from localStorage:', error);
    return {};
  }
};

export const saveGuestApiKeys = (keys: Record<string, string>) => {
  if (!hasLocalStorage()) {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEYS.API_KEYS, JSON.stringify(keys));
  } catch (error) {
    log.error('Failed to save API keys to localStorage:', error);
    throw error;
  }
};

export const clearGuestApiKeys = () => {
  if (!hasLocalStorage()) {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEYS.API_KEYS);
  } catch (error) {
    log.error('Failed to clear API keys from localStorage:', error);
  }
};
