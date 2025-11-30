import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { ApplicationStorageUsage, ApplicationSummary } from '../../utils/api';
import {
  loadApplicationsCatalog,
  loadApplicationsStorage,
  loadInstalledApplications,
} from '../thunks/applicationsThunks';

type ListState<T> = {
  items: T[];
  loading: boolean;
  error: string | null;
};

type StorageState = {
  value: ApplicationStorageUsage | null;
  loading: boolean;
  error: string | null;
};

export type ApplicationsState = {
  catalog: ListState<ApplicationSummary>;
  installed: ListState<ApplicationSummary>;
  storage: StorageState;
};

const createListState = <T>(items: T[] = []): ListState<T> => ({
  items,
  loading: false,
  error: null,
});

const initialState: ApplicationsState = {
  catalog: createListState<ApplicationSummary>(),
  installed: createListState<ApplicationSummary>(),
  storage: {
    value: null,
    loading: false,
    error: null,
  },
};

const applicationsSlice = createSlice({
  name: 'applicationsData',
  initialState,
  reducers: {
    clearApplicationsErrors(state) {
      state.catalog.error = null;
      state.installed.error = null;
      state.storage.error = null;
    },
    resetInstalledApplications(state) {
      state.installed.items = [];
      state.installed.loading = false;
      state.installed.error = null;
    },
    resetStorageUsage(state) {
      state.storage.value = null;
      state.storage.loading = false;
      state.storage.error = null;
    },
    setStorageSnapshot(state, action: PayloadAction<ApplicationStorageUsage>) {
      state.storage.value = action.payload;
      state.storage.loading = false;
      state.storage.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadApplicationsCatalog.pending, (state) => {
        state.catalog.loading = true;
        state.catalog.error = null;
      })
      .addCase(loadApplicationsCatalog.fulfilled, (state, action) => {
        state.catalog.loading = false;
        state.catalog.items = action.payload;
      })
      .addCase(loadApplicationsCatalog.rejected, (state, action) => {
        state.catalog.loading = false;
        state.catalog.error = (action.payload as string) ?? 'Failed to load catalog';
      })
      .addCase(loadInstalledApplications.pending, (state) => {
        state.installed.loading = true;
        state.installed.error = null;
      })
      .addCase(loadInstalledApplications.fulfilled, (state, action) => {
        state.installed.loading = false;
        state.installed.items = action.payload;
      })
      .addCase(loadInstalledApplications.rejected, (state, action) => {
        state.installed.loading = false;
        state.installed.error =
          (action.payload as string) ?? 'Failed to load installed applications';
      })
      .addCase(loadApplicationsStorage.pending, (state) => {
        state.storage.loading = true;
        state.storage.error = null;
      })
      .addCase(loadApplicationsStorage.fulfilled, (state, action) => {
        state.storage.loading = false;
        state.storage.value = action.payload;
      })
      .addCase(loadApplicationsStorage.rejected, (state, action) => {
        state.storage.loading = false;
        state.storage.error = (action.payload as string) ?? 'Failed to load storage usage';
      });
  },
});

export const {
  clearApplicationsErrors,
  resetInstalledApplications,
  resetStorageUsage,
  setStorageSnapshot,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;
