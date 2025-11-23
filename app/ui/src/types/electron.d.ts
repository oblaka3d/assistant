declare global {
  interface Window {
    api?: {
      startRecording: () => Promise<void>;
      stopRecording: () => Promise<{ success: boolean; text?: string }>;
      getAssistantResponse: (text: string) => Promise<{ text: string; audio?: string }>;
      playAudio: (audio: string) => Promise<void>;
    };
  }
}

export {};

