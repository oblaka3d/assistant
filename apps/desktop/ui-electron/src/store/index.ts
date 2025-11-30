import { configureStore } from '@reduxjs/toolkit';
import type { ThunkDispatch } from '@reduxjs/toolkit';
import type { AnyAction } from 'redux';

import { chatStorageMiddleware } from './middleware/chatStorageMiddleware';
import apiKeysReducer from './slices/apiKeysSlice';
import applicationsFormsReducer from './slices/applicationsFormsSlice';
import applicationsReducer from './slices/applicationsSlice';
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
    applicationsForms: applicationsFormsReducer,
    applications: applicationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
