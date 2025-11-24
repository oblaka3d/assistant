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
- ✅ MongoDB интеграция
- ✅ Защита роутов с помощью JWT
- ✅ Валидация данных
- ✅ CORS настройки
- ✅ Логирование

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
   - `PORT` - порт сервера (по умолчанию 3001)

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

## Взаимодействие

Сервер взаимодействует с:

- Electron backend (`backend/`) - через HTTP API
- Electron UI (`ui/`) - через HTTP API
