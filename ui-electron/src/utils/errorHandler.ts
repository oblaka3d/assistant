/**
 * Утилиты для обработки ошибок
 */

import { logger } from './logger';

export interface ErrorInfo {
  message: string;
  code?: string;
  details?: unknown;
}

/**
 * Обрабатывает ошибку и возвращает читаемое сообщение
 */
export function handleError(error: unknown, context?: string): ErrorInfo {
  const prefix = context ? `[${context}]` : '[Error]';

  if (error instanceof Error) {
    logger.error(`${prefix} ${error.message}`, error.stack);
    return {
      message: error.message,
      code: error.name,
      details: error.stack,
    };
  }

  if (typeof error === 'string') {
    logger.error(`${prefix} ${error}`);
    return {
      message: error,
    };
  }

  const errorMessage = String(error);
  logger.error(`${prefix} ${errorMessage}`, error);
  return {
    message: errorMessage,
    details: error,
  };
}

/**
 * Обертка для async функций с обработкой ошибок
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  context?: string,
  fallback?: T
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    handleError(error, context);
    return fallback;
  }
}
