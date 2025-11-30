import { User } from '../models/User';
import { generateToken, generateRefreshToken, TokenPayload } from '../utils/jwt';

export interface OAuthProfile {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface OAuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
  refreshToken: string;
}

/**
 * Поиск или создание пользователя через OAuth
 */
export const findOrCreateOAuthUser = async (
  provider: 'google' | 'yandex' | 'github',
  profile: OAuthProfile
): Promise<OAuthResponse> => {
  // Ищем пользователя по OAuth провайдеру
  let user = await User.findOne({
    'oauthProviders.provider': provider,
    'oauthProviders.providerId': profile.id,
  });

  if (user) {
    // Пользователь существует, обновляем информацию если нужно
    if (profile.email && user.email !== profile.email) {
      user.email = profile.email;
    }
    if (profile.name && user.name !== profile.name) {
      user.name = profile.name;
    }
    await user.save();
  } else {
    // Проверяем, существует ли пользователь с таким email
    const existingUser = await User.findOne({ email: profile.email.toLowerCase() });

    if (existingUser) {
      // Добавляем OAuth провайдер к существующему пользователю
      if (!existingUser.oauthProviders) {
        existingUser.oauthProviders = [];
      }
      existingUser.oauthProviders.push({
        provider,
        providerId: profile.id,
      });
      await existingUser.save();
      user = existingUser;
    } else {
      // Создаем нового пользователя
      user = new User({
        email: profile.email.toLowerCase(),
        name: profile.name,
        oauthProviders: [
          {
            provider,
            providerId: profile.id,
          },
        ],
      });
      await user.save();
    }
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
