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

/**
 * @route   GET /auth/callback-success
 * @desc    Страница успешной OAuth авторизации для Electron
 * @access  Public
 */
router.get('/callback-success', (_req, res) => {
  const token = _req.query.token as string;
  const refreshToken = _req.query.refreshToken as string;

  if (!token || !refreshToken) {
    res.status(400).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Authorization Failed</title>
        <meta charset="UTF-8">
      </head>
      <body>
        <p>Authorization failed: Missing tokens.</p>
      </body>
      </html>
    `);
    return;
  }

  // Отдаем HTML страницу, которая обработает токены
  // В Electron приложении useOAuthCallback обработает токены из URL параметров
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Authorization Successful</title>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          background: #f5f5f5;
        }
        .container {
          text-align: center;
          padding: 2rem;
        }
        .success {
          color: #4caf50;
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="success">✓ Authorization successful</div>
        <p>This window will close automatically...</p>
      </div>
      <script>
        // Отправляем токены родительскому окну через postMessage (если есть opener)
        if (window.opener) {
          try {
            window.opener.postMessage({
              type: 'oauth-callback',
              token: ${JSON.stringify(token)},
              refreshToken: ${JSON.stringify(refreshToken)}
            }, '*');
          } catch (e) {
            console.error('Failed to send postMessage:', e);
          }
          setTimeout(() => {
            window.close();
          }, 500);
        } else {
          // В Electron приложении Electron сам перехватит этот URL с токенами
          // и загрузит главную страницу через обработчик did-navigate
          // Просто показываем сообщение об успехе
          document.body.innerHTML = '<div style="text-align: center; padding: 2rem;"><div style="color: #4caf50; font-size: 1.2rem; margin-bottom: 1rem;">✓ Authorization successful</div><p>Redirecting...</p></div>';
        }
      </script>
    </body>
    </html>
  `);
});

export default router;
