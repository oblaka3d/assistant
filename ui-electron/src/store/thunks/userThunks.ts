import { createAsyncThunk } from '@reduxjs/toolkit';

import { register as apiRegister, login as apiLogin, getCurrentUser } from '../../utils/api';
import type { RegisterRequest, LoginRequest } from '../../utils/api';
import type { User } from '../types/user';

import { fetchSettings } from './settingsThunks';

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

      // Загружаем настройки после успешной регистрации
      await dispatch(fetchSettings());

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

      // Загружаем настройки после успешного входа
      await dispatch(fetchSettings());

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

      // Загружаем настройки после успешной загрузки пользователя
      await dispatch(fetchSettings());

      return user;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
