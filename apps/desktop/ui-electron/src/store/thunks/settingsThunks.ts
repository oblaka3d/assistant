import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  DEFAULT_IDLE_MODE,
  DEFAULT_IDLE_PEXELS_QUERY,
  DEFAULT_IDLE_TIMEOUT_SECONDS,
} from '../../constants/app';
import {
  getSettings,
  updateSettings as apiUpdateSettings,
  UpdateSettingsRequest,
} from '../../utils/api';
import type { SettingsData } from '../../utils/api';
import { setAllSettings } from '../slices/settingsSlice';
import type { SettingsState } from '../slices/settingsSlice';

/**
 * Загрузка настроек с сервера
 */
export const fetchSettings = createAsyncThunk<SettingsData, void, { rejectValue: string }>(
  'settings/fetch',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await getSettings();
      const settingsData = response.data.settings;

      // Преобразуем данные с сервера в формат Redux state
      const settingsState: SettingsState = {
        volume: settingsData.volume,
        language: settingsData.language,
        theme: settingsData.theme || 'system',
        accentColorLight: settingsData.accentColorLight || '#4a90e2',
        accentColorDark: settingsData.accentColorDark || '#4a90e2',
        sttProviderName: settingsData.sttProviderName || null,
        llmProviderName: settingsData.llmProviderName || null,
        llmModel: settingsData.llmModel || null,
        ttsProviderName: settingsData.ttsProviderName || null,
        welcomeTitle: settingsData.welcomeTitle || '',
        idleTimeoutSeconds: settingsData.idleTimeoutSeconds ?? DEFAULT_IDLE_TIMEOUT_SECONDS,
        idleMode: settingsData.idleMode || DEFAULT_IDLE_MODE,
        idleCustomImagePath: settingsData.idleCustomImagePath || '',
        idleRemoteEndpoint: settingsData.idleRemoteEndpoint || DEFAULT_IDLE_PEXELS_QUERY,
        modelScene: {
          modelPath: settingsData.modelScene.modelPath,
          sceneName: settingsData.modelScene.sceneName,
          enableToonShader: settingsData.modelScene.enableToonShader,
          lightIntensity: settingsData.modelScene.lightIntensity,
          cameraDistance: settingsData.modelScene.cameraDistance,
          animationSpeed: settingsData.modelScene.animationSpeed,
        },
      };

      // Устанавливаем все настройки в store
      dispatch(setAllSettings(settingsState));

      return settingsData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**
 * Сохранение настроек на сервер
 */
export const saveSettings = createAsyncThunk<
  SettingsData,
  UpdateSettingsRequest,
  { rejectValue: string }
>('settings/save', async (updateData, { dispatch, rejectWithValue }) => {
  try {
    const response = await apiUpdateSettings(updateData);
    const settingsData = response.data.settings;

    // Преобразуем данные с сервера в формат Redux state
    const settingsState: SettingsState = {
      volume: settingsData.volume,
      language: settingsData.language,
      theme: settingsData.theme || 'system',
      sttProviderName: settingsData.sttProviderName || null,
      llmProviderName: settingsData.llmProviderName || null,
      llmModel: settingsData.llmModel || null,
      ttsProviderName: settingsData.ttsProviderName || null,
      welcomeTitle: settingsData.welcomeTitle || '',
      idleTimeoutSeconds: settingsData.idleTimeoutSeconds ?? DEFAULT_IDLE_TIMEOUT_SECONDS,
      idleMode: settingsData.idleMode || DEFAULT_IDLE_MODE,
      idleCustomImagePath: settingsData.idleCustomImagePath || '',
      idleRemoteEndpoint: settingsData.idleRemoteEndpoint || DEFAULT_IDLE_PEXELS_QUERY,
      modelScene: {
        modelPath: settingsData.modelScene.modelPath,
        sceneName: settingsData.modelScene.sceneName,
        enableToonShader: settingsData.modelScene.enableToonShader,
        lightIntensity: settingsData.modelScene.lightIntensity,
        cameraDistance: settingsData.modelScene.cameraDistance,
        animationSpeed: settingsData.modelScene.animationSpeed,
      },
    };

    // Обновляем все настройки в store
    dispatch(setAllSettings(settingsState));

    return settingsData;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
