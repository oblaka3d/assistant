import { configureStore } from '@reduxjs/toolkit';

import apiKeysReducer from './slices/apiKeysSlice';
import chatReducer from './slices/chatSlice';
import settingsReducer from './slices/settingsSlice';
import uiReducer from './slices/uiSlice';
import userReducer from './slices/userSlice';
import voiceReducer from './slices/voiceSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    voice: voiceReducer,
    chat: chatReducer,
    settings: settingsReducer,
    user: userReducer,
    apiKeys: apiKeysReducer,
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
