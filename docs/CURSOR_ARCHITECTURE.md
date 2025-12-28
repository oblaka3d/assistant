# 🏗️ Архитектура проекта

> Навигация по документации: **[`docs/INDEX.md`](./INDEX.md)** (единая точка входа).

## Общая структура

```
assistant/
├── apps/
│   ├── desktop/           # Electron приложение
│   │   ├── main/          # Main процесс (BrowserWindow, IPC, preload)
│   │   ├── backend-electron/ # Голосовой pipeline внутри Electron
│   │   ├── ui-electron/   # React + Vite фронтенд
│   │   ├── scripts/       # CLI утилиты (setup MongoDB и т.д.)
│   │   └── dist/          # Сборки desktop приложения
│   ├── backend-main/      # Node.js + MongoDB сервер
│   ├── landing/           # Заглушка под будущий маркетинговый сайт
│   └── mobile/            # Заглушка под React Native
├── packages/
│   └── shared/            # Общие типы/утилиты (пока пример)
├── docs/                  # Документация (CURSOR_*.md)
└── cursor.md              # Главный навигационный файл
```

## Основные компоненты

### 1. Electron Main Process (`apps/desktop/main/`)

**Ответственность:**

- Создание и управление окнами
- IPC коммуникация между процессами
- Доступ к системным API

**Ключевые файлы:**

- `electron.ts` - Точка входа, создание BrowserWindow
- `preload.ts` - Preload скрипт, экспортирует безопасные API в renderer
- `ipc.ts` - Обработчики IPC сообщений

### 2. UI Application (`apps/desktop/ui-electron/`)

**Технологии:**

- React 18 + TypeScript
- Redux Toolkit для state management
- Material-UI для компонентов
- THREE.js для 3D графики
- React Router для навигации

**Структура Redux Store:**

```typescript
{
  ui: { screen, subScreen, isTransitioning, ... },
  voice: { isRecording, isProcessing, ... },
  chat: { dialogs, messages, currentDialogId, ... },
  settings: { theme, accentColor, ... },
  user: { isAuthenticated, userData, ... },
  apiKeys: { keys, ... }
}
```

**Роутинг:**

- `/` или `/main` → MainScreen (3D персонаж)
- `/chat` → ChatScreen (текстовый чат)
- `/menu` → MenuScreen
- `/menu/settings` → SettingsScreen
- `/menu/apiKeys` → APIKeysScreen
- `/menu/logs` → LogsScreen
- `/menu/about` → AboutScreen
- `/menu/auth` → AuthScreen
- `/menu/applications` → ApplicationsScreen (каталог и установленные приложения)

#### ApplicationsScreen

- Файл: `ui-electron/src/screens/MenuScreen/subscreens/ApplicationsScreen/ApplicationsScreen.tsx`
- Два таба:
  - `store` — публичный каталог, доступен без авторизации
  - `installed` — мои приложения с дополнительными фильтрами, требует авторизацию
- Используются хуки:
  - `useApplicationsData` — подгрузка каталога/установленных приложений/квоты хранилища и синхронизация с `applicationsSlice`
  - `useApplicationsFilters` — поиск и фильтр по статусу
  - `useApplicationKeyAvailability` — debounce-проверка ID приложения через `/applications/catalog/availability/:key`
  - `useFileDropZone` — drag&drop для ZIP-архивов
- Redux состояние делится на два слайса:
  - `applicationsSlice` (`catalog`, `installed`, `storage`)
  - `applicationsFormsSlice` (значения и ошибки форм create/import/edit)
- Поддерживаются операции:
  - Создание каталожной записи и автоустановка (диалог `ApplicationCreateDialog`)
  - Импорт ZIP-архива без авторизации (диалог `ApplicationImportDialog`)
  - Обновление версии/иконки/релиз-нотов через `ApplicationEditDialog`
  - Отправка приложения на ревью (`draft/rejected → pending`), установка и удаление
  - Просмотр занятого места (LinearProgress + `loadApplicationsStorage`)
- Тестовое покрытие: `ApplicationsScreen.spec.ts` + снапшоты в `ApplicationsScreen.spec.ts-snapshots/`.

### 3. Backend Electron (`apps/desktop/backend-electron/`)

**Ответственность:**

- HTTP сервер для UI (порт 3000)
- Голосовое взаимодействие (STT → LLM → TTS)
- Интеграция с LLM провайдерами

