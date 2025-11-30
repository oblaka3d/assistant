import { Page, expect } from '@playwright/test';

/**
 * Утилиты для скриншотных тестов
 */

/**
 * Сравнивает текущий скриншот с эталонным
 */
export async function compareScreenshot(
  page: Page,
  name: string,
  options?: {
    fullPage?: boolean;
    selector?: string;
    threshold?: number;
    timeout?: number;
  }
): Promise<void> {
  const { fullPage = true, selector, threshold = 0.2, timeout = 10000 } = options || {};

  // Ждем загрузки страницы
  await page.waitForLoadState('domcontentloaded', { timeout });
  await page.waitForLoadState('networkidle', { timeout }).catch(() => {
    // Игнорируем таймауты networkidle на долгих страницах
  });

  // Если указан селектор, ждем его появления
  if (selector) {
    await page.waitForSelector(selector, { timeout });
  }

  // Сравниваем скриншот с эталонным
  await expect(page).toHaveScreenshot(`${name}.png`, {
    fullPage,
    threshold,
    maxDiffPixels: 100,
  });
}

/**
 * Ожидает загрузки React приложения
 */
export async function waitForAppReady(page: Page, timeout = 10000): Promise<void> {
  type WindowWithStore = Window & { __REDUX_STORE__?: unknown };

  // Закрываем welcome screen, если он показывается
  await page.evaluate(() => {
    localStorage.setItem('welcomeScreenShown', 'true');
  });

  // Ждем появления корневого элемента приложения
  await page.waitForSelector('[data-testid="app-container"], .app-container, #root', {
    timeout,
  });

  // Ждем завершения загрузки (используем domcontentloaded для скорости)
  await page.waitForLoadState('domcontentloaded', { timeout });

  // Ждем инициализации Redux store
  await page
    .waitForFunction(
      () => {
        const win = window as WindowWithStore;
        return !!win.__REDUX_STORE__;
      },
      { timeout: 10000 }
    )
    .catch(() => {
      console.warn('Redux store not found in window');
    });

  // Пытаемся программно закрыть приветственный экран, если он всё ещё виден
  try {
    const welcomeButton = page
      .locator(
        'button:has-text("Начать"), button:has-text("Get Started"), button:has-text("Продолжить")'
      )
      .first();

    if (await welcomeButton.isVisible({ timeout: 1000 })) {
      await welcomeButton.click();
    }
  } catch {
    // Если кнопки нет или клик не удался — просто продолжаем
  }

  // Дополнительная задержка для стабилизации (уменьшено для скорости)
  await page.waitForTimeout(200);
}

/**
 * Устанавливает тему приложения через Redux store и localStorage
 * Не использует UI взаимодействия для надежности и скорости в тестах
 */
export async function setTheme(page: Page, theme: 'light' | 'dark' | 'system'): Promise<void> {
  // Устанавливаем тему через Redux store и localStorage
  await page.evaluate((t) => {
    type WindowWithStore = Window & { __REDUX_STORE__?: { dispatch: (action: unknown) => void } };

    // Устанавливаем в localStorage для синхронизации
    localStorage.setItem('theme', t);

    // Устанавливаем через Redux store
    const win = window as WindowWithStore;
    const store = win.__REDUX_STORE__;
    if (store && store.dispatch) {
      store.dispatch({
        type: 'settings/setTheme',
        payload: t,
      });
    }

    // Триггерим событие storage для синхронизации (если используется)
    window.dispatchEvent(new Event('storage'));
  }, theme);

  // Минимальная задержка для применения темы в UI
  await page.waitForTimeout(150);
}

/**
 * Навигация между экранами
 * Поддерживает как URL-роутинг, так и Redux store
 */
