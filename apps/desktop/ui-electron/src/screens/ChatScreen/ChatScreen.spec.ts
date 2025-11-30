import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

import { compareScreenshot, navigateToScreen, setTheme, waitForAppReady } from '../../utils/tests';

type TestMessageSeed = {
  id?: string;
  text: string;
  position?: 'left' | 'right';
  type?: 'text' | 'markdown';
};

type TestDialogSeed = {
  id?: string;
  title?: string;
  messages?: TestMessageSeed[];
};

async function seedMessages(page: Page, messages: TestMessageSeed[]): Promise<void> {
  await page.evaluate((msgs) => {
    type WindowWithStore = Window & {
      __REDUX_STORE__?: {
        dispatch: (action: unknown) => void;
        getState: () => unknown;
      };
    };
    const win = window as WindowWithStore;
    const store = win.__REDUX_STORE__;
    if (!store) {
      return;
    }
    const state = store.getState() as { chat?: { currentDialogId?: string | null } };
    const dialogId: string | null = state.chat?.currentDialogId ?? null;
    const now = Date.now();
    const payload = msgs.map((msg, index) => ({
      id: msg.id ?? `test-msg-${index}`,
      position: msg.position ?? (index % 2 === 0 ? 'right' : 'left'),
      type: msg.type ?? 'text',
      text: msg.text,
      date: new Date(now - (msgs.length - index) * 1000).toISOString(),
    }));
    if (dialogId) {
      store.dispatch({
        type: 'chat/setMessages',
        payload: { dialogId, messages: payload },
      });
    }
  }, messages);
}

