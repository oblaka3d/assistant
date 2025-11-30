import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  DEFAULT_IDLE_MODE,
  DEFAULT_IDLE_TIMEOUT_SECONDS,
  DEFAULT_IDLE_PEXELS_QUERY,
} from '../../constants/app';

interface ModelSceneSettings {
  modelPath: string;
  sceneName: string | null; // Название выбранной сцены (null = не выбрана)
  enableToonShader: boolean;
  lightIntensity: number;
  cameraDistance: number;
  animationSpeed: number;
}

interface SettingsState {
  volume: number;
  language: string;
  theme: 'light' | 'dark' | 'system';
  accentColorLight: string; // Акцентный цвет для светлой темы (hex)
  accentColorDark: string; // Акцентный цвет для темной темы (hex)
  sttProviderName: string | null; // Название выбранного STT провайдера
  llmProviderName: string | null; // Название выбранного LLM провайдера
  llmModel: string | null; // Название выбранной LLM модели
  ttsProviderName: string | null; // Название выбранного TTS провайдера
  welcomeTitle: string;
  idleTimeoutSeconds: number;
  idleMode: 'api' | 'custom';
  idleCustomImagePath: string;
  idleRemoteEndpoint: string;
  modelScene: ModelSceneSettings;
}

const initialState: SettingsState = {
  volume: 70,
  language: 'ru',
  theme: 'system', // По умолчанию системная тема
  accentColorLight: '#4a90e2', // По умолчанию синий цвет для светлой темы
  accentColorDark: '#4a90e2', // По умолчанию синий цвет для темной темы
  sttProviderName: null, // Будет загружено при инициализации
  llmProviderName: null, // Будет загружено при инициализации
  llmModel: null, // Будет загружено при инициализации
  ttsProviderName: null, // Будет загружено при инициализации
  welcomeTitle: '',
  idleTimeoutSeconds: DEFAULT_IDLE_TIMEOUT_SECONDS,
  idleMode: DEFAULT_IDLE_MODE,
  idleCustomImagePath: '',
  idleRemoteEndpoint: DEFAULT_IDLE_PEXELS_QUERY,
  modelScene: {
    modelPath: './assets/models/character.glb',
    sceneName: null, // Сцена не выбрана по умолчанию
    enableToonShader: false,
    lightIntensity: 2.0,
    cameraDistance: 2.0,
    animationSpeed: 1.0,
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    setAccentColorLight: (state, action: PayloadAction<string>) => {
      state.accentColorLight = action.payload;
    },
    setAccentColorDark: (state, action: PayloadAction<string>) => {
      state.accentColorDark = action.payload;
    },
    setModelPath: (state, action: PayloadAction<string>) => {
      state.modelScene.modelPath = action.payload;
    },
    setSceneName: (state, action: PayloadAction<string | null>) => {
      state.modelScene.sceneName = action.payload;
    },
    setEnableToonShader: (state, action: PayloadAction<boolean>) => {
      state.modelScene.enableToonShader = action.payload;
    },
    setLightIntensity: (state, action: PayloadAction<number>) => {
      state.modelScene.lightIntensity = action.payload;
    },
    setCameraDistance: (state, action: PayloadAction<number>) => {
      state.modelScene.cameraDistance = action.payload;
    },
    setAnimationSpeed: (state, action: PayloadAction<number>) => {
      state.modelScene.animationSpeed = action.payload;
    },
    setSTTProviderName: (state, action: PayloadAction<string | null>) => {
      state.sttProviderName = action.payload;
    },
    setLLMProviderName: (state, action: PayloadAction<string | null>) => {
      state.llmProviderName = action.payload;
      // Сбрасываем модель при смене провайдера
      if (action.payload === null) {
        state.llmModel = null;
      }
    },
    setLLMModel: (state, action: PayloadAction<string | null>) => {
      state.llmModel = action.payload;
    },
    setTTSProviderName: (state, action: PayloadAction<string | null>) => {
      state.ttsProviderName = action.payload;
    },
    setWelcomeTitle: (state, action: PayloadAction<string>) => {
      state.welcomeTitle = action.payload;
    },
    setIdleTimeoutSeconds: (state, action: PayloadAction<number>) => {
      state.idleTimeoutSeconds = action.payload;
    },
    setIdleMode: (state, action: PayloadAction<'api' | 'custom'>) => {
      state.idleMode = action.payload;
    },
    setIdleCustomImagePath: (state, action: PayloadAction<string>) => {
      state.idleCustomImagePath = action.payload;
    },
    setIdleRemoteEndpoint: (state, action: PayloadAction<string>) => {
      state.idleRemoteEndpoint = action.payload;
    },
    setAllSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return { ...state, ...action.payload };
    },
    resetSettings: () => {
      return initialState;
    },
  },
});

export type { SettingsState };

export const {
  setVolume,
  setLanguage,
  setTheme,
  setAccentColorLight,
  setAccentColorDark,
  setSTTProviderName,
  setLLMProviderName,
  setLLMModel,
  setTTSProviderName,
  setWelcomeTitle,
  setIdleTimeoutSeconds,
  setIdleMode,
  setIdleCustomImagePath,
  setIdleRemoteEndpoint,
  setModelPath,
  setSceneName,
  setEnableToonShader,
  setLightIntensity,
  setCameraDistance,
  setAnimationSpeed,
  setAllSettings,
  resetSettings,
} = settingsSlice.actions;
export default settingsSlice.reducer;
