# 🛠️ Команды и Workflow

## Разработка

> Репозиторий собран на **npm workspaces**. Базовые команды (`npm run dev`, `npm run build`, `npm test`, `npm run lint`) проксируются в workspace `@assistant/desktop`.  
> Любые другие скрипты из desktop-пакета запускайте через `npm run <script> --workspace @assistant/desktop`.

### Основные команды

```bash
# Горячая разработка (Vite dev server + Electron)
npm run dev
# Запускает:
# - Vite dev server на http://localhost:3000
# - TypeScript watch для main процесса
# - Electron с hot reload

# Оконный режим (без kiosk)
npm run dev:desktop:window
# или (эквивалент)
# npm run dev:window --workspace @assistant/desktop

# Только UI (без Electron)
npm run dev:ui --workspace @assistant/desktop

# Backend main сервер
npm run dev:backend-main
# Запускает ts-node-dev для backend-main

# Prisma (backend-main)
npm run prisma:generate --workspace @assistant/backend-main   # ещё обновляет packages/shared/src/zod/*
npm run prisma:push --workspace @assistant/backend-main
```

### Детали dev workflow

**`npm run dev`** выполняет:

1. `dev:ui` - Vite dev server (порт 3000)
2. `dev:watch` - TypeScript watch + Electron
   - `tsc -w` - компиляция main процесса в watch режиме
   - `dev:electron` - запуск Electron из `dist/`

**Важно:**

- Main процесс компилируется в `dist/main/`
- UI загружается из Vite dev server (`http://localhost:3000`)
- Preload скрипт должен быть скомпилирован в `dist/main/preload.js`

## Сборка

```bash
# Полная сборка (main + UI)
npm run build            # alias на build desktop workspace
# Выполняет:
# - tsc (компиляция main процесса)
# - vite build (сборка UI)
# - copy:assets (копирование ресурсов)

# Только UI
npm run build:ui --workspace @assistant/desktop

# Backend main
npm run build:backend-main

# Все (backend-main + main + UI)
npm run build:all --workspace @assistant/desktop
```

### Структура сборки

```
apps/desktop/dist/
├── main/              # Скомпилированный main процесс
│   ├── electron.js
│   ├── preload.js
│   └── utils/
├── ui-electron/       # Собранный UI
│   ├── index.html
│   ├── assets/
│   └── ...
└── backend-electron/  # Скомпилированный backend-electron
```

## Запуск production

```bash
# Полноэкранный режим
npm start

# Оконный режим
npm run start:window --workspace @assistant/desktop

# Backend main сервер
npm run start:backend-main
```

## Тестирование

```bash
# Все Playwright тесты
npm test                # alias на @assistant/desktop

# Визуальные тесты (синоним)
npm run test:visual --workspace @assistant/desktop

# Обновить эталонные снапшоты
npm run test:visual:update --workspace @assistant/desktop
# ⚠️ Используйте локально для обновления снапшотов

# UI режим тестов
npm run test:visual:ui --workspace @assistant/desktop
```

### Конфигурация тестов

- **Файл**: `playwright.config.ts`
- **Тесты**: `ui-electron/src/**/*.spec.ts`
- **Снапшоты**: `ui-electron/src/**/*.spec.ts-snapshots/`
- **Dev server**: `npm run dev:ui` (автоматически запускается)
- **Пример**: `ApplicationsScreen.spec.ts` (каталог — light, мои приложения — dark)

### Важно о снапшотах

- Снапшоты **кроссплатформенные** (без суффикса `-darwin`, `-linux`)
- Шаблон пути: `{testFileDir}/{testFileName}-snapshots/{arg}-{projectName}{ext}`
- Git LFS **отключен** для PNG файлов
- Снапшоты должны быть закоммичены в обычном Git

## Линтинг и форматирование

```bash
# Проверка линтера
npm run lint

# Автоисправление
npm run lint:fix

# Форматирование
npm run format

# Проверка форматирования
npm run format:check

# Проверка типов
npm run typecheck

# Все проверки
npm run check
```

## Дистрибуция

```bash
# Все платформы
npm run dist:all

# Конкретная платформа
npm run dist:linux
npm run dist:linux:arm64
npm run dist:linux:x64
npm run dist:mac
npm run dist:mac:arm64
npm run dist:mac:x64
npm run dist:win
npm run dist:win:x64
npm run dist:win:ia32
```

## Утилиты

```bash
# Настройка MongoDB
npm run setup:mongodb

# Автоматическая настройка MongoDB
npm run setup:mongodb:auto

# Пересборка нативных зависимостей Electron
npm run rebuild

# Полный запуск (MongoDB + backend + Electron)
npm run run:all
```

## CI/CD

### GitHub Actions

**Workflow**: `.github/workflows/test.yml`

**Шаги:**

1. Checkout кода (без LFS)
2. Setup Node.js 18
3. Install dependencies (`npm ci`)
4. Install Playwright browsers
5. Run tests (`npm test`)

**Важно:**

- Git LFS отключен для снапшотов
- Снапшоты должны быть закоммичены в обычном Git
- Тесты запускаются на Linux (Ubuntu)

## Переменные окружения

### Development

```bash
# UI dev server URL (для Electron)
UI_DEV_SERVER_URL=http://localhost:3000

# Window mode (оконный режим)
WINDOW_MODE=true

# Node environment
NODE_ENV=development
```

### Backend Main

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

### UI

Создайте `apps/desktop/ui-electron/.env.local` (опционально):

```env
VITE_API_URL=http://localhost:3001/api/v1
```

## Troubleshooting

### Проблемы с dev режимом

1. **Preload не найден**: Убедитесь, что `tsc -w` запущен и скомпилировал `preload.ts`
2. **UI не загружается**: Проверьте, что Vite dev server запущен на порту 3000
3. **Redux store не найден**: Убедитесь, что UI загружается из dev server, а не из файла

### Проблемы с тестами

1. **Снапшоты не найдены**: Проверьте, что файлы закоммичены и не в LFS
2. **Тесты падают в CI**: Убедитесь, что снапшоты кроссплатформенные
3. **Redux store not found**: Убедитесь, что используется `npm run dev:ui` в webServer
