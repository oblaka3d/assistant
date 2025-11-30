import * as fs from 'node:fs/promises';
import path from 'node:path';

import AdmZip from 'adm-zip';
import { RequestHandler } from 'express';

import { AuthRequest } from '../middleware/auth';
import {
  APPLICATION_DESCRIPTION_MAX_LENGTH,
  APPLICATION_KEY_MAX_LENGTH,
  APPLICATION_NAME_MAX_LENGTH,
  APPLICATION_TYPES,
  APPLICATION_VERSION_MAX_LENGTH,
  APPLICATION_VERSION_REGEX,
  APPLICATION_STATUSES,
  RELEASE_TYPES,
  ReleaseType,
  createApplicationVersion,
  createCatalogApplication,
  getApplicationDetails,
  getCatalogApplications,
  getInstalledApplications,
  installApplicationForUser,
  isApplicationKeyAvailable,
  updateApplicationStatus,
  uninstallApplicationForUser,
} from '../services/applicationsService';
import {
  APPLICATION_STORAGE_LIMIT_BYTES,
  relativeStoragePath,
  getUserStorageUsage,
  moveFileToDirectory,
  resetApplicationVersionDir,
} from '../services/applicationStorageService';

const APP_KEY_REGEX = /^[a-zA-Z0-9-]+$/;
const KEY_VALIDATION_ERROR = `Application ID must contain only English letters, digits, or hyphen (max ${APPLICATION_KEY_MAX_LENGTH} characters)`;
const KEY_REQUIRED_ERROR = 'Application ID is required';
const NAME_REQUIRED_ERROR = 'Application name is required';
const NAME_LENGTH_ERROR = `Application name must not exceed ${APPLICATION_NAME_MAX_LENGTH} characters`;
const DESCRIPTION_LENGTH_ERROR = `Application description must not exceed ${APPLICATION_DESCRIPTION_MAX_LENGTH} characters`;
const VERSION_REQUIRED_ERROR = 'Application version is required';
const VERSION_LENGTH_ERROR = `Application version must not exceed ${APPLICATION_VERSION_MAX_LENGTH} characters`;
const VERSION_FORMAT_ERROR = 'Application version must match the 1.0.0 format';
const TYPE_REQUIRED_ERROR = 'Application type is required';
const TYPE_INVALID_ERROR = `Application type must be one of: ${APPLICATION_TYPES.join(', ')}`;

const isValidAppKey = (value: unknown): value is string => {
  if (typeof value !== 'string') {
    return false;
  }
  const trimmed = value.trim();
  return (
    trimmed.length > 0 &&
    trimmed.length <= APPLICATION_KEY_MAX_LENGTH &&
    APP_KEY_REGEX.test(trimmed)
  );
};

const sanitizeAppKey = (value: string): string => value.trim().toLowerCase();

const isValidAppType = (value: unknown): value is (typeof APPLICATION_TYPES)[number] => {
  if (typeof value !== 'string') {
    return false;
  }
  const normalized = value.trim().toLowerCase();
  return APPLICATION_TYPES.includes(normalized as (typeof APPLICATION_TYPES)[number]);
};

type PackageJsonEntryValue = string | { entry?: unknown } | undefined;

type PackageJsonPayload = {
  name?: unknown;
  version?: unknown;
  type?: unknown;
  description?: unknown;
  entryPoints?: {
    frontend?: PackageJsonEntryValue;
    backend?: PackageJsonEntryValue;
  };
  frontend?: PackageJsonEntryValue;
  backend?: PackageJsonEntryValue;
  permissions?: unknown;
};

const parsePackageJsonFromArchive = (
  archivePath: string
): { zip: AdmZip; data: PackageJsonPayload } => {
  try {
    const zip = new AdmZip(archivePath);
    const pkgEntry = zip.getEntry('package.json');
    if (!pkgEntry) {
      throw new Error('package.json file is missing in the archive');
    }
    const pkgContent = pkgEntry.getData().toString('utf-8');
    const pkg = JSON.parse(pkgContent) as PackageJsonPayload;
    if (pkg === null || typeof pkg !== 'object') {
      throw new Error('package.json must contain a JSON object');
    }
    return { zip, data: pkg };
  } catch (error) {
    throw new Error(`Failed to read package.json: ${(error as Error)?.message || 'Unknown error'}`);
  }
};

const readEntryValue = (value?: PackageJsonEntryValue): string | undefined => {
  if (typeof value === 'string') {
    return value.trim();
  }
  if (value && typeof value === 'object' && typeof value.entry === 'string') {
    return value.entry.trim();
  }
  return undefined;
};

const normalizePackagePermissions = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter((item) => item.length > 0);
};

