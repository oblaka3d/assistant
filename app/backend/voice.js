/**
 * Модуль захвата голоса
 * Использует node-record-lpcm16 для записи аудио в формате PCM 16kHz mono
 */

import record from 'node-record-lpcm16';
import { Writable } from 'stream';
import { config } from './config.js';

let recordingStream = null;
let audioChunks = [];

/**
 * Начать запись аудио
 * @returns {Promise<Writable>} Поток записи
 */
export function startRecording() {
  return new Promise((resolve, reject) => {
    try {
      audioChunks = [];

      const options = {
        sampleRate: config.audio.sampleRate,
        channels: config.audio.channels,
        device: config.audio.device,
        verbose: false,
      };

      recordingStream = record.record(options);

      // Собираем аудио данные в буфер
      recordingStream.on('data', (chunk) => {
        audioChunks.push(chunk);
      });

      recordingStream.on('error', (error) => {
        console.error('Ошибка записи:', error);
        reject(error);
      });

      console.log('Запись начата...');
      resolve(recordingStream);
    } catch (error) {
      console.error('Ошибка при запуске записи:', error);
      reject(error);
    }
  });
}

/**
 * Остановить запись и вернуть буфер с аудио
 * @returns {Promise<Buffer>} Буфер с PCM данными
 */
export function stopRecording() {
  return new Promise((resolve, reject) => {
    if (!recordingStream) {
      reject(new Error('Запись не была начата'));
      return;
    }

    try {
      recordingStream.stop();
      recordingStream = null;

      // Объединяем все чанки в один буфер
      const audioBuffer = Buffer.concat(audioChunks);
      audioChunks = [];

      console.log(`Запись остановлена. Размер: ${audioBuffer.length} байт`);
      resolve(audioBuffer);
    } catch (error) {
      console.error('Ошибка при остановке записи:', error);
      reject(error);
    }
  });
}

/**
 * Проверить, идет ли запись
 * @returns {boolean}
 */
export function isRecording() {
  return recordingStream !== null;
}
