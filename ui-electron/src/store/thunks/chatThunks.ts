import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getDialogs,
  createDialogApi,
  updateDialogApi,
  deleteDialogApi,
  deleteAllDialogs,
  type ChatMessage,
} from '../../utils/api';
import {
  addMessage,
  selectDialog,
  setDialogs,
  syncDialog,
  deleteDialog as deleteDialogAction,
} from '../slices/chatSlice';
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
      date: new Date().toISOString(),
    };

    dispatch(addMessage(userMessage));

    // Сохраняем диалог на сервер после добавления сообщения пользователя (с debounce через useEffect в компоненте)

    try {
      // Отправить запрос ассистенту
      const response = await window.api.askLLM(text);

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        position: 'left' as const,
        type: 'text' as const,
        text: response || t('ui.errorSorry'),
        date: new Date().toISOString(),
      };

      dispatch(addMessage(assistantMessage));

      // Сохранение диалога происходит автоматически через useEffect в ChatScreen

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
        date: new Date().toISOString(),
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

/**
 * Загрузка всех диалогов пользователя с сервера
 */
export const fetchDialogs = createAsyncThunk(
  'chat/fetchDialogs',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await getDialogs();
      const dialogs = response.data.dialogs.map((dialog) => ({
        id: dialog.id,
        title: dialog.title,
        messages: dialog.messages.map((msg) => ({
          ...msg,
          date: new Date(msg.date).toISOString(),
        })),
        createdAt: new Date(dialog.createdAt).toISOString(),
        updatedAt: new Date(dialog.updatedAt).toISOString(),
      }));

      dispatch(setDialogs(dialogs));

      return dialogs;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**
 * Сохранение диалога на сервер
 */
export const saveDialog = createAsyncThunk(
  'chat/saveDialog',
  async (
    params: {
      dialogId: string;
      title?: string;
      messages?: ChatMessage[];
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { dialogId, title, messages } = params;

      // Преобразуем даты в строки для отправки
      const messagesForApi = messages?.map((msg) => ({
        ...msg,
        date: msg.date instanceof Date ? msg.date.toISOString() : msg.date,
      }));

      const response = await updateDialogApi(dialogId, {
        title,
        messages: messagesForApi,
      });

      const dialog = {
        id: response.data.dialog.id,
        title: response.data.dialog.title,
        messages: response.data.dialog.messages.map((msg) => ({
          ...msg,
          date: new Date(msg.date).toISOString(),
        })),
        createdAt: new Date(response.data.dialog.createdAt).toISOString(),
        updatedAt: new Date(response.data.dialog.updatedAt).toISOString(),
      };

      dispatch(syncDialog(dialog));
      dispatch(selectDialog(dialog.id));

      return dialog;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**
 * Создание нового диалога на сервере
 */
export const createDialogOnServer = createAsyncThunk(
  'chat/createDialogOnServer',
  async (
    params: {
      dialogId: string;
      title?: string;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { dialogId, title } = params;

      const response = await createDialogApi({
        dialogId,
        title,
      });

      const dialog = {
        id: response.data.dialog.id,
        title: response.data.dialog.title,
        messages: response.data.dialog.messages.map((msg) => ({
          ...msg,
          date: new Date(msg.date).toISOString(),
        })),
        createdAt: new Date(response.data.dialog.createdAt).toISOString(),
        updatedAt: new Date(response.data.dialog.updatedAt).toISOString(),
      };

      dispatch(syncDialog(dialog));

      return dialog;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**
 * Удаление диалога с сервера
 */
export const deleteDialogOnServer = createAsyncThunk(
  'chat/deleteDialogOnServer',
  async (dialogId: string, { dispatch, rejectWithValue }) => {
    try {
      await deleteDialogApi(dialogId);
      dispatch(deleteDialogAction(dialogId));
      return dialogId;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**
 * Удаление всех диалогов пользователя
 */
export const deleteAllDialogsOnServer = createAsyncThunk(
  'chat/deleteAllDialogsOnServer',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await deleteAllDialogs();
      dispatch(setDialogs([]));
      return true;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
