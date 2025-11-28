import { test } from '@playwright/test';

import { compareScreenshot, setTheme, waitForAppReady } from '../../utils/tests';

/**
 * Скриншотные тесты для IdleScreen
 * IdleScreen показывается после периода бездействия пользователя
 *
 * Примечание: IdleScreen активируется автоматически через таймер в App.tsx
 * Для тестов мы используем прямое изменение состояния через window.__APP_STATE__
 */
test.describe('IdleScreen Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Переходим на главную страницу
    await page.goto('/');
    await waitForAppReady(page);

    // Активируем IdleScreen через настройки и принудительную активацию
    await page.evaluate(() => {
      type WindowWithStore = Window & { __REDUX_STORE__?: { dispatch: (action: unknown) => void } };
      const win = window as WindowWithStore;
      const store = win.__REDUX_STORE__;

      // Устанавливаем idle режим в настройках
      if (store) {
        store.dispatch({
          type: 'settings/setIdleMode',
          payload: true,
        });
        store.dispatch({
          type: 'settings/setIdleTimeoutSeconds',
          payload: 1,
        });
      }

      // Пытаемся найти и вызвать функцию активации idle через React компонент
      // Или используем прямое изменение через глобальный объект
      // Для тестов создаем специальный триггер
      (window as Window & { __FORCE_IDLE__?: boolean }).__FORCE_IDLE__ = true;
      const event = new CustomEvent('forceIdle', { detail: { force: true } });
      window.dispatchEvent(event);
    });

    // Ждем появления IdleScreen
    await page
      .waitForSelector(
        '[class*="idle"], [class*="Idle"], button:has-text("Resume"), button:has-text("Продолжить")',
        {
          timeout: 3000,
        }
      )
      .catch(() => {});
  });

  test('IdleScreen - Light Theme', async ({ page }) => {
    // Устанавливаем светлую тему
    await setTheme(page, 'light');

    // Ждем появления элементов IdleScreen
    await page
      .waitForSelector('[class*="idle"], [class*="Idle"], img, [class*="image"]', {
        timeout: 5000,
      })
      .catch(() => {});

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(300);

    // Сравниваем скриншот
    await compareScreenshot(page, 'idle-screen-light', {
      fullPage: true,
      threshold: 0.3, // Больший порог для изображений
    });
  });

  test('IdleScreen - Dark Theme', async ({ page }) => {
    // Устанавливаем темную тему
    await setTheme(page, 'dark');

    // Ждем появления элементов IdleScreen
    await page
      .waitForSelector('[class*="idle"], [class*="Idle"], img, [class*="image"]', {
        timeout: 5000,
      })
      .catch(() => {});

    // Ждем стабилизации UI (уменьшено для скорости)
    await page.waitForTimeout(300);

    // Сравниваем скриншот
    await compareScreenshot(page, 'idle-screen-dark', {
      fullPage: true,
      threshold: 0.3, // Больший порог для изображений
    });
  });
});
