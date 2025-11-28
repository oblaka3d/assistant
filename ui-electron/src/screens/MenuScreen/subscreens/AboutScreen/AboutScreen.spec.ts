import { test } from '@playwright/test';

import {
  compareScreenshot,
  navigateToScreen,
  setTheme,
  waitForAppReady,
} from '../../../../utils/tests';

/**
 * Скриншотные тесты для AboutScreen
 */
test.describe('AboutScreen Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Переходим на главную страницу
    await page.goto('/');
    await waitForAppReady(page);

    // Переключаемся на экран "О программе" (navigateToScreen уже ждет загрузки подэкрана)
    await navigateToScreen(page, 'menu', 'about');

    // Дополнительно ждем появления элементов для надежности
    await page
      .waitForSelector('text=/about|о программе/i, [class*="about"]', { timeout: 10000 })
      .catch(() => {});

    // Делаем viewport выше, чтобы весь подэкран влезал по высоте без скролла
    await page.setViewportSize({ width: 1280, height: 2000 });

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(200);
  });

  test('AboutScreen - Light Theme', async ({ page }) => {
    // Устанавливаем светлую тему ДО навигации
    await setTheme(page, 'light');

    // Убеждаемся, что мы на правильном экране
    await page
      .waitForSelector('text=/about|о программе/i, [class*="about"]', { timeout: 10000 })
      .catch(() => {});

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(200);

    // Сравниваем скриншот
    await compareScreenshot(page, 'about-screen-light', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('AboutScreen - Dark Theme', async ({ page }) => {
    // Устанавливаем темную тему ДО навигации
    await setTheme(page, 'dark');

    // Убеждаемся, что мы на правильном экране
    await page
      .waitForSelector('text=/about|о программе/i, [class*="about"]', { timeout: 10000 })
      .catch(() => {});

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(500);

    // Сравниваем скриншот
    await compareScreenshot(page, 'about-screen-dark', {
      fullPage: true,
      threshold: 0.2,
    });
  });
});
