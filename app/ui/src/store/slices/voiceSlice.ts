import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum VoiceStatusType {
  READY = 'ready',
  READY_NO_CHARACTER = 'ready_no_character',
  LISTENING = 'listening',
  PROCESSING = 'processing',
  RECOGNIZING = 'recognizing',
  GENERATING = 'generating',
  SPEAKING = 'speaking',
  NOT_RECOGNIZED = 'not_recognized',
  ERROR = 'error',
}

export type VoiceStatus = VoiceStatusType;

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
  status: VoiceStatusType.READY,
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
      state.status = VoiceStatusType.READY;
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
