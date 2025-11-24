import { Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

import { AuthRequest } from '../middleware/auth';
import {
  getOrCreateSettings,
  updateSettings,
  SettingsUpdateData,
} from '../services/settingsService';

/**
 * Получение настроек пользователя
 */
export const getSettingsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const settings = await getOrCreateSettings(req.user.userId);

    res.status(200).json({
      success: true,
      data: {
        settings: {
          volume: settings.volume,
          language: settings.language,
          theme: settings.theme,
          sttProviderName: settings.sttProviderName,
          llmProviderName: settings.llmProviderName,
          ttsProviderName: settings.ttsProviderName,
          modelScene: {
            modelPath: settings.modelScene.modelPath,
            sceneName: settings.modelScene.sceneName,
            enableToonShader: settings.modelScene.enableToonShader,
            lightIntensity: settings.modelScene.lightIntensity,
            cameraDistance: settings.modelScene.cameraDistance,
            animationSpeed: settings.modelScene.animationSpeed,
          },
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Обновление настроек пользователя
 */
export const updateSettingsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Проверка ошибок валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const updateData: SettingsUpdateData = {};

    if (req.body.volume !== undefined) {
      updateData.volume = req.body.volume;
    }
    if (req.body.language !== undefined) {
      updateData.language = req.body.language;
    }
    if (req.body.theme !== undefined) {
      updateData.theme = req.body.theme;
    }
    if (req.body.sttProviderName !== undefined) {
      updateData.sttProviderName = req.body.sttProviderName;
    }
    if (req.body.llmProviderName !== undefined) {
      updateData.llmProviderName = req.body.llmProviderName;
    }
    if (req.body.ttsProviderName !== undefined) {
      updateData.ttsProviderName = req.body.ttsProviderName;
    }
    if (req.body.modelScene !== undefined) {
      updateData.modelScene = req.body.modelScene;
    }

    const settings = await updateSettings(req.user.userId, updateData);

    res.status(200).json({
      success: true,
      data: {
        settings: {
          volume: settings.volume,
          language: settings.language,
          theme: settings.theme,
          sttProviderName: settings.sttProviderName,
          llmProviderName: settings.llmProviderName,
          ttsProviderName: settings.ttsProviderName,
          modelScene: {
            modelPath: settings.modelScene.modelPath,
            sceneName: settings.modelScene.sceneName,
            enableToonShader: settings.modelScene.enableToonShader,
            lightIntensity: settings.modelScene.lightIntensity,
            cameraDistance: settings.modelScene.cameraDistance,
            animationSpeed: settings.modelScene.animationSpeed,
          },
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Валидация для обновления настроек
 */
export const validateUpdateSettings = [
  body('volume')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Volume must be between 0 and 100'),
  body('language')
    .optional()
    .isIn(['ru', 'en', 'zh'])
    .withMessage('Language must be ru, en, or zh'),
  body('theme')
    .optional()
    .isIn(['light', 'dark', 'system'])
    .withMessage('Theme must be light, dark, or system'),
  body('sttProviderName')
    .optional()
    .custom((value) => {
      if (value === null || value === undefined || typeof value === 'string') {
        return true;
      }
      throw new Error('sttProviderName must be a string or null');
    }),
  body('llmProviderName')
    .optional()
    .custom((value) => {
      if (value === null || value === undefined || typeof value === 'string') {
        return true;
      }
      throw new Error('llmProviderName must be a string or null');
    }),
  body('ttsProviderName')
    .optional()
    .custom((value) => {
      if (value === null || value === undefined || typeof value === 'string') {
        return true;
      }
      throw new Error('ttsProviderName must be a string or null');
    }),
  body('modelScene.modelPath').optional().isString().withMessage('modelPath must be a string'),
  body('modelScene.sceneName')
    .optional()
    .custom((value) => {
      if (value === null || value === undefined || typeof value === 'string') {
        return true;
      }
      throw new Error('sceneName must be a string or null');
    }),
  body('modelScene.enableToonShader')
    .optional()
    .isBoolean()
    .withMessage('enableToonShader must be a boolean'),
  body('modelScene.lightIntensity')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('lightIntensity must be a positive number'),
  body('modelScene.cameraDistance')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('cameraDistance must be a positive number'),
  body('modelScene.animationSpeed')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('animationSpeed must be a positive number'),
];
