import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  register as apiRegister,
  login as apiLogin,
  getCurrentUser,
  saveToken,
  saveRefreshToken,
} from '../../utils/api';
import type { RegisterRequest, LoginRequest } from '../../utils/api';
import { saveGuestDialogs } from '../../utils/storage';
import type { AppDispatch, RootState } from '../index';
import type { User } from '../types/user';

import { fetchDialogs, createDialogOnServer } from './chatThunks';
import { fetchSettings } from './settingsThunks';

const DEFAULT_DIALOG_TITLE = 'Новый диалог';

const initializeUserSession = async (dispatch: AppDispatch, getState: () => RootState) => {
  // Сохраняем локальные чаты перед загрузкой данных с бэкенда
  const state = getState();
  if (state.chat.dialogs.length > 0) {
    saveGuestDialogs(state.chat.dialogs);
  }

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
};

/**
 * Регистрация нового пользователя
 */
export const registerUser = createAsyncThunk<
  User,
  RegisterRequest,
  { rejectValue: string; dispatch: AppDispatch; getState: () => RootState }
>('user/register', async (data, { dispatch, getState, rejectWithValue }) => {
  try {
    const response = await apiRegister(data);
    const user = {
      id: response.data.user.id,
      email: response.data.user.email,
      username: response.data.user.email.split('@')[0],
      name: response.data.user.name,
      displayName: response.data.user.name,
    };

    await initializeUserSession(dispatch, getState);

    return user;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

/**
 * Вход пользователя
 */
export const loginUser = createAsyncThunk<
  User,
  LoginRequest,
  { rejectValue: string; dispatch: AppDispatch; getState: () => RootState }
>('user/login', async (data, { dispatch, getState, rejectWithValue }) => {
  try {
    const response = await apiLogin(data);
    const user = {
      id: response.data.user.id,
      email: response.data.user.email,
      username: response.data.user.email.split('@')[0],
      name: response.data.user.name,
      displayName: response.data.user.name,
    };

    await initializeUserSession(dispatch, getState);

    return user;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

/**
 * Получение текущего пользователя
 */
export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string; dispatch: AppDispatch; getState: () => RootState }
>('user/fetchCurrent', async (_, { dispatch, getState, rejectWithValue }) => {
  try {
    const response = await getCurrentUser();
    const user = {
      id: response.data.user.id,
      email: response.data.user.email,
      username: response.data.user.email.split('@')[0],
      name: response.data.user.name,
      displayName: response.data.user.name,
    };

    await initializeUserSession(dispatch, getState);

    return user;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

/**
 * OAuth авторизация (сохранение токенов из callback)
 */
export const oauthLogin = createAsyncThunk<
  User,
  { token: string; refreshToken: string },
  { rejectValue: string; dispatch: AppDispatch; getState: () => RootState }
>('user/oauthLogin', async ({ token, refreshToken }, { dispatch, getState, rejectWithValue }) => {
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

    await initializeUserSession(dispatch, getState);

    return user;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
