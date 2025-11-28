import * as path from 'path';

import { defineConfig, devices } from '@playwright/test';

/**
 * Конфигурация Playwright для скриншотных тестов Electron приложения
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: path.resolve(__dirname, 'ui-electron/src'),
  testMatch: '**/*.spec.ts',
  /* Максимальное время выполнения одного теста */
  timeout: 60 * 1000,
  expect: {
    /* Максимальное время ожидания для expect */
    timeout: 5000,
    /* Настройки для скриншотов */
    toHaveScreenshot: {
      /* Используем кроссплатформенные снапшоты (без суффикса платформы) */
      mode: 'precise',
    },
  },
  /* Шаблон пути для снапшотов без суффикса платформы (кроссплатформенные) */
  snapshotPathTemplate: '{testFileDir}/{testFileName}-snapshots/{arg}-{projectName}{ext}',
  /* Запускать тесты в файлах параллельно */
  fullyParallel: true,
  /* Не запускать тесты в CI, если не указано явно */
  forbidOnly: !!process.env.CI,
  /* Повторять тесты только в CI */
  retries: process.env.CI ? 2 : 0,
  /* Оптимизация для CI */
  workers: process.env.CI ? 1 : undefined,
  /* Репортер для использования */
  reporter: [['html'], ['list'], ['json', { outputFile: './test-results/results.json' }]],
  /* Общие настройки для всех проектов */
  use: {
    /* Максимальное время для каждого действия (например, click) */
    actionTimeout: 0,
    /* Базовый URL для использования в navigate() */
    baseURL: 'http://localhost:3000',
    /* Собирать трейс при повторных попытках */
    trace: 'on-first-retry',
    /* Скриншоты при ошибках */
    screenshot: 'only-on-failure',
  },

  /* Настройка проектов для разных браузеров/платформ */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Запускать локальный dev сервер перед тестами */
  webServer: {
    command: 'npm run dev:ui',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    cwd: path.resolve(__dirname, '.'),
  },
});
