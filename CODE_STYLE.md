# Code Style Guide

Этот проект использует ESLint и Prettier для поддержания единообразного стиля кода.

## Конфигурация

### ESLint

Конфигурация находится в `.eslintrc.json`. Основные правила:

- **TypeScript**: Строгая проверка типов, но без обязательных аннотаций типов
- **React**: Поддержка React 18+ с новым JSX transform
- **React Hooks**: Проверка правил использования хуков
- **Import Order**: Автоматическая сортировка импортов
- **Prettier**: Интеграция с Prettier для форматирования

### Prettier

Конфигурация находится в `.prettierrc.json`. Основные настройки:

- **Single Quotes**: Одинарные кавычки для строк (кроме JSX)
- **Semicolons**: Точка с запятой обязательна
- **Print Width**: 100 символов
- **Tab Width**: 2 пробела
- **Trailing Commas**: ES5 совместимые
- **Line Endings**: LF (Unix)

### EditorConfig

Конфигурация для редакторов кода находится в `.editorconfig`.

## Использование

### Автоматическое форматирование

```bash
# Форматировать все файлы
npm run format

# Проверить форматирование без изменений
npm run format:check
```

### Линтинг

```bash
# Проверить код
npm run lint

# Автоматически исправить ошибки
npm run lint:fix
```

### Полная проверка

```bash
# Проверка линтинга, форматирования и сборки
npm run check
```

## Интеграция с редакторами

### VS Code

Рекомендуемые расширения (автоматически предложены в `.vscode/extensions.json`):

- ESLint
- Prettier - Code formatter
- EditorConfig for VS Code

Настройки автоматически применяются при сохранении файла.

## Правила импортов

Импорты автоматически сортируются в следующем порядке:

1. Встроенные модули Node.js
2. Внешние зависимости (npm пакеты)
3. Внутренние модули (относительные импорты)
4. CSS модули

Пример:

```typescript
import * as fs from 'fs';
import * as path from 'path';

import express from 'express';

import { config } from './config';
import { loadCharacter } from './loadCharacter';

import styles from './Component.module.css';
```

## Исключения

Некоторые файлы и правила имеют исключения:

- **Electron main process** (`app/main/**`, `app/backend/**`):
  - Разрешены `console.log`
  - Разрешены `require()` импорты
- **React UI** (`app/ui/src/**`):
  - Отключены строгие проверки TypeScript (`no-unsafe-*`)
  - Разрешены `console.log` для отладки

## CI/CD

В будущем рекомендуется добавить проверку стиля кода в CI/CD пайплайн:

```yaml
- name: Check code style
  run: npm run check
```
