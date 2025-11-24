import { contextBridge, ipcRenderer } from 'electron';

// Логирование для отладки
console.log('Preload script loaded');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  startRecord: (): Promise<void> => {
    return ipcRenderer.invoke('startRecord');
  },
  stopRecord: (): Promise<Buffer> => {
    return ipcRenderer.invoke('stopRecord');
  },
  transcribe: (audioBuffer: Buffer): Promise<string> => {
    return ipcRenderer.invoke('transcribe', audioBuffer);
  },
  askLLM: (text: string): Promise<string> => {
    return ipcRenderer.invoke('askLLM', text);
  },
  speak: (text: string): Promise<void> => {
    return ipcRenderer.invoke('speak', text);
  },
  checkDependencies: (): Promise<
    Array<{
      name: string;
      available: boolean;
      required: boolean;
      message?: string;
      installInstructions?: string;
    }>
  > => {
    return ipcRenderer.invoke('checkDependencies');
  },
  getModelList: (): Promise<string[]> => {
    return ipcRenderer.invoke('getModelList');
  },
  getSceneList: (): Promise<string[]> => {
    return ipcRenderer.invoke('getSceneList');
  },
  getLogs: (maxLines?: number): Promise<string[]> => {
    return ipcRenderer.invoke('getLogs', maxLines);
  },
  clearLogs: (): Promise<boolean> => {
    return ipcRenderer.invoke('clearLogs');
  },
  getLogFileInfo: (): Promise<{ size: number; path: string | null; lineCount: number }> => {
    return ipcRenderer.invoke('getLogFileInfo');
  },
  // Пользователь
  login: (
    username: string,
    password: string
  ): Promise<{ id: string; username: string; displayName?: string; email?: string }> => {
    return ipcRenderer.invoke('login', username, password);
  },
  logout: (): Promise<boolean> => {
    return ipcRenderer.invoke('logout');
  },
  getCurrentUser: (): Promise<{
    id: string;
    username: string;
    displayName?: string;
    email?: string;
  } | null> => {
    return ipcRenderer.invoke('getCurrentUser');
  },
  // LLM провайдер
  getLLMProviderInfo: (): Promise<{ provider: string; model: string | null; name: string }> => {
    return ipcRenderer.invoke('getLLMProviderInfo');
  },
});
