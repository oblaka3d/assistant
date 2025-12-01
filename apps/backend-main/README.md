# Backend Main Server

Backend сервер с MongoDB для аутентификации, хранения настроек и истории чатов.

## Структура

```
src/
├── config/          # Конфигурация (MongoDB, JWT, OAuth)
├── controllers/     # Обработчики запросов
├── middleware/      # Auth, validation
├── lib/             # Prisma клиент
├── models/          # Mongoose модели (User, Settings, Chat)
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

> Для работы Prisma с MongoDB требуется replica set. Если используете Homebrew:
>
> 1. Добавьте `replication.replSetName: rs0` в `/opt/homebrew/etc/mongod.conf`.
> 2. Выполните `brew services restart mongodb-community`.
> 3. Запустите `mongosh --quiet --eval "rs.initiate()"`.

## API Endpoints

### Авторизация

- `POST /api/v1/auth/register` - Регистрация
- `POST /api/v1/auth/login` - Вход
- `GET /api/v1/auth/me` - Текущий пользователь
- `GET /api/v1/auth/google` - OAuth Google

### Настройки

- `GET /api/v1/settings` - Получить настройки
- `PATCH /api/v1/settings` - Обновить настройки

### Чаты

- `GET /api/v1/dialogs` - Список диалогов
- `POST /api/v1/dialogs` - Создать диалог
- `PATCH /api/v1/dialogs/:id` - Обновить диалог
- `DELETE /api/v1/dialogs/:id` - Удалить диалог

## Prisma & Shared DTOs

- Схема ORM: `prisma/schema.prisma`
- Клиент и логгер: `src/lib/prisma.ts`
- Генерация клиента: `npm run prisma:generate`
- Синхронизация схемы с MongoDB: `npm run prisma:push`
- DTO переиспользуются из workspace `@assistant/shared` (`packages/shared`)

## Запуск

```bash
npm run dev    # Development
npm run build  # Production
npm start
```
