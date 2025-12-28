# 🪝 React Hooks

Эта папка содержит переиспользуемые хуки UI-приложения.

## Список хуков

- **`useTheme`**: вычисляет эффективную тему (`light`/`dark`) с учётом `settings.theme` и системной темы.
- **`useCSSVariables`**: выставляет CSS-переменные (акцентные цвета, hover, scrollbar) на основе эффективной темы и настроек.
- **`useLanguage`**: синхронизация языка интерфейса и i18n.
- **`useApiKeys`**: загрузка/сохранение API ключей (через backend-main API).
- **`useOAuthCallback`**: обработка OAuth callback (токены из URL/переходов).
- **`useIdleTimer`**: логика idle-режима / таймера бездействия.

## Роутинг

Приложение использует `react-router-dom` для роутинга. Синхронизация с Redux store происходит через компонент `RouterSync` в `App.tsx`.

### Использование

```typescript
import { useNavigate, useLocation } from 'react-router-dom';

const navigate = useNavigate();
const location = useLocation();

// Навигация на экран
navigate('/main');
navigate('/chat');
navigate('/menu/settings'); // С подэкраном
```

### Маршруты

- `/` или `/main` → MainScreen
- `/chat` → ChatScreen
- `/menu` → MenuScreen
- `/menu/settings` → MenuScreen → SettingsScreen
- `/menu/apiKeys` → MenuScreen → APIKeysScreen
- `/menu/logs` → MenuScreen → LogsScreen
- `/menu/about` → MenuScreen → AboutScreen
- `/menu/auth` → MenuScreen → AuthScreen

### Синхронизация с Redux

Компонент `RouterSync` автоматически синхронизирует:

- **URL → Redux**: При изменении URL обновляется Redux store
- **Redux → URL**: При изменении экрана через Redux обновляется URL
