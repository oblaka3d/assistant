# ⚙️ Конфигурации

## Файлы конфигурации

> Примечание: пути вида `ui-electron/...` относятся к workspace `apps/desktop/ui-electron/...`.

### 1. `package.json`

**Основные скрипты:**

- `dev` - разработка (Vite + Electron)
- `build` - сборка (TypeScript + Vite)
- `test` - Playwright тесты
- `lint` - ESLint
- `format` - Prettier

**Важные зависимости:**

- `electron` - Desktop framework
- `react`, `react-dom` - UI framework
- `@reduxjs/toolkit` - State management
- `@playwright/test` - Testing
- `vite` - Build tool
- `typescript` - Type checking

### 2. `vite.config.ts`

**Ключевые настройки:**

```typescript
{
  root: 'ui-electron',
  base: './',  // Относительные пути для Electron
  build: {
    outDir: '../dist/ui-electron',
    sourcemap: command === 'serve',  // Только в dev
  },
  server: {
    port: 3000,
  }
}
```

**Chunk splitting:**

- `three` - THREE.js библиотека
- `mui` - Material-UI
- `markdown` - Markdown библиотеки
- React и связанные - основной bundle

### 3. `playwright.config.ts`

**Основные настройки:**

```typescript
{
  testDir: 'ui-electron/src',
  testMatch: '**/*.spec.ts',
  snapshotPathTemplate: '{testFileDir}/{testFileName}-snapshots/{arg}-{projectName}{ext}',
  webServer: {
    command: 'npm run dev:ui',
    url: 'http://localhost:3000',
  }
}
```

**Важно:**

- Снапшоты кроссплатформенные
- Dev server запускается автоматически
- Redux store доступен через `window.__REDUX_STORE__`

### 4. `apps/desktop/tsconfig.json`

**Для main процесса:**

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": ".",
    "target": "ES2020",
    "module": "commonjs"
  }
}
```

### 5. `apps/desktop/ui-electron/tsconfig.json`

**Для UI:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "moduleResolution": "bundler"
  }
}
```

### 6. `.gitattributes`

**Git LFS:**

```
# PNG files in snapshots are small enough to store in regular Git
# apps/desktop/ui-electron/src/**/*.png filter=lfs diff=lfs merge=lfs -text
```

**Важно:** Git LFS отключен для снапшотов (они хранятся в обычном Git)

### 7. `.github/workflows/test.yml`

**CI конфигурация:**

```yaml
steps:
  - checkout (без LFS)
  - setup Node.js 18
  - install dependencies
  - install Playwright browsers
  - run tests
```

**Важно:**

- Git LFS не используется
- Снапшоты должны быть закоммичены в обычном Git
- Тесты запускаются на Linux

## Переменные окружения

### Development

**Main процесс:**

```bash
NODE_ENV=development
UI_DEV_SERVER_URL=http://localhost:3000
WINDOW_MODE=true  # Оконный режим
```

### Backend Main

**Файл**: `apps/backend-main/.env`

```env
# Обязательные
API_KEY_SECRET=<32-символьный_секрет>
JWT_SECRET=<32-символьный_секрет>
MONGODB_URI=mongodb://localhost:27017/voice-assistant?replicaSet=rs0&directConnection=true
DATABASE_URL=mongodb://localhost:27017/voice-assistant?replicaSet=rs0&directConnection=true

# OAuth (опционально)
GOOGLE_CLIENT_ID=<client_id>
GOOGLE_CLIENT_SECRET=<client_secret>
YANDEX_CLIENT_ID=<client_id>
YANDEX_CLIENT_SECRET=<client_secret>
GITHUB_CLIENT_ID=<client_id>
GITHUB_CLIENT_SECRET=<client_secret>
```

> Prisma всегда использует транзакции, поэтому MongoDB должна работать в режиме **replica set**. Для локальной установки через Homebrew:
>
> 1. Добавьте в `/opt/homebrew/etc/mongod.conf` блок
>    ```
>    replication:
>      replSetName: rs0
>    ```
> 2. Перезапустите `brew services restart mongodb-community`.
> 3. Выполните `mongosh --quiet --eval "rs.initiate()"`.
> 4. Убедитесь, что `mongosh --quiet --eval "rs.status().members.map(m => m.stateStr)"` возвращает `['PRIMARY']`.

### UI

**Файл**: `apps/desktop/ui-electron/.env.local` (опционально)

```env
VITE_API_URL=http://localhost:3001/api/v1
```

## Redux Store Configuration

**Файл**: `ui-electron/src/store/index.ts`

**Slices:**

- `ui` - UI состояние (screen, subScreen, transitions)
- `voice` - Голосовое взаимодействие
- `chat` - Чат (dialogs, messages)
- `settings` - Настройки (theme, colors)
- `user` - Пользователь (auth, user data)
- `apiKeys` - API ключи

**Middleware:**

- По умолчанию (без serializableCheck для упрощения)

## Electron Configuration

**Файл**: `electron-builder.yml`

**Настройки:**

- Платформы: macOS, Windows, Linux
- Архитектуры: x64, arm64, ia32
- Автоматическое обновление: настраивается

