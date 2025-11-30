import { Middleware } from '@reduxjs/toolkit';

import { saveGuestDialogs } from '../../utils/storage';
import type { RootState } from '../index';
import type { Dialog } from '../slices/chatSlice';

/**
 * Middleware для автоматического сохранения чатов в localStorage
 * для неавторизованных пользователей
 */
export const chatStorageMiddleware: Middleware<object, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    // Сохраняем чаты в localStorage только если пользователь не авторизован
    if (!state.user.isAuthenticated) {
      // Список действий, которые изменяют диалоги
      const chatActions = [
        'chat/addMessage',
        'chat/setMessages',
        'chat/clearMessages',
        'chat/createDialog',
        'chat/deleteDialog',
        'chat/selectDialog',
        'chat/updateDialogTitle',
        'chat/setDialogs',
        'chat/syncDialog',
      ];

      if (chatActions.some((actionType) => action.type.startsWith(actionType))) {
        try {
          const dialogs: Dialog[] = state.chat.dialogs;
          saveGuestDialogs(dialogs);
        } catch (error) {
          console.error('Failed to save guest dialogs:', error);
        }
      }
    }

    return result;
  };
