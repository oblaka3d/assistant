import { configureStore } from '@reduxjs/toolkit';

import chatReducer from './slices/chatSlice';
import settingsReducer from './slices/settingsSlice';
import uiReducer from './slices/uiSlice';
import voiceReducer from './slices/voiceSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    voice: voiceReducer,
    chat: chatReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорируем Date объекты и другие несериализуемые значения
        ignoredActions: ['chat/addMessage', 'chat/setMessages'],
        ignoredActionPaths: ['payload.date', 'payload.timestamp'],
        ignoredPaths: ['chat.messages'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
