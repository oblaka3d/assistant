import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import SearchIcon from '@mui/icons-material/Search';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../../../components/ScreenHeader';
import ScrollableContent from '../../../../components/ScrollableContent';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  resetCreateForm,
  resetEditForm,
  resetImportForm,
  setCreateFormError,
  setCreateFormValues,
  setEditFormError,
  setEditFormValues,
  setImportFormError,
  setImportFormValues,
} from '../../../../store/slices/applicationsFormsSlice';
import {
  clearApplicationsErrors,
  setStorageSnapshot,
} from '../../../../store/slices/applicationsSlice';
import {
  installExistingApplication,
  loadApplicationsStorage,
  loadInstalledApplications,
  submitCreateApplication,
  submitEditApplication,
  submitImportApplication,
  uninstallExistingApplication,
  updateApplicationStatusThunk,
} from '../../../../store/thunks';
import {
  ApplicationDetails,
  ApplicationSummary,
  ApplicationStatus,
  fetchApplicationDetails,
} from '../../../../utils/api';

import styles from './ApplicationsScreen.module.css';
import ApplicationCreateDialog from './components/ApplicationCreateDialog';
import ApplicationEditDialog from './components/ApplicationEditDialog';
import ApplicationImportDialog from './components/ApplicationImportDialog';
import ApplicationList from './components/ApplicationList';
import {
  ACTIVE_TAB_STORAGE_KEY,
  APP_DESCRIPTION_MAX_LENGTH,
  APP_KEY_MAX_LENGTH,
  APP_NAME_MAX_LENGTH,
} from './constants';
import { useApplicationKeyAvailability } from './hooks/useApplicationKeyAvailability';
import { useApplicationListMeta } from './hooks/useApplicationListMeta';
import { useApplicationsData } from './hooks/useApplicationsData';
import { useApplicationsFilters } from './hooks/useApplicationsFilters';
import { useFileDropZone } from './hooks/useFileDropZone';
import {
  CreateApplicationFormValues,
  EditApplicationFormValues,
  ImportApplicationFormValues,
  KeyAvailabilityStatus,
} from './types';
import {
  areCreateFormValuesEqual,
  areEditFormValuesEqual,
  areImportFormValuesEqual,
  computeNextVersion,
  extractErrorMessage,
  formatHistoryDate,
  formatMegabytes,
} from './utils';

type ApplicationsScreenProps = {
  onBack: () => void;
};

