import { Router } from 'express';

import {
  getApiKeysController,
  saveApiKeysController,
  validateSaveApiKeys,
} from '../controllers/apiKeysController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.route('/').get(authenticate, getApiKeysController);
router.route('/').put(authenticate, validateSaveApiKeys, saveApiKeysController);

export default router;
