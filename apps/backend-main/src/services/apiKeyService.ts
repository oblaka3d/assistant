import { config } from '../config';
import { prisma } from '../lib/prisma';
import { decrypt, encrypt } from '../utils/encryption';

const { apiKeySecret } = config.security;

export const getApiKeys = async (userId: string) => {
  const keys = await prisma.apiKey.findMany({
    where: { userId },
    select: { provider: true, encryptedKey: true },
  });

  return keys.reduce<Record<string, string>>((acc, keyDoc) => {
    try {
      acc[keyDoc.provider] = decrypt(keyDoc.encryptedKey, apiKeySecret);
    } catch {
      acc[keyDoc.provider] = '';
    }
    return acc;
  }, {});
};

export const saveApiKeys = async (userId: string, keys: Record<string, string>) => {
  const operations = Object.entries(keys).map(([provider, keyValue]) => {
    if (!keyValue) {
      return prisma.apiKey.deleteMany({ where: { userId, provider } });
    }

    return prisma.apiKey.upsert({
      where: {
        userId_provider: {
          userId,
          provider,
        },
      },
      update: {
        encryptedKey: encrypt(keyValue, apiKeySecret),
      },
      create: {
        userId,
        provider,
        encryptedKey: encrypt(keyValue, apiKeySecret),
      },
    });
  });

  if (operations.length > 0) {
    await prisma.$transaction(operations);
  }

  return getApiKeys(userId);
};
