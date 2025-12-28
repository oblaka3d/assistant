# 🖼️ Скриншоты экранов (из Playwright снапшотов)

В этом документе собраны **актуальные изображения экранов UI**, которые берутся напрямую из снапшотов Playwright (`toHaveScreenshot`) — т.е. это “живая” документация, привязанная к визуальным тестам.

## Как обновлять

Снапшоты генерируются командой:

```bash
npm run test:visual:update --workspace @assistant/desktop
```

> Примечание: в текущем CI тесты могут падать из‑за окружения/рендеринга. Но сами снапшоты всё равно можно обновлять локально и коммитить.

---

## WelcomeScreen

- **Тест**: `apps/desktop/ui-electron/src/screens/WelcomeScreen/WelcomeScreen.spec.ts`

![WelcomeScreen — light](../apps/desktop/ui-electron/src/screens/WelcomeScreen/WelcomeScreen.spec.ts-snapshots/welcome-screen-light-chromium.png)

![WelcomeScreen — dark](../apps/desktop/ui-electron/src/screens/WelcomeScreen/WelcomeScreen.spec.ts-snapshots/welcome-screen-dark-chromium.png)

## MainScreen

- **Тест**: `apps/desktop/ui-electron/src/screens/MainScreen/MainScreen.spec.ts`

![MainScreen — light](../apps/desktop/ui-electron/src/screens/MainScreen/MainScreen.spec.ts-snapshots/main-screen-light-chromium.png)

![MainScreen — dark](../apps/desktop/ui-electron/src/screens/MainScreen/MainScreen.spec.ts-snapshots/main-screen-dark-chromium.png)

## ChatScreen

- **Тест**: `apps/desktop/ui-electron/src/screens/ChatScreen/ChatScreen.spec.ts`

![ChatScreen — light (welcome)](../apps/desktop/ui-electron/src/screens/ChatScreen/ChatScreen.spec.ts-snapshots/chat-screen-light-welcome-chromium.png)

![ChatScreen — dark (welcome)](../apps/desktop/ui-electron/src/screens/ChatScreen/ChatScreen.spec.ts-snapshots/chat-screen-dark-welcome-chromium.png)

![ChatScreen — dark (emoji picker)](../apps/desktop/ui-electron/src/screens/ChatScreen/ChatScreen.spec.ts-snapshots/chat-screen-dark-emoji-picker-chromium.png)

![ChatScreen — dark (markdown)](../apps/desktop/ui-electron/src/screens/ChatScreen/ChatScreen.spec.ts-snapshots/chat-screen-dark-markdown-chromium.png)

![ChatScreen — light (conversation)](../apps/desktop/ui-electron/src/screens/ChatScreen/ChatScreen.spec.ts-snapshots/chat-screen-light-conversation-chromium.png)

![ChatScreen — light (keyboard open)](../apps/desktop/ui-electron/src/screens/ChatScreen/ChatScreen.spec.ts-snapshots/chat-screen-light-conversation-keyboard-chromium.png)

![ChatScreen — dialog panel](../apps/desktop/ui-electron/src/screens/ChatScreen/ChatScreen.spec.ts-snapshots/chat-screen-dialog-panel-chromium.png)

## IdleScreen

- **Тест**: `apps/desktop/ui-electron/src/screens/IdleScreen/IdleScreen.spec.ts`

![IdleScreen — light](../apps/desktop/ui-electron/src/screens/IdleScreen/IdleScreen.spec.ts-snapshots/idle-screen-light-chromium.png)

![IdleScreen — dark](../apps/desktop/ui-electron/src/screens/IdleScreen/IdleScreen.spec.ts-snapshots/idle-screen-dark-chromium.png)

## MenuScreen

- **Тест**: `apps/desktop/ui-electron/src/screens/MenuScreen/MenuScreen.spec.ts`

![MenuScreen — light](../apps/desktop/ui-electron/src/screens/MenuScreen/MenuScreen.spec.ts-snapshots/menu-screen-light-chromium.png)

![MenuScreen — dark](../apps/desktop/ui-electron/src/screens/MenuScreen/MenuScreen.spec.ts-snapshots/menu-screen-dark-chromium.png)

### Menu → Settings

- **Тест**: `apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/SettingsScreen/SettingsScreen.spec.ts`

![SettingsScreen — light](../apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/SettingsScreen/SettingsScreen.spec.ts-snapshots/settings-screen-light-chromium.png)

![SettingsScreen — dark](../apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/SettingsScreen/SettingsScreen.spec.ts-snapshots/settings-screen-dark-chromium.png)

### Menu → API Keys

- **Тест**: `apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/APIKeysScreen/APIKeysScreen.spec.ts`

![APIKeysScreen — light](../apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/APIKeysScreen/APIKeysScreen.spec.ts-snapshots/api-keys-screen-light-chromium.png)

![APIKeysScreen — dark](../apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/APIKeysScreen/APIKeysScreen.spec.ts-snapshots/api-keys-screen-dark-chromium.png)

### Menu → Logs

- **Тест**: `apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/LogsScreen/LogsScreen.spec.ts`

![LogsScreen — light](../apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/LogsScreen/LogsScreen.spec.ts-snapshots/logs-screen-light-chromium.png)

![LogsScreen — dark](../apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/LogsScreen/LogsScreen.spec.ts-snapshots/logs-screen-dark-chromium.png)

### Menu → About

- **Тест**: `apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/AboutScreen/AboutScreen.spec.ts`

![AboutScreen — light](../apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/AboutScreen/AboutScreen.spec.ts-snapshots/about-screen-light-chromium.png)

![AboutScreen — dark](../apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/AboutScreen/AboutScreen.spec.ts-snapshots/about-screen-dark-chromium.png)

### Menu → Auth

- **Тест**: `apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/AuthScreen/AuthScreen.spec.ts`

![AuthScreen (login) — light](../apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/AuthScreen/AuthScreen.spec.ts-snapshots/auth-screen-login-light-chromium.png)

![AuthScreen (login) — dark](../apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/AuthScreen/AuthScreen.spec.ts-snapshots/auth-screen-login-dark-chromium.png)

### Menu → Applications

- **Тест**: `apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/ApplicationsScreen/ApplicationsScreen.spec.ts`

![ApplicationsScreen (catalog) — light](../apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/ApplicationsScreen/ApplicationsScreen.spec.ts-snapshots/applications-screen-catalog-light-chromium.png)

![ApplicationsScreen (my apps) — dark](../apps/desktop/ui-electron/src/screens/MenuScreen/subscreens/ApplicationsScreen/ApplicationsScreen.spec.ts-snapshots/applications-screen-my-apps-dark-chromium.png)

