# Redux Thunks

Директория содержит бизнес-логику приложения, вынесенную из React компонентов в асинхронные thunk actions.

## Структура

- **`chatThunks.ts`** - логика работы с чатом:
  - `loadLLMProviderInfo` - загрузка информации о LLM провайдере
  - `sendMessage` - отправка сообщения и получение ответа от ассистента

- **`voiceThunks.ts`** - логика работы с голосовым взаимодействием:
  - `startRecording` - начало записи голоса
  - `stopRecordingAndProcess` - остановка записи, распознавание речи, генерация ответа и воспроизведение

- **`sceneThunks.ts`** - логика загрузки 3D сцены:
  - `initScene` - инициализация THREE.js сцены с персонажем

## Принципы

1. **Разделение ответственности**: бизнес-логика отделена от UI компонентов
2. **Повторное использование**: thunks можно использовать в разных компонентах
3. **Тестируемость**: бизнес-логику легче тестировать отдельно от компонентов
4. **Централизация**: вся асинхронная логика в одном месте

## Использование

```typescript
import { useAppDispatch } from '../../store/hooks';
import { sendMessage, loadLLMProviderInfo } from '../../store/thunks/chatThunks';

const dispatch = useAppDispatch();

// Загрузка информации о провайдере
await dispatch(loadLLMProviderInfo()).unwrap();

// Отправка сообщения
await dispatch(sendMessage({ text: 'Привет', t })).unwrap();
```

## Типы

Все thunks используют `createAsyncThunk` из `@reduxjs/toolkit`, что обеспечивает:

- Автоматическую обработку состояний pending/fulfilled/rejected
- Интеграцию с Redux DevTools
- Типобезопасность
