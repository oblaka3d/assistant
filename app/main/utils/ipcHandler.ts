/**
 * Утилита для создания IPC handlers с единообразной обработкой ошибок
 */

import { IpcMainInvokeEvent } from 'electron';

type IPCHandler<T extends unknown[] = [], R = unknown> = (
  event: IpcMainInvokeEvent,
  ...args: T
) => Promise<R>;

/**
 * Обертка для IPC handler с автоматической обработкой ошибок
 */
export function createIPCHandler<T extends unknown[] = [], R = unknown>(
  handler: IPCHandler<T, R>,
  handlerName: string
): IPCHandler<T, R> {
  return async (event: IpcMainInvokeEvent, ...args: T): Promise<R> => {
    try {
      return await handler(event, ...args);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`[IPC] Error in handler "${handlerName}":`, errorMessage);
      if (error instanceof Error && error.stack) {
        console.error(`[IPC] Stack trace:`, error.stack);
      }
      throw error;
    }
  };
}

