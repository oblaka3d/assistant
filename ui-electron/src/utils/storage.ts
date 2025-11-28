import { STORAGE_KEYS } from '../constants/app';
import type { Dialog } from '../store/slices/chatSlice';

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

/**
 * Загрузка диалогов гостя из localStorage
 */
export const loadGuestDialogs = (): Dialog[] => {
  if (!hasLocalStorage()) {
    return [];
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GUEST_DIALOGS);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    // Валидация структуры диалогов
    return parsed.filter((dialog) => {
      return (
        dialog &&
        typeof dialog === 'object' &&
        typeof dialog.id === 'string' &&
        typeof dialog.title === 'string' &&
        Array.isArray(dialog.messages) &&
        typeof dialog.createdAt === 'string' &&
        typeof dialog.updatedAt === 'string'
      );
    }) as Dialog[];
  } catch (error) {
    log.error('Failed to load guest dialogs from localStorage:', error);
    return [];
  }
};

/**
 * Сохранение диалогов гостя в localStorage
 */
export const saveGuestDialogs = (dialogs: Dialog[]) => {
  if (!hasLocalStorage()) {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEYS.GUEST_DIALOGS, JSON.stringify(dialogs));
  } catch (error) {
    log.error('Failed to save guest dialogs to localStorage:', error);
    throw error;
  }
};

/**
 * Очистка диалогов гостя из localStorage
 */
export const clearGuestDialogs = () => {
  if (!hasLocalStorage()) {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEYS.GUEST_DIALOGS);
  } catch (error) {
    log.error('Failed to clear guest dialogs from localStorage:', error);
  }
};
