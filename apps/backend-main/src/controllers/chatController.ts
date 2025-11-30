import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body } from 'express-validator';

import {
  getUserDialogs,
  getDialogById,
  createDialog,
  updateDialog,
  deleteDialog,
  deleteAllUserDialogs,
  DialogUpdateData,
} from '../services/chatService';
import {
  requireAuthenticatedUser,
  respondWithValidationErrors,
  sendSuccess,
} from '../utils/controllerHelpers';

const formatDialog = (dialog: {
  dialogId: string;
  title: string;
  messages: unknown[];
  createdAt: Date;
  updatedAt: Date;
}) => ({
  id: dialog.dialogId,
  title: dialog.title,
  messages: dialog.messages,
  createdAt: dialog.createdAt,
  updatedAt: dialog.updatedAt,
});

/**
 * Получение всех диалогов пользователя
 */
export const getDialogsController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = requireAuthenticatedUser(req, res);
    if (!user) {
      return;
    }

    const dialogs = await getUserDialogs(user.userId);

    sendSuccess(res, {
      dialogs: dialogs.map(formatDialog),
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
    const user = requireAuthenticatedUser(req, res);
    if (!user) {
      return;
    }

    const { dialogId } = req.params;
    const dialog = await getDialogById(user.userId, dialogId);

    if (!dialog) {
      res.status(404).json({ error: 'Dialog not found' });
      return;
    }

    sendSuccess(res, { dialog: formatDialog(dialog) });
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
    const user = requireAuthenticatedUser(req, res);
    if (!user) {
      return;
    }

    if (respondWithValidationErrors(req, res)) {
      return;
    }

    const { dialogId, title } = req.body;

    if (!dialogId) {
      res.status(400).json({ error: 'dialogId is required' });
      return;
    }

    const dialog = await createDialog(user.userId, dialogId, title);

    sendSuccess(res, { dialog: formatDialog(dialog) }, 201);
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
    const user = requireAuthenticatedUser(req, res);
    if (!user) {
      return;
    }

    if (respondWithValidationErrors(req, res)) {
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

    const dialog = await updateDialog(user.userId, dialogId, updateData);

    sendSuccess(res, { dialog: formatDialog(dialog) });
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
    const user = requireAuthenticatedUser(req, res);
    if (!user) {
      return;
    }

    const { dialogId } = req.params;
    const deleted = await deleteDialog(user.userId, dialogId);

    if (!deleted) {
      res.status(404).json({ error: 'Dialog not found' });
      return;
    }

    sendSuccess(res, { message: 'Dialog deleted successfully', dialogId });
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
    const user = requireAuthenticatedUser(req, res);
    if (!user) {
      return;
    }

    const deletedCount = await deleteAllUserDialogs(user.userId);

    sendSuccess(res, {
      message: 'All dialogs deleted successfully',
      deletedCount,
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
