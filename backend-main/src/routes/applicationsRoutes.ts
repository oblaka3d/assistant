import { Router, RequestHandler } from 'express';
import multer from 'multer';

import {
  checkApplicationKeyAvailabilityHandler,
  createApplicationCatalogEntry,
  createApplicationVersionHandler,
  getApplicationCatalog,
  getApplicationDetailsHandler,
  getApplicationStorageUsageHandler,
  getInstalledApplicationsHandler,
  importApplicationArchiveHandler,
  installApplicationHandler,
  uninstallApplicationHandler,
  updateApplicationStatusHandler,
} from '../controllers/applicationsController';
import { AuthRequest, authenticate, optionalAuthenticate } from '../middleware/auth';
import {
  APPLICATION_STORAGE_LIMIT_BYTES,
  buildArchiveFilename,
  isAllowedArchive,
  resolveUserStorageDirSync,
} from '../services/applicationStorageService';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const userId = (req as AuthRequest).user?.userId ?? 'guest';
    const dir = resolveUserStorageDirSync(userId);
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    cb(null, buildArchiveFilename(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: APPLICATION_STORAGE_LIMIT_BYTES,
  },
  fileFilter: (_req, file, cb) => {
    if (isAllowedArchive(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error('Only archive files are allowed'));
    }
  },
});

const handleArchiveUpload: RequestHandler = (req, res, next) => {
  upload.single('archive')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        const message =
          err.code === 'LIMIT_FILE_SIZE' ? 'Archive exceeds 100 MB limit' : err.message;
        res.status(400).json({ error: message });
        return;
      }
      res.status(400).json({ error: err.message || 'Failed to upload archive' });
      return;
    }
    next();
  });
};

router.get('/catalog', getApplicationCatalog);
router.post('/catalog', authenticate, createApplicationCatalogEntry);
router.get('/catalog/availability/:appKey', checkApplicationKeyAvailabilityHandler);
router.get('/catalog/:appKey', authenticate, getApplicationDetailsHandler);
router.patch('/catalog/:appKey/status', authenticate, updateApplicationStatusHandler);
router.post(
  '/catalog/:appKey/versions',
  authenticate,
  handleArchiveUpload,
  createApplicationVersionHandler
);
router.get('/installed', authenticate, getInstalledApplicationsHandler);
router.post('/installed', authenticate, installApplicationHandler);
router.delete('/installed/:appKey', authenticate, uninstallApplicationHandler);
router.get('/storage', authenticate, getApplicationStorageUsageHandler);
router.post('/import', optionalAuthenticate, handleArchiveUpload, importApplicationArchiveHandler);

export default router;
