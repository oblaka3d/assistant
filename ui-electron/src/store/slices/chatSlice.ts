import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  position: 'left' | 'right';
  type: 'text' | 'markdown' | 'image';
  text?: string;
  images?: MessageImage[];
  date: Date;
}

export interface MessageImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface Dialog {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatState {
  dialogs: Dialog[];
  currentDialogId: string | null;
  inputValue: string;
  dialogPanelOpen: boolean;
}

const createEmptyDialog = (dialogId?: string): Dialog => ({
  id: dialogId || Date.now().toString(),
  title: 'Новый диалог',
  messages: [], // Пустой массив - приветствие показывается через экран приветствия
  createdAt: new Date(),
  updatedAt: new Date(),
});

const defaultDialog: Dialog = createEmptyDialog('default');

const initialState: ChatState = {
  dialogs: [defaultDialog],
  currentDialogId: 'default',
  inputValue: '',
  dialogPanelOpen: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const dialog = state.dialogs.find((d) => d.id === state.currentDialogId);
      if (dialog) {
        dialog.messages.push(action.payload);
        dialog.updatedAt = new Date();
        // Обновляем заголовок диалога на основе первого сообщения пользователя
        if (dialog.messages.length === 2 && dialog.title === 'Новый диалог') {
          const firstUserMessage = dialog.messages.find((m) => m.position === 'right');
          if (firstUserMessage && firstUserMessage.text) {
            dialog.title = firstUserMessage.text.substring(0, 50) || 'Новый диалог';
          }
        }
      }
    },
    setMessages: (state, action: PayloadAction<{ dialogId: string; messages: Message[] }>) => {
      const dialog = state.dialogs.find((d) => d.id === action.payload.dialogId);
      if (dialog) {
        dialog.messages = action.payload.messages;
        dialog.updatedAt = new Date();
      }
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    clearInput: (state) => {
      state.inputValue = '';
    },
    clearMessages: (state) => {
      const dialog = state.dialogs.find((d) => d.id === state.currentDialogId);
      if (dialog) {
        dialog.messages = [];
        dialog.updatedAt = new Date();
      }
    },
    // Диалоги
    createDialog: (state, action: PayloadAction<{ title?: string; dialogId?: string }>) => {
      const newDialog: Dialog = createEmptyDialog(action.payload.dialogId);
      newDialog.title = action.payload.title || newDialog.title;
      state.dialogs.unshift(newDialog);
      state.currentDialogId = newDialog.id;
      state.inputValue = '';
    },
    deleteDialog: (state, action: PayloadAction<string>) => {
      const dialogIndex = state.dialogs.findIndex((d) => d.id === action.payload);
      if (dialogIndex !== -1) {
        state.dialogs.splice(dialogIndex, 1);
        const deletedCurrent = state.currentDialogId === action.payload;

        if (state.dialogs.length === 0) {
          const newDefaultDialog = createEmptyDialog('default');
          state.dialogs.push(newDefaultDialog);
          state.currentDialogId = newDefaultDialog.id;
          state.inputValue = '';
          return;
        }

        if (deletedCurrent) {
          state.currentDialogId = state.dialogs[0].id;
          state.inputValue = '';
        }
      }
    },
    selectDialog: (state, action: PayloadAction<string>) => {
      if (state.dialogs.some((d) => d.id === action.payload)) {
        state.currentDialogId = action.payload;
        state.inputValue = '';
      }
    },
    updateDialogTitle: (state, action: PayloadAction<{ dialogId: string; title: string }>) => {
      const dialog = state.dialogs.find((d) => d.id === action.payload.dialogId);
      if (dialog) {
        dialog.title = action.payload.title;
      }
    },
    toggleDialogPanel: (state) => {
      state.dialogPanelOpen = !state.dialogPanelOpen;
    },
    setDialogPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.dialogPanelOpen = action.payload;
    },
    setDialogs: (state, action: PayloadAction<Dialog[]>) => {
      state.dialogs = action.payload;
      // Если текущий диалог не найден в загруженных, выбираем первый
      if (state.currentDialogId && !state.dialogs.some((d) => d.id === state.currentDialogId)) {
        if (state.dialogs.length > 0) {
          state.currentDialogId = state.dialogs[0].id;
        } else {
          state.currentDialogId = null;
        }
      }
    },
    syncDialog: (state, action: PayloadAction<Dialog>) => {
      const index = state.dialogs.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.dialogs[index] = action.payload;
      } else {
        state.dialogs.unshift(action.payload);
        // Если нет текущего диалога, выбираем новый
        if (!state.currentDialogId) {
          state.currentDialogId = action.payload.id;
        }
      }
    },
    resetChat: () => initialState,
  },
});

export const {
  addMessage,
  setMessages,
  setInputValue,
  clearInput,
  clearMessages,
  createDialog,
  deleteDialog,
  selectDialog,
  updateDialogTitle,
  toggleDialogPanel,
  setDialogPanelOpen,
  setDialogs,
  syncDialog,
  resetChat,
} = chatSlice.actions;
export default chatSlice.reducer;
