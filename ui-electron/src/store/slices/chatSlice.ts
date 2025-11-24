import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  position: 'left' | 'right';
  type: 'text';
  text: string;
  date: Date;
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

const defaultDialog: Dialog = {
  id: 'default',
  title: 'Новый диалог',
  messages: [
    {
      id: '1',
      position: 'left',
      type: 'text',
      text: 'Привет! Я ваш голосовой ассистент. Чем могу помочь?',
      date: new Date(),
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

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
          if (firstUserMessage) {
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
    createDialog: (state, action: PayloadAction<{ title?: string }>) => {
      const newDialog: Dialog = {
        id: Date.now().toString(),
        title: action.payload.title || 'Новый диалог',
        messages: [
          {
            id: '1',
            position: 'left',
            type: 'text',
            text: 'Привет! Я ваш голосовой ассистент. Чем могу помочь?',
            date: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      state.dialogs.unshift(newDialog);
      state.currentDialogId = newDialog.id;
      state.inputValue = '';
    },
    deleteDialog: (state, action: PayloadAction<string>) => {
      const dialogIndex = state.dialogs.findIndex((d) => d.id === action.payload);
      if (dialogIndex !== -1) {
        state.dialogs.splice(dialogIndex, 1);
        // Если удалили текущий диалог, переключаемся на первый доступный
        if (state.currentDialogId === action.payload) {
          if (state.dialogs.length > 0) {
            state.currentDialogId = state.dialogs[0].id;
          } else {
            // Создаем новый диалог, если не осталось диалогов
            const defaultDialog: Dialog = {
              id: Date.now().toString(),
              title: 'Новый диалог',
              messages: [
                {
                  id: '1',
                  position: 'left',
                  type: 'text',
                  text: 'Привет! Я ваш голосовой ассистент. Чем могу помочь?',
                  date: new Date(),
                },
              ],
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            state.dialogs.push(defaultDialog);
            state.currentDialogId = defaultDialog.id;
          }
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
} = chatSlice.actions;
export default chatSlice.reducer;
