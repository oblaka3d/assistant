import { Router } from 'express';

import { getIdleImage } from '../controllers/idleController';

const router = Router();

router.get('/idle-image', getIdleImage);

export default router;
