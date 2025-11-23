# Redux Store

Управление состоянием приложения через Redux Toolkit.

## Структура

### UI Slice (`uiSlice.ts`)

Навигация и UI состояние:

- `currentScreen` - текущий экран: `'main' | 'chat' | 'menu'`
- `subScreen` - вложенный экран в меню: `'settings' | 'history' | 'about' | null`
- `isTransitioning` - флаг перехода между экранами
- `navigationHistory` - история навигации

**Навигация:**

- Круговая навигация между основными экранами (свайпы)
- Вложенные экраны в меню (Настройки, История, О приложении)

### Voice Slice (`voiceSlice.ts`)

Состояние голосового ассистента:

- `status` - текущий статус
- `isRecording` - флаг записи
- `userText` - текст пользователя
- `assistantText` - ответ ассистента
- `sceneReady` - готовность 3D сцены

### Chat Slice (`chatSlice.ts`)

История сообщений:

- `messages` - массив сообщений чата
- `inputValue` - текущее значение поля ввода

### Settings Slice (`settingsSlice.ts`)

Настройки приложения:

- `volume` - громкость
- `language` - язык интерфейса
- `modelScene` - настройки модели и сцены:
  - `modelPath` - путь к модели
  - `sceneName` - название сцены (null = не выбрана)
  - `enableToonShader` - включение toon shader
  - `lightIntensity` - интенсивность освещения
  - `cameraDistance` - расстояние камеры
  - `animationSpeed` - скорость анимации

## Использование

```typescript
import { useAppDispatch, useAppSelector } from './hooks';

// В компоненте
const dispatch = useAppDispatch();
const currentScreen = useAppSelector((state) => state.ui.currentScreen);

// Вызов action
dispatch(setScreen('chat'));
```
