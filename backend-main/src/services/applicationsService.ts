import { Types } from 'mongoose';

import {
  Application,
  ApplicationEntryPoints,
  ApplicationStatus,
  ApplicationStorageMeta,
  ApplicationType,
  ApplicationVersionHistoryEntry,
  IApplication,
} from '../models/Application';
import { UserApplication } from '../models/UserApplication';

const APP_KEY_REGEX = /^[a-z0-9-]+$/;
export const APPLICATION_VERSION_REGEX = /^\d+\.\d+\.\d+$/;

export const APPLICATION_KEY_MAX_LENGTH = 100;
export const APPLICATION_NAME_MAX_LENGTH = 100;
export const APPLICATION_DESCRIPTION_MAX_LENGTH = 200;
export const APPLICATION_VERSION_MAX_LENGTH = 32;
export const APPLICATION_TYPES: ApplicationType[] = ['widget', 'screen', 'service'];
export const APPLICATION_STATUSES: ApplicationStatus[] = [
  'draft',
  'pending',
  'published',
  'rejected',
];
export type ReleaseType = 'patch' | 'minor' | 'major';
export const RELEASE_TYPES: ReleaseType[] = ['patch', 'minor', 'major'];

const normalizeKey = (key: string): string => key.trim().toLowerCase();

const assertValidKey = (key: string): string => {
  const normalized = normalizeKey(typeof key === 'string' ? key : '');

  if (!normalized) {
    throw new Error('Application ID is required');
  }

  if (normalized.length > APPLICATION_KEY_MAX_LENGTH) {
    throw new Error(`Application ID must not exceed ${APPLICATION_KEY_MAX_LENGTH} characters`);
  }

  if (!APP_KEY_REGEX.test(normalized)) {
    throw new Error('Application ID can contain English letters, digits, and hyphen');
  }

  return normalized;
};

const assertValidName = (name: string): string => {
  const trimmed = typeof name === 'string' ? name.trim() : '';
  if (!trimmed) {
    throw new Error('Application name is required');
  }
  if (trimmed.length > APPLICATION_NAME_MAX_LENGTH) {
    throw new Error(`Application name must not exceed ${APPLICATION_NAME_MAX_LENGTH} characters`);
  }
  return trimmed;
};

const assertValidVersion = (version: string): string => {
  const trimmed = typeof version === 'string' ? version.trim() : '';
  if (!trimmed) {
    throw new Error('Application version is required');
  }
  if (trimmed.length > APPLICATION_VERSION_MAX_LENGTH) {
    throw new Error(
      `Application version must not exceed ${APPLICATION_VERSION_MAX_LENGTH} characters`
    );
  }
  if (!APPLICATION_VERSION_REGEX.test(trimmed)) {
    throw new Error('Application version must follow the 1.0.0 format');
  }
  return trimmed;
};

const assertValidType = (type: string): ApplicationType => {
  const normalized = typeof type === 'string' ? type.trim().toLowerCase() : '';
  if (!normalized) {
    throw new Error('Application type is required');
  }
  if (!APPLICATION_TYPES.includes(normalized as ApplicationType)) {
    throw new Error('Application type must be widget, screen, or service');
  }
  return normalized as ApplicationType;
};

const normalizeDescription = (description?: string): string | undefined => {
  if (typeof description !== 'string') {
    return undefined;
  }
  const trimmed = description.trim();
  if (!trimmed) {
    return undefined;
  }
  if (trimmed.length > APPLICATION_DESCRIPTION_MAX_LENGTH) {
    throw new Error(
      `Application description must not exceed ${APPLICATION_DESCRIPTION_MAX_LENGTH} characters`
    );
  }
  return trimmed;
};

const normalizeEntryPoints = (
  entryPoints?: ApplicationEntryPoints
): ApplicationEntryPoints | undefined => {
  if (!entryPoints) {
    return undefined;
  }
  const frontend =
    typeof entryPoints.frontend === 'string' ? entryPoints.frontend.trim() : undefined;
  const backend = typeof entryPoints.backend === 'string' ? entryPoints.backend.trim() : undefined;
  if (!frontend && !backend) {
    return undefined;
  }
  return {
    ...(frontend ? { frontend } : {}),
    ...(backend ? { backend } : {}),
  };
};

const normalizePermissions = (permissions?: string[]): string[] => {
  if (!Array.isArray(permissions)) {
    return [];
  }
  return permissions
    .map((permission) => (typeof permission === 'string' ? permission.trim() : ''))
    .filter((permission) => permission.length > 0);
};

