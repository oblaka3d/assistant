import { test } from '@playwright/test';

import {
  compareScreenshot,
  navigateToScreen,
  setTheme,
  waitForAppReady,
} from '../../../../utils/tests';

/**
 * Скриншотные тесты для SettingsScreen
 */
test.describe('SettingsScreen Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Переходим на главную страницу
    await page.goto('/');
    await waitForAppReady(page);

    // Переключаемся на экран настроек (navigateToScreen уже ждет загрузки подэкрана)
    await navigateToScreen(page, 'menu', 'settings');

    // Дополнительно ждем появления элементов для надежности
    await page
      .waitForSelector('text=/settings|настройки/i, [class*="settings"]', { timeout: 10000 })
      .catch(() => {});

    // Делаем viewport выше, чтобы весь подэкран влезал по высоте без скролла
    await page.setViewportSize({ width: 1280, height: 2000 });

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(200);
  });

  test('SettingsScreen - Light Theme', async ({ page }) => {
    // Устанавливаем светлую тему
    await setTheme(page, 'light');

    // Убеждаемся, что мы на правильном экране
    await page
      .waitForSelector('text=/settings|настройки/i, [class*="settings"]', { timeout: 10000 })
      .catch(() => {});

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(200);

    // Сравниваем скриншот
    await compareScreenshot(page, 'settings-screen-light', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('SettingsScreen - Dark Theme', async ({ page }) => {
    // Устанавливаем темную тему
    await setTheme(page, 'dark');

    // Убеждаемся, что мы на правильном экране
    await page
      .waitForSelector('text=/settings|настройки/i, [class*="settings"]', { timeout: 10000 })
      .catch(() => {});

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(500);

    // Сравниваем скриншот
    await compareScreenshot(page, 'settings-screen-dark', {
      fullPage: true,
      threshold: 0.2,
    });
  });
});
