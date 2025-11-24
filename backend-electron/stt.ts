import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import FormData from 'form-data';

import { getSTTConfig, getSTTProvider } from './config';

export async function transcribe(audioBuffer: Buffer): Promise<string> {
  try {
    // Заглушка для Whisper API
    // В реальном проекте здесь будет вызов API (OpenAI Whisper, Yandex SpeechKit и т.д.)

    const provider = getSTTProvider();
    const sttConfig = getSTTConfig();

    // Проверяем наличие API ключа (для провайдеров, которые его требуют)
    if ('apiKey' in sttConfig && !sttConfig.apiKey) {
      console.warn('STT API key not configured. Using mock response.');
      return 'Привет, это тестовая транскрипция голосового сообщения.';
    }

    // Для провайдера vosk нужна отдельная обработка
    if (provider === 'vosk') {
      console.warn('Vosk provider not yet implemented. Using mock response.');
      return 'Привет, это тестовая транскрипция голосового сообщения.';
    }

    // Для whisper_api используем OpenAI API
    if (provider === 'whisper_api' && 'endpoint' in sttConfig && 'apiKey' in sttConfig) {
      // Создаем временный файл для аудио
      const tempFile = path.join(os.tmpdir(), `audio_${Date.now()}.wav`);
      fs.writeFileSync(tempFile, audioBuffer);

      try {
        // Используем FormData через multipart/form-data для Node.js
        const formData = new FormData();
        formData.append('file', fs.createReadStream(tempFile), {
          filename: 'audio.wav',
          contentType: 'audio/wav',
        });
        formData.append('model', 'model' in sttConfig ? sttConfig.model : 'whisper-1');
        formData.append('language', 'ru');

        // Для Node.js fetch нужно передать formData как stream
        const response = await fetch(sttConfig.endpoint, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${sttConfig.apiKey}`,
            ...formData.getHeaders(),
          },
          // @ts-expect-error - form-data stream совместим с fetch body
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`STT API error: ${response.statusText}`);
        }

        const data = (await response.json()) as { text: string };
        return data.text;
      } finally {
        // Удаляем временный файл
        try {
          fs.unlinkSync(tempFile);
        } catch (err) {
          console.warn('Failed to delete temp file:', err);
        }
      }
    }

    // Для других провайдеров (yandex_stt, google_stt) нужна отдельная реализация
    console.warn(`STT provider ${provider} not yet fully implemented. Using mock response.`);
    return 'Привет, это тестовая транскрипция голосового сообщения.';
  } catch (error) {
    console.error('STT transcription error:', error);
    // Fallback на заглушку
    return 'Не удалось распознать речь. Попробуйте еще раз.';
  }
}