**Поток голосового взаимодействия:**

1. `voice.ts` - Запись аудио
2. `stt.ts` - Преобразование речи в текст
3. `llm.ts` - Генерация ответа через LLM
4. `tts.ts` - Преобразование текста в речь
5. Воспроизведение аудио

### 4. Backend Main (`apps/backend-main/`)

**Ответственность:**

- REST API сервер (порт 3001)
- Работа с MongoDB
- OAuth авторизация
- Управление пользователями и диалогами

**API Endpoints:**

- `/api/v1/auth/*` - OAuth авторизация
- `/api/v1/chats/*` - Управление диалогами (чаты)
- `/api/v1/settings/*` - Настройки пользователя
- `/api/v1/api-keys/*` - Хранение API ключей (шифрование на сервере)
- `/api/v1/applications/*` - Каталог приложений, импорт ZIP и пользовательское хранилище

#### Applications subsystem

- Роутер: `apps/backend-main/src/routes/applicationsRoutes.ts`
  - `GET /catalog` — публичный каталог (статус `published`)
  - `POST /catalog` — создание черновика (требует авторизацию)
  - `GET /catalog/:appKey` — детали + версия/история
  - `PATCH /catalog/:appKey/status` — модерация (admin/tool)
  - `POST /catalog/:appKey/versions` — загрузка новой версии (FormData + ZIP)
  - `POST /installed` / `DELETE /installed/:key` — установка/удаление для текущего пользователя
  - `POST /import` — импорт ZIP без авторизации, результат сохраняется пользователю после логина
  - `GET /storage` — объём занимаемого места (100 MB лимит на пользователя)
- Сервисы:
  - `applicationsService.ts` — валидация ключей, статусов (`draft/pending/published/rejected`), версионирование (`patch/minor/major`), **данные читаются/пишутся через Prisma (`prisma/schema.prisma`) и DTO из `@assistant/shared`**
  - `applicationStorageService.ts` — файловая система (`storage/applications/<user>/<app>/<version>`), sanitize имён, размер каталога, лимит 100 МБ, разрешены только `.zip`
- Prisma модели `Application`/`UserApplication` заменяют Mongoose-слой для каталога и установок

### 5. Shared Packages (`packages/shared/`)

- `@assistant/shared` — TypeScript-библиотека с общими типами/утилитами
- Используется как точка расширения для переиспользуемой логики между desktop, backend, landing и mobile
- Сборка: `npm run build --workspace @assistant/shared`

## Потоки данных

### Голосовое взаимодействие:

```
Microphone → backend-electron/voice.ts → STT → LLM → TTS → Speaker
```

### Текстовый чат:

```
UI (ChatScreen) → Redux (chatSlice) → API (`apps/backend-main`) → MongoDB
```

### IPC коммуникация:

```
Renderer Process ←→ Preload Script ←→ Main Process
```

### Каталог приложений:

```
ApplicationsScreen (store/thunks) ↔ apps/backend-main /applications/*
    ↕                                   ↕
applicationsSlice / forms        MongoDB + storage/applications
```

## Важные паттерны

### 1. Redux State Management

- Все состояние в Redux Toolkit
- Async логика в thunks
- Сериализуемые данные (Date → ISO string)

### 2. Роутинг

- URL-роутинг через React Router
- Синхронизация с Redux через `RouterSync`
- Предотвращение race conditions через `useRef`

### 3. Тестирование

- Playwright для визуальных тестов
- Снапшоты рядом с тестами (`*.spec.ts-snapshots/`)
- Кроссплатформенные снапшоты (без суффикса платформы)

### 4. Сборка

- Vite для UI (dev server + production build)
- TypeScript для main процесса
- Electron Builder для дистрибуции

## Зависимости между модулями

```
apps/desktop/main/electron.ts
  ├── apps/desktop/backend-electron/server.ts (HTTP сервер/voice pipeline)
  └── apps/desktop/ui-electron/ (рендерится в BrowserWindow)

apps/desktop/ui-electron/
  ├── Redux Store (локальное состояние)
  └── API calls → apps/backend-main (REST API)

apps/desktop/backend-electron/
  └── LLM providers (OpenAI, Yandex GPT)

apps/backend-main/
  └── MongoDB (хранение данных)
```
