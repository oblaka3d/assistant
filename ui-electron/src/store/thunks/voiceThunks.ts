import { createAsyncThunk } from '@reduxjs/toolkit';

import { DEFAULTS, TIMEOUTS } from '../../constants/app';
import { addMessage } from '../slices/chatSlice';
import {
  setAssistantText,
  setIsRecording,
  setStatus,
  setUserText,
  VoiceStatusType,
} from '../slices/voiceSlice';

/**
 * Начало записи голоса
 */
export const startRecording = createAsyncThunk('voice/startRecording', async (_, { dispatch }) => {
  if (!window.api) {
    throw new Error('Electron API not available');
  }

  // Очищаем предыдущие тексты
  dispatch(setUserText(DEFAULTS.EMPTY_TEXT));
  dispatch(setAssistantText(DEFAULTS.EMPTY_TEXT));
  dispatch(setIsRecording(true));
  dispatch(setStatus(VoiceStatusType.LISTENING));

  try {
    await window.api.startRecord();
  } catch (error) {
    dispatch(setIsRecording(false));
    dispatch(setStatus(VoiceStatusType.ERROR));
    throw error;
  }
});

/**
 * Остановка записи и обработка голоса
 */
export const stopRecordingAndProcess = createAsyncThunk(
  'voice/stopRecordingAndProcess',
  async (
    params: {
      onThinking?: () => void;
      onIdle?: () => void;
      onTalking?: () => void;
    },
    { dispatch }
  ) => {
    const { onThinking, onIdle, onTalking } = params;

    if (!window.api) {
      throw new Error('Electron API not available');
    }

    // Остановить запись
    dispatch(setIsRecording(false));
    dispatch(setStatus(VoiceStatusType.PROCESSING));

    // Анимация персонажа - размышление
    onThinking?.();

    try {
      // Остановка записи и получение аудио буфера
      const audioBuffer = await window.api.stopRecord();

      // Распознавание речи
      dispatch(setStatus(VoiceStatusType.RECOGNIZING));
      onThinking?.();

      const transcribedText = await window.api.transcribe(audioBuffer);
      dispatch(setUserText(transcribedText || DEFAULTS.EMPTY_TEXT));

      if (!transcribedText || transcribedText.trim() === '') {
        dispatch(setStatus(VoiceStatusType.NOT_RECOGNIZED));
        onIdle?.();
        return;
      }

      // Добавляем сообщение пользователя в чат
      dispatch(
        addMessage({
          id: Date.now().toString(),
          position: 'right',
          type: 'text',
          text: transcribedText,
          date: new Date().toISOString(),
        })
      );

      // Получить ответ от ассистента
      dispatch(setStatus(VoiceStatusType.GENERATING));
      const response = await window.api.askLLM(transcribedText);
      dispatch(setAssistantText(response || DEFAULTS.EMPTY_TEXT));

      // Добавляем ответ ассистента в чат
      if (response) {
        dispatch(
          addMessage({
            id: (Date.now() + 1).toString(),
            position: 'left',
            type: 'text',
            text: response,
            date: new Date().toISOString(),
          })
        );
      }

      // Воспроизвести ответ
      dispatch(setStatus(VoiceStatusType.SPEAKING));
      onTalking?.();

      await window.api.speak(response);

      dispatch(setStatus(VoiceStatusType.READY));

      // Возврат к idle после небольшой задержки
      setTimeout(() => {
        onIdle?.();
      }, TIMEOUTS.IDLE_TRANSITION);
    } catch (error) {
      dispatch(setStatus(VoiceStatusType.ERROR));
      onIdle?.();
      throw error;
    }
  }
);
