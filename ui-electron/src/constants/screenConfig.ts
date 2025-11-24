/**
 * Конфигурация экранов меню
 */

export interface ScreenConfig {
  id: string;
}

export const SUBSCREEN_CONFIG: Record<string, ScreenConfig> = {
  menuMain: {
    id: 'menuMain',
  },
  settings: {
    id: 'settings',
  },
  apiKeys: {
    id: 'apiKeys',
  },
  history: {
    id: 'history',
  },
  about: {
    id: 'about',
  },
  logs: {
    id: 'logs',
  },
};

/**
 * Получает конфигурацию экрана
 */
export function getScreenConfig(screenId: string | null): ScreenConfig | null {
  if (!screenId) return null;
  return SUBSCREEN_CONFIG[screenId] || null;
}
