import { spawn, ChildProcess } from 'child_process';
import { platform } from 'os';

import { config } from './config';

export interface AudioProcess {
  process: ChildProcess;
  buffer: Buffer[];
}

/**
 * Определяет платформу и возвращает команду для записи аудио
 */
function getRecordCommand(): { command: string; args: string[] } {
  const os = platform();
  const sampleRate = config.audio.sampleRate.toString();
  const channels = config.audio.channels.toString();

  if (os === 'linux') {
    // Попробуем использовать arecord (ALSA), если доступен
    // Fallback на sox, если arecord недоступен
    const args = [
      '-f',
      config.audio.format,
      '-r',
      sampleRate,
      '-c',
      channels,
    ];
    
    // Добавляем -D только если device указан
    if (config.audio.device) {
      args.push('-D', config.audio.device);
    }
    
    return {
      command: 'arecord',
      args,
    };
  } else if (os === 'darwin') {
    // macOS: используем sox или coreaudio через sox
    return {
      command: 'sox',
      args: [
        '-d', // запись с устройства по умолчанию
        '-t',
        'raw',
        '-r',
        sampleRate,
        '-c',
        channels,
        '-e',
        'signed-integer',
        '-b',
        '16',
        '-',
      ],
    };
  } else if (os === 'win32') {
    // Windows: используем sox (требует установки)
    // Альтернатива: можно использовать PowerShell или другие инструменты
    return {
      command: 'sox',
      args: [
        '-d',
        '-t',
        'raw',
        '-r',
        sampleRate,
        '-c',
        channels,
        '-e',
        'signed-integer',
        '-b',
        '16',
        '-',
      ],
    };
  } else {
    throw new Error(`Unsupported platform: ${os}`);
  }
}

/**
 * Определяет платформу и возвращает команду для воспроизведения аудио
 */
function getPlayCommand(): { command: string; args: string[] } {
  const os = platform();
  const sampleRate = config.audio.sampleRate.toString();
  const channels = config.audio.channels.toString();

  if (os === 'linux') {
    // Попробуем использовать aplay (ALSA), если доступен
    const args = [
      '-f',
      config.audio.format,
      '-r',
      sampleRate,
      '-c',
      channels,
    ];
    
    // Добавляем -D только если device указан
    if (config.audio.device) {
      args.push('-D', config.audio.device);
    }
    
    return {
      command: 'aplay',
      args,
    };
  } else if (os === 'darwin') {
    // macOS: используем sox или afplay через такую конструкцию
    // Для тактового вывода можно использовать sox
    return {
      command: 'sox',
      args: [
        '-t',
        'raw',
        '-r',
        sampleRate,
        '-c',
        channels,
        '-e',
        'signed-integer',
        '-b',
        '16',
        '-',
        '-d', // вывод на устройство по умолчанию
      ],
    };
  } else if (os === 'win32') {
    // Windows: используем sox (требует установки)
    return {
      command: 'sox',
      args: [
        '-t',
        'raw',
        '-r',
        sampleRate,
        '-c',
        channels,
        '-e',
        'signed-integer',
        '-b',
        '16',
        '-',
        '-d',
      ],
    };
  } else {
    throw new Error(`Unsupported platform: ${os}`);
  }
}

/**
 * Создает процесс записи аудио (кроссплатформенный)
 */
export function createArecordProcess(): AudioProcess {
  const buffer: Buffer[] = [];
  const { command, args } = getRecordCommand();

  const process = spawn(command, args);

  process.stdout?.on('data', (chunk: Buffer) => {
    buffer.push(chunk);
  });

  process.stderr?.on('data', (data: Buffer) => {
    // Игнорируем некоторые сообщения stderr от sox/arecord
    const message = data.toString();
    if (!message.includes('ALSA') && !message.includes('File size')) {
      console.error(`${command} stderr:`, message);
    }
  });

  process.on('error', (error: Error) => {
    console.error(`${command} error:`, error);
    // Если основная команда не найдена, пробуем fallback
    if (error.message.includes('ENOENT')) {
      console.warn(`Command ${command} not found. Trying fallback...`);
      // Можно добавить fallback логику здесь
    }
  });

  return { process, buffer };
}

/**
 * Создает процесс воспроизведения аудио (кроссплатформенный)
 */
export function createAplayProcess(audioBuffer: Buffer): ChildProcess {
  const { command, args } = getPlayCommand();

  const process = spawn(command, args);

  process.stdin?.write(audioBuffer);
  process.stdin?.end();

  process.stderr?.on('data', (data: Buffer) => {
    // Игнорируем некоторые сообщения stderr
    const message = data.toString();
    if (!message.includes('ALSA') && !message.includes('File size')) {
      console.error(`${command} stderr:`, message);
    }
  });

  process.on('error', (error: Error) => {
    console.error(`${command} error:`, error);
    if (error.message.includes('ENOENT')) {
      console.warn(`Command ${command} not found. Please install sox for audio playback.`);
      console.warn('Linux: sudo apt install sox');
      console.warn('macOS: brew install sox');
      console.warn('Windows: choco install sox or download from http://sox.sourceforge.net/');
    }
  });

  return process;
}

export function combineBuffers(buffers: Buffer[]): Buffer {
  return Buffer.concat(buffers);
}

/**
 * Проверяет доступность аудио команд для текущей платформы
 */
export async function checkAudioCommands(): Promise<{ record: boolean; play: boolean }> {
  const checkCommand = (command: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const process = spawn(command, ['--version']);
      process.on('close', (code: number | null) => {
        resolve(code === 0);
      });
      process.on('error', () => {
        resolve(false);
      });
      // Таймаут для случаев, когда команда зависла
      setTimeout(() => resolve(false), 2000);
    });
  };

  const { command: recordCmd } = getRecordCommand();
  const { command: playCmd } = getPlayCommand();

  const [recordAvailable, playAvailable] = await Promise.all([
    checkCommand(recordCmd),
    checkCommand(playCmd),
  ]);

  return { record: recordAvailable, play: playAvailable };
}
