/**
 * Константы для провайдеров API
 */

export interface APIProvider {
  id: string;
  name: string;
  category: 'stt' | 'llm' | 'tts';
  description: string;
  requiresApiKey: boolean;
  apiKeyName?: string;
  additionalFields?: Array<{
    name: string;
    label: string;
    type: 'text' | 'password' | 'number';
    required?: boolean;
  }>;
}

export const API_PROVIDERS: APIProvider[] = [
  // STT Providers
  {
    id: 'whisper_api',
    name: 'OpenAI Whisper',
    category: 'stt',
    description: 'Распознавание речи через OpenAI Whisper API',
    requiresApiKey: true,
    apiKeyName: 'OPENAI_API_KEY',
  },
  {
    id: 'yandex_stt',
    name: 'Yandex SpeechKit STT',
    category: 'stt',
    description: 'Распознавание речи через Yandex SpeechKit',
    requiresApiKey: true,
    apiKeyName: 'YANDEX_STT_KEY',
    additionalFields: [
      {
        name: 'folderId',
        label: 'Folder ID',
        type: 'text',
        required: true,
      },
    ],
  },
  {
    id: 'google_stt',
    name: 'Google Cloud Speech-to-Text',
    category: 'stt',
    description: 'Распознавание речи через Google Cloud',
    requiresApiKey: true,
    apiKeyName: 'GOOGLE_STT_KEY',
  },
  {
    id: 'vosk',
    name: 'Vosk (локальный)',
    category: 'stt',
    description: 'Локальное распознавание речи (не требует API ключа)',
    requiresApiKey: false,
  },
  // LLM Providers
  {
    id: 'openai',
    name: 'OpenAI GPT',
    category: 'llm',
    description: 'Генерация ответов через OpenAI GPT',
    requiresApiKey: true,
    apiKeyName: 'OPENAI_API_KEY',
  },
  {
    id: 'yandex_gpt',
    name: 'Yandex GPT',
    category: 'llm',
    description: 'Генерация ответов через Yandex GPT',
    requiresApiKey: true,
    apiKeyName: 'YANDEX_GPT_KEY',
    additionalFields: [
      {
        name: 'folderId',
        label: 'Folder ID',
        type: 'text',
        required: true,
      },
    ],
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    category: 'llm',
    description: 'Генерация ответов через Anthropic Claude',
    requiresApiKey: true,
    apiKeyName: 'ANTHROPIC_API_KEY',
  },
  // TTS Providers
  {
    id: 'yandex_tts',
    name: 'Yandex SpeechKit TTS',
    category: 'tts',
    description: 'Синтез речи через Yandex SpeechKit',
    requiresApiKey: true,
    apiKeyName: 'YANDEX_TTS_KEY',
    additionalFields: [
      {
        name: 'folderId',
        label: 'Folder ID',
        type: 'text',
        required: true,
      },
    ],
  },
  {
    id: 'silero',
    name: 'Silero TTS (локальный)',
    category: 'tts',
    description: 'Локальный синтез речи (не требует API ключа)',
    requiresApiKey: false,
  },
  {
    id: 'google_tts',
    name: 'Google Cloud Text-to-Speech',
    category: 'tts',
    description: 'Синтез речи через Google Cloud',
    requiresApiKey: true,
    apiKeyName: 'GOOGLE_TTS_KEY',
  },
];

export const getProvidersByCategory = (category: 'stt' | 'llm' | 'tts'): APIProvider[] => {
  return API_PROVIDERS.filter((provider) => provider.category === category);
};
