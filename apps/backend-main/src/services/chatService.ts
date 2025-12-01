import type { Dialog, Prisma } from '@prisma/client';

import { prisma } from '../lib/prisma';

export interface DialogUpdateData {
  title?: string;
  messages?: Prisma.DialogUpdateInput['messages'];
}

export const getUserDialogs = async (userId: string): Promise<Dialog[]> => {
  return prisma.dialog.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
  });
};

export const getDialogById = async (userId: string, dialogId: string): Promise<Dialog | null> => {
  return prisma.dialog.findUnique({
    where: {
      userId_dialogId: {
        userId,
        dialogId,
      },
    },
  });
};

export const createDialog = async (
  userId: string,
  dialogId: string,
  title?: string
): Promise<Dialog> => {
  return prisma.dialog.create({
    data: {
      userId,
      dialogId,
      title: title || 'Новый диалог',
      messages: [],
    },
  });
};

export const updateDialog = async (
  userId: string,
  dialogId: string,
  updateData: DialogUpdateData
): Promise<Dialog> => {
  const dialog = await prisma.dialog.upsert({
    where: {
      userId_dialogId: {
        userId,
        dialogId,
      },
    },
    update: {
      ...(updateData.title !== undefined ? { title: updateData.title } : {}),
      ...(updateData.messages !== undefined
        ? { messages: updateData.messages as Dialog['messages'] }
        : {}),
    },
    create: {
      userId,
      dialogId,
      title: updateData.title || 'Новый диалог',
      messages: (updateData.messages as Dialog['messages']) ?? [],
    },
  });

  return dialog;
};

export const deleteDialog = async (userId: string, dialogId: string): Promise<boolean> => {
  const result = await prisma.dialog.deleteMany({
    where: {
      userId,
      dialogId,
    },
  });
  return result.count > 0;
};

export const deleteAllUserDialogs = async (userId: string): Promise<number> => {
  const result = await prisma.dialog.deleteMany({ where: { userId } });
  return result.count;
};
