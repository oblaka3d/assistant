import { Router } from 'express';
import passport from 'passport';

import { config } from '../config';
import {
  registerController,
  loginController,
  refreshTokenController,
  getMeController,
  updateProfileController,
  changePasswordController,
  requestPasswordResetController,
  resetPasswordController,
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword,
  validateRequestPasswordReset,
  validateResetPassword,
} from '../controllers/authController';
import {
  googleAuthController,
  googleCallbackController,
  yandexAuthController,
  yandexCallbackController,
  githubAuthController,
  githubCallbackController,
} from '../controllers/oauthController';
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

/**
 * @route   PATCH /api/v1/auth/profile
 * @desc    Обновление профиля пользователя
 * @access  Private
 */
router.patch('/profile', authenticate, validateUpdateProfile, updateProfileController);

/**
 * @route   POST /api/v1/auth/change-password
 * @desc    Изменение пароля пользователя
 * @access  Private
 */
router.post('/change-password', authenticate, validateChangePassword, changePasswordController);

/**
 * @route   POST /api/v1/auth/forgot-password
 * @desc    Запрос на сброс пароля
 * @access  Public
 */
router.post('/forgot-password', validateRequestPasswordReset, requestPasswordResetController);

/**
 * @route   POST /api/v1/auth/reset-password
 * @desc    Сброс пароля по токену
 * @access  Public
 */
router.post('/reset-password', validateResetPassword, resetPasswordController);

/**
 * @route   GET /api/v1/auth/google
 * @desc    Инициирует OAuth авторизацию через Google
 * @access  Public
 */
router.get(
  '/google',
  (_req, res, next) => {
    if (!config.oauth.google.clientID || !config.oauth.google.clientSecret) {
      res.status(503).json({
        error:
          'Google OAuth is not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.',
      });
      return;
    }
    next();
  },
  googleAuthController,
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * @route   GET /api/v1/auth/google/callback
 * @desc    Callback для Google OAuth
 * @access  Public
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/error' }),
  googleCallbackController
);

/**
 * @route   GET /api/v1/auth/yandex
 * @desc    Инициирует OAuth авторизацию через Yandex
 * @access  Public
 */
router.get(
  '/yandex',
  (_req, res, next) => {
    if (!config.oauth.yandex.clientID || !config.oauth.yandex.clientSecret) {
      res.status(503).json({
        error:
          'Yandex OAuth is not configured. Please set YANDEX_CLIENT_ID and YANDEX_CLIENT_SECRET environment variables.',
      });
      return;
    }
    next();
  },
  yandexAuthController,
  passport.authenticate('yandex')
);

/**
 * @route   GET /api/v1/auth/yandex/callback
 * @desc    Callback для Yandex OAuth
 * @access  Public
 */
router.get(
  '/yandex/callback',
  passport.authenticate('yandex', { session: false, failureRedirect: '/auth/error' }),
  yandexCallbackController
);

/**
 * @route   GET /api/v1/auth/github
 * @desc    Инициирует OAuth авторизацию через GitHub
 * @access  Public
 */
router.get(
  '/github',
  (_req, res, next) => {
    if (!config.oauth.github.clientID || !config.oauth.github.clientSecret) {
      res.status(503).json({
        error:
          'GitHub OAuth is not configured. Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET environment variables.',
      });
      return;
    }
    next();
  },
  githubAuthController,
  passport.authenticate('github', { scope: ['user:email'] })
);

/**
 * @route   GET /api/v1/auth/github/callback
 * @desc    Callback для GitHub OAuth
 * @access  Public
 */
router.get(
  '/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/auth/error' }),
  githubCallbackController
);

export default router;
