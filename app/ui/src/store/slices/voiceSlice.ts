import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { STATUS_MESSAGES } from '../../constants/messages';

export type VoiceStatus =
  | 'Готов к работе'
  | 'Готов к работе (без персонажа)'
  | 'Слушаю...'
  | 'Обработка...'
  | 'Распознавание речи...'
  | 'Генерация ответа...'
  | 'Отвечаю...'
  | 'Речь не распознана'
  | 'Ошибка';

interface VoiceState {
  status: VoiceStatus;
  isRecording: boolean;
  userText: string;
  assistantText: string;
  sceneReady: boolean;
  isLoading: boolean;
  loadError: boolean;
}

const initialState: VoiceState = {
  status: 'Готов к работе',
  isRecording: false,
  userText: '—',
  assistantText: '—',
  sceneReady: false,
  isLoading: true,
  loadError: false,
};

const voiceSlice = createSlice({
  name: 'voice',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<VoiceStatus>) => {
      state.status = action.payload;
    },
    setIsRecording: (state, action: PayloadAction<boolean>) => {
      state.isRecording = action.payload;
    },
    setUserText: (state, action: PayloadAction<string>) => {
      state.userText = action.payload;
    },
    setAssistantText: (state, action: PayloadAction<string>) => {
      state.assistantText = action.payload;
    },
    setSceneReady: (state, action: PayloadAction<boolean>) => {
      state.sceneReady = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLoadError: (state, action: PayloadAction<boolean>) => {
      state.loadError = action.payload;
    },
    resetVoiceState: (state) => {
      state.status = 'Готов к работе';
      state.isRecording = false;
      state.userText = '—';
      state.assistantText = '—';
    },
  },
});

export const {
  setStatus,
  setIsRecording,
  setUserText,
  setAssistantText,
  setSceneReady,
  setIsLoading,
  setLoadError,
  resetVoiceState,
} = voiceSlice.actions;
export default voiceSlice.reducer;
