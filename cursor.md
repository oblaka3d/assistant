# 📚 Документация проекта для AI ассистента

Этот документ содержит структурированную информацию о проекте для быстрого понимания контекста при работе с кодом.

> **⚠️ Важно для Cursor Agent**: При работе с этим проектом **автоматически загружай в контекст** те файлы, которые необходимы для решения задачи.

## 🗂️ Структура документации

**Эти файлы должны быть автоматически загружены в контекст:**

- **[Архитектура проекта](./docs/CURSOR_ARCHITECTURE.md)** - Общая архитектура, структура папок, основные компоненты
- **[Команды и Workflow](./docs/CURSOR_COMMANDS.md)** - Все npm команды, процессы разработки, CI/CD
- **[Технические детали](./docs/CURSOR_TECHNICAL.md)** - Важные технические нюансы, паттерны, решения
- **[Конфигурации](./docs/CURSOR_CONFIGURATION.md)** - Настройки файлов, переменные окружения, зависимости

**Документы по планированию и задачам (для ориентира, не всегда нужно грузить автоматически):**

- **[Action plan](./docs/ACTION_PLAN.md)** - Текущий план работ / ближайшие шаги
- **[Epics](./docs/EPICS.md)** - Эпики и крупные направления
- **[Project plan](./docs/PROJECT_PLAN.md)** - Общее планирование проекта

> 💡 **Подсказка**: Все ссылки выше ведут на markdown файлы в `docs/` директории. Cursor Agent должен автоматически загружать содержимое этих файлов при упоминании `cursor.md` или при вопросах о проекте.

## 🎯 Краткое описание проекта

**Voice Assistant** - Electron приложение с голосовым взаимодействием, интеграцией LLM и 3D визуализацией персонажа.

### Основные технологии:

- **Frontend**: React + TypeScript + Redux Toolkit + Material-UI + THREE.js
- **Backend**: Node.js + Express + MongoDB
- **Desktop**: Electron
- **Testing**: Playwright (визуальные тесты)
- **Build**: Vite + TypeScript

### Ключевые особенности:

- 🎙️ Голосовое взаимодействие (STT → LLM → TTS)
- 💬 Текстовый чат с виртуальной клавиатурой (EN/RU/ZH)
- 👤 3D персонаж с анимациями
- 🧩 Магазин приложений: каталог, установка, импорт ZIP-архивов и обновление версий
- 🔐 Безопасное хранение API ключей
- 🔄 OAuth авторизация

### Монорепа

```
apps/
  desktop/        # Electron + Vite (текущий продукт)
  backend-main/   # REST API + MongoDB
  landing/        # Заглушка, позже — маркетинговый сайт
  mobile/         # Заглушка под React Native
packages/
  shared/         # Общие DTO и утилиты (используются backend + desktop)
docs/             # cursor.md и детальная документация
```

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Скоринговая разработка desktop workspace (Vite dev server + Electron)
npm run dev

# Backend main (опционально во второй вкладке)
npm run dev:backend-main

# Оконный режим desktop
npm run dev:window --workspace @assistant/desktop

# Тесты UI
npm test
```

## 📝 Важные замечания

1. **Роутинг**: Используется URL-роутинг (`/main`, `/chat`, `/menu/settings` и т.д.)
2. **Redux Store**: Доступен через `window.__REDUX_STORE__` для тестов
3. **Prisma ORM**: схема в `apps/backend-main/prisma/schema.prisma`, клиент в `src/lib/prisma.ts`
4. **Zod-типы из Prisma**: `npm run prisma:generate --workspace @assistant/backend-main` генерирует `packages/shared/src/zod/schemas.ts`, которые импортируются в desktop как `@assistant/shared`
5. **Shared DTOs**: `@assistant/shared` экспортирует типы (Applications API и т.д.)
6. **Снапшоты**: Кроссплатформенные (без суффикса платформы)
7. **Git LFS**: Отключен для PNG файлов (снапшоты в обычном Git)
8. **Vite**: React, react-redux, @emotion/react должны быть в основном bundle

## 🔗 Полезные ссылки

- [README.md](./README.md) - Основная документация проекта
