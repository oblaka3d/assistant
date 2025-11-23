/**
 * Конфигурация провайдеров для STT, LLM и TTS
 * Можно быстро переключаться между разными сервисами
 */

// Типы для провайдеров
type STTProvider = 'whisper_api' | 'yandex_stt' | 'google_stt' | 'vosk';
type LLMProvider = 'openai' | 'yandex_gpt' | 'anthropic';
type TTSProvider = 'yandex_tts' | 'silero' | 'google_tts';

// Типы конфигураций провайдеров
type WhisperConfig = {
  apiKey: string;
  endpoint: string;
  model: string;
};

type YandexSTTConfig = {
  apiKey: string;
  endpoint: string;
  folderId: string;
};

type GoogleSTTConfig = {
  apiKey: string;
  endpoint: string;
};

type VoskConfig = {
  modelPath: string;
  sampleRate: number;
};

type OpenAIConfig = {
  apiKey: string;
  endpoint: string;
  model: string;
  systemPrompt: string;
};

type YandexGPTConfig = {
  apiKey: string;
  endpoint: string;
  folderId: string;
};

type AnthropicConfig = {
  apiKey: string;
  endpoint: string;
  model: string;
};

type YandexTTSConfig = {
  apiKey: string;
  endpoint: string;
  folderId: string;
  voice: string;
  lang: string;
};

type SileroConfig = {
  model: string;
  speaker: string;
  sampleRate: number;
};

type GoogleTTSConfig = {
  apiKey: string;
  endpoint: string;
  voice: string;
};

export const config = {
  // Speech-to-Text провайдер
  stt: {
    provider: 'whisper_api', // whisper_api | yandex_stt | google_stt | vosk
    whisper_api: {
      apiKey: process.env.WHISPER_API_KEY || '',
      endpoint: 'https://api.openai.com/v1/audio/transcriptions',
      model: 'whisper-1',
    },
    yandex_stt: {
      apiKey: process.env.YANDEX_STT_KEY || '',
      endpoint: 'https://stt.api.cloud.yandex.net/speech/v1/stt:recognize',
      folderId: process.env.YANDEX_FOLDER_ID || '',
    },
    google_stt: {
      apiKey: process.env.GOOGLE_STT_KEY || '',
      endpoint: 'https://speech.googleapis.com/v1/speech:recognize',
    },
    vosk: {
      modelPath: './models/vosk-model',
      sampleRate: 16000,
    },
  },

  // LLM провайдер
  llm: {
    provider: 'openai', // openai | yandex_gpt | anthropic
    openai: {
      apiKey: process.env.OPENAI_API_KEY || '',
      endpoint: 'https://api.openai.com/v1/chat/completions',
      model: 'gpt-3.5-turbo',
      systemPrompt: 'Ты дружелюбный голосовой ассистент. Отвечай кратко и по делу.',
    },
    yandex_gpt: {
      apiKey: process.env.YANDEX_GPT_KEY || '',
      endpoint: 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
      folderId: process.env.YANDEX_FOLDER_ID || '',
    },
    anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      endpoint: 'https://api.anthropic.com/v1/messages',
      model: 'claude-3-haiku-20240307',
    },
  },

  // Text-to-Speech провайдер
  tts: {
    provider: 'yandex_tts', // yandex_tts | silero | google_tts
    yandex_tts: {
      apiKey: process.env.YANDEX_TTS_KEY || '',
      endpoint: 'https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize',
      folderId: process.env.YANDEX_FOLDER_ID || '',
      voice: 'jane', // jane | oksana | omazh | zahar | ermil
      lang: 'ru-RU',
    },
    silero: {
      model: 'v3_1_ru',
      speaker: 'aidar',
      sampleRate: 24000,
    },
    google_tts: {
      apiKey: process.env.GOOGLE_TTS_KEY || '',
      endpoint: 'https://texttospeech.googleapis.com/v1/text:synthesize',
      voice: 'ru-RU-Wavenet-D',
    },
  },

  // Настройки сервера
  server: {
    port: 3000,
    host: 'localhost',
  },

  // Настройки записи аудио
  audio: {
    sampleRate: 16000,
    channels: 1,
    bitsPerSample: 16,
    format: 'S16_LE', // Формат аудио для arecord/aplay (S16_LE = signed 16-bit little-endian)
    device: null, // null = default device
  },
} as const;

/**
 * Получает конфигурацию текущего STT провайдера
 */
export function getSTTConfig(): WhisperConfig | YandexSTTConfig | GoogleSTTConfig | VoskConfig {
  const provider = config.stt.provider as STTProvider;
  return config.stt[provider] as WhisperConfig | YandexSTTConfig | GoogleSTTConfig | VoskConfig;
}

/**
 * Получает конфигурацию текущего LLM провайдера
 */
export function getLLMConfig(): OpenAIConfig | YandexGPTConfig | AnthropicConfig {
  const provider = config.llm.provider as LLMProvider;
  return config.llm[provider] as OpenAIConfig | YandexGPTConfig | AnthropicConfig;
}

/**
 * Получает конфигурацию текущего TTS провайдера
 */
export function getTTSConfig(): YandexTTSConfig | SileroConfig | GoogleTTSConfig {
  const provider = config.tts.provider as TTSProvider;
  return config.tts[provider] as YandexTTSConfig | SileroConfig | GoogleTTSConfig;
}

/**
 * Получает имя текущего STT провайдера
 */
export function getSTTProvider(): STTProvider {
  return config.stt.provider as STTProvider;
}

/**
 * Получает имя текущего LLM провайдера
 */
export function getLLMProvider(): LLMProvider {
  return config.llm.provider as LLMProvider;
}

/**
 * Получает имя текущего TTS провайдера
 */
export function getTTSProvider(): TTSProvider {
  return config.tts.provider as TTSProvider;
}
