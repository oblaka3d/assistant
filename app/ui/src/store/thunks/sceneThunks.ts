import { createAsyncThunk } from '@reduxjs/toolkit';

import { DEFAULTS, TIMEOUTS } from '../../constants/app';
import { initCharacterScene } from '../../renderer/main';
import type { CharacterScene } from '../../renderer/main';
import {
  setIsLoading,
  setLoadError,
  setSceneReady,
  setStatus,
  VoiceStatusType,
} from '../slices/voiceSlice';

interface InitSceneParams {
  canvas: HTMLCanvasElement;
  onProgress?: (progress: number) => void;
  enableToonShader?: boolean;
}

/**
 * Инициализация 3D сцены персонажа
 */
export const initScene = createAsyncThunk(
  'scene/initScene',
  async (params: InitSceneParams, { dispatch }) => {
    const { canvas, onProgress, enableToonShader = false } = params;

    dispatch(setIsLoading(true));
    dispatch(setLoadError(false));

    // Таймаут для скрытия индикатора загрузки
    const timeoutId = setTimeout(() => {
      dispatch(setIsLoading(false));
      dispatch(setLoadError(true));
      dispatch(setStatus(VoiceStatusType.READY_NO_CHARACTER));
    }, TIMEOUTS.SCENE_LOAD);

    try {
      const modelPath = DEFAULTS.MODEL_PATH;

      // Создаем THREE.js сцену
      const scene = await initCharacterScene({
        canvas,
        modelUrl: modelPath,
        onProgress: onProgress || (() => {}),
        enableToonShader,
      });

      // Очищаем таймаут при успешной загрузке
      clearTimeout(timeoutId);

      dispatch(setSceneReady(scene.ready));
      dispatch(setIsLoading(false));
      dispatch(setStatus(VoiceStatusType.READY));

      return scene as CharacterScene;
    } catch (error) {
      clearTimeout(timeoutId);

      const errorMessage = error instanceof Error ? error.message : String(error);
      console.warn('Failed to load character scene, continuing without it:', errorMessage);

      dispatch(setLoadError(true));
      dispatch(setIsLoading(false));
      dispatch(setStatus(VoiceStatusType.READY_NO_CHARACTER));

      throw error;
    }
  }
);
