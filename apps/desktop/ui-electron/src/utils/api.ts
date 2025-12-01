/**
 * API клиент для взаимодействия с backend-main
 */

import type {
  SharedApplicationDTO,
  SharedApplicationDetailsDTO,
  SharedApplicationEntryPoints,
  SharedApplicationStatus,
  SharedApplicationStorageMeta,
  SharedApplicationType,
  SharedApplicationVersionHistoryDTO,
} from '@assistant/shared';
import { IdleModeSchema, LanguageSchema, ThemeSchema } from '@assistant/shared';
import { z } from 'zod';

const DEFAULT_API_BASE_URL = 'http://localhost:3001/api/v1';

const normalizeBaseUrl = (url: string): string => {
  // Удаляем завершающий слэш, чтобы не получать двойные слэши при конкатенации
  return url.replace(/\/+$/, '');
};

const resolveApiBaseUrl = (): string => {
  const envValue = import.meta.env?.VITE_API_URL;
  if (typeof envValue === 'string' && envValue.trim().length > 0) {
    return normalizeBaseUrl(envValue.trim());
  }
  return DEFAULT_API_BASE_URL;
};

export const API_BASE_URL = resolveApiBaseUrl();

const resolveApiOrigin = (): string => {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return new URL(DEFAULT_API_BASE_URL).origin;
  }
};

export const API_ORIGIN = resolveApiOrigin();

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

const ModelSceneSettingsSchema = z.object({
  modelPath: z.string(),
  sceneName: z.string().nullable(),
  enableToonShader: z.boolean(),
  lightIntensity: z.number(),
  cameraDistance: z.number(),
  animationSpeed: z.number(),
});

const SettingsDataSchema = z.object({
  volume: z.number(),
  language: LanguageSchema,
  theme: ThemeSchema,
  accentColorLight: z.string(),
  accentColorDark: z.string(),
  sttProviderName: z.string().nullable(),
  llmProviderName: z.string().nullable(),
  llmModel: z.string().nullable(),
  ttsProviderName: z.string().nullable(),
  welcomeTitle: z.string(),
  idleTimeoutSeconds: z.number(),
  idleMode: IdleModeSchema,
  idleCustomImagePath: z.string(),
  idleRemoteEndpoint: z.string(),
  modelScene: ModelSceneSettingsSchema,
});

const UpdateSettingsRequestSchema = SettingsDataSchema.partial().extend({
  modelScene: ModelSceneSettingsSchema.partial().optional(),
});

export type ModelSceneSettings = z.infer<typeof ModelSceneSettingsSchema>;
export type SettingsData = z.infer<typeof SettingsDataSchema>;

export interface SettingsResponse {
  success: boolean;
  data: {
    settings: SettingsData;
  };
}

export type UpdateSettingsRequest = z.infer<typeof UpdateSettingsRequestSchema>;

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
  date: string;
}

