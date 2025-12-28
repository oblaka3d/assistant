# 📚 Документация проекта (единая точка входа)

Этот файл — **главная навигация по документации**. Его цель — убрать дублирование и сделать так, чтобы:

- новичку было понятно **как запустить проект**;
- разработчику было понятно **где что лежит**;
- документация не “расползалась” по README’шкам.

## Быстрый старт (локально)

```bash
npm ci

# dev (Electron + Vite UI)
npm run dev

# backend-main отдельно (опционально)
npm run dev:backend-main

# тесты UI (Playwright)
npm test
```

## Куда смотреть дальше

- **AI / Cursor**: [`cursor.md`](../cursor.md)
- **Архитектура**: [`CURSOR_ARCHITECTURE.md`](./CURSOR_ARCHITECTURE.md)
- **Команды**: [`CURSOR_COMMANDS.md`](./CURSOR_COMMANDS.md)
- **Технические детали**: [`CURSOR_TECHNICAL.md`](./CURSOR_TECHNICAL.md)
- **Конфигурации**: [`CURSOR_CONFIGURATION.md`](./CURSOR_CONFIGURATION.md)

## Планирование (не обязательно для ежедневной разработки)

- [`planning/ACTION_PLAN.md`](./planning/ACTION_PLAN.md)
- [`planning/EPICS.md`](./planning/EPICS.md)
- [`planning/PROJECT_PLAN.md`](./planning/PROJECT_PLAN.md)

## Дизайн и Three.js (3D графика)

- [`design/DESIGN_SPECIFICATION.md`](./design/DESIGN_SPECIFICATION.md)
- [`threejs/SETUP_GUIDE.md`](./threejs/SETUP_GUIDE.md)
- [`threejs/TECHNICAL_SPECIFICATION.md`](./threejs/TECHNICAL_SPECIFICATION.md)

## Принцип упрощения документации (правило)

- **README’шки**: коротко “что это” + “как запустить” + ссылки.
- **`docs/`**: единственное место, где живут детали (архитектура, команды, конфиги, решения).
- **Одна правда** про команды/пути: ориентируемся на `package.json` (root + workspace).
