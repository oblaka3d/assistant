# UI Application

React приложение для голосового ассистента.

## Структура

```
src/
├── screens/          # Экраны приложения
│   ├── MainScreen/   # Главный экран с 3D персонажем
│   ├── ChatScreen/   # Текстовый чат
│   └── MenuScreen/   # Меню с настройками
├── components/       # Переиспользуемые компоненты
├── hooks/           # React хуки (useTheme, useCSSVariables)
├── store/           # Redux store (slices, thunks)
├── renderer/        # THREE.js рендерер
└── utils/           # Утилиты (API, logger, theme)
```

## Экраны

- **Main Screen** - 3D персонаж, голосовое управление
- **Chat Screen** - текстовый чат с историей
- **Menu Screen** - настройки, история, информация

## Навигация

Круговая навигация свайпами: `main ↔ chat ↔ menu`

## Особенности Chat Screen

- Экранная клавиатура с поддержкой EN/RU/ZH и переключением раскладки
- Авто-смещение поля ввода и истории чата по высоте клавиатуры (`--keyboard-offset`)
- Управление с клавиатуры Playwright-тестами через `data-testid` (`chat-keyboard-toggle`)

## Разработка

```bash
# Из корня репозитория: полный dev-режим (Vite + Electron)
npm run dev

# Только UI (без Electron) — полезно для работы с компонентами
npm run dev:ui

# Прод-сборка UI
npm run build:ui
```

### Переменные окружения

UI может использовать `VITE_API_URL` для указания backend API (по умолчанию `http://localhost:3001/api/v1`):

```bash
# ui-electron/.env.local
VITE_API_URL=http://localhost:3001/api/v1
```