const normalizeIcon = (icon?: string): string | undefined => {
  if (typeof icon !== 'string') {
    return undefined;
  }
  const trimmed = icon.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const assertReleaseType = (releaseType: string): ReleaseType => {
  if (!RELEASE_TYPES.includes(releaseType as ReleaseType)) {
    throw new Error('Invalid release type. Use patch, minor, or major.');
  }
  return releaseType as ReleaseType;
};

const bumpVersion = (currentVersion: string, releaseType: ReleaseType): string => {
  const [majorStr, minorStr, patchStr] = currentVersion.split('.');
  let major = Number(majorStr);
  let minor = Number(minorStr);
  let patch = Number(patchStr);
  if (Number.isNaN(major) || Number.isNaN(minor) || Number.isNaN(patch)) {
    throw new Error('Current version is invalid');
  }
  if (releaseType === 'patch') {
    patch += 1;
  } else if (releaseType === 'minor') {
    minor += 1;
    patch = 0;
  } else if (releaseType === 'major') {
    major += 1;
    minor = 0;
    patch = 0;
  }
  return `${major}.${minor}.${patch}`;
};

export interface ApplicationVersionHistoryDTO {
  version: string;
  status: ApplicationStatus;
  releaseNotes?: string;
  description?: string;
  createdAt?: string;
}

export interface ApplicationDTO {
  id: string;
  key: string;
  name: string;
  version: string;
  type: ApplicationType;
  description?: string;
  status: ApplicationStatus;
  isPublished: boolean;
  owner?: string;
  entryPoints?: ApplicationEntryPoints;
  permissions: string[];
  storage?: ApplicationStorageMeta;
  icon?: string;
  versionHistory?: ApplicationVersionHistoryDTO[];
}

const mapVersionHistoryToDTO = (
  history: ApplicationVersionHistoryEntry[]
): ApplicationVersionHistoryDTO[] => {
  return history.map((entry) => ({
    version: entry.version,
    status: entry.status,
    releaseNotes: entry.releaseNotes,
    description: entry.description,
    createdAt: entry.createdAt ? entry.createdAt.toISOString() : undefined,
  }));
};

const mapApplicationToDTO = (
  application: IApplication,
  options?: { includeHistory?: boolean }
): ApplicationDTO => ({
  id: application._id.toString(),
  key: application.key,
  name: application.name,
  version: application.version,
  type: application.type,
  description: application.description ?? '',
  status: application.status,
  isPublished: application.isPublished,
  owner: application.owner ? application.owner.toString() : undefined,
  entryPoints: application.entryPoints,
  permissions: application.permissions ?? [],
  storage: application.storage,
  icon: application.icon,
  versionHistory: options?.includeHistory
    ? mapVersionHistoryToDTO(application.versionHistory ?? [])
    : undefined,
});

export interface CreateApplicationOptions {
  key: string;
  name: string;
  version: string;
  type: string;
  description?: string;
  ownerId?: string;
  status?: ApplicationStatus;
  entryPoints?: ApplicationEntryPoints;
  permissions?: string[];
  storage?: ApplicationStorageMeta;
  manifest?: Record<string, unknown>;
  icon?: string;
  releaseNotes?: string;
}

export interface CreateApplicationVersionOptions {
  key: string;
  ownerId: string;
  releaseType: ReleaseType;
  releaseNotes?: string;
  name?: string;
  description?: string;
  type?: string;
  entryPoints?: ApplicationEntryPoints;
  permissions?: string[];
  storage?: ApplicationStorageMeta;
  manifest?: Record<string, unknown>;
  icon?: string;
}

export const getCatalogApplications = async (): Promise<ApplicationDTO[]> => {
  const applications = await Application.find({
    status: 'published',
  })
    .sort({ name: 1 })
    .exec();
  return applications.map((application) => mapApplicationToDTO(application));
};

export const createCatalogApplication = async (
  options: CreateApplicationOptions
): Promise<ApplicationDTO> => {
  const {
    key,
    name,
    version,
    type,
    description,
    ownerId,
    status,
    entryPoints,
    permissions,
    storage,
    manifest,
    icon,
    releaseNotes,
  } = options;
  const normalizedKey = assertValidKey(key);
  const existing = await Application.findOne({ key: normalizedKey }).exec();

  if (existing) {
    throw new Error('Application key already exists');
  }

  const normalizedName = assertValidName(name);
  const normalizedVersion = assertValidVersion(version);
  const normalizedType = assertValidType(type);
  const normalizedDescription = normalizeDescription(description);
  const normalizedEntryPoints = normalizeEntryPoints(entryPoints);
  const normalizedPermissions = normalizePermissions(permissions);
  const normalizedStatus = status ?? 'draft';

  const application = await Application.create({
    key: normalizedKey,
    name: normalizedName,
    version: normalizedVersion,
    type: normalizedType,
    description: normalizedDescription,
    owner: ownerId ?? undefined,
    status: normalizedStatus,
    isPublished: normalizedStatus === 'published',
    entryPoints: normalizedEntryPoints,
    permissions: normalizedPermissions,
    storage,
    manifest,
    icon: normalizeIcon(icon),
    versionHistory: [
      {
        version: normalizedVersion,
        status: normalizedStatus,
        description: normalizedDescription,
        releaseNotes,
        entryPoints: normalizedEntryPoints,
        permissions: normalizedPermissions,
        storage,
        manifest,
      },
    ],
  });

  return mapApplicationToDTO(application);
};

const assertValidStatus = (status: string): ApplicationStatus => {
  if (!APPLICATION_STATUSES.includes(status as ApplicationStatus)) {
    throw new Error(`Invalid application status: ${status}`);
  }
  return status as ApplicationStatus;
};

const getApplicationByKeyOrThrow = async (key: string): Promise<IApplication> => {
  const application = await Application.findOne({ key: assertValidKey(key) }).exec();
  if (!application) {
    throw new Error('Application not found');
  }
  return application;
};

const ensureApplicationOwner = (application: IApplication, userId: string): void => {
  if (!application.owner || application.owner.toString() !== userId) {
    throw new Error('You are not allowed to modify this application');
  }
};

export const getApplicationDetails = async (key: string): Promise<ApplicationDTO> => {
  const application = await getApplicationByKeyOrThrow(key);
  return mapApplicationToDTO(application, { includeHistory: true });
};

export const updateApplicationStatus = async (
  key: string,
  status: ApplicationStatus
): Promise<ApplicationDTO> => {
  const normalizedKey = assertValidKey(key);
  const normalizedStatus = assertValidStatus(status);
  const application = await Application.findOneAndUpdate(
    { key: normalizedKey },
    { status: normalizedStatus, isPublished: normalizedStatus === 'published' },
    { new: true }
  ).exec();

  if (!application) {
    throw new Error('Application not found');
  }

  return mapApplicationToDTO(application);
};

export const createApplicationVersion = async (
  options: CreateApplicationVersionOptions
): Promise<ApplicationDTO> => {
  const {
    key,
    ownerId,
    releaseType,
    releaseNotes,
    name,
    description,
    type,
    entryPoints,
    permissions,
    storage,
    manifest,
    icon,
  } = options;

  const application = await getApplicationByKeyOrThrow(key);
  ensureApplicationOwner(application, ownerId);

  const normalizedReleaseType = assertReleaseType(releaseType);
  const nextVersion = bumpVersion(application.version, normalizedReleaseType);

  const nextName = name ? assertValidName(name) : application.name;
  const nextDescription = description ? normalizeDescription(description) : application.description;
  const nextType = type ? assertValidType(type) : application.type;
  const nextEntryPoints = entryPoints ? normalizeEntryPoints(entryPoints) : application.entryPoints;
  const nextPermissions = permissions ? normalizePermissions(permissions) : application.permissions;
  const nextStorage = storage ?? application.storage;
  const nextManifest = manifest ?? application.manifest;
  const nextIcon = icon ? (normalizeIcon(icon) ?? application.icon) : application.icon;

  application.name = nextName;
  application.description = nextDescription;
  application.type = nextType;
  application.version = nextVersion;
  application.entryPoints = nextEntryPoints;
  application.permissions = nextPermissions ?? [];
  application.storage = nextStorage;
  application.manifest = nextManifest;
  application.icon = nextIcon;
  application.status = 'draft';
  application.isPublished = false;

  application.versionHistory = application.versionHistory ?? [];
  application.versionHistory.push({
    version: nextVersion,
    status: 'draft',
    releaseNotes,
    description: nextDescription,
    entryPoints: nextEntryPoints,
    permissions: nextPermissions ?? [],
    storage: nextStorage,
    manifest: nextManifest,
  });

  await application.save();
  return mapApplicationToDTO(application, { includeHistory: true });
};

export const getInstalledApplications = async (userId: string): Promise<ApplicationDTO[]> => {
  const entries = await UserApplication.find({ user: new Types.ObjectId(userId) })
    .populate<{ application: IApplication | null }>('application')
    .exec();

  return entries
    .filter((entry) => entry.application)
    .map((entry) => mapApplicationToDTO(entry.application as IApplication));
};

export const installApplicationForUser = async (
  userId: string,
  appKey: string
): Promise<ApplicationDTO> => {
  const normalizedKey = assertValidKey(appKey);
  const application = await Application.findOne({ key: normalizedKey }).exec();
  if (!application) {
    throw new Error('Application not found');
  }

  await UserApplication.findOneAndUpdate(
    { user: userId, application: application._id },
    { user: userId, application: application._id },
    { upsert: true, new: true }
  ).exec();

  return mapApplicationToDTO(application);
};

export const isApplicationKeyAvailable = async (appKey: string): Promise<boolean> => {
  const normalizedKey = assertValidKey(appKey);
  const existing = await Application.exists({ key: normalizedKey });
  return !existing;
};

export const uninstallApplicationForUser = async (
  userId: string,
  appKey: string
): Promise<void> => {
  const normalizedKey = assertValidKey(appKey);
  const application = await Application.findOne({ key: normalizedKey }).exec();
  if (!application) {
    throw new Error('Application not found');
  }

  await UserApplication.findOneAndDelete({
    user: new Types.ObjectId(userId),
    application: application._id,
  }).exec();
};
