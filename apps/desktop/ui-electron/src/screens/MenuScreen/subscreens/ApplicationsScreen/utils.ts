import { ReleaseType } from '../../../../utils/api';

import { APP_VERSION_MAX_LENGTH } from './constants';
import {
  CreateApplicationFormValues,
  EditApplicationFormValues,
  ImportApplicationFormValues,
} from './types';

export const formatVersionInput = (value: string): string => {
  const cleaned = value.replace(/[^\d.]/g, '');
  const segments: string[] = [];
  let current = '';

  for (const char of cleaned) {
    if (char === '.') {
      if (!current || segments.length >= 2) {
        continue;
      }
      segments.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  if (current) {
    segments.push(current);
  }

  return segments.join('.').slice(0, APP_VERSION_MAX_LENGTH);
};

export const computeNextVersion = (currentVersion: string, releaseType: ReleaseType): string => {
  const parts = currentVersion.split('.').map((part) => Number(part));
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    return currentVersion;
  }
  let [major, minor, patch] = parts;
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

export const formatHistoryDate = (value?: string): string => {
  if (!value) {
    return '';
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleString();
};

export const formatMegabytes = (bytes: number): string => {
  if (!bytes) {
    return '0 MB';
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const areCreateFormValuesEqual = (
  a?: CreateApplicationFormValues,
  b?: CreateApplicationFormValues
): boolean =>
  Boolean(
    a &&
    b &&
    a.key === b.key &&
    a.name === b.name &&
    a.version === b.version &&
    a.type === b.type &&
    a.description === b.description
  );

export const areImportFormValuesEqual = (
  a?: ImportApplicationFormValues,
  b?: ImportApplicationFormValues
): boolean => Boolean(a && b && a.key === b.key);

export const areEditFormValuesEqual = (
  a?: EditApplicationFormValues,
  b?: EditApplicationFormValues
): boolean =>
  Boolean(
    a &&
    b &&
    a.name === b.name &&
    a.description === b.description &&
    a.type === b.type &&
    a.releaseType === b.releaseType &&
    a.releaseNotes === b.releaseNotes
  );

export const extractErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Unknown error';
};
