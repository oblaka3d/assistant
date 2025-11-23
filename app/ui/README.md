# UI Application

React приложение для голосового ассистента.

## Структура

```
src/
├── screens/          # Экраны приложения
│   ├── MainScreen.tsx       # Главный экран с 3D персонажем
│   ├── ChatScreen.tsx       # Текстовый чат
│   ├── MenuScreen.tsx       # Меню
│   └── subscreens/          # Вложенные экраны меню
│       ├── SettingsScreen.tsx
│       ├── HistoryScreen.tsx
│       └── AboutScreen.tsx
├── components/       # React компоненты
│   ├── StatusBar.tsx        # Строка состояния (WiFi, Bluetooth, Battery)
│   ├── NavigationIndicators.tsx  # Индикаторы навигации
│   └── ScreenHeader.tsx     # Заголовок экрана
├── store/            # Redux store
│   ├── slices/       # Redux slices
│   └── hooks.ts      # Типизированные хуки
├── renderer/         # THREE.js рендерер
│   └── three/        # THREE.js модули
└── main.tsx          # Точка входа
```

## Разработка

```bash
# Запуск dev сервера
npm run dev:ui

# Сборка
npm run build:ui
```

## Экраны

### Main Screen
- 3D персонаж в центре
- Кнопка записи голоса (круглая, полупрозрачная, справа внизу)
- Текст взаимодействия (слева вверху)
- Навигация внизу

### Chat Screen
- Список сообщений
- Поле ввода текста
- Навигация внизу (под полем ввода)

### Menu Screen
- Список пунктов меню
- Вложенные экраны: Настройки, История, О приложении

## Навигация

Круговая навигация между основными экранами через свайпы:
- Свайп влево: `main → menu → chat → main`
- Свайп вправо: `main → chat → menu → main`

## Стилизация

Используются CSS Modules для изоляции стилей каждого компонента.
