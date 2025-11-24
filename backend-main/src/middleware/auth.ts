import { Request, Response, NextFunction } from 'express';

import { verifyToken, TokenPayload } from '../utils/jwt';

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

/**
 * Middleware для проверки JWT токена
 */
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.substring(7); // Убираем "Bearer "

    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      next();
    } catch {
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  } catch {
    res.status(401).json({ error: 'Authentication failed' });
  }
};
