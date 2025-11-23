/**
 * Конфигурация экранов меню
 */

export interface ScreenConfig {
  id: string;
  scrollable: boolean; // Можно ли скроллить экран тачем вертикально
}

export const SUBSCREEN_CONFIG: Record<string, ScreenConfig> = {
  settings: {
    id: 'settings',
    scrollable: true,
  },
  apiKeys: {
    id: 'apiKeys',
    scrollable: true,
  },
  history: {
    id: 'history',
    scrollable: true,
  },
  about: {
    id: 'about',
    scrollable: true,
  },
  logs: {
    id: 'logs',
    scrollable: true, // Логи тоже могут быть длинными
  },
};

/**
 * Проверяет, можно ли скроллить указанный экран
 */
export function isScreenScrollable(screenId: string | null): boolean {
  if (!screenId) return false;
  return SUBSCREEN_CONFIG[screenId]?.scrollable ?? false;
}

/**
 * Получает конфигурацию экрана
 */
export function getScreenConfig(screenId: string | null): ScreenConfig | null {
  if (!screenId) return null;
  return SUBSCREEN_CONFIG[screenId] || null;
}