## MongoDB Configuration

**Автоматическая установка:**

- macOS: через Homebrew
- Linux: через apt/yum
- Windows: требует ручной установки

**Скрипт**: `apps/backend-main/scripts/setup-mongodb.ts`

## API Configuration

**Базовый URL:**

- По умолчанию: `http://localhost:3001/api/v1`
- Переопределяется через `VITE_API_URL`

**Endpoints:**

- `/api/v1/auth/*` - OAuth авторизация
- `/api/v1/users/*` - Пользователи
- `/api/v1/dialogs/*` - Диалоги
- `/api/v1/messages/*` - Сообщения
- `/api/v1/applications/*` - Каталог и управление приложениями

### Applications API

- `GET /applications/catalog` — публичный список опубликованных приложений
- `POST /applications/catalog` — создание черновика (требует авторизацию)
- `GET /applications/catalog/availability/:appKey` — проверка уникальности key
- `GET /applications/catalog/:appKey` — детали + история версий (только авторизованные)
- `PATCH /applications/catalog/:appKey/status` — обновление статуса (`draft/pending/published/rejected`)
- `POST /applications/catalog/:appKey/versions` — загрузка новой версии (FormData, поле `archive`)
- `POST /applications/installed` — установить приложение текущему пользователю
- `DELETE /applications/installed/:appKey` — удалить из «моих» приложений
- `GET /applications/installed` — список установленных приложений
- `GET /applications/storage` — использование пользовательского хранилища (лимит 100 МБ)
- `POST /applications/import` — импорт ZIP архива без авторизации (guest → user)

### Prisma (backend-main)

- Схема: `apps/backend-main/prisma/schema.prisma`
- Генерация клиента и zod-схем: `npm run prisma:generate --workspace @assistant/backend-main`
- Применение схемы: `npm run prisma:push --workspace @assistant/backend-main`
- Клиент используется через `apps/backend-main/src/lib/prisma.ts`
- Автогенерируемые zod-схемы и типы складываются в `packages/shared/src/zod/schemas.ts` и доступны в desktop через `@assistant/shared`

## CSS Variables

**Глобальные переменные:**

```css
:root {
  --keyboard-offset: 0px;
  --keyboard-open: 0;
  --primary: #...;
  --surface: #...;
  --text-primary: #...;
}
```

**Использование:**

- Динамические значения (keyboard offset)
- Темы (light/dark)
- Акцентные цвета

## i18n Configuration

**Файлы:**

- `ui-electron/src/i18n/locales/en.json`
- `ui-electron/src/i18n/locales/ru.json`
- `ui-electron/src/i18n/locales/zh.json`

**Использование:**

```typescript
const { t, i18n } = useTranslation();
i18n.changeLanguage('ru');
t('chat.sendMessage');
```

## Keyboard Layouts

**Файл**: `ui-electron/src/components/ChatKeyboard/ChatKeyboard.tsx`

**Поддерживаемые языки:**

- `en` - English
- `ru` - Русский
- `zh` - Китайский

**Layouts:**

- `default` - Обычная раскладка
- `shift` - С Shift

## Emoji Picker Configuration

**Библиотека**: `emoji-picker-react`

**Настройки:**

- Theme: light/dark (зависит от темы приложения)
- Emoji style: native
- Preview: отключен
- Skin tones: отключены

## Testing Configuration

**Playwright:**

- Браузер: Chromium
- Платформа: кроссплатформенная
- Снапшоты: без суффикса платформы

**Утилиты:**

- `compareScreenshot()` - сравнение скриншотов
- `waitForAppReady()` - ожидание загрузки
- `setTheme()` - установка темы
- `navigateToScreen()` - навигация

## Build Output

**Структура `apps/desktop/dist/`:**

```
apps/desktop/dist/
├── main/              # Main процесс
│   ├── electron.js
│   ├── preload.js
│   └── utils/
├── ui-electron/       # UI
│   ├── index.html
│   ├── assets/
│   └── ...
└── backend-electron/  # Backend electron
```

## Applications Storage

- Директория: `apps/backend-main/storage/applications/<userId>/<appKey>/<version>`
- Максимальный объём на пользователя — `100 MB` (`APPLICATION_STORAGE_LIMIT_BYTES`)
- Разрешённые архивы: `.zip`
- Имена хранятся в безопасном формате (`sanitizeSegment`, `sanitizeArchiveName`)
- Импорт (`POST /applications/import`) и обновления версий используют `multer` с кастомным `diskStorage`

## Ports

- **3000** - Vite dev server (UI)
- **3001** - Backend main API server
- **27017** - MongoDB (по умолчанию)

## File Paths

**Важные пути:**

- Main process: `apps/desktop/main/electron.ts` → `apps/desktop/dist/main/electron.js`
- Preload: `apps/desktop/main/preload.ts` → `apps/desktop/dist/main/preload.js`
- UI: `apps/desktop/ui-electron/` → `apps/desktop/dist/ui-electron/`
- Assets: `apps/desktop/ui-electron/public/assets/` → `apps/desktop/dist/ui-electron/assets/`