const buildManifestFromPackageJson = (payload: PackageJsonPayload) => {
  const packageName = typeof payload.name === 'string' ? payload.name.trim() : '';
  const packageVersion = typeof payload.version === 'string' ? payload.version.trim() : '';
  const packageType = typeof payload.type === 'string' ? payload.type.trim().toLowerCase() : '';
  const packageDescription =
    typeof payload.description === 'string' ? payload.description.trim() : undefined;

  if (!packageName) {
    throw new Error('package.json must contain "name" field');
  }
  if (!packageVersion) {
    throw new Error('package.json must contain "version" field');
  }
  if (!packageType) {
    throw new Error('package.json must contain "type" field');
  }
  if (!APPLICATION_VERSION_REGEX.test(packageVersion)) {
    throw new Error('package.json "version" must match the 1.0.0 format');
  }
  if (!isValidAppType(packageType)) {
    throw new Error(TYPE_INVALID_ERROR);
  }

  const entryPointsSource = payload.entryPoints ?? {
    frontend: payload.frontend,
    backend: payload.backend,
  };
  const entryPoints = {
    frontend: readEntryValue(entryPointsSource?.frontend),
    backend: readEntryValue(entryPointsSource?.backend),
  };

  if (!entryPoints.frontend) {
    throw new Error('package.json must define a frontend entry point');
  }

  return {
    manifest: {
      name: packageName,
      version: packageVersion,
      type: packageType,
      description: packageDescription,
      entryPoints,
      permissions: normalizePackagePermissions(payload.permissions),
    },
  };
};

interface MulterRequest extends AuthRequest {
  file?: Express.Multer.File;
}