const ApplicationsScreen: React.FC<ApplicationsScreenProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.user.currentUser?.id);
  const createForm = useAppSelector((state) => state.applicationsForms.create);
  const importForm = useAppSelector((state) => state.applicationsForms.import);
  const editForm = useAppSelector((state) => state.applicationsForms.edit);
  const createValues = createForm.values;
  const importValues = importForm.values;
  const editValues = editForm.values;
  const [activeTab, setActiveTab] = useState<'store' | 'installed'>(() => {
    if (typeof window === 'undefined') {
      return 'store';
    }
    const stored = window.localStorage.getItem(ACTIVE_TAB_STORAGE_KEY);
    return stored === 'installed' ? 'installed' : 'store';
  });
  const { isAuthenticated, catalogState, installedState, storageState, refreshApplicationsData } =
    useApplicationsData(activeTab);
  const {
    applicationTypeOptions,
    typeLabelMap,
    releaseTypeOptions,
    listActionLabels,
    typeColorMap,
    formatOwnerLabel,
    statusChipConfig,
  } = useApplicationListMeta({ translate: t, currentUserId });
  const catalogApps: ApplicationSummary[] = catalogState.items;
  const installedApps: ApplicationSummary[] = installedState.items;
  const loadingCatalog = catalogState.loading;
  const loadingInstalled = installedState.loading;
  const storageUsage = storageState.value;
  const storageLoading = storageState.loading;
  const storageError = storageState.error;
  const handleCreateValuesChange = useCallback(
    (values: CreateApplicationFormValues) => {
      if (areCreateFormValuesEqual(values, createValues)) {
        return;
      }
      dispatch(setCreateFormValues(values));
    },
    [dispatch, createValues]
  );
  const handleImportValuesChange = useCallback(
    (values: ImportApplicationFormValues) => {
      if (areImportFormValuesEqual(values, importValues)) {
        return;
      }
      dispatch(setImportFormValues(values));
    },
    [dispatch, importValues]
  );
  const handleEditValuesChange = useCallback(
    (values: EditApplicationFormValues) => {
      if (areEditFormValuesEqual(values, editValues)) {
        return;
      }
      dispatch(setEditFormValues(values));
    },
    [dispatch, editValues]
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addingApp, setAddingApp] = useState(false);
  const [pendingAppKey, setPendingAppKey] = useState<string | null>(null);
  const [addMenuAnchor, setAddMenuAnchor] = useState<null | HTMLElement>(null);
  const [importingArchive, setImportingArchive] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // TODO: move success banners into a shared notifications slice.
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editFileInputRef = useRef<HTMLInputElement | null>(null);
  const iconInputRef = useRef<HTMLInputElement | null>(null);
  const [createKeyStatus, setCreateKeyStatus] = useState<KeyAvailabilityStatus>('idle');
  const [importKeyStatus, setImportKeyStatus] = useState<KeyAvailabilityStatus>('idle');
  const [statusUpdateKey, setStatusUpdateKey] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDialogLoading, setEditDialogLoading] = useState(false);
  const [editingDetails, setEditingDetails] = useState<ApplicationDetails | null>(null);
  const [editingApp, setEditingApp] = useState<ApplicationSummary | null>(null);
  const [editIconDataUrl, setEditIconDataUrl] = useState<string | null>(null);
  const [editIconFileName, setEditIconFileName] = useState<string | null>(null);
  const [editArchiveFile, setEditArchiveFile] = useState<File | null>(null);
  const [editArchiveError, setEditArchiveError] = useState<string | null>(null);
  const combinedError =
    errorMessage ?? catalogState.error ?? installedState.error ?? storageState.error;
  const {
    searchStore,
    setSearchStore,
    searchInstalled,
    setSearchInstalled,
    statusFilter,
    setStatusFilter,
    filteredCatalog,
    filteredInstalled,
    statusFilterOptions,
  } = useApplicationsFilters({ catalogApps, installedApps, translate: t });
  const {
    isDragActive: importDragActive,
    handleDragOver: handleImportDragOver,
    handleDragLeave: handleImportDragLeave,
    handleDrop: handleImportDrop,
    setDragActive: setImportDragActive,
  } = useFileDropZone({
    onFileSelected: (file) => {
      setImportFile(file);
      if (file) {
        dispatch(setImportFormError(null));
      }
    },
  });
  const {
    isDragActive: editDragActive,
    handleDragOver: handleEditDragOver,
    handleDragLeave: handleEditDragLeave,
    handleDrop: handleEditDrop,
    setDragActive: setEditDragActive,
  } = useFileDropZone({
    onFileSelected: (file) => {
      setEditArchiveFile(file);
      if (file) {
        setEditArchiveError(null);
      }
    },
  });
  useApplicationKeyAvailability({
    enabled: addDialogOpen,
    value: createValues.key,
    onStatusChange: setCreateKeyStatus,
  });
  useApplicationKeyAvailability({
    enabled: importDialogOpen,
    value: importValues.key,
    onStatusChange: setImportKeyStatus,
  });

  const installedKeys = useMemo(
    () => new Set<string>(installedState.items.map((app: ApplicationSummary) => app.key)),
    [installedState.items]
  );

  const handleInstall = async (key: string) => {
    if (!isAuthenticated) {
      setErrorMessage(t('applications.loginRequired'));
      return;
    }
    setPendingAppKey(key);
    try {
      await dispatch(installExistingApplication(key)).unwrap();
      await dispatch(loadInstalledApplications()).unwrap();
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
    } finally {
      setPendingAppKey(null);
    }
  };

  const handleRemove = async (key: string) => {
    setPendingAppKey(key);
    try {
      await dispatch(uninstallExistingApplication(key)).unwrap();
      await dispatch(loadInstalledApplications()).unwrap();
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
    } finally {
      setPendingAppKey(null);
    }
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    dispatch(setCreateFormError(null));
    dispatch(resetCreateForm());
    setCreateKeyStatus('idle');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(ACTIVE_TAB_STORAGE_KEY, activeTab);
    }
  }, [activeTab]);

  const handleTabChange = (_event: React.SyntheticEvent, value: 'store' | 'installed') => {
    setActiveTab(value);
  };

  const handleCreateSubmit = async (values: CreateApplicationFormValues) => {
    if (createKeyStatus === 'checking') {
      dispatch(setCreateFormError(t('applications.validation.keyChecking')));
      return;
    }
    if (createKeyStatus === 'error') {
      dispatch(setCreateFormError(t('applications.validation.keyCheckError')));
      return;
    }
    if (createKeyStatus === 'taken') {
      dispatch(setCreateFormError(t('applications.validation.keyTaken')));
      return;
    }

    dispatch(setCreateFormError(null));
    setAddingApp(true);
    try {
      const result = await dispatch(submitCreateApplication(values)).unwrap();
      await refreshApplicationsData();
      setActiveTab('installed');
      setSuccessMessage(t('applications.create.success', { name: result?.name ?? values.name }));
      handleCloseAddDialog();
    } catch (error) {
      const message = extractErrorMessage(error) || t('applications.create.error');
      dispatch(setCreateFormError(message));
    } finally {
      setAddingApp(false);
    }
  };

  const handleStatusUpdate = async (key: string, nextStatus: ApplicationStatus) => {
    setStatusUpdateKey(key);
    try {
      await dispatch(updateApplicationStatusThunk({ key, status: nextStatus })).unwrap();
      await refreshApplicationsData();
      const statusLabel = t(`applications.status.${nextStatus}`);
      setSuccessMessage(t('applications.status.updateSuccess', { status: statusLabel }));
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
    } finally {
      setStatusUpdateKey(null);
    }
  };

  const handleOpenAddMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddMenuAnchor(event.currentTarget);
  };

  const handleCloseAddMenu = () => {
    setAddMenuAnchor(null);
  };

  const handleImportClick = () => {
    handleCloseAddMenu();
    dispatch(resetImportForm());
    setImportFile(null);
    setImportDialogOpen(true);
    setImportKeyStatus('idle');
    setImportDragActive(false);
  };

  const handleCreateClick = () => {
    handleCloseAddMenu();
    if (!isAuthenticated) {
      setErrorMessage(t('applications.loginRequired'));
      return;
    }
    dispatch(setCreateFormError(null));
    setAddDialogOpen(true);
  };

  const resetEditState = () => {
    setEditingDetails(null);
    setEditingApp(null);
    setEditIconDataUrl(null);
    setEditIconFileName(null);
    setEditArchiveFile(null);
    setEditArchiveError(null);
    setEditDragActive(false);
    dispatch(resetEditForm());
    dispatch(setEditFormError(null));
  };

  const handleAlertClose = () => {
    setErrorMessage(null);
    dispatch(clearApplicationsErrors());
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditDialogLoading(false);
    resetEditState();
  };

  const handleOpenEditDialog = async (app: ApplicationSummary) => {
    setEditingApp(app);
    setEditingDetails(null);
    setEditDialogOpen(true);
    setEditDialogLoading(true);
    setEditArchiveFile(null);
    setEditArchiveError(null);
    setEditDragActive(false);
    setEditIconDataUrl(null);
    setEditIconFileName(null);
    dispatch(resetEditForm());
    dispatch(setEditFormError(null));
    try {
      const details = await fetchApplicationDetails(app.key);
      setEditingDetails(details);
      setEditIconDataUrl(details.icon ?? null);
      dispatch(
        setEditFormValues({
          name: details.name,
          description: details.description ?? '',
          type: details.type,
          releaseType: 'patch',
          releaseNotes: '',
        })
      );
    } catch (error) {
      dispatch(setEditFormError(extractErrorMessage(error)));
    } finally {
      setEditDialogLoading(false);
    }
  };

  const handleImportFileButtonClick = () => {
    dispatch(setImportFormError(null));
    setImportDragActive(false);
    fileInputRef.current?.click();
  };

  const handleImportFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setImportFile(file);
    dispatch(setImportFormError(null));
    event.target.value = '';
  };

  const handleEditFileButtonClick = () => {
    setEditArchiveError(null);
    setEditDragActive(false);
    editFileInputRef.current?.click();
  };

  const handleEditFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setEditArchiveFile(file);
    setEditArchiveError(null);
    event.target.value = '';
  };

  const handleIconFileButtonClick = () => {
    iconInputRef.current?.click();
  };

  const handleIconFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setEditIconDataUrl(typeof reader.result === 'string' ? reader.result : null);
      setEditIconFileName(file.name);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleIconClear = () => {
    setEditIconDataUrl(null);
    setEditIconFileName(null);
  };

  const handleCloseImportDialog = () => {
    setImportDialogOpen(false);
    dispatch(setImportFormError(null));
    dispatch(resetImportForm());
    setImportFile(null);
    setImportKeyStatus('idle');
    setImportDragActive(false);
  };

  const handleImportSubmit = async (values: ImportApplicationFormValues) => {
    if (importKeyStatus === 'checking') {
      dispatch(setImportFormError(t('applications.validation.keyChecking')));
      return;
    }
    if (importKeyStatus === 'error') {
      dispatch(setImportFormError(t('applications.validation.keyCheckError')));
      return;
    }
    if (importKeyStatus === 'taken') {
      dispatch(setImportFormError(t('applications.validation.keyTaken')));
      return;
    }
    if (!importFile) {
      dispatch(setImportFormError(t('applications.import.fileRequired')));
      return;
    }

    setImportingArchive(true);
    dispatch(setImportFormError(null));
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await dispatch(
        submitImportApplication({ values, file: importFile })
      ).unwrap();
      setSuccessMessage(t('applications.import.success', { name: response.key }));

      if (response.storage) {
        dispatch(setStorageSnapshot(response.storage));
      } else if (isAuthenticated) {
        await dispatch(loadApplicationsStorage()).unwrap();
      }
      await dispatch(loadInstalledApplications()).unwrap();
      setActiveTab('installed');
      handleCloseImportDialog();
    } catch (error) {
      const message = extractErrorMessage(error) || t('applications.import.error');
      dispatch(setImportFormError(message));
    } finally {
      setImportingArchive(false);
    }
  };

  const handleEditSubmit = async (values: EditApplicationFormValues) => {
    if (!editingDetails || !editingApp) {
      return;
    }
    if (!editArchiveFile) {
      setEditArchiveError(t('applications.import.fileRequired'));
      return;
    }

    dispatch(setEditFormError(null));
    setEditDialogLoading(true);
    try {
      await dispatch(
        submitEditApplication({
          appKey: editingDetails.key,
          values,
          archive: editArchiveFile,
          iconDataUrl: editIconDataUrl,
        })
      ).unwrap();
      setSuccessMessage(t('applications.edit.success', { name: values.name }));
      await refreshApplicationsData();
      handleCloseEditDialog();
    } catch (error) {
      dispatch(setEditFormError(extractErrorMessage(error)));
    } finally {
      setEditDialogLoading(false);
    }
  };

  const storageUsagePercent = storageUsage
    ? Math.min((storageUsage.usedBytes / storageUsage.limitBytes) * 100, 100)
    : 0;

  const editNextVersion = useMemo(() => {
    if (!editingDetails) {
      return null;
    }
    return computeNextVersion(editingDetails.version, editValues.releaseType);
  }, [editingDetails, editValues.releaseType]);

  const getKeyStatusHelper = (status: KeyAvailabilityStatus): string | undefined => {
    switch (status) {
      case 'checking':
        return t('applications.validation.keyChecking');
      case 'available':
        return t('applications.validation.keyAvailable');
      case 'taken':
        return t('applications.validation.keyTaken');
      case 'error':
        return t('applications.validation.keyCheckError');
      default:
        return undefined;
    }
  };

  const renderStatusChip = useCallback(
    (status: ApplicationStatus) => {
      const config = statusChipConfig[status];
      return (
        <Chip
          size="small"
          className={styles.statusChip}
          label={t(`applications.status.${status}`)}
          color={config.color}
          variant={config.variant}
        />
      );
    },
    [statusChipConfig, t]
  );

  const renderApplicationDescription = useCallback(
    (app: ApplicationSummary) => (
      <>
        <Box className={styles.metaRow}>
          <Typography variant="body2">
            {t('applications.list.version', { version: app.version })}
          </Typography>
          <Typography variant="body2">
            {t('applications.list.type', { type: typeLabelMap[app.type] })}
          </Typography>
        </Box>
        {app.description && (
          <Typography variant="body2" className={styles.listItemDescription}>
            {app.description}
          </Typography>
        )}
      </>
    ),
    [t, typeLabelMap]
  );

  const createKeyHelperText = getKeyStatusHelper(createKeyStatus);
  const importKeyHelperText = getKeyStatusHelper(importKeyStatus);

  const nextVersionLabel = useMemo(
    () =>
      t('applications.edit.nextVersion', {
        version: editNextVersion ?? editingDetails?.version ?? '—',
      }),
    [editNextVersion, editingDetails, t]
  );

  return (
    <Box className={styles.container}>
      <ScreenHeader title={t('applications.title')} onBack={onBack} />
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        className={styles.tabs}
      >
        <Tab
          value="store"
          label={t('applications.tabs.store')}
          data-testid="applications-tab-store"
        />
        <Tab
          value="installed"
          label={t('applications.tabs.installed')}
          data-testid="applications-tab-installed"
        />
      </Tabs>

      <ScrollableContent screenId="applications" className={styles.content}>
        {successMessage && (
          <Alert
            severity="success"
            onClose={() => setSuccessMessage(null)}
            className={styles.alert}
          >
            {successMessage}
          </Alert>
        )}
        {combinedError && (
          <Alert severity="error" onClose={handleAlertClose} className={styles.alert}>
            {combinedError}
          </Alert>
        )}

        {isAuthenticated && activeTab === 'installed' && (
          <Box className={styles.storageInfo}>
            <Typography variant="subtitle2">{t('applications.storage.label')}</Typography>
            {storageLoading ? (
              <Box className={styles.storageLoading}>
                <CircularProgress size={18} />
                <Typography variant="body2">{t('applications.storage.loading')}</Typography>
              </Box>
            ) : storageUsage ? (
              <>
                <Box className={styles.storageMeta}>
                  <Typography variant="body2">
                    {t('applications.storage.usage', {
                      used: formatMegabytes(storageUsage.usedBytes),
                      limit: formatMegabytes(storageUsage.limitBytes),
                    })}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t('applications.storage.limit')}
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={storageUsagePercent} />
              </>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {storageError ?? t('applications.storage.error')}
              </Typography>
            )}
          </Box>
        )}

        <Box className={styles.searchRow}>
          <TextField
            className={styles.searchInput}
            size="small"
            variant="outlined"
            placeholder={t('applications.searchPlaceholder')}
            value={activeTab === 'store' ? searchStore : searchInstalled}
            onChange={(event) =>
              activeTab === 'store'
                ? setSearchStore(event.target.value)
                : setSearchInstalled(event.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="disabled" />
                </InputAdornment>
              ),
            }}
          />
          {activeTab === 'installed' && (
            <Box className={styles.actionsRow}>
              <FormControl size="small" className={styles.statusFilter}>
                <InputLabel id="status-filter-label">{t('applications.filters.status')}</InputLabel>
                <Select
                  labelId="status-filter-label"
                  label={t('applications.filters.status')}
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value as 'all' | ApplicationStatus)
                  }
                >
                  {statusFilterOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleOpenAddMenu}
                disabled={importingArchive || importDialogOpen}
              >
                {t('applications.addButton')}
              </Button>
            </Box>
          )}
        </Box>

        {activeTab === 'store' ? (
          <ApplicationList
            type="store"
            applications={filteredCatalog}
            loading={loadingCatalog}
            isAuthenticated={isAuthenticated}
            emptyLabel={t('applications.emptyState')}
            loginRequiredLabel={t('applications.loginRequired')}
            onInstall={handleInstall}
            onRemove={handleRemove}
            onSubmitForReview={(key) => handleStatusUpdate(key, 'pending')}
            onEdit={handleOpenEditDialog}
            pendingAppKey={pendingAppKey}
            statusUpdateKey={statusUpdateKey}
            installedKeys={installedKeys}
            currentUserId={currentUserId ?? undefined}
            renderDescription={renderApplicationDescription}
            renderStatusChip={renderStatusChip}
            ownerLabel={formatOwnerLabel}
            actionLabels={listActionLabels}
            typeColorMap={typeColorMap}
          />
        ) : (
          <ApplicationList
            type="installed"
            applications={filteredInstalled}
            loading={loadingInstalled}
            isAuthenticated={isAuthenticated}
            emptyLabel={t('applications.emptyState')}
            loginRequiredLabel={t('applications.loginRequired')}
            onInstall={handleInstall}
            onRemove={handleRemove}
            onSubmitForReview={(key) => handleStatusUpdate(key, 'pending')}
            onEdit={handleOpenEditDialog}
            pendingAppKey={pendingAppKey}
            statusUpdateKey={statusUpdateKey}
            installedKeys={installedKeys}
            currentUserId={currentUserId ?? undefined}
            renderDescription={renderApplicationDescription}
            renderStatusChip={renderStatusChip}
            ownerLabel={formatOwnerLabel}
            actionLabels={listActionLabels}
            typeColorMap={typeColorMap}
          />
        )}
      </ScrollableContent>

      <Menu
        anchorEl={addMenuAnchor}
        open={Boolean(addMenuAnchor)}
        onClose={handleCloseAddMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={handleImportClick} disabled={importingArchive || importDialogOpen}>
          <ListItemIcon>
            {importingArchive ? (
              <CircularProgress size={18} />
            ) : (
              <CloudUploadIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText
            primary={
              importingArchive
                ? t('applications.actions.importing')
                : t('applications.menu.importTitle')
            }
            secondary={t('applications.menu.importDescription')}
          />
        </MenuItem>
        {isAuthenticated ? (
          <>
            <Divider component="li" />
            <MenuItem onClick={handleCreateClick}>
              <ListItemIcon>
                <CreateNewFolderIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={t('applications.menu.createTitle')}
                secondary={t('applications.menu.createDescription')}
              />
            </MenuItem>
          </>
        ) : (
          <MenuItem disabled className={styles.menuHint}>
            {t('applications.menu.authHint')}
          </MenuItem>
        )}
      </Menu>

      <ApplicationCreateDialog
        open={addDialogOpen}
        loading={addingApp}
        serverError={createForm.serverError}
        defaultValues={createValues}
        keyStatus={createKeyStatus}
        helperText={createKeyHelperText}
        typeOptions={applicationTypeOptions}
        keyMaxLength={APP_KEY_MAX_LENGTH}
        nameMaxLength={APP_NAME_MAX_LENGTH}
        descriptionMaxLength={APP_DESCRIPTION_MAX_LENGTH}
        onClose={handleCloseAddDialog}
        onSubmit={handleCreateSubmit}
        onValuesChange={handleCreateValuesChange}
        t={t}
      />
      <ApplicationImportDialog
        open={importDialogOpen}
        loading={importingArchive}
        serverError={importForm.serverError}
        defaultValues={importValues}
        importFile={importFile}
        isDragActive={importDragActive}
        keyStatus={importKeyStatus}
        helperText={importKeyHelperText}
        keyMaxLength={APP_KEY_MAX_LENGTH}
        onClose={handleCloseImportDialog}
        onSubmit={handleImportSubmit}
        onValuesChange={handleImportValuesChange}
        onFileButtonClick={handleImportFileButtonClick}
        onDragOver={handleImportDragOver}
        onDragLeave={handleImportDragLeave}
        onDrop={handleImportDrop}
        formatFileSize={formatMegabytes}
        t={t}
      />

      <ApplicationEditDialog
        open={editDialogOpen}
        loading={editDialogLoading}
        serverError={editForm.serverError}
        applicationKey={editingApp?.key}
        details={editingDetails}
        defaultValues={editValues}
        iconDataUrl={editIconDataUrl}
        iconFileName={editIconFileName}
        dropZoneActive={editDragActive}
        archiveFile={editArchiveFile}
        archiveError={editArchiveError}
        nextVersionLabel={nextVersionLabel}
        typeOptions={applicationTypeOptions}
        releaseTypeOptions={releaseTypeOptions}
        nameMaxLength={APP_NAME_MAX_LENGTH}
        descriptionMaxLength={APP_DESCRIPTION_MAX_LENGTH}
        formatHistoryDate={formatHistoryDate}
        formatFileSize={formatMegabytes}
        onClose={handleCloseEditDialog}
        onSubmit={handleEditSubmit}
        onValuesChange={handleEditValuesChange}
        onIconSelect={handleIconFileButtonClick}
        onIconClear={handleIconClear}
        onArchiveButtonClick={handleEditFileButtonClick}
        onArchiveDragOver={handleEditDragOver}
        onArchiveDragLeave={handleEditDragLeave}
        onArchiveDrop={handleEditDrop}
        t={t}
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportFileChange}
        accept=".zip"
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={editFileInputRef}
        onChange={handleEditFileChange}
        accept=".zip"
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={iconInputRef}
        onChange={handleIconFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </Box>
  );
};

export default ApplicationsScreen;
