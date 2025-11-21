export interface Config {
  audio: {
    sampleRate: number;
    channels: number;
    format: string;
    device: string;
  };
  stt: {
    apiUrl: string;
    apiKey?: string;
  };
  llm: {
    apiUrl: string;
    apiKey?: string;
    model: string;
  };
  tts: {
    apiUrl: string;
    apiKey?: string;
    voice: string;
  };
}

export const config: Config = {
  audio: {
    sampleRate: 16000,
    channels: 1,
    format: 'S16_LE',
    device: 'default',
  },
  stt: {
    apiUrl: process.env.STT_API_URL || 'https://api.openai.com/v1/audio/transcriptions',
    apiKey: process.env.STT_API_KEY,
  },
  llm: {
    apiUrl: process.env.LLM_API_URL || 'https://api.openai.com/v1/chat/completions',
    apiKey: process.env.LLM_API_KEY,
    model: process.env.LLM_MODEL || 'gpt-3.5-turbo',
  },
  tts: {
    apiUrl: process.env.TTS_API_URL || 'https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize',
    apiKey: process.env.TTS_API_KEY,
    voice: process.env.TTS_VOICE || 'jane',
  },
};