export interface ChatDialog {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
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

// ==================== Applications ====================

export type ApplicationType = SharedApplicationType;
export type ApplicationStatus = SharedApplicationStatus;
export type ReleaseType = 'patch' | 'minor' | 'major';

export type ApplicationEntryPoints = SharedApplicationEntryPoints;
export type ApplicationStorageMeta = SharedApplicationStorageMeta;
export type ApplicationSummary = SharedApplicationDTO;
export type ApplicationVersionHistoryEntry = SharedApplicationVersionHistoryDTO;
export type ApplicationDetails = SharedApplicationDetailsDTO & {
  versionHistory?: SharedApplicationVersionHistoryDTO[];
};

export interface ApplicationStorageUsage {
  usedBytes: number;
  limitBytes: number;
  availableBytes: number;
}

interface ApplicationsListResponse {
  success: boolean;
  data: {
    applications: ApplicationSummary[];
  };
}

interface ApplicationsMutationResponse {
  success: boolean;
  data?: {
    application: ApplicationSummary;
  };
}

interface ApplicationDetailsResponse {
  success: boolean;
  data: {
    application: ApplicationDetails;
  };
}

interface ApplicationStorageUsageResponse {
  success: boolean;
  data: {
    storage: ApplicationStorageUsage;
  };
}

interface ApplicationImportResponse {
  success: boolean;
  data: {
    application?: ApplicationSummary;
    filename: string;
    originalName: string;
    size: number;
    storage?: ApplicationStorageUsage;
  };
}

interface ApplicationKeyAvailabilityResponse {
  success: boolean;
  data: {
    available: boolean;
  };
}

export const fetchApplicationsCatalog = async (): Promise<ApplicationSummary[]> => {
  const response = await fetchWithErrorHandling<ApplicationsListResponse>('/applications/catalog', {
    method: 'GET',
  });
  return response.data.applications;
};

export const fetchInstalledApplications = async (): Promise<ApplicationSummary[]> => {
  const response = await fetchWithErrorHandling<ApplicationsListResponse>(
    '/applications/installed',
    {
      method: 'GET',
    }
  );
  return response.data.applications;
};

export const installApplication = async (appKey: string): Promise<ApplicationsMutationResponse> => {
  return fetchWithErrorHandling<ApplicationsMutationResponse>('/applications/installed', {
    method: 'POST',
    body: JSON.stringify({ appKey }),
  });
};

export const uninstallApplication = async (appKey: string): Promise<{ success: boolean }> => {
  return fetchWithErrorHandling<{ success: boolean }>(
    `/applications/installed/${encodeURIComponent(appKey)}`,
    {
      method: 'DELETE',
    }
  );
};

export const createCatalogApplication = async (payload: {
  key: string;
  name: string;
  version: string;
  type: ApplicationType;
  description?: string;
}): Promise<ApplicationsMutationResponse> => {
  return fetchWithErrorHandling<ApplicationsMutationResponse>('/applications/catalog', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const fetchApplicationDetails = async (appKey: string): Promise<ApplicationDetails> => {
  const response = await fetchWithErrorHandling<ApplicationDetailsResponse>(
    `/applications/catalog/${encodeURIComponent(appKey)}`,
    {
      method: 'GET',
    }
  );
  return response.data.application;
};

export const fetchApplicationStorageUsage = async (): Promise<ApplicationStorageUsage> => {
  const response = await fetchWithErrorHandling<ApplicationStorageUsageResponse>(
    '/applications/storage',
    {
      method: 'GET',
    }
  );
  return response.data.storage;
};

export const checkApplicationKeyAvailability = async (appKey: string): Promise<boolean> => {
  const response = await fetchWithErrorHandling<ApplicationKeyAvailabilityResponse>(
    `/applications/catalog/availability/${encodeURIComponent(appKey)}`,
    {
      method: 'GET',
    }
  );
  return response.data.available;
};

export const importApplicationArchive = async (
  appKey: string,
  file: File
): Promise<ApplicationImportResponse['data']> => {
  const token = getToken();
  const formData = new FormData();
  formData.append('archive', file);
  formData.append('appKey', appKey);

  const response = await fetch(`${API_BASE_URL}/applications/import`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });

  const data = (await response.json().catch(() => ({}))) as ApplicationImportResponse & ApiError;

  if (!response.ok) {
    throw new Error(data?.error || 'Failed to import application');
  }

  return (
    data?.data ?? {
      filename: file.name,
      originalName: file.name,
      size: file.size,
    }
  );
};

interface UpdateApplicationVersionPayload {
  releaseType: ReleaseType;
  releaseNotes?: string;
  name?: string;
  description?: string;
  type?: ApplicationType;
  iconDataUrl?: string | null;
  archive: File;
}

export const updateApplicationVersion = async (
  appKey: string,
  payload: UpdateApplicationVersionPayload
): Promise<ApplicationDetails> => {
  const token = getToken();
  const formData = new FormData();
  formData.append('releaseType', payload.releaseType);
  if (payload.releaseNotes) {
    formData.append('releaseNotes', payload.releaseNotes);
  }
  if (payload.name) {
    formData.append('name', payload.name);
  }
  if (payload.description) {
    formData.append('description', payload.description);
  }
  if (payload.type) {
    formData.append('type', payload.type);
  }
  if (payload.iconDataUrl) {
    formData.append('icon', payload.iconDataUrl);
  }
  formData.append('archive', payload.archive);

  const response = await fetch(
    `${API_BASE_URL}/applications/catalog/${encodeURIComponent(appKey)}/versions`,
    {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: formData,
    }
  );

  const data = (await response.json().catch(() => ({}))) as ApplicationDetailsResponse & ApiError;
  if (!response.ok) {
    throw new Error(data?.error || 'Failed to update application');
  }
  return data.data.application;
};

export const updateApplicationStatus = async (
  appKey: string,
  status: ApplicationStatus
): Promise<ApplicationsMutationResponse> => {
  return fetchWithErrorHandling<ApplicationsMutationResponse>(
    `/applications/catalog/${encodeURIComponent(appKey)}/status`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }
  );
};
