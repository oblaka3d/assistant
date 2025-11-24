import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  llmProviderName: string | null; // Название текущего LLM провайдера
  modelScene: ModelSceneSettings;
}

const initialState: SettingsState = {
  volume: 70,
  language: 'ru',
  llmProviderName: null, // Будет загружено при инициализации
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
    setLLMProviderName: (state, action: PayloadAction<string | null>) => {
      state.llmProviderName = action.payload;
    },
  },
});

export const {
  setVolume,
  setLanguage,
  setLLMProviderName,
  setModelPath,
  setSceneName,
  setEnableToonShader,
  setLightIntensity,
  setCameraDistance,
  setAnimationSpeed,
} = settingsSlice.actions;
export default settingsSlice.reducer;
