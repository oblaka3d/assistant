import { platform } from 'os';

import { createAplayProcess, checkAudioCommands } from './audio-utils';
import { config } from './config';

let audioCommandsChecked = false;

/**
 * Проверяет доступность аудио команд для воспроизведения
 */
async function ensureAudioCommands(): Promise<void> {
  if (!audioCommandsChecked) {
    const { play } = await checkAudioCommands();
    if (!play) {
      const os = platform();
      let message = 'Audio playback command not found. ';
      if (os === 'linux') {
        message += 'Please install: sudo apt install alsa-utils or sudo apt install sox';
      } else if (os === 'darwin') {
        message += 'Please install: brew install sox';
      } else if (os === 'win32') {
        message +=
          'Please install sox: choco install sox or download from http://sox.sourceforge.net/';
      }
      throw new Error(message);
    }
    audioCommandsChecked = true;
  }
}

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
        Authorization: `Api-Key ${config.tts.apiKey}`,
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

    // Проверяем доступность аудио команд перед воспроизведением
    await ensureAudioCommands();

    // Воспроизведение через aplay/sox (кроссплатформенный)
    return new Promise<void>((resolve, reject) => {
      const process = createAplayProcess(audioBuffer);
      const os = platform();
      const commandName = os === 'linux' ? 'aplay/sox' : 'sox';

      process.on('close', (code: number | null) => {
        if (code === null || code === 0) {
          console.log('TTS playback completed');
          resolve();
        } else {
          reject(new Error(`${commandName} exited with code ${code}`));
        }
      });

      process.on('error', (error: Error) => {
        reject(new Error(`TTS playback error: ${error.message}`));
      });
    });
  } catch (error) {
    console.error('TTS synthesis error:', error);
    throw error;
  }
}
