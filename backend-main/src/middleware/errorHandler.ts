import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
  statusCode?: number;
}

/**
 * Middleware для обработки ошибок
 */
export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error('Error:', err);

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * Middleware для обработки 404
 */
export const notFound = (_req: Request, res: Response): void => {
  res.status(404).json({ error: 'Route not found' });
};
