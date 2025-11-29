import { Request, Response, NextFunction } from 'express';

/**
 * Инициирует OAuth авторизацию через Google
 */
export const googleAuthController = (_req: Request, _res: Response, next: NextFunction): void => {
  // Passport middleware обработает это
  next();
};

/**
 * Callback для Google OAuth
 */
interface OAuthUser {
  id: string;
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const googleCallbackController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user as OAuthUser;
    if (!user || !user.token) {
      res.status(401).json({ error: 'OAuth authentication failed' });
      return;
    }

    // Для Electron приложения возвращаем редирект на специальный URL
    // Electron перехватит навигацию и загрузит index.html с токенами
    const tokenParam = encodeURIComponent(user.token);
    const refreshTokenParam = encodeURIComponent(user.refreshToken);

    // Редиректим на специальный URL, который Electron обработает
    // Используем полный путь с префиксом API
    res.redirect(
      `/api/v1/auth/callback-success?token=${tokenParam}&refreshToken=${refreshTokenParam}`
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Инициирует OAuth авторизацию через Yandex
 */
export const yandexAuthController = (_req: Request, _res: Response, next: NextFunction): void => {
  // Passport middleware обработает это
  next();
};

/**
 * Callback для Yandex OAuth
 */
export const yandexCallbackController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user as OAuthUser;
    if (!user || !user.token) {
      res.status(401).json({ error: 'OAuth authentication failed' });
      return;
    }

    // Для Electron приложения возвращаем редирект на специальный URL
    // Electron перехватит навигацию и загрузит index.html с токенами
    const tokenParam = encodeURIComponent(user.token);
    const refreshTokenParam = encodeURIComponent(user.refreshToken);

    // Редиректим на специальный URL, который Electron обработает
    // Используем полный путь с префиксом API
    res.redirect(
      `/api/v1/auth/callback-success?token=${tokenParam}&refreshToken=${refreshTokenParam}`
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Инициирует OAuth авторизацию через GitHub
 */
export const githubAuthController = (_req: Request, _res: Response, next: NextFunction): void => {
  // Passport middleware обработает это
  next();
};

/**
 * Callback для GitHub OAuth
 */
export const githubCallbackController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user as OAuthUser;
    if (!user || !user.token) {
      res.status(401).json({ error: 'OAuth authentication failed' });
      return;
    }

    // Для Electron приложения возвращаем редирект на специальный URL
    // Electron перехватит навигацию и загрузит index.html с токенами
    const tokenParam = encodeURIComponent(user.token);
    const refreshTokenParam = encodeURIComponent(user.refreshToken);

    // Редиректим на специальный URL, который Electron обработает
    // Используем полный путь с префиксом API
    res.redirect(
      `/api/v1/auth/callback-success?token=${tokenParam}&refreshToken=${refreshTokenParam}`
    );
  } catch (error) {
    next(error);
  }
};
