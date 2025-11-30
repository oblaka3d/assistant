import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  CreateApplicationFormValues,
  EditApplicationFormValues,
  ImportApplicationFormValues,
} from '../../screens/MenuScreen/subscreens/ApplicationsScreen/types';
import {
  ApplicationStatus,
  ApplicationStorageUsage,
  ApplicationSummary,
  createCatalogApplication,
  fetchApplicationStorageUsage,
  fetchApplicationsCatalog,
  fetchInstalledApplications,
  importApplicationArchive,
  installApplication,
  uninstallApplication,
  updateApplicationStatus,
  updateApplicationVersion,
} from '../../utils/api';
import type { RootState } from '../index';

export const submitCreateApplication = createAsyncThunk<
  { key: string; name: string },
  CreateApplicationFormValues,
  { rejectValue: string }
>('applicationsForms/submitCreateApplication', async (values, { rejectWithValue }) => {
  try {
    const normalizedKey = values.key.trim().toLowerCase();
    const trimmedName = values.name.trim();
    const trimmedDescription = values.description.trim();
    const trimmedVersion = values.version.trim();

    await createCatalogApplication({
      key: normalizedKey,
      name: trimmedName,
      version: trimmedVersion,
      type: values.type,
      description: trimmedDescription.length > 0 ? trimmedDescription : undefined,
    });
    await installApplication(normalizedKey);
    return { key: normalizedKey, name: trimmedName };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const submitImportApplication = createAsyncThunk<
  { key: string; storage?: ApplicationStorageUsage },
  { values: ImportApplicationFormValues; file: File },
  { rejectValue: string }
>('applicationsForms/submitImportApplication', async ({ values, file }, { rejectWithValue }) => {
  try {
    const normalizedKey = values.key.trim().toLowerCase();
    const response = await importApplicationArchive(normalizedKey, file);
    return { key: normalizedKey, storage: response?.storage };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const submitEditApplication = createAsyncThunk<
  void,
  {
    appKey: string;
    values: EditApplicationFormValues;
    archive: File;
    iconDataUrl?: string | null;
  },
  { rejectValue: string }
>(
  'applicationsForms/submitEditApplication',
  async ({ appKey, values, archive, iconDataUrl }, { rejectWithValue }) => {
    try {
      await updateApplicationVersion(appKey, {
        releaseType: values.releaseType,
        releaseNotes: values.releaseNotes.trim() || undefined,
        name: values.name.trim(),
        description: values.description,
        type: values.type,
        iconDataUrl: iconDataUrl ?? undefined,
        archive,
      });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const loadApplicationsCatalog = createAsyncThunk<
  ApplicationSummary[],
  void,
  { rejectValue: string }
>('applications/data/loadCatalog', async (_, { rejectWithValue }) => {
  try {
    return await fetchApplicationsCatalog();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const loadInstalledApplications = createAsyncThunk<
  ApplicationSummary[],
  void,
  { state: RootState; rejectValue: string }
>('applications/data/loadInstalled', async (_, { getState, rejectWithValue }) => {
  const isAuthenticated = getState().user.isAuthenticated;
  if (!isAuthenticated) {
    return [];
  }
  try {
    return await fetchInstalledApplications();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const loadApplicationsStorage = createAsyncThunk<
  ApplicationStorageUsage | null,
  void,
  { state: RootState; rejectValue: string }
>('applications/data/loadStorage', async (_, { getState, rejectWithValue }) => {
  const isAuthenticated = getState().user.isAuthenticated;
  if (!isAuthenticated) {
    return null;
  }
  try {
    return await fetchApplicationStorageUsage();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const installExistingApplication = createAsyncThunk<void, string, { rejectValue: string }>(
  'applications/data/install',
  async (appKey, { rejectWithValue }) => {
    try {
      await installApplication(appKey);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const uninstallExistingApplication = createAsyncThunk<void, string, { rejectValue: string }>(
  'applications/data/uninstall',
  async (appKey, { rejectWithValue }) => {
    try {
      await uninstallApplication(appKey);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateApplicationStatusThunk = createAsyncThunk<
  void,
  { key: string; status: ApplicationStatus },
  { rejectValue: string }
>('applications/data/updateStatus', async ({ key, status }, { rejectWithValue }) => {
  try {
    await updateApplicationStatus(key, status);
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
