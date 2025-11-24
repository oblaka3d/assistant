import { createAsyncThunk } from '@reduxjs/toolkit';

import { addMessage } from '../slices/chatSlice';
import { setLLMProviderName } from '../slices/settingsSlice';
import { setIsRecording } from '../slices/voiceSlice';

/**
 * Загрузка информации о LLM провайдере
 */
export const loadLLMProviderInfo = createAsyncThunk(
  'chat/loadLLMProviderInfo',
  async (_, { dispatch }) => {
    if (!window.api) {
      throw new Error('Electron API not available');
    }

    const info = await window.api.getLLMProviderInfo();
    dispatch(setLLMProviderName(info.name));

    return info;
  }
);

/**
 * Отправка сообщения и получение ответа
 */
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (
    params: {
      text: string;
      t: (key: string) => string;
    },
    { dispatch }
  ) => {
    const { text, t } = params;

    if (!window.api) {
      throw new Error('Electron API not available');
    }

    // Добавляем сообщение пользователя
    const userMessage = {
      id: Date.now().toString(),
      position: 'right' as const,
      type: 'text' as const,
      text,
      date: new Date(),
    };

    dispatch(addMessage(userMessage));

    try {
      // Отправить запрос ассистенту
      const response = await window.api.askLLM(text);

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        position: 'left' as const,
        type: 'text' as const,
        text: response || t('ui.errorSorry'),
        date: new Date(),
      };

      dispatch(addMessage(assistantMessage));

      // Воспроизвести ответ голосом
      if (response) {
        await window.api.speak(response);
      }

      return response;
    } catch (error) {
      // Добавляем сообщение об ошибке
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        position: 'left' as const,
        type: 'text' as const,
        text: t('ui.errorMessage'),
        date: new Date(),
      };

      dispatch(addMessage(errorMessage));
      throw error;
    }
  }
);

/**
 * Начало записи аудио для чата
 */
export const startChatRecording = createAsyncThunk(
  'chat/startRecording',
  async (_, { dispatch }) => {
    if (!window.api) {
      throw new Error('Electron API not available');
    }

    dispatch(setIsRecording(true));

    try {
      await window.api.startRecord();
    } catch (error) {
      dispatch(setIsRecording(false));
      throw error;
    }
  }
);

/**
 * Остановка записи и расшифровка для чата
 */
export const stopChatRecordingAndTranscribe = createAsyncThunk(
  'chat/stopRecordingAndTranscribe',
  async (
    params: {
      onTranscribed: (text: string) => void;
    },
    { dispatch }
  ) => {
    const { onTranscribed } = params;

    if (!window.api) {
      throw new Error('Electron API not available');
    }

    dispatch(setIsRecording(false));

    // Остановка записи и получение аудио буфера
    const audioBuffer = await window.api.stopRecord();

    // Распознавание речи
    const transcribedText = await window.api.transcribe(audioBuffer);

    if (transcribedText && transcribedText.trim() !== '') {
      // Передаем расшифрованный текст через callback
      onTranscribed(transcribedText.trim());
    }

    return transcribedText?.trim() || '';
  }
);
