import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';

import { AuthRequest } from '../middleware/auth';
import {
  register,
  login,
  getUserById,
  updateProfile,
  changePassword,
  generatePasswordResetToken,
  resetPassword,
} from '../services/authService';
import {
  verifyRefreshToken,
  generateToken,
  generateRefreshToken,
  TokenPayload,
} from '../utils/jwt';

/**
 * Регистрация пользователя
 */
export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Проверка ошибок валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password, name } = req.body;

    const result = await register({ email, password, name });

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    if (err.message === 'User with this email already exists') {
      res.status(409).json({ error: err.message });
    } else {
      next(error);
    }
  }
};

/**
 * Авторизация пользователя
 */
export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Проверка ошибок валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    const result = await login({ email, password });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    if (err.message === 'Invalid email or password') {
      res.status(401).json({ error: err.message });
    } else {
      next(error);
    }
  }
};

/**
 * Обновление токена
 */
export const refreshTokenController = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ error: 'Refresh token is required' });
      return;
    }

    const decoded = verifyRefreshToken(refreshToken);

    const payload: TokenPayload = {
      userId: decoded.userId,
      email: decoded.email,
    };

    const newToken = generateToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    res.status(200).json({
      success: true,
      data: {
        token: newToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch {
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
};

/**
 * Получение текущего пользователя
 */
export const getMeController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const user = await getUserById(authReq.user.userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Валидация для регистрации
 */
export const validateRegister = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').trim().notEmpty().withMessage('Name is required'),
];

/**
 * Валидация для входа
 */
export const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

/**
 * Обновление профиля пользователя
 */
export const updateProfileController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const result = await updateProfile(authReq.user.userId, req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    if (err.message === 'User with this email already exists') {
      res.status(409).json({ error: err.message });
    } else {
      next(error);
    }
  }
};

/**
 * Изменение пароля пользователя
 */
export const changePasswordController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { currentPassword, newPassword } = req.body;

    await changePassword(authReq.user.userId, currentPassword, newPassword);

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    const err = error as Error;
    if (
      err.message === 'Current password is incorrect' ||
      err.message === 'Password not set for this account'
    ) {
      res.status(400).json({ error: err.message });
    } else {
      next(error);
    }
  }
};

/**
 * Запрос на сброс пароля
 */
export const requestPasswordResetController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email } = req.body;

    // Генерируем токен (не сообщаем, существует ли пользователь)
    const resetToken = await generatePasswordResetToken(email);

    if (resetToken) {
      // TODO: Отправить email с токеном сброса пароля
      // const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      // await sendPasswordResetEmail(email, resetUrl);
      console.log(`Password reset token for ${email}: ${resetToken}`); // Временный вывод для разработки
    }

    // Всегда возвращаем успех (безопасность)
    res.status(200).json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Сброс пароля по токену
 */
export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { token, password } = req.body;

    await resetPassword(token, password);

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    const err = error as Error;
    if (err.message === 'Invalid or expired reset token') {
      res.status(400).json({ error: err.message });
    } else {
      next(error);
    }
  }
};

/**
 * Валидация для обновления профиля
 */
export const validateUpdateProfile = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
];

/**
 * Валидация для изменения пароля
 */
export const validateChangePassword = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters'),
];

/**
 * Валидация для запроса сброса пароля
 */
export const validateRequestPasswordReset = [
  body('email').isEmail().withMessage('Please provide a valid email'),
];

/**
 * Валидация для сброса пароля
 */
export const validateResetPassword = [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];
