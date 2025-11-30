import * as fs from 'node:fs';
import * as fsp from 'node:fs/promises';
import path from 'node:path';

export interface ApplicationStorageUsage {
  usedBytes: number;
  limitBytes: number;
  availableBytes: number;
}

export const APPLICATION_STORAGE_LIMIT_BYTES = 100 * 1024 * 1024; // 100 MB

export const STORAGE_ROOT = path.resolve(process.cwd(), 'storage', 'applications');
const ALLOWED_EXTENSIONS = ['.zip'];

const ensureDirSync = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const sanitizeSegment = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9._-]/g, '-');
};

export const resolveUserStorageDirSync = (userId: string): string => {
  ensureDirSync(STORAGE_ROOT);
  const safeUserId = sanitizeSegment(userId || 'guest');
  const dir = path.join(STORAGE_ROOT, safeUserId);
  ensureDirSync(dir);
  return dir;
};

const buildApplicationDir = (userId: string, appKey: string): string => {
  const base = resolveUserStorageDirSync(userId);
  return path.join(base, sanitizeSegment(appKey));
};

const buildVersionDir = (userId: string, appKey: string, version: string): string => {
  return path.join(buildApplicationDir(userId, appKey), sanitizeSegment(version));
};

export const resetApplicationVersionDir = async (
  userId: string,
  appKey: string,
  version: string
): Promise<string> => {
  const dir = buildVersionDir(userId, appKey, version);
  await fsp.rm(dir, { recursive: true, force: true });
  await fsp.mkdir(dir, { recursive: true });
  return dir;
};

export const relativeStoragePath = (absolutePath: string): string => {
  return path.relative(STORAGE_ROOT, absolutePath);
};

export const absoluteStoragePath = (relativePath: string): string => {
  return path.join(STORAGE_ROOT, relativePath);
};

export const moveFileToDirectory = async (
  sourcePath: string,
  destinationDir: string,
  targetFilename?: string
): Promise<string> => {
  await fsp.mkdir(destinationDir, { recursive: true });
  const filename = targetFilename ?? path.basename(sourcePath);
  const destinationPath = path.join(destinationDir, filename);
  await fsp.rename(sourcePath, destinationPath);
  return destinationPath;
};

const calculateDirectorySize = async (dir: string): Promise<number> => {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  let total = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      total += await calculateDirectorySize(fullPath);
    } else if (entry.isFile()) {
      const stats = await fsp.stat(fullPath);
      total += stats.size;
    }
  }

  return total;
};

export const getUserStorageUsage = async (userId: string): Promise<ApplicationStorageUsage> => {
  const dir = resolveUserStorageDirSync(userId);
  const usedBytes = await calculateDirectorySize(dir);
  return {
    usedBytes,
    limitBytes: APPLICATION_STORAGE_LIMIT_BYTES,
    availableBytes: Math.max(APPLICATION_STORAGE_LIMIT_BYTES - usedBytes, 0),
  };
};

export const sanitizeArchiveName = (originalName: string): string => {
  const baseName = originalName.trim().replace(/[^\w.-]+/g, '-');
  return baseName.length > 0 ? baseName.toLowerCase() : 'archive.zip';
};

export const buildArchiveFilename = (originalName: string): string => {
  const sanitized = sanitizeArchiveName(originalName);
  return `${Date.now()}-${sanitized}`;
};

export const isAllowedArchive = (filename: string): boolean => {
  const ext = path.extname(filename).toLowerCase();
  return ALLOWED_EXTENSIONS.includes(ext);
};
