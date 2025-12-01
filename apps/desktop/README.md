# 🎤 Голосовой Ассистент с 3D Персонажем

Electron приложение с голосовым взаимодействием, интеграцией LLM и 3D визуализацией персонажа.

## 🚀 Быстрый старт

```bash
# Из корня репозитория
npm install

# Запуск desktop workspace
npm run dev --workspace @assistant/desktop
```

> Можно также `cd apps/desktop && npm install && npm run dev`, если хотите работать вне workspaces.
> Команда `npm run dev` поднимает Vite на `http://localhost:3000`, компилирует main-процесс в watch-режиме
> и автоматически открывает Electron. Для оконного режима используйте `npm run dev:window --workspace @assistant/desktop`.

## 📋 Требования

- **Node.js**: 18+
- **MongoDB**: автоматически устанавливается при первом запуске (macOS/Linux)
- **Аудио**: `sox` или `arecord`/`aplay` (Linux)

## 🎯 Основные возможности

- 🎙️ Голосовое взаимодействие (STT, LLM, TTS)
- 🤖 Интеграция с OpenAI, Yandex GPT
- 👤 3D персонаж на THREE.js с анимациями
- 💬 Текстовый чат с сохранением истории и экранной клавиатурой (EN/RU/ZH)
- ⚙️ Настройки модели, сцены, темы, акцентных цветов
- 🧩 Магазин приложений: каталог, установка, импорт ZIP-архивов и управление версиями
- 🔐 Безопасное хранение API ключей (шифрование)
- 🔄 OAuth авторизация (Google, Yandex, GitHub)

## 📁 Структура проекта

```
apps/desktop/
├── backend-electron/      # STT → LLM → TTS пайплайн внутри Electron
├── main/                  # Main процесс (electron.ts, preload.ts, ipc.ts)
├── ui-electron/           # React UI (screens/, components/, store/)
├── scripts/               # CLI утилиты (setup MongoDB, и т.д.)
├── types/                 # Глобальные типы для main/backend-electron
└── dist/                  # Сборка desktop приложения
```

## 🔗 Общие типы (`@assistant/shared`)

- DTO для магазина приложений находятся в `packages/shared`
- В UI импортируйте `SharedApplicationDTO`, `SharedApplicationVersionHistoryDTO` и прочие типы через `@assistant/shared`
- Перед запуском убедитесь, что пакет собран: `npm run build --workspace @assistant/shared`

## 🧭 Роутинг

Приложение использует URL-роутинг для навигации:

- `/` или `/main` → Главный экран
- `/chat` → Экран чата
- `/menu` → Меню
- `/menu/applications` → Магазин приложений (каталог и установленные приложения)
- `/menu/settings` → Настройки
- `/menu/apiKeys` → API ключи
- и т.д.

Подробнее см. [ui-electron/src/tests/ROUTING.md](./ui-electron/src/tests/ROUTING.md)

## 🛠️ Команды разработки

```bash
# Горячая разработка (Vite dev server + Electron)
npm run dev --workspace @assistant/desktop

# То же, но в оконном режиме (без kiosk)
npm run dev:window --workspace @assistant/desktop

# Только Vite UI (без Electron)
npm run dev:ui --workspace @assistant/desktop

# Backend main (nodemon + ts-node)
npm run dev:backend-main   # workspace @assistant/backend-main

# Полный запуск (MongoDB + backend + Electron, production сборка)
npm run run:all --workspace @assistant/desktop

# Сборка фронта и main-процесса
npm run build:all --workspace @assistant/desktop

# Запуск собранного приложения
npm run start --workspace @assistant/desktop
npm run start:window --workspace @assistant/desktop
```

## 🧪 Тестирование

```bash
# Все Playwright-тесты
npm test --workspace @assistant/desktop

# Скриншотные тесты (визуальное тестирование UI)
npm run test:visual --workspace @assistant/desktop

# Обновить эталонные скриншоты
npm run test:visual:update --workspace @assistant/desktop

# Запустить тесты в UI режиме
npm run test:visual:ui --workspace @assistant/desktop
```

Подробнее о тестах см. [tests/README.md](./tests/README.md)

## ⚙️ Настройка

### Переменные окружения

Создайте `.env` в `apps/backend-main/`:

```env
# Обязательные
API_KEY_SECRET=<секрет_для_шифрования>
JWT_SECRET=<секрет_для_JWT>
MONGODB_URI=mongodb://localhost:27017/voice-assistant

# OAuth (опционально)
GOOGLE_CLIENT_ID=<ваш_client_id>
GOOGLE_CLIENT_SECRET=<ваш_client_secret>
```

Для UI можно задать `VITE_API_URL`, чтобы переопределить базовый URL API (по умолчанию `http://localhost:3001/api/v1`):

```bash
# apps/desktop/ui-electron/.env.local (опционально)
VITE_API_URL=http://localhost:3001/api/v1
```

### Получение Google OAuth credentials

1. [Google Cloud Console](https://console.cloud.google.com/) → Создать проект
2. APIs & Services → Library → Включить "Google Identity API"
3. Credentials → Create OAuth client ID → Web application
4. Authorized redirect URIs: `http://localhost:3001/api/v1/auth/google/callback`
5. Скопируйте Client ID и Secret в `.env`

## 📦 Технологии

- **Electron** - десктопное приложение
- **React + TypeScript** - UI
- **Redux Toolkit** - состояние
- **THREE.js** - 3D графика
- **Material-UI** - компоненты
- **MongoDB + Mongoose** - база данных
- **Express** - backend API
- **Playwright** - скриншотные тесты

## 📝 Лицензия

MIT
