import { Types } from 'mongoose';

import { Dialog, IDialog, IMessage } from '../models/Chat';

export interface DialogUpdateData {
  title?: string;
  messages?: IMessage[];
}

/**
 * Получить все диалоги пользователя
 */
export const getUserDialogs = async (userId: string | Types.ObjectId): Promise<IDialog[]> => {
  return Dialog.find({ userId }).sort({ updatedAt: -1 }).exec();
};

/**
 * Получить диалог по ID
 */
export const getDialogById = async (
  userId: string | Types.ObjectId,
  dialogId: string
): Promise<IDialog | null> => {
  return Dialog.findOne({ userId, dialogId }).exec();
};

/**
 * Создать новый диалог
 */
export const createDialog = async (
  userId: string | Types.ObjectId,
  dialogId: string,
  title?: string
): Promise<IDialog> => {
  const dialog = await Dialog.create({
    userId,
    dialogId,
    title: title || 'Новый диалог',
    messages: [],
  });
  return dialog;
};

/**
 * Обновить диалог
 */
export const updateDialog = async (
  userId: string | Types.ObjectId,
  dialogId: string,
  updateData: DialogUpdateData
): Promise<IDialog> => {
  const dialog = await Dialog.findOneAndUpdate(
    { userId, dialogId },
    { $set: updateData },
    { new: true, upsert: true, runValidators: true }
  );

  if (!dialog) {
    throw new Error('Failed to update dialog');
  }

  return dialog;
};

/**
 * Удалить диалог
 */
export const deleteDialog = async (
  userId: string | Types.ObjectId,
  dialogId: string
): Promise<boolean> => {
  const result = await Dialog.deleteOne({ userId, dialogId });
  return result.deletedCount > 0;
};

/**
 * Удалить все диалоги пользователя
 */
export const deleteAllUserDialogs = async (userId: string | Types.ObjectId): Promise<number> => {
  const result = await Dialog.deleteMany({ userId });
  return result.deletedCount;
};
