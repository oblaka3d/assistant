# Redux Store Structure

Этот проект использует Redux Toolkit для управления состоянием приложения.

## Структура Store

Store состоит из 4 основных слайсов:

### 1. UI Slice (`uiSlice.ts`)

Управляет навигацией и UI состоянием:

- `currentScreen: 'main' | 'chat' | 'menu'` - текущий основной экран
- `subScreen: 'settings' | 'history' | 'about' | null` - текущий вложенный экран в меню
- `isTransitioning: boolean` - флаг перехода между экранами
- `navigationHistory: MainScreen[]` - история навигации для кнопки "назад"

**Навигация:**

Круговая навигация между основными экранами:

- Свайп влево: `main → chat → menu → main`
- Свайп вправо: `main → menu → chat → main`

Вложенная навигация в меню:

- Из меню можно открыть вложенные экраны (Настройки, История, О приложении)
- Кнопка "назад" возвращает из вложенного экрана обратно в меню
- Свайпы отключены во вложенных экранах

**Actions:**

- `setScreen(screen)` - установить текущий основной экран
- `setTransitioning(bool)` - установить флаг перехода
- `goToMain()` - переход на главный экран
- `navigateNext()` - перейти к следующему экрану (круговая навигация влево)
- `navigatePrev()` - перейти к предыдущему экрану (круговая навигация вправо)
- `openSubScreen(screen)` - открыть вложенный экран в меню
- `closeSubScreen()` - закрыть вложенный экран
- `goBack()` - вернуться на предыдущий экран (кнопка "назад")

### 2. Voice Slice (`voiceSlice.ts`)

Управляет состоянием голосового ассистента:

- `status: VoiceStatus` - текущий статус (Готов к работе, Слушаю, Обработка и т.д.)
- `isRecording: boolean` - флаг записи
- `userText: string` - распознанный текст пользователя
- `assistantText: string` - ответ ассистента
- `sceneReady: boolean` - готовность 3D сцены
- `isLoading: boolean` - загрузка персонажа
- `loadError: boolean` - ошибка загрузки

**Actions:**

- `setStatus(status)` - установить статус
- `setIsRecording(bool)` - установить флаг записи
- `setUserText(text)` - установить текст пользователя
- `setAssistantText(text)` - установить ответ ассистента
- `setSceneReady(bool)` - установить готовность сцены
- `setIsLoading(bool)` - установить флаг загрузки
- `setLoadError(bool)` - установить флаг ошибки
- `resetVoiceState()` - сброс состояния

### 3. Chat Slice (`chatSlice.ts`)

Управляет сообщениями чата:

- `messages: Message[]` - массив сообщений
- `inputValue: string` - значение поля ввода

**Actions:**

- `addMessage(message)` - добавить сообщение
- `setMessages(messages)` - установить все сообщения
- `setInputValue(value)` - установить значение ввода
- `clearInput()` - очистить поле ввода
- `clearMessages()` - очистить все сообщения

### 4. Settings Slice (`settingsSlice.ts`)

Управляет настройками приложения:

- `volume: number` - громкость (0-100)
- `language: string` - язык интерфейса

**Actions:**

- `setVolume(volume)` - установить громкость
- `setLanguage(lang)` - установить язык

> **Примечание:** Навигация к экрану настроек теперь управляется через `uiSlice` (`openSubScreen('settings')`), а не через `showSettings` флаг.

## Использование в компонентах

### Типизированные хуки

Используйте типизированные хуки из `store/hooks.ts`:

```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.voice.status);

  const handleClick = () => {
    dispatch(setStatus('Слушаю...'));
  };

  return <div>{status}</div>;
};
```

### Примеры

**Доступ к состоянию:**

```typescript
const currentScreen = useAppSelector((state) => state.ui.currentScreen);
const messages = useAppSelector((state) => state.chat.messages);
const volume = useAppSelector((state) => state.settings.volume);
```

**Отправка действий:**

```typescript
dispatch(setScreen('chat'));
dispatch(addMessage({ id: '1', ... }));
dispatch(setVolume(80));
```

## Middleware

Store настроен с поддержкой несериализуемых значений (Date объекты в сообщениях) через настройки `serializableCheck`.

## Файловая структура

```
store/
  ├── index.ts          # Конфигурация store
  ├── hooks.ts          # Типизированные хуки
  ├── slices/
  │   ├── uiSlice.ts
  │   ├── voiceSlice.ts
  │   ├── chatSlice.ts
  │   └── settingsSlice.ts
  └── README.md         # Эта документация
```
