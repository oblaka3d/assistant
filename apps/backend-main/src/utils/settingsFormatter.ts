import { ISettings } from '../models/Settings';

export const formatSettingsResponse = (settings: ISettings) => ({
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
    modelScene: {
      modelPath: settings.modelScene.modelPath,
      sceneName: settings.modelScene.sceneName,
      enableToonShader: settings.modelScene.enableToonShader,
      lightIntensity: settings.modelScene.lightIntensity,
      cameraDistance: settings.modelScene.cameraDistance,
      animationSpeed: settings.modelScene.animationSpeed,
    },
  },
});
