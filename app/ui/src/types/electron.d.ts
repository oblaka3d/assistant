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
    };
  }
}

export {};