async function seedDialogs(page: Page, dialogs: TestDialogSeed[]): Promise<void> {
  await page.evaluate((dialogsData) => {
    type WindowWithStore = Window & { __REDUX_STORE__?: { dispatch: (action: unknown) => void } };
    const win = window as WindowWithStore;
    const store = win.__REDUX_STORE__;
    if (!store) {
      return;
    }
    const now = Date.now();
    const prepared = dialogsData.map((dialog, dialogIndex) => ({
      id: dialog.id ?? `dialog-${dialogIndex}`,
      title: dialog.title ?? `Диалог ${dialogIndex + 1}`,
      createdAt: new Date(now - dialogIndex * 100000).toISOString(),
      updatedAt: new Date(now - dialogIndex * 60000).toISOString(),
      messages:
        dialog.messages?.map((message, messageIndex) => ({
          id: message.id ?? `dialog-${dialogIndex}-msg-${messageIndex}`,
          position: message.position ?? (messageIndex % 2 === 0 ? 'right' : 'left'),
          type: message.type ?? 'text',
          text: message.text,
          date: new Date(now - (dialogIndex * 100000 + messageIndex * 1000)).toISOString(),
        })) ?? [],
    }));
    store.dispatch({ type: 'chat/setDialogs', payload: prepared });
    if (prepared[0]) {
      store.dispatch({ type: 'chat/selectDialog', payload: prepared[0].id });
    }
  }, dialogs);
}

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

  test('ChatScreen - Dark Theme - Emoji Picker', async ({ page }) => {
    await setTheme(page, 'dark');

    const toggleButton = page.getByTestId('chat-keyboard-toggle');
    await toggleButton.click();

    const keyboardWrapper = page.getByTestId('chat-keyboard-wrapper');
    await expect(keyboardWrapper).toBeVisible();

    const emojiButton = page
      .locator('[data-testid="chat-keyboard-wrapper"] .chat-emoji-key')
      .first();
    await emojiButton.click();

    const emojiPicker = page.getByTestId('emoji-picker');
    await expect(emojiPicker).toBeVisible();

    await page.waitForTimeout(200);

    await compareScreenshot(page, 'chat-screen-dark-emoji-picker', {
      fullPage: true,
      threshold: 0.25,
    });
  });

  test('ChatScreen - Dark Theme - Markdown Message', async ({ page }) => {
    await setTheme(page, 'dark');

    await seedMessages(page, [
      { position: 'right', text: 'Привет! Покажи markdown.' },
      {
        position: 'left',
        type: 'markdown',
        text: '# Заголовок\n\n**Жирный текст** и _курсив_.\n\n- Пункт 1\n- Пункт 2\n\n```ts\nconst hello = "world";\n```',
      },
    ]);

    await page.waitForTimeout(200);

    await compareScreenshot(page, 'chat-screen-dark-markdown', {
      fullPage: true,
      threshold: 0.25,
    });
  });

  test('ChatScreen - Light Theme - Long Conversation', async ({ page }) => {
    await setTheme(page, 'light');

    const longConversation = Array.from({ length: 14 }).map((_, index) => ({
      position: index % 2 === 0 ? 'right' : 'left',
      text: `Сообщение ${index + 1}. Длинный текст для проверки прокрутки и визуального расположения пузырей.`,
    }));

    await seedMessages(page, longConversation);

    await compareScreenshot(page, 'chat-screen-light-conversation', {
      fullPage: true,
      threshold: 0.25,
    });
  });

  test('ChatScreen - Light Theme - Long Conversation Keyboard Open', async ({ page }) => {
    await setTheme(page, 'light');

    const longConversation = Array.from({ length: 12 }).map((_, index) => ({
      position: index % 2 === 0 ? 'right' : 'left',
      text: `Сообщение ${index + 1}. Ещё немного текста для проверки поведения клавиатуры.`,
    }));

    await seedMessages(page, longConversation);

    await page.waitForSelector('[data-testid="chat-keyboard-toggle"]', { timeout: 15000 });
    const toggleButton = page.getByTestId('chat-keyboard-toggle');
    await toggleButton.click();
    await expect(page.getByTestId('chat-keyboard-wrapper')).toBeVisible();
    await page.waitForTimeout(200);

    await compareScreenshot(page, 'chat-screen-light-conversation-keyboard', {
      fullPage: true,
      threshold: 0.25,
    });
  });

  test('ChatScreen - Dark Theme - Long Conversation Keyboard Open', async ({ page }) => {
    await setTheme(page, 'dark');

    const longConversation = Array.from({ length: 12 }).map((_, index) => ({
      position: index % 2 === 0 ? 'right' : 'left',
      text: `Сообщение ${index + 1}. Ещё немного текста для проверки поведения клавиатуры.`,
    }));

    await seedMessages(page, longConversation);

    await page.waitForSelector('[data-testid="chat-keyboard-toggle"]', { timeout: 15000 });
    const toggleButton = page.getByTestId('chat-keyboard-toggle');
    await toggleButton.click();
    await expect(page.getByTestId('chat-keyboard-wrapper')).toBeVisible();
    await page.waitForTimeout(200);

    await compareScreenshot(page, 'chat-screen-light-conversation-keyboard', {
      fullPage: true,
      threshold: 0.25,
    });
  });

  test('ChatScreen - Dialog Panel Open', async ({ page }) => {
    await setTheme(page, 'dark');

    await seedDialogs(page, [
      {
        title: 'Проект AI',
        messages: [
          { position: 'right', text: 'Как дела с проектом?' },
          { position: 'left', text: 'Готовим презентацию.' },
        ],
      },
      {
        title: 'Исследование рынка',
        messages: [
          { position: 'right', text: 'Какие выводы по анализу?' },
          { position: 'left', text: 'Есть несколько трендов.' },
        ],
      },
      {
        title: 'Семинар',
        messages: [
          { position: 'right', text: 'Напомни о времени семинара.' },
          { position: 'left', text: 'В пятницу в 14:00.' },
        ],
      },
    ]);

    await page.evaluate(() => {
      type WindowWithStore = Window & { __REDUX_STORE__?: { dispatch: (action: unknown) => void } };
      const win = window as WindowWithStore;
      win.__REDUX_STORE__?.dispatch({ type: 'chat/setDialogPanelOpen', payload: true });
    });

    await page.waitForTimeout(200);

    await compareScreenshot(page, 'chat-screen-dialog-panel', {
      fullPage: true,
      threshold: 0.25,
    });
  });
});
