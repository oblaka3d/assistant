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
