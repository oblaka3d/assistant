import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';

import { AuthRequest } from '../middleware/auth';
import {
  getUserDialogs,
  getDialogById,
  createDialog,
  updateDialog,
  deleteDialog,
  deleteAllUserDialogs,
  DialogUpdateData,
} from '../services/chatService';

/**
 * Получение всех диалогов пользователя
 */
export const getDialogsController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const dialogs = await getUserDialogs(authReq.user.userId);

    res.status(200).json({
      success: true,
      data: {
        dialogs: dialogs.map((dialog) => ({
          id: dialog.dialogId,
          title: dialog.title,
          messages: dialog.messages,
          createdAt: dialog.createdAt,
          updatedAt: dialog.updatedAt,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Получение диалога по ID
 */
export const getDialogController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { dialogId } = req.params;
    const dialog = await getDialogById(authReq.user.userId, dialogId);

    if (!dialog) {
      res.status(404).json({ error: 'Dialog not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        dialog: {
          id: dialog.dialogId,
          title: dialog.title,
          messages: dialog.messages,
          createdAt: dialog.createdAt,
          updatedAt: dialog.updatedAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Создание нового диалога
 */
export const createDialogController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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

    const { dialogId, title } = req.body;

    if (!dialogId) {
      res.status(400).json({ error: 'dialogId is required' });
      return;
    }

    const dialog = await createDialog(authReq.user.userId, dialogId, title);

    res.status(201).json({
      success: true,
      data: {
        dialog: {
          id: dialog.dialogId,
          title: dialog.title,
          messages: dialog.messages,
          createdAt: dialog.createdAt,
          updatedAt: dialog.updatedAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Обновление диалога
 */
export const updateDialogController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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

    const { dialogId } = req.params;
    const updateData: DialogUpdateData = {};

    if (req.body.title !== undefined) {
      updateData.title = req.body.title;
    }
    if (req.body.messages !== undefined) {
      updateData.messages = req.body.messages;
    }

    const dialog = await updateDialog(authReq.user.userId, dialogId, updateData);

    res.status(200).json({
      success: true,
      data: {
        dialog: {
          id: dialog.dialogId,
          title: dialog.title,
          messages: dialog.messages,
          createdAt: dialog.createdAt,
          updatedAt: dialog.updatedAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Удаление диалога
 */
export const deleteDialogController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { dialogId } = req.params;
    const deleted = await deleteDialog(authReq.user.userId, dialogId);

    if (!deleted) {
      res.status(404).json({ error: 'Dialog not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Dialog deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Удаление всех диалогов пользователя
 */
export const deleteAllDialogsController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const deletedCount = await deleteAllUserDialogs(authReq.user.userId);

    res.status(200).json({
      success: true,
      message: 'All dialogs deleted successfully',
      data: {
        deletedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Валидация для создания/обновления диалога
 */
export const validateDialog = [
  body('dialogId').optional().isString().withMessage('dialogId must be a string'),
  body('title').optional().isString().withMessage('title must be a string'),
  body('messages').optional().isArray().withMessage('messages must be an array'),
  body('messages.*.id').optional().isString().withMessage('message id must be a string'),
  body('messages.*.position')
    .optional()
    .isIn(['left', 'right'])
    .withMessage('message position must be left or right'),
  body('messages.*.type').optional().isIn(['text']).withMessage('message type must be text'),
  body('messages.*.text').optional().isString().withMessage('message text must be a string'),
  body('messages.*.date')
    .optional()
    .isISO8601()
    .withMessage('message date must be a valid ISO 8601 date'),
];
