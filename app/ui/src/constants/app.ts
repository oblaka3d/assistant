/**
 * Константы приложения
 */

// Таймауты
export const TIMEOUTS = {
  SCENE_LOAD: 3000, // Таймаут загрузки 3D сцены (мс)
  RESIZE_RETRY: 100, // Задержка повторной попытки настройки ResizeObserver (мс)
  ANIMATION_FADE: 300, // Длительность плавного перехода анимаций (мс)
  ANIMATION_DELAY: 100, // Задержка перед запуском программной анимации (мс)
  HEAD_NOD_DURATION: 300, // Длительность кивка головы (мс)
  IDLE_TRANSITION: 500, // Задержка перед возвратом к idle после разговора (мс)
  UI_TRANSITION: 300, // Длительность перехода между экранами (мс)
} as const;

// Значения по умолчанию
export const DEFAULTS = {
  MODEL_PATH: './assets/models/character.glb',
  EMPTY_TEXT: '—',
  STATUS_BAR_HEIGHT: 24, // Высота строки состояния в пикселях
  SCREEN_COUNT: 3, // Количество основных экранов
} as const;

// Размеры UI элементов
export const UI_SIZES = {
  STATUS_BAR_HEIGHT: 24,
  RECORD_BUTTON_SIZE: 80, // Размер кнопки записи (px)
  RECORD_BUTTON_SIZE_MOBILE: 70, // Размер кнопки записи на мобильных (px)
} as const;

// Z-index слои
export const Z_INDEX = {
  STATUS_BAR: 1100,
  UI_OVERLAY: 10,
  CANVAS: 0,
  LOADING: 1000,
  NAVIGATION: 1000,
} as const;

// Значения слайдеров в настройках
export const SETTINGS_RANGES = {
  LIGHT_INTENSITY: { min: 0.5, max: 5.0, step: 0.1 },
  CAMERA_DISTANCE: { min: 1.0, max: 5.0, step: 0.1 },
  ANIMATION_SPEED: { min: 0.1, max: 3.0, step: 0.1 },
  VOLUME: { min: 0, max: 100, step: 1 },
} as const;

// Пути к ресурсам
export const ASSETS_PATHS = {
  MODELS: './assets/models/',
  SCENES: './assets/scenes/',
} as const;
