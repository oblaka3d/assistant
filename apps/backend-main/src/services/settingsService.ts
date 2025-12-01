import type { Language, ModelSceneSettings, Settings } from '@prisma/client';

import { prisma } from '../lib/prisma';

export interface SettingsUpdateData {
  volume?: number;
  language?: Language;
  theme?: 'light' | 'dark' | 'system';
  accentColorLight?: string;
  accentColorDark?: string;
  sttProviderName?: string | null;
  llmProviderName?: string | null;
  llmModel?: string | null;
  ttsProviderName?: string | null;
  welcomeTitle?: string;
  idleTimeoutSeconds?: number;
  idleMode?: 'api' | 'custom';
  idleCustomImagePath?: string;
  idleRemoteEndpoint?: string;
  modelScene?: Partial<ModelSceneSettings>;
}

const DEFAULT_MODEL_SCENE: ModelSceneSettings = {
  modelPath: './assets/models/character.glb',
  sceneName: null,
  enableToonShader: false,
  lightIntensity: 2,
  cameraDistance: 2,
  animationSpeed: 1,
};

const mergeModelScene = (
  current: ModelSceneSettings | null | undefined,
  updates: Partial<ModelSceneSettings> | undefined
): ModelSceneSettings | undefined => {
  if (!updates) {
    return undefined;
  }
  return {
    ...(current ?? DEFAULT_MODEL_SCENE),
    ...updates,
  };
};

const buildUpdatePayload = (
  updateData: SettingsUpdateData,
  existing?: Settings | null
): Partial<Settings> => {
  const payload: Partial<Settings> = {};
  if (updateData.volume !== undefined) payload.volume = updateData.volume;
  if (updateData.language !== undefined) payload.language = updateData.language;
  if (updateData.theme !== undefined) payload.theme = updateData.theme;
  if (updateData.accentColorLight !== undefined)
    payload.accentColorLight = updateData.accentColorLight;
  if (updateData.accentColorDark !== undefined)
    payload.accentColorDark = updateData.accentColorDark;
  if (updateData.sttProviderName !== undefined)
    payload.sttProviderName = updateData.sttProviderName;
  if (updateData.llmProviderName !== undefined)
    payload.llmProviderName = updateData.llmProviderName;
  if (updateData.llmModel !== undefined) payload.llmModel = updateData.llmModel;
  if (updateData.ttsProviderName !== undefined)
    payload.ttsProviderName = updateData.ttsProviderName;
  if (updateData.welcomeTitle !== undefined) payload.welcomeTitle = updateData.welcomeTitle;
  if (updateData.idleTimeoutSeconds !== undefined)
    payload.idleTimeoutSeconds = updateData.idleTimeoutSeconds;
  if (updateData.idleMode !== undefined) payload.idleMode = updateData.idleMode;
  if (updateData.idleCustomImagePath !== undefined) {
    payload.idleCustomImagePath = updateData.idleCustomImagePath;
  }
  if (updateData.idleRemoteEndpoint !== undefined) {
    payload.idleRemoteEndpoint = updateData.idleRemoteEndpoint;
  }
  const mergedModelScene = mergeModelScene(existing?.modelScene, updateData.modelScene);
  if (mergedModelScene) {
    payload.modelScene = mergedModelScene;
  }
  return payload;
};

export const getOrCreateSettings = async (userId: string): Promise<Settings> => {
  let settings = await prisma.settings.findUnique({ where: { userId } });
  if (!settings) {
    settings = await prisma.settings.create({ data: { userId } });
  }
  return settings;
};

export const getSettings = async (userId: string): Promise<Settings | null> => {
  return prisma.settings.findUnique({ where: { userId } });
};

export const updateSettings = async (
  userId: string,
  updateData: SettingsUpdateData
): Promise<Settings> => {
  const existing = await prisma.settings.findUnique({ where: { userId } });
  const payload = buildUpdatePayload(updateData, existing);

  const result = await prisma.settings.upsert({
    where: { userId },
    update: payload,
    create: {
      userId,
      ...payload,
    },
  });

  return result;
};
