import { test } from '@playwright/test';

import { compareScreenshot, navigateToScreen, setTheme, waitForAppReady } from '../../utils/tests';

/**
 * Скриншотные тесты для ChatScreen
 */
test.describe('ChatScreen Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Переходим на главную страницу
    await page.goto('/');
    await waitForAppReady(page);

    // Переключаемся на экран чата
    await navigateToScreen(page, 'chat');

    // Ждем загрузки экрана чата
    await page.waitForTimeout(200);
  });

  test('ChatScreen - Light Theme - Welcome State', async ({ page }) => {
    // Устанавливаем светлую тему
    await setTheme(page, 'light');

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(200);

    // Сравниваем скриншот приветственного состояния
    await compareScreenshot(page, 'chat-screen-light-welcome', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('ChatScreen - Dark Theme - Welcome State', async ({ page }) => {
    // Устанавливаем темную тему
    await setTheme(page, 'dark');

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(200);

    // Сравниваем скриншот приветственного состояния
    await compareScreenshot(page, 'chat-screen-dark-welcome', {
      fullPage: true,
      threshold: 0.2,
    });
  });
});
