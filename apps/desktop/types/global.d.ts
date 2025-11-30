declare global {
  interface Window {
    api: {
      startRecord: () => Promise<void>;
      stopRecord: () => Promise<Buffer>;
      transcribe: (audioBuffer: Buffer) => Promise<string>;
      askLLM: (text: string) => Promise<string>;
      speak: (text: string) => Promise<void>;
      checkDependencies: () => Promise<
        Array<{
          name: string;
          available: boolean;
          required: boolean;
          message?: string;
          installInstructions?: string;
        }>
      >;
      getModelList: () => Promise<string[]>;
      getSceneList: () => Promise<string[]>;
      getLogs: (maxLines?: number) => Promise<string[]>;
      clearLogs: () => Promise<boolean>;
      getLogFileInfo: () => Promise<{ size: number; path: string | null; lineCount: number }>;
      login: (
        username: string,
        password: string
      ) => Promise<{ id: string; username: string; displayName?: string; email?: string }>;
      logout: () => Promise<boolean>;
      getCurrentUser: () => Promise<{
        id: string;
        username: string;
        displayName?: string;
        email?: string;
      } | null>;
      getLLMProviderInfo: () => Promise<{ provider: string; model: string | null; name: string }>;
      openOAuthWindow: (url: string) => Promise<{ token: string; refreshToken: string }>;
    };
  }
}

export {};
