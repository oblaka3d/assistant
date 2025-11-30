# Voice Assistant Monorepo

Этот репозиторий теперь организован как **монорепа**: все приложения (Electron desktop, standalone backend, будущий лендинг и React Native) живут в одном дереве и делят общие пакеты.

## Структура

```
apps/
  desktop/        # Текущее Electron приложение (main + backend-electron + ui-electron)
  backend-main/   # Node.js + MongoDB API сервер
  landing/        # Заготовка под рекламный лендинг (Vite/Next – TBD)
  mobile/         # Заготовка под React Native / Expo приложение
packages/
  shared/         # Общие типы и утилиты (пока заглушка)
docs/             # Документация (cursor.md, CURSOR_*.md)
```

## Скрипты верхнего уровня

| Команда                                                 | Описание                                                                |
| ------------------------------------------------------- | ----------------------------------------------------------------------- |
| `npm run dev`                                           | Запускает desktop workspace (эквивалент `apps/desktop` → `npm run dev`) |
| `npm run dev:backend-main`                              | Запускает API сервер (workspace `apps/backend-main`)                    |
| `npm run build`                                         | Сборка desktop приложения                                               |
| `npm run build:backend-main`                            | Сборка backend-main                                                     |
| `npm run test`                                          | Playwright визуальные тесты desktop UI                                  |
| `npm run lint` / `npm run format` / `npm run typecheck` | Соответствующие проверки для desktop workspace                          |
| `npm run run:all`                                       | Полный цикл `setup MongoDB → build all → старт Electron + backend`      |

Плейсхолдеры `apps/landing`, `apps/mobile`, `packages/shared` уже подключены к workspace и готовы к разработке (команды пока выводят заглушку).

## Как работать

1. Установите зависимости из корня: `npm install`.
2. Работайте с нужным workspace:
   - Desktop: `npm run dev` (или `npm run dev --workspace @assistant/desktop`)
   - Backend: `npm run dev:backend-main`
3. Добавляйте новые пакеты в `apps/` или `packages/` и перечисляйте их в `package.json.workspaces`.

Более подробные инструкции по архитектуре, командам и конфигурациям — в `cursor.md` и `docs/CURSOR_*.md`.
