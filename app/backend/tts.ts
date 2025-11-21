import { createAplayProcess } from './audio-utils';
import { config } from './config';

export async function synthesize(text: string): Promise<void> {
  try {
    // Заглушка для TTS API
    // Поддерживает Yandex TTS, Silero TTS и другие
    
    if (!config.tts.apiKey) {
      console.warn('TTS API key not configured. Using mock synthesis.');
      // В реальном проекте можно использовать локальный синтез (espeak, festival)
      console.log(`[TTS Mock]: ${text}`);
      return;
    }

    const response = await fetch(config.tts.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Api-Key ${config.tts.apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text,
        lang: 'ru-RU',
        voice: config.tts.voice,
        format: 'lpcm',
        sampleRateHertz: '16000',
      }),
    });

    if (!response.ok) {
      throw new Error(`TTS API error: ${response.statusText}`);
    }

    const audioBuffer = Buffer.from(await response.arrayBuffer());

    // Воспроизведение через aplay
    return new Promise<void>((resolve, reject) => {
      const process = createAplayProcess(audioBuffer);

      process.on('close', (code: number | null) => {
        if (code === null || code === 0) {
          console.log('TTS playback completed');
          resolve();
        } else {
          reject(new Error(`aplay exited with code ${code}`));
        }
      });

      process.on('error', (error: Error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error('TTS synthesis error:', error);
    throw error;
  }
}

