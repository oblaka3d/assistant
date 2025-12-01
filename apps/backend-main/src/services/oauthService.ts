import type { User } from '@prisma/client';

import { prisma } from '../lib/prisma';
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

const buildOAuthTokens = (user: Pick<User, 'id' | 'email'>) => {
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
  };

  return {
    token: generateToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

export const findOrCreateOAuthUser = async (
  provider: 'google' | 'yandex' | 'github',
  profile: OAuthProfile
): Promise<OAuthResponse> => {
  const email = normalizeEmail(profile.email);
  const providerEntry = { provider, providerId: profile.id };

  let user = await prisma.user.findFirst({
    where: {
      oauthProviders: {
        some: providerEntry,
      },
    },
  });

  if (user) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        email,
        name: profile.name ?? user.name,
      },
    });
  } else {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      const updatedProviders = [...(existingUser.oauthProviders ?? []), providerEntry];
      user = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          oauthProviders: updatedProviders,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          email,
          name: profile.name ?? email,
          oauthProviders: [providerEntry],
        },
      });
    }
  }

  const tokens = buildOAuthTokens(user);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    ...tokens,
  };
};
