import { Router } from 'express';

import {
  registerController,
  loginController,
  refreshTokenController,
  getMeController,
  validateRegister,
  validateLogin,
} from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * @route   POST /api/v1/auth/register
 * @desc    Регистрация нового пользователя
 * @access  Public
 */
router.post('/register', validateRegister, registerController);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Авторизация пользователя
 * @access  Public
 */
router.post('/login', validateLogin, loginController);

/**
 * @route   POST /api/v1/auth/refresh
 * @desc    Обновление токена
 * @access  Public
 */
router.post('/refresh', refreshTokenController);

/**
 * @route   GET /api/v1/auth/me
 * @desc    Получение текущего пользователя
 * @access  Private
 */
router.get('/me', authenticate, getMeController);

export default router;
