/**
 * Утилита для логирования
 * В production режиме логи отключаются
 */

const isProduction = import.meta.env.PROD;
const isDev = !isProduction;

export const logger = {
  log: (...args: unknown[]) => {
    if (isDev) {
      console.log(...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (isDev) {
      console.warn(...args);
    }
  },
  error: (...args: unknown[]) => {
    // Ошибки всегда логируем, даже в production
    console.error(...args);
  },
  info: (...args: unknown[]) => {
    if (isDev) {
      console.info(...args);
    }
  },
  debug: (...args: unknown[]) => {
    if (isDev && import.meta.env.DEV) {
      console.debug(...args);
    }
  },
};

/**
 * Логирование с префиксом (для отладки)
 */
export const createLogger = (prefix: string) => ({
  log: (...args: unknown[]) => logger.log(`[${prefix}]`, ...args),
  warn: (...args: unknown[]) => logger.warn(`[${prefix}]`, ...args),
  error: (...args: unknown[]) => logger.error(`[${prefix}]`, ...args),
  info: (...args: unknown[]) => logger.info(`[${prefix}]`, ...args),
  debug: (...args: unknown[]) => logger.debug(`[${prefix}]`, ...args),
});
