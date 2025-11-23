/**
 * Утилита для логирования в файл с автоматической ротацией
 */

import * as fs from 'fs';
import * as path from 'path';

import { app } from 'electron';

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
}

const MAX_LOG_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_LOG_LINES = 5000; // Максимальное количество строк в файле

let logFilePath: string | null = null;
let originalConsoleLog: typeof console.log;
let originalConsoleError: typeof console.error;
let originalConsoleWarn: typeof console.warn;
let originalConsoleInfo: typeof console.info;

/**
 * Инициализирует файловое логирование
 */
export function initializeFileLogger(): void {
  // Определяем путь к файлу логов
  const userDataPath = app.getPath('userData');
  const logsDir = path.join(userDataPath, 'logs');

  // Создаем директорию для логов, если её нет
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  logFilePath = path.join(logsDir, 'app.log');

  // Перехватываем console методы
  originalConsoleLog = console.log;
  originalConsoleError = console.error;
  originalConsoleWarn = console.warn;
  originalConsoleInfo = console.info;

  console.log = (...args: unknown[]) => {
    writeLog(LogLevel.INFO, args.join(' '));
    originalConsoleLog.apply(console, args);
  };

  console.error = (...args: unknown[]) => {
    writeLog(LogLevel.ERROR, args.join(' '));
    originalConsoleError.apply(console, args);
  };

  console.warn = (...args: unknown[]) => {
    writeLog(LogLevel.WARN, args.join(' '));
    originalConsoleWarn.apply(console, args);
  };

  console.info = (...args: unknown[]) => {
    writeLog(LogLevel.INFO, args.join(' '));
    originalConsoleInfo.apply(console, args);
  };

  writeLog(LogLevel.INFO, 'File logger initialized');
}

/**
 * Записывает лог в файл
 */
function writeLog(level: LogLevel, message: string, context?: string): void {
  if (!logFilePath) return;

  try {
    const timestamp = new Date().toISOString();
    const logEntry: LogEntry = {
      timestamp,
      level,
      message,
      context,
    };

    const logLine = formatLogEntry(logEntry) + '\n';

    // Проверяем размер файла и ротируем при необходимости
    rotateLogIfNeeded();

    // Записываем в файл
    fs.appendFileSync(logFilePath, logLine, 'utf8');
  } catch (error) {
    // Если не удалось записать в файл, выводим в консоль
    originalConsoleError?.('Failed to write log to file:', error);
  }
}

/**
 * Форматирует запись лога
 */
function formatLogEntry(entry: LogEntry): string {
  const contextPart = entry.context ? ` [${entry.context}]` : '';
  return `[${entry.timestamp}] ${entry.level}${contextPart}: ${entry.message}`;
}

/**
 * Ротирует лог, если он превысил максимальный размер
 */
function rotateLogIfNeeded(): void {
  if (!logFilePath || !fs.existsSync(logFilePath)) return;

  try {
    const stats = fs.statSync(logFilePath);
    const fileSize = stats.size;

    // Если файл превысил максимальный размер, удаляем старые записи
    if (fileSize > MAX_LOG_SIZE) {
      const lines = fs.readFileSync(logFilePath, 'utf8').split('\n').filter((line) => line.trim());
      
      // Оставляем только последние MAX_LOG_LINES строк
      const newLines = lines.slice(-MAX_LOG_LINES);
      
      // Записываем обратно в файл
      fs.writeFileSync(logFilePath, newLines.join('\n') + '\n', 'utf8');
      
      writeLog(LogLevel.INFO, `Log rotated. Removed ${lines.length - newLines.length} old entries.`);
    }
  } catch (error) {
    originalConsoleError?.('Failed to rotate log:', error);
  }
}

/**
 * Читает логи из файла
 */
export function readLogs(maxLines?: number): string[] {
  if (!logFilePath || !fs.existsSync(logFilePath)) {
    return [];
  }

  try {
    const content = fs.readFileSync(logFilePath, 'utf8');
    const lines = content.split('\n').filter((line) => line.trim());

    if (maxLines && lines.length > maxLines) {
      return lines.slice(-maxLines);
    }

    return lines;
  } catch (error) {
    originalConsoleError?.('Failed to read logs:', error);
    return [];
  }
}

/**
 * Очищает файл логов
 */
export function clearLogs(): void {
  if (!logFilePath) return;

  try {
    if (fs.existsSync(logFilePath)) {
      fs.writeFileSync(logFilePath, '', 'utf8');
      writeLog(LogLevel.INFO, 'Logs cleared');
    }
  } catch (error) {
    originalConsoleError?.('Failed to clear logs:', error);
  }
}

/**
 * Получает размер файла логов
 */
export function getLogFileSize(): number {
  if (!logFilePath || !fs.existsSync(logFilePath)) {
    return 0;
  }

  try {
    const stats = fs.statSync(logFilePath);
    return stats.size;
  } catch (error) {
    originalConsoleError?.('Failed to get log file size:', error);
    return 0;
  }
}

/**
 * Получает путь к файлу логов
 */
export function getLogFilePath(): string | null {
  return logFilePath;
}

