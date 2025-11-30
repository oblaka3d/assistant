import { test } from '@playwright/test';

import {
  compareScreenshot,
  navigateToScreen,
  setTheme,
  waitForAppReady,
} from '../../../../utils/tests';

/**
 * Скриншотные тесты для APIKeysScreen
 */
test.describe('APIKeysScreen Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Переходим на главную страницу
    await page.goto('/');
    await waitForAppReady(page);

    // Переключаемся на экран API ключей (navigateToScreen уже ждет загрузки подэкрана)
    await navigateToScreen(page, 'menu', 'apiKeys');

    // Дополнительно ждем появления элементов для надежности
    await page
      .waitForSelector('text=/api.*key|ключ/i, [class*="apiKeys"]', { timeout: 10000 })
      .catch(() => {});

    // Делаем viewport выше, чтобы весь подэкран влезал по высоте без скролла
    await page.setViewportSize({ width: 1280, height: 2000 });

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(200);
  });

  test('APIKeysScreen - Light Theme', async ({ page }) => {
    // Устанавливаем светлую тему
    await setTheme(page, 'light');

    // Убеждаемся, что мы на правильном экране
    await page
      .waitForSelector('text=/api.*key|ключ/i, [class*="apiKeys"]', { timeout: 10000 })
      .catch(() => {});

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(200);

    // Сравниваем скриншот
    await compareScreenshot(page, 'api-keys-screen-light', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('APIKeysScreen - Dark Theme', async ({ page }) => {
    // Устанавливаем темную тему
    await setTheme(page, 'dark');

    // Убеждаемся, что мы на правильном экране
    await page
      .waitForSelector('text=/api.*key|ключ/i, [class*="apiKeys"]', { timeout: 10000 })
      .catch(() => {});

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(500);

    // Сравниваем скриншот
    await compareScreenshot(page, 'api-keys-screen-dark', {
      fullPage: true,
      threshold: 0.2,
    });
  });
});
