import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  register as apiRegister,
  login as apiLogin,
  getCurrentUser,
  saveToken,
  saveRefreshToken,
} from '../../utils/api';
import type { RegisterRequest, LoginRequest } from '../../utils/api';
import type { User } from '../types/user';

import { fetchDialogs, createDialogOnServer } from './chatThunks';
import { fetchSettings } from './settingsThunks';

const DEFAULT_DIALOG_TITLE = 'Новый диалог';

/**
 * Регистрация нового пользователя
 */
export const registerUser = createAsyncThunk<User, RegisterRequest, { rejectValue: string }>(
  'user/register',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiRegister(data);
      const user = {
        id: response.data.user.id,
        email: response.data.user.email,
        username: response.data.user.email.split('@')[0],
        name: response.data.user.name,
        displayName: response.data.user.name,
      };

      // Загружаем настройки и диалоги после успешной регистрации
      await dispatch(fetchSettings());
      const dialogs = await dispatch(fetchDialogs()).unwrap();
      if (!dialogs || dialogs.length === 0) {
        await dispatch(
          createDialogOnServer({
            dialogId: Date.now().toString(),
            title: DEFAULT_DIALOG_TITLE,
          })
        ).unwrap();
      }

      return user;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**
 * Вход пользователя
 */
export const loginUser = createAsyncThunk<User, LoginRequest, { rejectValue: string }>(
  'user/login',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiLogin(data);
      const user = {
        id: response.data.user.id,
        email: response.data.user.email,
        username: response.data.user.email.split('@')[0],
        name: response.data.user.name,
        displayName: response.data.user.name,
      };

      // Загружаем настройки и диалоги после успешного входа
      await dispatch(fetchSettings());
      const dialogs = await dispatch(fetchDialogs()).unwrap();
      if (!dialogs || dialogs.length === 0) {
        await dispatch(
          createDialogOnServer({
            dialogId: Date.now().toString(),
            title: DEFAULT_DIALOG_TITLE,
          })
        ).unwrap();
      }

      return user;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**
 * Получение текущего пользователя
 */
export const fetchCurrentUser = createAsyncThunk<User, void, { rejectValue: string }>(
  'user/fetchCurrent',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await getCurrentUser();
      const user = {
        id: response.data.user.id,
        email: response.data.user.email,
        username: response.data.user.email.split('@')[0],
        name: response.data.user.name,
        displayName: response.data.user.name,
      };

      // Загружаем настройки и диалоги после успешной загрузки пользователя
      await dispatch(fetchSettings());
      const dialogs = await dispatch(fetchDialogs()).unwrap();
      if (!dialogs || dialogs.length === 0) {
        await dispatch(
          createDialogOnServer({
            dialogId: Date.now().toString(),
            title: DEFAULT_DIALOG_TITLE,
          })
        ).unwrap();
      }

      return user;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**
 * OAuth авторизация (сохранение токенов из callback)
 */
export const oauthLogin = createAsyncThunk<
  User,
  { token: string; refreshToken: string },
  { rejectValue: string }
>('user/oauthLogin', async ({ token, refreshToken }, { dispatch, rejectWithValue }) => {
  try {
    // Сохраняем токены
    saveToken(token);
    saveRefreshToken(refreshToken);

    // Получаем информацию о пользователе
    const response = await getCurrentUser();
    const user = {
      id: response.data.user.id,
      email: response.data.user.email,
      username: response.data.user.email.split('@')[0],
      name: response.data.user.name,
      displayName: response.data.user.name,
    };

    // Загружаем настройки и диалоги после успешной авторизации
    await dispatch(fetchSettings());
    const dialogs = await dispatch(fetchDialogs()).unwrap();
    if (!dialogs || dialogs.length === 0) {
      await dispatch(
        createDialogOnServer({
          dialogId: Date.now().toString(),
          title: DEFAULT_DIALOG_TITLE,
        })
      ).unwrap();
    }

    return user;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
