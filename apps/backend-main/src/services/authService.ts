import crypto from 'crypto';

import type { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { prisma } from '../lib/prisma';
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

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

const buildTokens = (user: Pick<User, 'id' | 'email'>) => {
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
  };

  return {
    token: generateToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

const toAuthResponse = (user: Pick<User, 'id' | 'email' | 'name'>): AuthResponse => {
  const tokens = buildTokens(user);
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    ...tokens,
  };
};

const userWithPasswordSelect = {
  id: true,
  email: true,
  name: true,
  password: true,
} as const;

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const email = normalizeEmail(data.email);
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: data.name,
    },
  });

  return toAuthResponse(user);
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const email = normalizeEmail(data.email);
  const user = await prisma.user.findUnique({
    where: { email },
    select: userWithPasswordSelect,
  });

  if (!user || !user.password) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  return toAuthResponse(user);
};

export const getUserById = async (userId: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id: userId } });
};

export interface UpdateProfileData {
  name?: string;
  email?: string;
}

export const updateProfile = async (
  userId: string,
  data: UpdateProfileData
): Promise<AuthResponse> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error('User not found');
  }

  const nextEmail = data.email ? normalizeEmail(data.email) : user.email;

  if (nextEmail !== user.email) {
    const existingUser = await prisma.user.findUnique({ where: { email: nextEmail } });
    if (existingUser && existingUser.id !== user.id) {
      throw new Error('User with this email already exists');
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      email: nextEmail,
      name: data.name ?? user.name,
    },
  });

  return toAuthResponse(updatedUser);
};

export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: userWithPasswordSelect,
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.password) {
    throw new Error('Password not set for this account');
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    throw new Error('Current password is incorrect');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
};

export const generatePasswordResetToken = async (email: string): Promise<string | null> => {
  const normalizedEmail = normalizeEmail(email);
  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) {
    return null;
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  return resetToken;
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: {
        gt: new Date(),
      },
    },
    select: { id: true },
  });

  if (!user) {
    throw new Error('Invalid or expired reset token');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });
};
