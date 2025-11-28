import { test } from '@playwright/test';

import { compareScreenshot, setTheme } from '../../utils/tests';

/**
 * Скриншотные тесты для WelcomeScreen
 */
test.describe('WelcomeScreen Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Очищаем localStorage, чтобы показать приветственный экран
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('welcomeScreenShown');
    });

    // Перезагружаем страницу и ждем появления WelcomeScreen
    await page.reload();
    await page.waitForSelector(
      'button:has-text("Начать"), button:has-text("Get Started"), [class*="time"], [class*="welcome"]',
      { timeout: 5000 }
    );
  });

  test('WelcomeScreen - Light Theme', async ({ page }) => {
    // Устанавливаем светлую тему
    await setTheme(page, 'light');

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(100);

    // Сравниваем скриншот
    await compareScreenshot(page, 'welcome-screen-light', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('WelcomeScreen - Dark Theme', async ({ page }) => {
    // Устанавливаем темную тему
    await setTheme(page, 'dark');

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(100);

    // Сравниваем скриншот
    await compareScreenshot(page, 'welcome-screen-dark', {
      fullPage: true,
      threshold: 0.2,
    });
  });
});
