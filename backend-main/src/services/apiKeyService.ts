import { Types } from 'mongoose';

import { config } from '../config';
import { ApiKey } from '../models/ApiKey';
import { decrypt, encrypt } from '../utils/encryption';

const { apiKeySecret } = config.security;

export const getApiKeys = async (userId: string | Types.ObjectId) => {
  const keys = await ApiKey.find({ userId });
  return keys.reduce<Record<string, string>>((acc, keyDoc) => {
    try {
      acc[keyDoc.provider] = decrypt(keyDoc.encryptedKey, apiKeySecret);
    } catch {
      acc[keyDoc.provider] = '';
    }
    return acc;
  }, {});
};

export const saveApiKeys = async (
  userId: string | Types.ObjectId,
  keys: Record<string, string>
) => {
  const operations = Object.entries(keys).map(([provider, keyValue]) => {
    if (!keyValue) {
      return {
        deleteOne: {
          filter: { userId, provider },
        },
      };
    }

    return {
      updateOne: {
        filter: { userId, provider },
        update: {
          $set: {
            encryptedKey: encrypt(keyValue, apiKeySecret),
          },
        },
        upsert: true,
      },
    };
  });

  if (operations.length > 0) {
    await ApiKey.bulkWrite(operations);
  }

  return getApiKeys(userId);
};
