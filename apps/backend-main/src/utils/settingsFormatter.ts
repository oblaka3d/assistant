import type { ModelSceneSettings, Settings } from '@prisma/client';

const ensureModelScene = (modelScene?: ModelSceneSettings | null) => ({
  modelPath: modelScene?.modelPath ?? './assets/models/character.glb',
  sceneName: modelScene?.sceneName ?? null,
  enableToonShader: modelScene?.enableToonShader ?? false,
  lightIntensity: modelScene?.lightIntensity ?? 2,
  cameraDistance: modelScene?.cameraDistance ?? 2,
  animationSpeed: modelScene?.animationSpeed ?? 1,
});

export const formatSettingsResponse = (settings: Settings) => ({
  settings: {
    volume: settings.volume,
    language: settings.language,
    theme: settings.theme,
    accentColorLight: settings.accentColorLight,
    accentColorDark: settings.accentColorDark,
    sttProviderName: settings.sttProviderName,
    llmProviderName: settings.llmProviderName,
    llmModel: settings.llmModel,
    ttsProviderName: settings.ttsProviderName,
    welcomeTitle: settings.welcomeTitle,
    idleTimeoutSeconds: settings.idleTimeoutSeconds,
    idleMode: settings.idleMode,
    idleCustomImagePath: settings.idleCustomImagePath,
    idleRemoteEndpoint: settings.idleRemoteEndpoint,
    modelScene: ensureModelScene(settings.modelScene),
  },
});
