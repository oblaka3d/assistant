import { test } from '@playwright/test';

import {
  compareScreenshot,
  navigateToScreen,
  setTheme,
  waitForAppReady,
} from '../../../../utils/tests';

/**
 * Скриншотные тесты для AuthScreen
 */
test.describe('AuthScreen Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Переходим на главную страницу
    await page.goto('/');
    await waitForAppReady(page);

    // Переключаемся на экран авторизации (navigateToScreen уже ждет загрузки подэкрана)
    await navigateToScreen(page, 'menu', 'auth');

    // Дополнительно ждем появления элементов формы авторизации для надежности
    await page
      .waitForSelector('[role="tab"], form, button[type="submit"]', {
        timeout: 10000,
      })
      .catch(() => {});

    // Делаем viewport выше, чтобы весь подэкран влезал по высоте без скролла
    await page.setViewportSize({ width: 1280, height: 2000 });

    // Ждем стабилизации UI
    await page.waitForTimeout(200);
  });

  test('AuthScreen - Login Tab - Light Theme', async ({ page }) => {
    // Устанавливаем светлую тему
    await setTheme(page, 'light');

    // Убеждаемся, что мы на правильном экране
    await page
      .waitForSelector('text=/login|войти|auth|авторизация/i, [role="tab"]', { timeout: 10000 })
      .catch(() => {});

    // Убеждаемся, что открыта вкладка Login
    const loginTab = page
      .locator('button[role="tab"]:has-text("Login"), button[role="tab"]:has-text("Войти")')
      .first();
    if (await loginTab.isVisible({ timeout: 2000 })) {
      await loginTab.click();
      await page.waitForTimeout(150);
    }

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(200);

    // Сравниваем скриншот экрана авторизации (Login)
    await compareScreenshot(page, 'auth-screen-login-light', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('AuthScreen - Login Tab - Dark Theme', async ({ page }) => {
    // Устанавливаем темную тему
    await setTheme(page, 'dark');

    // Убеждаемся, что мы на правильном экране
    await page
      .waitForSelector('text=/login|войти|auth|авторизация/i, [role="tab"]', { timeout: 10000 })
      .catch(() => {});

    // Убеждаемся, что открыта вкладка Login
    const loginTab = page
      .locator('button[role="tab"]:has-text("Login"), button[role="tab"]:has-text("Войти")')
      .first();
    if (await loginTab.isVisible({ timeout: 2000 })) {
      await loginTab.click();
      await page.waitForTimeout(150);
    }

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(200);

    // Сравниваем скриншот экрана авторизации (Login)
    await compareScreenshot(page, 'auth-screen-login-dark', {
      fullPage: true,
      threshold: 0.2,
    });
  });
});
