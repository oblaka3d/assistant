import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import {
  resetInstalledApplications,
  resetStorageUsage,
} from '../../../../../store/slices/applicationsSlice';
import {
  loadApplicationsCatalog,
  loadApplicationsStorage,
  loadInstalledApplications,
} from '../../../../../store/thunks';

export const useApplicationsData = (activeTab: 'store' | 'installed') => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const catalogState = useAppSelector((state) => state.applications.catalog);
  const installedState = useAppSelector((state) => state.applications.installed);
  const storageState = useAppSelector((state) => state.applications.storage);

  useEffect(() => {
    void dispatch(loadApplicationsCatalog());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      void dispatch(loadInstalledApplications());
      return;
    }
    dispatch(resetInstalledApplications());
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(resetStorageUsage());
      return;
    }
    if (activeTab === 'installed') {
      void dispatch(loadApplicationsStorage());
    }
  }, [dispatch, isAuthenticated, activeTab]);

  const refreshApplicationsData = useCallback(async () => {
    await Promise.all([
      dispatch(loadApplicationsCatalog()).unwrap(),
      dispatch(loadInstalledApplications()).unwrap(),
    ]);
  }, [dispatch]);

  return {
    isAuthenticated,
    catalogState,
    installedState,
    storageState,
    refreshApplicationsData,
  };
};
