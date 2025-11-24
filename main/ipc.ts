import { ipcMain } from 'electron';

import type { OpenAIConfig, YandexGPTConfig, AnthropicConfig } from '../backend-electron/config';
import { checkDependencies } from '../backend-electron/dependency-checker';
import { generateResponse } from '../backend-electron/llm';
import { transcribe } from '../backend-electron/stt';
import { synthesize } from '../backend-electron/tts';
import { startRecord, stopRecord } from '../backend-electron/voice';

import { getAssetList } from './utils/assetList';
import { readLogs, clearLogs, getLogFileSize, getLogFilePath } from './utils/fileLogger';
import { createIPCHandler } from './utils/ipcHandler';
import { getLLMProviderName } from './utils/llmProvider';

// Динамические импорты для избежания циклических зависимостей
let getLLMProviderFn: (() => string) | undefined;
let getLLMConfigFn: (() => OpenAIConfig | YandexGPTConfig | AnthropicConfig) | undefined;

const loadLLMFunctions = async () => {
  if (!getLLMProviderFn || !getLLMConfigFn) {
    const configModule = await import('../backend-electron/config');
    getLLMProviderFn = configModule.getLLMProvider;
    getLLMConfigFn = configModule.getLLMConfig;
  }

  if (!getLLMProviderFn || !getLLMConfigFn) {
    throw new Error('LLM configuration functions are not available');
  }

  return { getLLMProvider: getLLMProviderFn, getLLMConfig: getLLMConfigFn };
};

export function setupIPC(): void {
  ipcMain.handle(
    'startRecord',
    createIPCHandler(async () => {
      await startRecord();
    }, 'startRecord')
  );

  ipcMain.handle(
    'stopRecord',
    createIPCHandler(async () => {
      return await stopRecord();
    }, 'stopRecord')
  );

  ipcMain.handle(
    'transcribe',
    createIPCHandler(async (_event, audioBuffer: Buffer) => {
      return await transcribe(audioBuffer);
    }, 'transcribe')
  );

  ipcMain.handle(
    'askLLM',
    createIPCHandler(async (_event, text: string) => {
      return await generateResponse(text);
    }, 'askLLM')
  );

  ipcMain.handle(
    'speak',
    createIPCHandler(async (_event, text: string) => {
      await synthesize(text);
    }, 'speak')
  );

  ipcMain.handle(
    'checkDependencies',
    createIPCHandler(async () => {
      return await checkDependencies();
    }, 'checkDependencies')
  );

  ipcMain.handle(
    'getLLMProviderInfo',
    createIPCHandler(async () => {
      const { getLLMProvider, getLLMConfig } = await loadLLMFunctions();
      const provider = getLLMProvider();
      const config = getLLMConfig();
      const model = 'model' in config ? config.model : null;
      return {
        provider,
        model,
        name: getLLMProviderName(provider),
      };
    }, 'getLLMProviderInfo')
  );

  ipcMain.handle(
    'getModelList',
    createIPCHandler(async (): Promise<string[]> => {
      return getAssetList({
        folder: 'models',
        extensions: ['.glb'],
      });
    }, 'getModelList')
  );

  ipcMain.handle(
    'getSceneList',
    createIPCHandler(async () => {
      return getAssetList({
        folder: 'scenes',
        extensions: ['.json', '.gltf', '.glb', '.scene'],
      });
    }, 'getSceneList')
  );

  // Пользователь
  ipcMain.handle(
    'login',
    createIPCHandler(async (_event, username: string, password: string) => {
      // TODO: Реализовать проверку учетных данных
      // Пока заглушка для демонстрации
      if (username && password) {
        return {
          id: '1',
          username,
          displayName: username,
          email: `${username}@example.com`,
        };
      }
      throw new Error('Неверные учетные данные');
    }, 'login')
  );

  ipcMain.handle(
    'logout',
    createIPCHandler(async () => {
      // TODO: Реализовать выход из системы
      return true;
    }, 'logout')
  );

  ipcMain.handle(
    'getCurrentUser',
    createIPCHandler(async () => {
      // TODO: Реализовать получение текущего пользователя из сессии/базы данных
      // Пока возвращаем null (не авторизован)
      return null;
    }, 'getCurrentUser')
  );

  // Логирование
  ipcMain.handle(
    'getLogs',
    createIPCHandler(async (_event, maxLines?: number) => {
      return readLogs(maxLines);
    }, 'getLogs')
  );

  ipcMain.handle(
    'clearLogs',
    createIPCHandler(async () => {
      clearLogs();
      return true;
    }, 'clearLogs')
  );

  ipcMain.handle(
    'getLogFileInfo',
    createIPCHandler(async () => {
      return {
        size: getLogFileSize(),
        path: getLogFilePath(),
        lineCount: readLogs().length,
      };
    }, 'getLogFileInfo')
  );
}
