/**
 * Сообщения и статусы приложения
 */

export const STATUS_MESSAGES = {
  READY: 'Готов к работе',
  READY_NO_CHARACTER: 'Готов к работе (без персонажа)',
  LISTENING: 'Слушаю...',
  PROCESSING: 'Обработка...',
  RECOGNIZING: 'Распознавание речи...',
  GENERATING: 'Генерация ответа...',
  SPEAKING: 'Отвечаю...',
  NOT_RECOGNIZED: 'Речь не распознана',
  ERROR: 'Ошибка',
} as const;

export const UI_MESSAGES = {
  LOADING_CHARACTER: 'Загрузка персонажа...',
  CHARACTER_UNAVAILABLE: 'Персонаж недоступен',
  CHARACTER_NOT_LOADED: '⚠️ Персонаж не загружен. Приложение работает в режиме без визуализации.',
  NO_MODELS: 'Модели не найдены',
  NO_SCENES: 'Сцены не найдены',
  LOADING_MODELS: 'Загрузка списка моделей...',
  LOADING_SCENES: 'Загрузка списка сцен...',
  SCENE_NOT_SELECTED: 'Сцена не выбрана',
  EMPTY_HISTORY: 'История пуста',
  START_DIALOG: 'Начните диалог с ассистентом',
  HISTORY_PLACEHOLDER: 'История будет доступна здесь в будущих версиях',
  ENTER_MESSAGE: 'Введите сообщение...',
  ERROR_MESSAGE: 'Произошла ошибка при обработке запроса.',
  ERROR_SORRY: 'Извините, не удалось получить ответ.',
} as const;

