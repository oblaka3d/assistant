# Backend Main Server

Backend сервер с MongoDB для аутентификации, хранения настроек и истории чатов.

## Структура

```
src/
├── config/          # Конфигурация (MongoDB, JWT, OAuth)
├── controllers/     # Обработчики запросов
├── middleware/      # Auth, validation
├── lib/             # Prisma клиент
├── models/          # Mongoose модели (используются точечно, см. ниже)
├── routes/          # Express роуты
├── services/        # Бизнес-логика
└── utils/           # Утилиты (JWT, encryption)
```

## Функциональность

- ✅ Регистрация/логин, JWT токены
- ✅ OAuth (Google, Yandex, GitHub)
- ✅ Настройки пользователя (тема, язык, акцентные цвета)
- ✅ История чатов (диалоги и сообщения)
- ✅ Шифрование API ключей

## Хранилище данных (важно)

Сейчас проект использует **MongoDB** и два уровня доступа к данным:

- **Prisma (`@prisma/client`)**: пользователи, настройки, диалоги/сообщения, магазин приложений (каталог/установки).
- **Mongoose**: на данный момент используется **точечно** (например, для хранения API ключей).

Поэтому в окружении обычно задаются **оба** значения: `DATABASE_URL` (для Prisma) и `MONGODB_URI` (для подключения Mongoose). В дев-окружении их можно указывать одинаковыми.

## Настройка

Создайте `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/voice-assistant?replicaSet=rs0&directConnection=true
DATABASE_URL=mongodb://localhost:27017/voice-assistant?replicaSet=rs0&directConnection=true
JWT_SECRET=<секрет>
API_KEY_SECRET=<секрет>
PORT=3001

# OAuth (опционально)
GOOGLE_CLIENT_ID=<id>
GOOGLE_CLIENT_SECRET=<secret>
```

> Для работы Prisma с MongoDB требуется replica set. Если используете Homebrew (macOS):
>
> 1. Добавьте `replication.replSetName: rs0` в `/opt/homebrew/etc/mongod.conf`.
> 2. Выполните `brew services restart mongodb-community`.
> 3. Запустите `mongosh --quiet --eval "rs.initiate()"`.

## API Endpoints

### Авторизация

- `POST /api/v1/auth/register` - Регистрация
- `POST /api/v1/auth/login` - Вход
- `POST /api/v1/auth/refresh` - Обновить access token по refresh token
- `GET /api/v1/auth/me` - Текущий пользователь
- `GET /api/v1/auth/google` - OAuth Google

### Настройки

- `GET /api/v1/settings` - Получить настройки
- `PATCH /api/v1/settings` - Обновить настройки

### Чаты (диалоги)

- `GET /api/v1/chats` - Список диалогов
- `GET /api/v1/chats/:dialogId` - Получить диалог
- `POST /api/v1/chats` - Создать диалог
- `PUT /api/v1/chats/:dialogId` - Обновить диалог
- `DELETE /api/v1/chats/:dialogId` - Удалить диалог
- `DELETE /api/v1/chats` - Удалить все диалоги

### API Keys

- `GET /api/v1/api-keys` - Получить сохранённые ключи (по провайдерам)
- `PUT /api/v1/api-keys` - Сохранить/очистить ключи

### Applications (магазин приложений)

- `GET /api/v1/applications/catalog`
- `GET /api/v1/applications/installed`
- `POST /api/v1/applications/import` (multipart, поле `archive`)

## Prisma & Shared DTOs

- **Схема**: `prisma/schema.prisma`
- **Клиент**: `src/lib/prisma.ts`
- **Генерация Prisma + zod-схем**: `npm run prisma:generate` (также обновляет `packages/shared/src/zod/schemas.ts`)
- **Синхронизация схемы с MongoDB**: `npm run prisma:push`
- **DTO**: переиспользуются из workspace `@assistant/shared` (`packages/shared`)

## Запуск

```bash
npm run dev      # Development
npm run build    # Production build
npm start        # Run built server
```
