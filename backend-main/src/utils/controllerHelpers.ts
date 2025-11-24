import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { AuthRequest } from '../middleware/auth';

/**
 * Проверяет наличие авторизованного пользователя в запросе.
 * Возвращает объект пользователя или отправляет 401.
 */
export const requireAuthenticatedUser = (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  if (!authReq.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }

  return authReq.user;
};

/**
 * Обрабатывает ошибки валидации express-validator.
 * Возвращает true, если ошибка уже отправлена клиенту.
 */
export const respondWithValidationErrors = (req: Request, res: Response): boolean => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return true;
  }
  return false;
};

/**
 * Унифицированный успешный ответ.
 */
export const sendSuccess = <T>(res: Response, data: T, status = 200): void => {
  res.status(status).json({
    success: true,
    data,
  });
};
