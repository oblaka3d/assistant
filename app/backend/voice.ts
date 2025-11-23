import { platform } from 'os';

import {
  createArecordProcess,
  combineBuffers,
  AudioProcess,
  checkAudioCommands,
} from './audio-utils';

let recordingProcess: AudioProcess | null = null;
let audioCommandsChecked = false;

/**
 * Проверяет доступность аудио команд при первом использовании
 */
async function ensureAudioCommands(): Promise<void> {
  if (!audioCommandsChecked) {
    const { record } = await checkAudioCommands();
    if (!record) {
      const os = platform();
      let message = 'Audio recording command not found. ';
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

export async function startRecord(): Promise<void> {
  if (recordingProcess) {
    throw new Error('Recording already in progress');
  }

  try {
    await ensureAudioCommands();
    recordingProcess = createArecordProcess();
    console.log('Recording started');
  } catch (error) {
    recordingProcess = null;
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to start recording: ${errorMessage}`);
  }
}

export async function stopRecord(): Promise<Buffer> {
  if (!recordingProcess) {
    throw new Error('No recording in progress');
  }

  return new Promise<Buffer>((resolve, reject) => {
    const { process, buffer } = recordingProcess!;
    const os = platform();

    process.on('close', (code: number | null) => {
      // Коды 0 и 1 обычно означают успешное завершение
      // 1 может означать прерывание сигналом (SIGINT), что нормально
      if (code === null || code === 0 || code === 1) {
        const audioBuffer = combineBuffers(buffer);
        recordingProcess = null;
        console.log(`Recording stopped. Buffer size: ${audioBuffer.length} bytes`);
        resolve(audioBuffer);
      } else {
        recordingProcess = null;
        const commandName = os === 'linux' ? 'arecord/sox' : 'sox';
        reject(new Error(`${commandName} exited with code ${code}`));
      }
    });

    process.on('error', (error: Error) => {
      recordingProcess = null;
      reject(new Error(`Recording process error: ${error.message}`));
    });

    // Отправляем SIGINT для корректного завершения
    process.kill('SIGINT');
  });
}

export function isRecording(): boolean {
  return recordingProcess !== null;
}
