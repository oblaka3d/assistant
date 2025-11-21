import { config } from './config';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import FormData from 'form-data';

export async function transcribe(audioBuffer: Buffer): Promise<string> {
  try {
    // Заглушка для Whisper API
    // В реальном проекте здесь будет вызов API (OpenAI Whisper, Yandex SpeechKit и т.д.)
    
    if (!config.stt.apiKey) {
      console.warn('STT API key not configured. Using mock response.');
      return 'Привет, это тестовая транскрипция голосового сообщения.';
    }

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
      formData.append('model', 'whisper-1');
      formData.append('language', 'ru');

      // Для Node.js fetch нужно передать formData как stream
      const response = await fetch(config.stt.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.stt.apiKey}`,
          ...formData.getHeaders(),
        },
        // @ts-ignore - form-data stream совместим с fetch body
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`STT API error: ${response.statusText}`);
      }

      const data = await response.json() as { text: string };
      return data.text;
    } finally {
      // Удаляем временный файл
      try {
        fs.unlinkSync(tempFile);
      } catch (err) {
        console.warn('Failed to delete temp file:', err);
      }
    }
  } catch (error) {
    console.error('STT transcription error:', error);
    // Fallback на заглушку
    return 'Не удалось распознать речь. Попробуйте еще раз.';
  }
}

