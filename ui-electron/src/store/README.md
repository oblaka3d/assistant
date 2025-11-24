# Redux Store

Управление состоянием через Redux Toolkit.

## Slices

- **`uiSlice`** - навигация, текущий экран, подэкраны
- **`voiceSlice`** - голосовое взаимодействие, статус записи
- **`chatSlice`** - диалоги, сообщения, текущий диалог
- **`settingsSlice`** - настройки (тема, язык, модель, сцена)
- **`userSlice`** - информация о пользователе
- **`apiKeysSlice`** - API ключи

## Thunks

Асинхронная бизнес-логика в `thunks/`:

- `chatThunks` - работа с чатом
- `voiceThunks` - голосовое взаимодействие
- `sceneThunks` - загрузка 3D сцены
- `userThunks` - авторизация
- `settingsThunks` - сохранение настроек

## Использование

```typescript
import { useAppDispatch, useAppSelector } from './hooks';

const dispatch = useAppDispatch();
const screen = useAppSelector((state) => state.ui.currentScreen);
```