export const getApplicationCatalog: RequestHandler = async (_req, res) => {
  try {
    const applications = await getCatalogApplications();
    res.json({ success: true, data: { applications } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch application catalog', details: String(error) });
  }
};

export const getApplicationDetailsHandler: RequestHandler = async (req, res) => {
  try {
    const userId = (req as AuthRequest).user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { appKey } = req.params as { appKey?: string };
    if (!appKey) {
      res.status(400).json({ error: KEY_REQUIRED_ERROR });
      return;
    }

    if (!isValidAppKey(appKey)) {
      res.status(400).json({ error: KEY_VALIDATION_ERROR });
      return;
    }

    const application = await getApplicationDetails(appKey);
    if (application.owner !== userId) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    res.json({ success: true, data: { application } });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const createApplicationCatalogEntry: RequestHandler = async (req, res) => {
  try {
    const { key, name, version, type, description } = req.body || {};
    const ownerId = (req as AuthRequest).user?.userId;
    if (!key) {
      res.status(400).json({ error: KEY_REQUIRED_ERROR });
      return;
    }

    if (!isValidAppKey(key)) {
      res.status(400).json({ error: KEY_VALIDATION_ERROR });
      return;
    }

    const trimmedName = typeof name === 'string' ? name.trim() : '';
    if (!trimmedName) {
      res.status(400).json({ error: NAME_REQUIRED_ERROR });
      return;
    }

    if (trimmedName.length > APPLICATION_NAME_MAX_LENGTH) {
      res.status(400).json({ error: NAME_LENGTH_ERROR });
      return;
    }

    const trimmedVersion = typeof version === 'string' ? version.trim() : '';
    if (!trimmedVersion) {
      res.status(400).json({ error: VERSION_REQUIRED_ERROR });
      return;
    }

    if (trimmedVersion.length > APPLICATION_VERSION_MAX_LENGTH) {
      res.status(400).json({ error: VERSION_LENGTH_ERROR });
      return;
    }

    if (!APPLICATION_VERSION_REGEX.test(trimmedVersion)) {
      res.status(400).json({ error: VERSION_FORMAT_ERROR });
      return;
    }

    const normalizedType = typeof type === 'string' ? type.trim().toLowerCase() : '';
    if (!normalizedType) {
      res.status(400).json({ error: TYPE_REQUIRED_ERROR });
      return;
    }

    if (!isValidAppType(normalizedType)) {
      res.status(400).json({ error: TYPE_INVALID_ERROR });
      return;
    }

    const trimmedDescription = typeof description === 'string' ? description.trim() : undefined;
    if (
      typeof trimmedDescription === 'string' &&
      trimmedDescription.length > APPLICATION_DESCRIPTION_MAX_LENGTH
    ) {
      res.status(400).json({ error: DESCRIPTION_LENGTH_ERROR });
      return;
    }

    const application = await createCatalogApplication({
      key,
      name: trimmedName,
      version: trimmedVersion,
      type: normalizedType,
      description: trimmedDescription,
      ownerId,
    });
    res.status(201).json({ success: true, data: { application } });
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to create application', details: (error as Error).message });
  }
};

export const getInstalledApplicationsHandler: RequestHandler = async (req, res) => {
  try {
    const userId = (req as AuthRequest).user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const applications = await getInstalledApplications(userId);
    res.json({ success: true, data: { applications } });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch installed applications', details: String(error) });
  }
};

export const installApplicationHandler: RequestHandler = async (req, res) => {
  try {
    const userId = (req as AuthRequest).user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { appKey } = req.body || {};
    if (!appKey) {
      res.status(400).json({ error: KEY_REQUIRED_ERROR });
      return;
    }

    if (!isValidAppKey(appKey)) {
      res.status(400).json({ error: KEY_VALIDATION_ERROR });
      return;
    }

    const application = await installApplicationForUser(userId, appKey);
    res.json({ success: true, data: { application } });
  } catch (error) {
    res.status(400).json({ error: 'Failed to install application', details: String(error) });
  }
};

export const uninstallApplicationHandler: RequestHandler = async (req, res) => {
  try {
    const userId = (req as AuthRequest).user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { appKey } = req.params as { appKey?: string };
    if (!appKey) {
      res.status(400).json({ error: KEY_REQUIRED_ERROR });
      return;
    }

    if (!isValidAppKey(appKey)) {
      res.status(400).json({ error: KEY_VALIDATION_ERROR });
      return;
    }

    await uninstallApplicationForUser(userId, appKey);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Failed to uninstall application', details: String(error) });
  }
};

export const getApplicationStorageUsageHandler: RequestHandler = async (req, res) => {
  try {
    const userId = (req as AuthRequest).user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const storage = await getUserStorageUsage(userId);
    res.json({ success: true, data: { storage } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load storage usage', details: String(error) });
  }
};

export const importApplicationArchiveHandler: RequestHandler = async (req, res) => {
  const file = (req as MulterRequest).file;
  if (!file) {
    res.status(400).json({ error: 'Archive file is required' });
    return;
  }

  const { appKey } = (req.body as { appKey?: string }) ?? {};
  if (!appKey) {
    await fs.unlink(file.path).catch(() => undefined);
    res.status(400).json({ error: KEY_REQUIRED_ERROR });
    return;
  }

  if (!isValidAppKey(appKey)) {
    await fs.unlink(file.path).catch(() => undefined);
    res.status(400).json({ error: KEY_VALIDATION_ERROR });
    return;
  }

  try {
    const available = await isApplicationKeyAvailable(appKey);
    if (!available) {
      await fs.unlink(file.path).catch(() => undefined);
      res.status(409).json({ error: 'Application ID is already taken' });
      return;
    }
  } catch (error) {
    await fs.unlink(file.path).catch(() => undefined);
    res.status(400).json({ error: (error as Error).message });
    return;
  }

  const authUserId = (req as AuthRequest).user?.userId ?? null;
  const storageOwner = authUserId ?? 'guest';
  let preparedVersionDir: string | null = null;
  let archiveFinalPath: string | null = null;

  try {
    const storage = await getUserStorageUsage(storageOwner);

    if (storage.usedBytes > APPLICATION_STORAGE_LIMIT_BYTES) {
      await fs.unlink(file.path).catch(() => undefined);
      res.status(400).json({ error: 'Storage limit exceeded while importing application' });
      return;
    }

    const { zip, data } = parsePackageJsonFromArchive(file.path);
    const { manifest } = buildManifestFromPackageJson(data);

    const normalizedKey = sanitizeAppKey(appKey);
    preparedVersionDir = await resetApplicationVersionDir(
      storageOwner,
      normalizedKey,
      manifest.version
    );
    archiveFinalPath = await moveFileToDirectory(file.path, preparedVersionDir, file.filename);
    const packageDir = path.join(preparedVersionDir, 'package');
    await fs.mkdir(packageDir, { recursive: true });
    zip.extractAllTo(packageDir, true);
    const manifestFilePath = path.join(preparedVersionDir, 'manifest.json');
    await fs.writeFile(manifestFilePath, JSON.stringify(manifest, null, 2), 'utf-8');

    const application = await createCatalogApplication({
      key: normalizedKey,
      name: manifest.name,
      version: manifest.version,
      type: manifest.type,
      description: manifest.description,
      ownerId: authUserId ?? undefined,
      entryPoints: manifest.entryPoints,
      permissions: manifest.permissions,
      storage: {
        rootDir: relativeStoragePath(preparedVersionDir),
        archivePath: relativeStoragePath(archiveFinalPath),
        contentPath: relativeStoragePath(packageDir),
        manifestPath: relativeStoragePath(manifestFilePath),
      },
      manifest,
    });

    if (authUserId) {
      await installApplicationForUser(authUserId, application.key);
    }

    const updatedStorage = await getUserStorageUsage(storageOwner);

    res.status(201).json({
      success: true,
      data: {
        application,
        storage: updatedStorage,
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
      },
    });
  } catch (error) {
    if (preparedVersionDir) {
      await fs.rm(preparedVersionDir, { recursive: true, force: true }).catch(() => undefined);
    } else {
      await fs.unlink(file.path).catch(() => undefined);
    }
    res
      .status(400)
      .json({ error: (error as Error).message || 'Failed to import application archive' });
  }
};

export const updateApplicationStatusHandler: RequestHandler = async (req, res) => {
  try {
    const userId = (req as AuthRequest).user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { appKey } = req.params as { appKey?: string };
    const { status } = req.body || {};

    if (!appKey || !isValidAppKey(appKey)) {
      res.status(400).json({ error: KEY_VALIDATION_ERROR });
      return;
    }
    if (
      typeof status !== 'string' ||
      !APPLICATION_STATUSES.includes(status as (typeof APPLICATION_STATUSES)[number])
    ) {
      res.status(400).json({ error: 'Invalid application status' });
      return;
    }

    const application = await updateApplicationStatus(
      appKey,
      status as (typeof APPLICATION_STATUSES)[number]
    );
    res.json({ success: true, data: { application } });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update application status', details: String(error) });
  }
};

export const createApplicationVersionHandler: RequestHandler = async (req, res) => {
  const userId = (req as AuthRequest).user?.userId;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { appKey } = req.params as { appKey?: string };
  if (!appKey) {
    res.status(400).json({ error: KEY_REQUIRED_ERROR });
    return;
  }

  if (!isValidAppKey(appKey)) {
    res.status(400).json({ error: KEY_VALIDATION_ERROR });
    return;
  }

  const file = (req as MulterRequest).file;
  if (!file) {
    res.status(400).json({ error: 'Archive file is required' });
    return;
  }

  const { releaseType, releaseNotes, name, description, type, icon } = req.body || {};

  if (typeof releaseType !== 'string' || !RELEASE_TYPES.includes(releaseType as ReleaseType)) {
    await fs.unlink(file.path).catch(() => undefined);
    res.status(400).json({ error: 'releaseType must be patch, minor, or major' });
    return;
  }

  const normalizedKey = sanitizeAppKey(appKey);
  let preparedVersionDir: string | null = null;
  let archiveFinalPath: string | null = null;

  try {
    const { zip, data } = parsePackageJsonFromArchive(file.path);
    const { manifest } = buildManifestFromPackageJson(data);

    preparedVersionDir = await resetApplicationVersionDir(userId, normalizedKey, manifest.version);
    archiveFinalPath = await moveFileToDirectory(file.path, preparedVersionDir, file.filename);
    const packageDir = path.join(preparedVersionDir, 'package');
    await fs.mkdir(packageDir, { recursive: true });
    zip.extractAllTo(packageDir, true);
    const manifestFilePath = path.join(preparedVersionDir, 'manifest.json');
    await fs.writeFile(manifestFilePath, JSON.stringify(manifest, null, 2), 'utf-8');

    const application = await createApplicationVersion({
      key: normalizedKey,
      ownerId: userId,
      releaseType: releaseType as ReleaseType,
      releaseNotes: typeof releaseNotes === 'string' ? releaseNotes.trim() : undefined,
      name: typeof name === 'string' ? name : undefined,
      description: typeof description === 'string' ? description : undefined,
      type: typeof type === 'string' ? type : undefined,
      entryPoints: manifest.entryPoints,
      permissions: manifest.permissions,
      storage: {
        rootDir: relativeStoragePath(preparedVersionDir),
        archivePath: relativeStoragePath(archiveFinalPath),
        contentPath: relativeStoragePath(packageDir),
        manifestPath: relativeStoragePath(manifestFilePath),
      },
      manifest,
      icon: typeof icon === 'string' ? icon : undefined,
    });

    res.status(201).json({ success: true, data: { application } });
  } catch (error) {
    if (preparedVersionDir) {
      await fs.rm(preparedVersionDir, { recursive: true, force: true }).catch(() => undefined);
    } else {
      await fs.unlink(file.path).catch(() => undefined);
    }
    res
      .status(400)
      .json({ error: (error as Error).message || 'Failed to create a new application version' });
  }
};

export const checkApplicationKeyAvailabilityHandler: RequestHandler = async (req, res) => {
  try {
    const { appKey } = req.params as { appKey?: string };
    if (!appKey) {
      res.status(400).json({ error: KEY_REQUIRED_ERROR });
      return;
    }
    const available = await isApplicationKeyAvailable(appKey);
    res.json({ success: true, data: { available } });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
