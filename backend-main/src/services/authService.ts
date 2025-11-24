import crypto from 'crypto';

import { IUser, User } from '../models/User';
import { generateToken, generateRefreshToken, TokenPayload } from '../utils/jwt';

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
  refreshToken: string;
}

/**
 * Регистрация нового пользователя
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  // Проверка существования пользователя
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Создание нового пользователя
  const user = new User({
    email: data.email,
    password: data.password,
    name: data.name,
  });

  await user.save();

  // Генерация токенов
  const payload: TokenPayload = {
    userId: user._id.toString(),
    email: user.email,
  };

  const token = generateToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    },
    token,
    refreshToken,
  };
};

/**
 * Авторизация пользователя
 */
export const login = async (data: LoginData): Promise<AuthResponse> => {
  // Поиск пользователя с паролем
  const user = await User.findOne({ email: data.email }).select('+password');
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Проверка пароля
  const isPasswordValid = await user.comparePassword(data.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Генерация токенов
  const payload: TokenPayload = {
    userId: user._id.toString(),
    email: user.email,
  };

  const token = generateToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    },
    token,
    refreshToken,
  };
};

/**
 * Получение пользователя по ID
 */
export const getUserById = async (userId: string): Promise<IUser | null> => {
  return User.findById(userId);
};

export interface UpdateProfileData {
  name?: string;
  email?: string;
}

/**
 * Обновление профиля пользователя
 */
export const updateProfile = async (
  userId: string,
  data: UpdateProfileData
): Promise<AuthResponse> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Если меняется email, проверяем, что он не занят
  if (data.email && data.email !== user.email) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    user.email = data.email;
  }

  if (data.name) {
    user.name = data.name;
  }

  await user.save();

  // Генерация новых токенов
  const payload: TokenPayload = {
    userId: user._id.toString(),
    email: user.email,
  };

  const token = generateToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    },
    token,
    refreshToken,
  };
};

/**
 * Изменение пароля пользователя
 */
export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new Error('User not found');
  }

  if (!user.password) {
    throw new Error('Password not set for this account');
  }

  // Проверяем текущий пароль
  const isPasswordValid = await user.comparePassword(currentPassword);
  if (!isPasswordValid) {
    throw new Error('Current password is incorrect');
  }

  // Устанавливаем новый пароль
  user.password = newPassword;
  await user.save();
};

/**
 * Генерация токена для сброса пароля
 */
export const generatePasswordResetToken = async (email: string): Promise<string | null> => {
  const user = await User.findOne({ email });
  if (!user) {
    // Не сообщаем, что пользователь не найден (безопасность)
    return null;
  }

  // Генерируем случайный токен
  const resetToken = crypto.randomBytes(32).toString('hex');

  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 минут

  await user.save();

  // Возвращаем незашифрованный токен для отправки по email
  return resetToken;
};

/**
 * Сброс пароля по токену
 */
export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  }).select('+resetPasswordToken +resetPasswordExpires');

  if (!user) {
    throw new Error('Invalid or expired reset token');
  }

  // Устанавливаем новый пароль
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
};
