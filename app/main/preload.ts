import { contextBridge, ipcRenderer } from 'electron';

export interface ElectronAPI {
  startRecord: () => Promise<void>;
  stopRecord: () => Promise<Buffer>;
  transcribe: (audioBuffer: Buffer) => Promise<string>;
  askLLM: (text: string) => Promise<string>;
  speak: (text: string) => Promise<void>;
}

contextBridge.exposeInMainWorld('api', {
  startRecord: (): Promise<void> => ipcRenderer.invoke('startRecord'),
  stopRecord: (): Promise<Buffer> => ipcRenderer.invoke('stopRecord'),
  transcribe: (audioBuffer: Buffer): Promise<string> => ipcRenderer.invoke('transcribe', audioBuffer),
  askLLM: (text: string): Promise<string> => ipcRenderer.invoke('askLLM', text),
  speak: (text: string): Promise<void> => ipcRenderer.invoke('speak', text),
} as ElectronAPI);

