export interface DependencyCheckResult {
  name: string;
  available: boolean;
  required: boolean;
  message?: string;
  installInstructions?: string;
}

declare global {
  interface Window {
    api?: {
      startRecord: () => Promise<void>;
      stopRecord: () => Promise<Buffer>;
      transcribe: (audioBuffer: Buffer) => Promise<string>;
      askLLM: (text: string) => Promise<string>;
      speak: (text: string) => Promise<void>;
      checkDependencies: () => Promise<DependencyCheckResult[]>;
    getModelList: () => Promise<string[]>;
    getSceneList: () => Promise<string[]>;
    getLogs: (maxLines?: number) => Promise<string[]>;
    clearLogs: () => Promise<boolean>;
    getLogFileInfo: () => Promise<{ size: number; path: string | null; lineCount: number }>;
    // Пользователь
    login: (username: string, password: string) => Promise<{ id: string; username: string; displayName?: string; email?: string }>;
    logout: () => Promise<boolean>;
    getCurrentUser: () => Promise<{ id: string; username: string; displayName?: string; email?: string } | null>;
    // API ключи
    getAPIKeys: () => Promise<Record<string, string>>;
    saveAPIKeys: (keys: Record<string, string>) => Promise<boolean>;
    };
  }
}

export {};
