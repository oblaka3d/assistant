# 🔧 Технические детали

## Важные технические решения

> Большинство путей в этом разделе относятся к workspace `apps/desktop`. Для краткости сохраняем исходные подпапки (`ui-electron`, `main`, и т.д.).

### 1. Vite Configuration

**Файл**: `vite.config.ts`

**Ключевые моменты:**

1. **React bundling**: React, react-redux, @emotion/react должны быть в основном bundle

   ```typescript
   const reactPattern = /react(-dom|-redux)?[/\\]|@emotion[/\\]react[/\\]/;
   ```

   Это предотвращает ошибки типа `Cannot read properties of undefined (reading '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED')`

2. **Sourcemaps**: Только в dev режиме

   ```typescript
   sourcemap: command === 'serve';
   ```

3. **Chunk splitting**:
   - `three` - отдельный chunk для THREE.js
   - `mui` - отдельный chunk для Material-UI
   - `markdown` - отдельный chunk для markdown библиотек
   - React и связанные - в основном bundle

### 2. Redux State Serialization

**Проблема**: Redux требует сериализуемые данные

**Решение**: Все `Date` объекты конвертируются в ISO строки

```typescript
// ❌ Плохо
createdAt: new Date();

// ✅ Хорошо
createdAt: new Date().toISOString();
```

**Где применять:**

- Redux slices (`chatSlice.ts`, `voiceSlice.ts`)
- API интерфейсы (`api.ts`)
- Redux thunks (`chatThunks.ts`, `voiceThunks.ts`)

### 3. Роутинг и Redux синхронизация

**Файл**: `ui-electron/src/App.tsx` → `RouterSync`

**Проблема**: Race conditions при изменении URL и Redux state

**Решение**: Использование `useRef` для хранения текущего состояния

```typescript
const currentScreenRef = useRef(currentScreen);
const subScreenRef = useRef(subScreen);

useEffect(() => {
  // Обновляем только если изменился URL
  // Используем ref для проверки текущего состояния
}, [location.pathname]);
```

### 4. IPC Communication

**Структура:**

- `main/preload.ts` - экспортирует безопасные API в `window.electron`
- `main/ipc.ts` - обработчики IPC в main процессе
- Renderer использует `window.electron.*` для коммуникации

**Паттерн:**

```typescript
// preload.ts
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: { ... }
});

// renderer
window.electron.ipcRenderer.invoke('action', data);
```

### 5. Виртуальная клавиатура

**Компонент**: `ui-electron/src/components/ChatKeyboard/`

**Особенности:**

- Использует `react-simple-keyboard`
- Рендерится через React Portal в `document.body`
- Отслеживает высоту через `ResizeObserver`
- Диспатчит события `virtualKeyboardOpen`/`virtualKeyboardClose`
- Поддерживает несколько языков (EN/RU/ZH)
- Интегрирован emoji picker

**CSS переменные:**

- `--keyboard-offset` - высота клавиатуры
- `--keyboard-open` - флаг открытия (0/1)

### 6. Emoji Picker

**Интеграция:**

- Использует `emoji-picker-react`
- Отображается вместо клавиатуры при нажатии на emoji кнопку
- Кнопка переключения меняет иконку (клавиатура ↔ emoji)
- Back button для возврата к клавиатуре

### 7. Playwright Snapshots

**Конфигурация:**

- Шаблон пути: `{testFileDir}/{testFileName}-snapshots/{arg}-{projectName}{ext}`
- Кроссплатформенные (без суффикса платформы)
- Хранятся в обычном Git (не LFS)

**Доступ к Redux в тестах:**

```typescript
const win = window as WindowWithStore;
const store = win.__REDUX_STORE__;
```

**Утилиты тестов:**

- `compareScreenshot()` - сравнение скриншотов
- `waitForAppReady()` - ожидание загрузки приложения
- `setTheme()` - установка темы через Redux
- `navigateToScreen()` - навигация через Redux

### 8. Environment Variables

**Vite**: Использует `import.meta.env.VITE_*`
**Node.js**: Использует `process.env.*`

**Важно:**

- В renderer процессе нет доступа к `process.env`
- Используйте `import.meta.env` для UI
- Используйте `process.env` для main процесса и backend

### 9. TypeScript Configuration

**Множественные tsconfig:**

- `tsconfig.json` - корневой, для main процесса
- `ui-electron/tsconfig.json` - для UI
- `ui-electron/tsconfig.node.json` - для Vite конфигурации
- `apps/backend-main/tsconfig.json` - для backend

### 10. CSS Modules

**Использование:**

- Все стили в `.module.css` файлах
- Импорт: `import styles from './Component.module.css'`
- Типы: `ui-electron/src/types/css-modules.d.ts`

### 11. i18n

**Библиотека**: `react-i18next`

**Файлы переводов:**

- `ui-electron/src/i18n/locales/en.json`
- `ui-electron/src/i18n/locales/ru.json`
- `ui-electron/src/i18n/locales/zh.json`

**Использование:**

```typescript
const { t } = useTranslation();
t('chat.sendMessage');
```

### 12. 3D Scene (THREE.js)

**Компонент**: `MainScreen`

**Особенности:**

