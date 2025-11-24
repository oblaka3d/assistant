import { Router } from 'express';

import {
  getSettingsController,
  updateSettingsController,
  validateUpdateSettings,
} from '../controllers/settingsController';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * @route   GET /api/v1/settings
 * @desc    Получить настройки пользователя
 * @access  Private
 */
router.get('/', authenticate, getSettingsController);

/**
 * @route   PATCH /api/v1/settings
 * @desc    Обновить настройки пользователя
 * @access  Private
 */
router.patch('/', authenticate, validateUpdateSettings, updateSettingsController);

export default router;
