# @assistant/shared

Небольшой пакет с общими типами/утилитами.

- `src/applications.ts` — ручные DTO/валидаторы для магазина приложений
- `src/zod/schemas.ts` — **автогенерируемые** Prisma-схемы (zod + `z.infer`), обновляются командой `npm run prisma:generate --workspace @assistant/backend-main`
- `src/index.ts` экспортирует всё перечисленное
- Хелперы локалей и т.д. лежат рядом

Сборка: `npm run build --workspace @assistant/shared`.
