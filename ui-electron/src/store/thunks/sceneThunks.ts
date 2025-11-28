import { createAsyncThunk } from '@reduxjs/toolkit';

import { DEFAULTS, TIMEOUTS } from '../../constants/app';
import type { CharacterScene } from '../../renderer/main';
import {
  setIsLoading,
  setLoadError,
  setSceneReady,
  setStatus,
  VoiceStatusType,
} from '../slices/voiceSlice';

let rendererModulePromise: Promise<typeof import('../../renderer/main')> | null = null;

const loadRendererModule = () => {
  if (!rendererModulePromise) {
    rendererModulePromise = import('../../renderer/main');
  }
  return rendererModulePromise;
};

interface InitSceneParams {
  canvas: HTMLCanvasElement;
  onProgress?: (progress: number) => void;
  enableToonShader?: boolean;
  onSceneCreated?: (scene: CharacterScene) => void;
}

/**
 * Инициализация 3D сцены персонажа
 * CharacterScene передается через callback, а не возвращается,
 * чтобы избежать попадания несериализуемых объектов в Redux store.
 */
export const initScene = createAsyncThunk(
  'scene/initScene',
  async (params: InitSceneParams, { dispatch }) => {
    const { canvas, onProgress, enableToonShader = false, onSceneCreated } = params;

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

      const { initCharacterScene } = await loadRendererModule();

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

      // Передаем scene через callback, а не возвращаем из thunk
      onSceneCreated?.(scene);

      // Возвращаем только сериализуемые данные
      return { success: true, ready: scene.ready } as const;
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
