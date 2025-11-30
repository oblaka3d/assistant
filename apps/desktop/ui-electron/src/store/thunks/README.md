# Redux Thunks

Асинхронная бизнес-логика приложения.

## Файлы

- **`chatThunks.ts`** - чат: отправка сообщений, загрузка диалогов
- **`voiceThunks.ts`** - голос: запись, распознавание, синтез
- **`sceneThunks.ts`** - 3D сцена: инициализация, загрузка модели
- **`userThunks.ts`** - пользователь: регистрация, логин, OAuth
- **`settingsThunks.ts`** - настройки: загрузка, сохранение

## Использование

```typescript
import { useAppDispatch } from '../hooks';
import { sendMessage } from './chatThunks';

const dispatch = useAppDispatch();
await dispatch(sendMessage({ text: 'Привет', t })).unwrap();
```
