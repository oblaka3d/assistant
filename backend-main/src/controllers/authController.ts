import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

import { AuthRequest } from '../middleware/auth';
import { register, login, getUserById } from '../services/authService';
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
export const getMeController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const user = await getUserById(req.user.userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id.toString(),
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
