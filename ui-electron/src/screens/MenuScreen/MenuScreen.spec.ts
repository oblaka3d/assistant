import { test } from '@playwright/test';

import { compareScreenshot, navigateToScreen, setTheme, waitForAppReady } from '../../utils/tests';

/**
 * Скриншотные тесты для MenuScreen
 */
test.describe('MenuScreen Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Переходим на главную страницу
    await page.goto('/');
    await waitForAppReady(page);

    // Переключаемся на экран меню
    await navigateToScreen(page, 'menu');

    // Ждем загрузки экрана меню
    await page.waitForTimeout(200);
  });

  test('MenuScreen - Light Theme', async ({ page }) => {
    // Устанавливаем светлую тему
    await setTheme(page, 'light');

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(200);

    // Сравниваем скриншот
    await compareScreenshot(page, 'menu-screen-light', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('MenuScreen - Dark Theme', async ({ page }) => {
    // Устанавливаем темную тему
    await setTheme(page, 'dark');

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(200);

    // Сравниваем скриншот
    await compareScreenshot(page, 'menu-screen-dark', {
      fullPage: true,
      threshold: 0.2,
    });
  });
});
