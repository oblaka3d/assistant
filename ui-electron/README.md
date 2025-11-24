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

## Разработка

```bash
npm run dev:ui    # Hot reload
npm run build:ui  # Production сборка
```
