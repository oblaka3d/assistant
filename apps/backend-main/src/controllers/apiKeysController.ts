import { NextFunction, Request, RequestHandler, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { AuthRequest } from '../middleware/auth';
import { getApiKeys, saveApiKeys } from '../services/apiKeyService';

export const getApiKeysController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const keys = await getApiKeys(authReq.user.userId);
    res.json({
      success: true,
      data: {
        keys,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const saveApiKeysController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const keys = (req.body.keys || {}) as Record<string, string>;
    const saved = await saveApiKeys(authReq.user.userId, keys);

    res.json({
      success: true,
      data: {
        keys: saved,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const validateSaveApiKeys = [
  body('keys').optional().isObject().withMessage('keys must be an object with provider/key pairs'),
  body('keys.*')
    .optional({ nullable: true })
    .custom((value) => {
      if (value === null || value === undefined) {
        return true;
      }
      if (typeof value === 'string') {
        return true;
      }
      throw new Error('API key values must be strings');
    }),
];