export async function navigateToScreen(
  page: Page,
  screen: 'main' | 'chat' | 'menu',
  subScreen?: 'settings' | 'apiKeys' | 'logs' | 'about' | 'auth' | 'applications' | null
): Promise<void> {
  // Сначала убеждаемся, что welcome screen закрыт, чтобы не перекрывал нужный экран
  await page.evaluate(() => {
    localStorage.setItem('welcomeScreenShown', 'true');
  });

  // Навигация через Redux store: не перезагружаем страницу, чтобы не терять состояние
  await page.evaluate(
    ({ targetScreen, targetSubScreen }) => {
      type WindowWithStore = Window & { __REDUX_STORE__?: { dispatch: (action: unknown) => void } };
      const win = window as WindowWithStore;
      const store = win.__REDUX_STORE__;
      if (!store || !store.dispatch) {
        return;
      }

      // Сбрасываем isTransitioning, чтобы не блокировать смену экранов
      store.dispatch({
        type: 'ui/setTransitioning',
        payload: false,
      });

      if (targetScreen === 'menu' && targetSubScreen) {
        // Переходим в меню и открываем нужный подэкран
        store.dispatch({
          type: 'ui/setScreen',
          payload: 'menu',
        });
        store.dispatch({
          type: 'ui/openSubScreen',
          payload: targetSubScreen,
        });
      } else {
        // Просто переключаем основной экран и закрываем подэкраны
        store.dispatch({
          type: 'ui/setScreen',
          payload: targetScreen,
        });
        store.dispatch({ type: 'ui/closeSubScreen' });
      }
    },
    { targetScreen: screen, targetSubScreen: subScreen || null }
  );

  // Даем приложению немного времени на анимации/ленивую загрузку
  await page.waitForTimeout(200);

  // Дополнительно ждём появления характерных элементов нужного экрана
  if (screen === 'chat') {
    await page
      .waitForSelector('textarea, [class*="chat"], [class*="message"]', { timeout: 10000 })
      .catch(() => {});
  } else if (screen === 'main') {
    await page
      .waitForSelector(
        'button[title*="Говорить"], button[title*="Speak"], canvas, [class*="main"], [class*="scene"]',
        { timeout: 10000 }
      )
      .catch(() => {});
  } else if (screen === 'menu') {
    if (subScreen) {
      const subScreenSelectors: Record<string, string> = {
        settings: 'text=/settings|настройки/i, [class*="settings"], [class*="Settings"]',
        apiKeys: 'text=/api|ключ/i, [class*="apiKeys"], [class*="APIKeys"]',
        logs: 'text=/log|журнал/i, [class*="logs"], [class*="Logs"]',
        about: 'text=/about|о приложении|о программе/i, [class*="about"], [class*="About"]',
        auth: '[role="tab"], form, button[type="submit"], [class*="auth"], [class*="Auth"]',
        applications:
          'text=/приложения|applications|каталог/i, [class*="applications"], [data-screen="applications"]',
      };

      const selector = subScreenSelectors[subScreen];
      if (selector) {
        await page.waitForSelector(selector, { timeout: 10000 }).catch(() => {});
      }
    } else {
      await page
        .waitForSelector(
          '[class*="menu"], button:has-text("Настройки"), button:has-text("Settings"), [class*="ScreenHeader"]',
          { timeout: 10000 }
        )
        .catch(() => {});
    }
  }
}

/**
 * Ожидает загрузки 3D сцены (для MainScreen)
 */
export async function waitForSceneReady(page: Page, timeout = 15000): Promise<void> {
  // Пытаемся найти canvas, но не требуем его обязательного наличия
  // (WebGL может быть недоступен в тестовом окружении)
  try {
    await page.waitForSelector('canvas', { timeout: 5000 });
  } catch {
    // Canvas не найден - это нормально для тестового окружения
    // Просто ждем появления контейнера сцены
    await page
      .waitForSelector('[class*="scene"], [class*="container"]', { timeout: 5000 })
      .catch(() => {
        // Игнорируем, если и контейнер не найден
      });
  }

  // Ждем завершения загрузки модели (проверяем по отсутствию индикатора загрузки)
  try {
    // Ждем исчезновения индикатора загрузки
    await page
      .waitForSelector('text=/loading|загрузка/i', {
        state: 'hidden',
        timeout: timeout / 2,
      })
      .catch(() => {
        // Игнорируем, если индикатора нет
      });
  } catch {
    // Игнорируем ошибки
  }

  // Дополнительная задержка для стабилизации UI (уменьшено для скорости)
  await page.waitForTimeout(200);
}
