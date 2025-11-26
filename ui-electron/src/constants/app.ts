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

export const DEFAULT_WELCOME_TITLE = 'Oblaka Voice Assistant';

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

// Ключи для localStorage
export const STORAGE_KEYS = {
  API_KEYS: 'assistant_api_keys',
} as const;

export const DEFAULT_IDLE_TIMEOUT_SECONDS = 0;
export const DEFAULT_IDLE_MODE: 'api' | 'custom' = 'api';
export const DEFAULT_IDLE_PEXELS_QUERY = 'technology landscape';

const idlePlaceholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#grad)"/>
  <text x="50%" y="50%" fill="#cbd5f5" font-size="64" font-family="Inter,Helvetica,Arial,sans-serif" text-anchor="middle">
    Idle Mode
  </text>
</svg>`;

export const DEFAULT_IDLE_PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(
  idlePlaceholderSvg
)}`;