- Загрузка 3D модели из `ui-electron/public/assets/*.glb`
- Анимации через `@react-three/fiber` и `@react-three/drei`
- WebGL может быть недоступен в тестовом окружении

### 13. API Client

**Файл**: `ui-electron/src/utils/api.ts`

**Особенности:**

- Базовый URL из `import.meta.env.VITE_API_URL`
- По умолчанию: `http://localhost:3001/api/v1`
- Все даты в ISO строках для сериализации

### 14. OAuth Callback

**Файл**: `ui-electron/src/hooks/useOAuthCallback.ts`

**Процесс:**

1. Открытие OAuth URL в новом окне
2. Ожидание callback
3. Закрытие окна после успеха
4. Обновление состояния пользователя

### 15. Applications Catalog & Store

**UI:** `ui-electron/src/screens/MenuScreen/subscreens/ApplicationsScreen/ApplicationsScreen.tsx`

- Состояние:
  - `applicationsSlice` хранит `catalog`, `installed`, `storage`
  - `applicationsFormsSlice` — значения и ошибки форм create/import/edit
- Хуки:
  - `useApplicationsData` автоматически диспатчит `loadApplicationsCatalog`, `loadInstalledApplications`, `loadApplicationsStorage`
  - `useApplicationsFilters` добавляет поисковую строку и фильтр по статусу (`draft/pending/published/rejected`)
  - `useApplicationKeyAvailability` дебаунсит проверку ID через `/applications/catalog/availability/:key`
  - `useFileDropZone` управляет drag&drop для ZIP-архивов (import/edit)
- Диалоги:
  - `ApplicationCreateDialog` — валидация через `zod`, все поля требуются, key/версия ограничены `APP_*` константами
  - `ApplicationImportDialog` — позволяет гостям загрузить ZIP и зарезервировать key, отвечает отображением прогресса
  - `ApplicationEditDialog` — редактирует имя/тип/описание, релиз-ноты, иконку (data URL), требует архив с новой версией и выводит историю версий
- Действия:
  - Установка/удаление (`installExistingApplication`, `uninstallExistingApplication`)
  - Отправка на ревью (`updateApplicationStatusThunk`)
  - Обновление квоты хранилища (`loadApplicationsStorage` + `setStorageSnapshot`)
  - Обновление каталога после операций (`refreshApplicationsData`)

### 16. Application Storage & Uploads

- Backend: `apps/backend-main/src/services/applicationStorageService.ts`
- Хранилище файлов: `storage/applications/<user>/<app>/<version>`
- Лимит на пользователя — `APPLICATION_STORAGE_LIMIT_BYTES = 100 MB`
- Импорт/обновление версий принимают только `.zip`, проверяется `isAllowedArchive`
- Имена файлов/папок проходят `sanitizeSegment`/`sanitizeArchiveName`, чтобы избежать path traversal
- `POST /applications/import` использует `optionalAuthenticate`: гости могут импортировать архив, а после логина получат установку + обновлённую квоту
- `createApplicationVersion` инкрементирует версию по `releaseType` (`patch/minor/major`) и расширяет историю версий

### 17. Applications Visual Tests

- Playwright-файл: `ApplicationsScreen.spec.ts`
- Моки каталога/установленных приложений и квоты подменяются через `page.route('**/applications/*')`
- Покрываются сценарии:
  - `applications-screen-catalog-light` (store таб, светлая тема)
  - `applications-screen-my-apps-dark` (installed таб, тёмная тема)
- Хелперы: `navigateToScreen`, `waitForAppReady`, `setTheme`, `compareScreenshot`

### 18. Shared Utilities (`packages/shared`)

- TypeScript-пакет `@assistant/shared`, собирается через `npm run build --workspace @assistant/shared`
- Предназначен для общих типов и хелперов между desktop, backend-main, будущими landing/mobile
- Сейчас содержит пример с локалями (`getSupportedLocales`, `isSupportedLocale`) — можно расширять API по мере миграции кода

## Известные проблемы и решения

### 1. React Internals Error

**Ошибка**: `Cannot read properties of undefined (reading '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED')`

**Причина**: Множественные экземпляры React

**Решение**: React, react-redux, @emotion/react в основном bundle

### 2. Redux Serializable Check

**Ошибка**: `A non-serializable value was detected in the state`

**Причина**: Date объекты в Redux state

**Решение**: Конвертация в ISO строки

### 3. Menu Sub-screens Flickering

**Проблема**: Экран мерцает при открытии подэкранов

**Причина**: Race condition в RouterSync

**Решение**: Использование useRef для хранения состояния

### 4. Keyboard Overlapping UI

**Проблема**: Клавиатура перекрывает элементы UI

**Решение**: CSS переменные для offset, условный рендеринг навигации

### 5. Cross-platform Snapshots

**Проблема**: Снапшоты не работают в CI (Linux vs macOS)

**Решение**: Кроссплатформенные снапшоты без суффикса платформы

## Best Practices

1. **Всегда используйте ISO строки для дат в Redux**
2. **Проверяйте доступность Redux store в тестах**
3. **Используйте CSS переменные для динамических значений**
4. **Портал для модальных окон и клавиатуры**
5. **useRef для предотвращения race conditions**
6. **Типизация через TypeScript для всех компонентов**
