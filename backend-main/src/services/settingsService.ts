import { Types } from 'mongoose';

import { Settings, ISettings, IModelSceneSettings } from '../models/Settings';

export interface SettingsUpdateData {
  volume?: number;
  language?: string;
  theme?: 'light' | 'dark' | 'system';
  sttProviderName?: string | null;
  llmProviderName?: string | null;
  llmModel?: string | null;
  ttsProviderName?: string | null;
  modelScene?: Partial<IModelSceneSettings>;
}

/**
 * Получить или создать настройки для пользователя
 */
export const getOrCreateSettings = async (userId: string | Types.ObjectId): Promise<ISettings> => {
  let settings = await Settings.findOne({ userId });

  if (!settings) {
    settings = await Settings.create({ userId });
  }

  return settings;
};

/**
 * Получить настройки пользователя
 */
export const getSettings = async (userId: string | Types.ObjectId): Promise<ISettings | null> => {
  return Settings.findOne({ userId });
};

/**
 * Обновить настройки пользователя
 */
export const updateSettings = async (
  userId: string | Types.ObjectId,
  updateData: SettingsUpdateData
): Promise<ISettings> => {
  // Если есть обновления для modelScene, используем $set для вложенных полей
  if (updateData.modelScene) {
    const modelSceneUpdates: Record<string, unknown> = {};
    Object.keys(updateData.modelScene).forEach((key) => {
      modelSceneUpdates[`modelScene.${key}`] =
        updateData.modelScene?.[key as keyof IModelSceneSettings];
    });

    const settings = await Settings.findOneAndUpdate(
      { userId },
      {
        $set: {
          ...Object.fromEntries(Object.entries(updateData).filter(([key]) => key !== 'modelScene')),
          ...modelSceneUpdates,
        },
      },
      { new: true, upsert: true, runValidators: true }
    );

    if (!settings) {
      throw new Error('Failed to update settings');
    }

    return settings;
  }

  const settings = await Settings.findOneAndUpdate(
    { userId },
    { $set: updateData },
    { new: true, upsert: true, runValidators: true }
  );

  if (!settings) {
    throw new Error('Failed to update settings');
  }

  return settings;
};
