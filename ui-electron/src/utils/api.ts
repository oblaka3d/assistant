/**
 * API клиент для взаимодействия с backend-main
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';

/**
 * Получить URL для OAuth авторизации
 */
export const getOAuthUrl = (provider: 'google' | 'yandex' | 'github'): string => {
  return `${API_BASE_URL}/auth/${provider}`;
};

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
    refreshToken: string;
  };
}

export interface UserResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface ApiError {
  error?: string;
  errors?: Array<{ msg: string; param: string }>;
}

export interface ModelSceneSettings {
  modelPath: string;
  sceneName: string | null;
  enableToonShader: boolean;
  lightIntensity: number;
  cameraDistance: number;
  animationSpeed: number;
}

export interface SettingsData {
  volume: number;
  language: string;
  theme: 'light' | 'dark' | 'system';
  accentColorLight: string;
  accentColorDark: string;
  sttProviderName: string | null;
  llmProviderName: string | null;
  llmModel: string | null;
  ttsProviderName: string | null;
  modelScene: ModelSceneSettings;
}

export interface SettingsResponse {
  success: boolean;
  data: {
    settings: SettingsData;
  };
}

export interface UpdateSettingsRequest {
  volume?: number;
  language?: string;
  theme?: 'light' | 'dark' | 'system';
  accentColorLight?: string;
  accentColorDark?: string;
  sttProviderName?: string | null;
  llmProviderName?: string | null;
  llmModel?: string | null;
  ttsProviderName?: string | null;
  modelScene?: Partial<ModelSceneSettings>;
}

export interface ApiKeysResponse {
  success: boolean;
  data: {
    keys: Record<string, string>;
  };
}

/**
 * Сохранение токена в localStorage
 */
export const saveToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

/**
 * Сохранение refresh токена в localStorage
 */
export const saveRefreshToken = (refreshToken: string): void => {
  localStorage.setItem('refreshToken', refreshToken);
};

/**
 * Получение токена из localStorage
 */
export const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

/**
 * Получение refresh токена из localStorage
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken');
};

/**
 * Удаление токенов из localStorage
 */
export const clearTokens = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
};

/**
 * Обертка для fetch с обработкой ошибок
 */
async function fetchWithErrorHandling<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error: ApiError = data;
    throw new Error(error.error || error.errors?.[0]?.msg || 'Request failed');
  }

  return data as T;
}

/**
 * Регистрация пользователя
 */
export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await fetchWithErrorHandling<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.success && response.data) {
    saveToken(response.data.token);
    saveRefreshToken(response.data.refreshToken);
  }

  return response;
};

/**
 * Вход пользователя
 */
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await fetchWithErrorHandling<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.success && response.data) {
    saveToken(response.data.token);
    saveRefreshToken(response.data.refreshToken);
  }

  return response;
};

/**
 * Получение текущего пользователя
 */
export const getCurrentUser = async (): Promise<UserResponse> => {
  return fetchWithErrorHandling<UserResponse>('/auth/me', {
    method: 'GET',
  });
};

/**
 * Обновление токена
 */
export const refreshToken = async (): Promise<AuthResponse> => {
  const refresh = getRefreshToken();
  if (!refresh) {
    throw new Error('No refresh token available');
  }

  const response = await fetchWithErrorHandling<AuthResponse>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken: refresh }),
  });

  if (response.success && response.data) {
    saveToken(response.data.token);
    saveRefreshToken(response.data.refreshToken);
  }

  return response;
};

/**
 * Выход пользователя
 */
export const logout = (): void => {
  clearTokens();
};

/**
 * Получение настроек пользователя
 */
export const getSettings = async (): Promise<SettingsResponse> => {
  return fetchWithErrorHandling<SettingsResponse>('/settings', {
    method: 'GET',
  });
};

/**
 * Обновление настроек пользователя
 */
