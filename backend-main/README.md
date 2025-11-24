# Backend Main Server

Основной бэкенд сервер с MongoDB для Voice Assistant приложения.

## Структура

```
backend-main/
├── src/
│   ├── config/          # Конфигурация (MongoDB, JWT и т.д.)
│   ├── controllers/     # Контроллеры для обработки запросов
│   ├── middleware/      # Middleware (auth, validation и т.д.)
│   ├── models/          # Mongoose модели
│   ├── routes/          # Express роуты
│   ├── services/        # Бизнес-логика
│   ├── utils/           # Утилиты
│   └── index.ts         # Точка входа
├── package.json
└── tsconfig.json
```

## Функциональность

- ✅ Авторизация (регистрация, логин, JWT токены)
- ✅ OAuth авторизация (Google, Yandex, GitHub)
- ✅ MongoDB интеграция
- ✅ Защита роутов с помощью JWT
- ✅ Валидация данных
- ✅ CORS настройки
- ✅ Логирование
- ✅ Шифрование и хранение пользовательских API ключей

## Установка

```bash
cd backend-main
npm install
```

## Настройка

1. Скопируйте `.env.example` в `.env`
2. Настройте переменные окружения:
   - `MONGODB_URI` - URI подключения к MongoDB
   - `JWT_SECRET` - секретный ключ для JWT токенов
   - `API_KEY_SECRET` - секрет для шифрования пользовательских API ключей
   - `PORT` - порт сервера (по умолчанию 3001)
   - `SESSION_SECRET` - секрет для сессий (используется для OAuth)
   - `FRONTEND_URL` - URL фронтенда для OAuth callback (по умолчанию http://localhost:5173)

### OAuth настройка (опционально)

Для включения OAuth авторизации настройте следующие переменные:

**Google OAuth:**

- `GOOGLE_CLIENT_ID` - Client ID из Google Cloud Console
- `GOOGLE_CLIENT_SECRET` - Client Secret из Google Cloud Console
- `GOOGLE_CALLBACK_URL` - Callback URL (по умолчанию `/api/v1/auth/google/callback`, должен быть полным URL в Google Cloud Console, например: `http://localhost:3001/api/v1/auth/google/callback`)

**Как получить Google OAuth credentials:**

1. Перейдите на [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Включите Google+ API:
   - Перейдите в "APIs & Services" → "Library"
   - Найдите "Google+ API" или "Google Identity API"
   - Нажмите "Enable"
4. Создайте OAuth 2.0 credentials:
   - Перейдите в "APIs & Services" → "Credentials"
   - Нажмите "Create Credentials" → "OAuth client ID"
   - Если появится запрос, настройте OAuth consent screen:
     - Выберите "External" (для тестирования) или "Internal" (для G Suite)
     - Заполните обязательные поля (App name, User support email, Developer contact)
     - Сохраните и продолжите
   - Выберите тип приложения: "Web application"
   - Укажите название приложения
   - Добавьте Authorized redirect URIs:
     - Для локальной разработки: `http://localhost:3001/api/v1/auth/google/callback`
     - Для production: `https://yourdomain.com/api/v1/auth/google/callback`
   - Нажмите "Create"
5. Скопируйте Client ID и Client Secret в ваш `.env` файл:
   ```
   GOOGLE_CLIENT_ID=ваш_client_id_здесь
   GOOGLE_CLIENT_SECRET=ваш_client_secret_здесь
   GOOGLE_CALLBACK_URL=/api/v1/auth/google/callback
   ```

**Yandex OAuth:**

- `YANDEX_CLIENT_ID` - Client ID из Yandex OAuth приложения
- `YANDEX_CLIENT_SECRET` - Client Secret из Yandex OAuth приложения
- `YANDEX_CALLBACK_URL` - Callback URL (по умолчанию `/api/v1/auth/yandex/callback`)

**GitHub OAuth:**

- `GITHUB_CLIENT_ID` - Client ID из GitHub OAuth App
- `GITHUB_CLIENT_SECRET` - Client Secret из GitHub OAuth App
- `GITHUB_CALLBACK_URL` - Callback URL (по умолчанию `/api/v1/auth/github/callback`)

**Инструкции по настройке OAuth:**

- [Google OAuth](https://developers.google.com/identity/protocols/oauth2)
- [Yandex OAuth](https://yandex.ru/dev/id/doc/ru/register-client)
- [GitHub OAuth](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

## Запуск

```bash
# Development режим
npm run dev

# Production режим
npm run build
npm start
```

## API Endpoints

### Авторизация

- `POST /api/v1/auth/register` - Регистрация нового пользователя
- `POST /api/v1/auth/login` - Вход в систему
- `POST /api/v1/auth/refresh` - Обновление токена
- `GET /api/v1/auth/me` - Получение текущего пользователя (требует авторизации)
- `PATCH /api/v1/auth/profile` - Обновление профиля пользователя
- `POST /api/v1/auth/change-password` - Изменение пароля
- `POST /api/v1/auth/forgot-password` - Запрос на сброс пароля
- `POST /api/v1/auth/reset-password` - Сброс пароля по токену

### OAuth авторизация

- `GET /api/v1/auth/google` - Инициирует OAuth авторизацию через Google
- `GET /api/v1/auth/google/callback` - Callback для Google OAuth
- `GET /api/v1/auth/yandex` - Инициирует OAuth авторизацию через Yandex
- `GET /api/v1/auth/yandex/callback` - Callback для Yandex OAuth
- `GET /api/v1/auth/github` - Инициирует OAuth авторизацию через GitHub
- `GET /api/v1/auth/github/callback` - Callback для GitHub OAuth

### Настройки и API ключи

- `GET /api/v1/settings` - Получение настроек устройства
- `PATCH /api/v1/settings` - Обновление настроек устройства
- `GET /api/v1/api-keys` - Получение сохраненных API ключей (раскрываются в расшифрованном виде)
- `PUT /api/v1/api-keys` - Сохранение/удаление API ключей (ключи шифруются перед записью)

## Взаимодействие

Сервер взаимодействует с:

- Electron backend (`backend/`) - через HTTP API
- Electron UI (`ui/`) - через HTTP API
