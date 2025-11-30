import { Router } from 'express';

import {
  getDialogsController,
  getDialogController,
  createDialogController,
  updateDialogController,
  deleteDialogController,
  deleteAllDialogsController,
  validateDialog,
} from '../controllers/chatController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Все маршруты требуют аутентификации
router.use(authenticate);

// Получить все диалоги пользователя
router.get('/', getDialogsController);

// Получить диалог по ID
router.get('/:dialogId', getDialogController);

// Создать новый диалог
router.post('/', validateDialog, createDialogController);

// Обновить диалог
router.put('/:dialogId', validateDialog, updateDialogController);

// Удалить диалог
router.delete('/:dialogId', deleteDialogController);

// Удалить все диалоги пользователя
router.delete('/', deleteAllDialogsController);

export default router;