export const updateSettings = async (data: UpdateSettingsRequest): Promise<SettingsResponse> => {
  return fetchWithErrorHandling<SettingsResponse>('/settings', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

/**
 * Обновление профиля пользователя
 */
export const updateProfile = async (data: UpdateProfileRequest): Promise<AuthResponse> => {
  return fetchWithErrorHandling<AuthResponse>('/auth/profile', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

/**
 * Изменение пароля пользователя
 */
export const changePassword = async (
  data: ChangePasswordRequest
): Promise<{ success: boolean; message: string }> => {
  return fetchWithErrorHandling<{ success: boolean; message: string }>('/auth/change-password', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Запрос на сброс пароля
 */
export const forgotPassword = async (
  data: ForgotPasswordRequest
): Promise<{ success: boolean; message: string }> => {
  return fetchWithErrorHandling<{ success: boolean; message: string }>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Сброс пароля по токену
 */
export const resetPassword = async (
  data: ResetPasswordRequest
): Promise<{ success: boolean; message: string }> => {
  return fetchWithErrorHandling<{ success: boolean; message: string }>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Получение API ключей пользователя
 */
export const getApiKeys = async (): Promise<ApiKeysResponse> => {
  return fetchWithErrorHandling<ApiKeysResponse>('/api-keys', {
    method: 'GET',
  });
};

/**
 * Сохранение API ключей пользователя
 */
export const saveApiKeys = async (keys: Record<string, string>): Promise<ApiKeysResponse> => {
  return fetchWithErrorHandling<ApiKeysResponse>('/api-keys', {
    method: 'PUT',
    body: JSON.stringify({ keys }),
  });
};

// ==================== Chat API ====================

export interface ChatMessage {
  id: string;
  position: 'left' | 'right';
  type: 'text' | 'markdown' | 'image';
  text?: string;
  images?: { url: string; alt?: string; width?: number; height?: number }[];
  date: Date | string;
}

export interface ChatDialog {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface DialogsResponse {
  success: boolean;
  data: {
    dialogs: ChatDialog[];
  };
}

export interface DialogResponse {
  success: boolean;
  data: {
    dialog: ChatDialog;
  };
}

export interface CreateDialogRequest {
  dialogId: string;
  title?: string;
}

export interface UpdateDialogRequest {
  title?: string;
  messages?: ChatMessage[];
}

/**
 * Получение всех диалогов пользователя
 */
export const getDialogs = async (): Promise<DialogsResponse> => {
  return fetchWithErrorHandling<DialogsResponse>('/chats', {
    method: 'GET',
  });
};

/**
 * Получение диалога по ID
 */
export const getDialogById = async (dialogId: string): Promise<DialogResponse> => {
  return fetchWithErrorHandling<DialogResponse>(`/chats/${dialogId}`, {
    method: 'GET',
  });
};

/**
 * Создание нового диалога
 */
export const createDialogApi = async (data: CreateDialogRequest): Promise<DialogResponse> => {
  return fetchWithErrorHandling<DialogResponse>('/chats', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Обновление диалога
 */
export const updateDialogApi = async (
  dialogId: string,
  data: UpdateDialogRequest
): Promise<DialogResponse> => {
  return fetchWithErrorHandling<DialogResponse>(`/chats/${dialogId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * Удаление диалога
 */
export const deleteDialogApi = async (
  dialogId: string
): Promise<{ success: boolean; message: string }> => {
  return fetchWithErrorHandling<{ success: boolean; message: string }>(`/chats/${dialogId}`, {
    method: 'DELETE',
  });
};

/**
 * Удаление всех диалогов пользователя
 */
export const deleteAllDialogs = async (): Promise<{
  success: boolean;
  message: string;
  data: { deletedCount: number };
}> => {
  return fetchWithErrorHandling<{
    success: boolean;
    message: string;
    data: { deletedCount: number };
  }>('/chats', {
    method: 'DELETE',
  });
};
