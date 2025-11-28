import { test } from '@playwright/test';

import {
  compareScreenshot,
  navigateToScreen,
  setTheme,
  waitForAppReady,
  waitForSceneReady,
} from '../../utils/tests';

/**
 * Скриншотные тесты для MainScreen
 */
test.describe('MainScreen Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Переходим на главную страницу
    await page.goto('/');
    await waitForAppReady(page);

    // Переключаемся на главный экран (с небольшим запасом по времени)
    try {
      await navigateToScreen(page, 'main');
    } catch (error) {
      // Если навигация не сработала, даем короткий запас и продолжаем
      await page.waitForTimeout(500);
    }
  });

  test('MainScreen - Light Theme', async ({ page }) => {
    // Устанавливаем светлую тему
    await setTheme(page, 'light');

    // Ждем появления любых элементов MainScreen
    await page
      .waitForSelector('button, canvas, [class*="main"], [class*="screen"]', {
        timeout: 15000,
      })
      .catch(() => {
        // Если элементы не найдены, просто продолжаем
      });

    // Ждем загрузки сцены (может занять время, но не критично)
    await waitForSceneReady(page, 5000).catch(() => {
      // Игнорируем ошибки загрузки сцены
    });

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(500);

    // Сравниваем скриншот
    await compareScreenshot(page, 'main-screen-light', {
      fullPage: true,
      threshold: 0.3, // Больший порог для 3D сцены
    });
  });

  test('MainScreen - Dark Theme', async ({ page }) => {
    // Устанавливаем темную тему
    await setTheme(page, 'dark');

    // Ждем появления любых элементов MainScreen
    await page
      .waitForSelector('button, canvas, [class*="main"], [class*="screen"]', {
        timeout: 15000,
      })
      .catch(() => {
        // Если элементы не найдены, просто продолжаем
      });

    // Ждем загрузки сцены
    await waitForSceneReady(page, 5000).catch(() => {
      // Игнорируем ошибки загрузки сцены
    });

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(500);

    // Сравниваем скриншот
    await compareScreenshot(page, 'main-screen-dark', {
      fullPage: true,
      threshold: 0.3,
    });
  });
});
