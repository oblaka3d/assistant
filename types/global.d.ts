import { ElectronAPI } from '../app/main/preload';

declare global {
  interface Window {
    api: ElectronAPI;
  }
}

export {};

