import { zodResolver } from '@hookform/resolvers/zod';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { TFunction } from 'i18next';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { ApplicationDetails, ApplicationType, ReleaseType } from '../../../../../../utils/api';
import styles from '../../ApplicationsScreen.module.css';
import { ApplicationTypeOption, EditApplicationFormValues } from '../../types';

import { editApplicationSchema } from './schema';

type ReleaseTypeOption = {
  value: ReleaseType;
  label: string;
};

type ApplicationEditDialogProps = {
  open: boolean;
  loading: boolean;
  serverError: string | null;
  applicationKey?: string;
  details: ApplicationDetails | null;
  defaultValues: EditApplicationFormValues;
  iconDataUrl: string | null;
  iconFileName: string | null;
  dropZoneActive: boolean;
  archiveFile: File | null;
  archiveError: string | null;
  nextVersionLabel: string;
  typeOptions: ApplicationTypeOption[];
  releaseTypeOptions: ReleaseTypeOption[];
  nameMaxLength: number;
  descriptionMaxLength: number;
  formatHistoryDate: (value?: string) => string;
  formatFileSize: (bytes: number) => string;
  onClose: () => void;
  onSubmit: (values: EditApplicationFormValues) => void;
  onValuesChange: (values: EditApplicationFormValues) => void;
  onIconSelect: () => void;
  onIconClear: () => void;
  onArchiveButtonClick: () => void;
  onArchiveDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onArchiveDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onArchiveDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  t: TFunction;
};

const ApplicationEditDialog: React.FC<ApplicationEditDialogProps> = ({
  open,
  loading,
  serverError,
  applicationKey,
  details,
  defaultValues,
  iconDataUrl,
  iconFileName,
  dropZoneActive,
  archiveFile,
  archiveError,
  nextVersionLabel,
  typeOptions,
  releaseTypeOptions,
  nameMaxLength,
  descriptionMaxLength,
  formatHistoryDate: formatDate,
  formatFileSize,
  onClose,
  onSubmit,
  onValuesChange,
  onIconSelect,
  onIconClear,
  onArchiveButtonClick,
  onArchiveDragOver,
  onArchiveDragLeave,
  onArchiveDrop,
  t,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<EditApplicationFormValues>({
    resolver: zodResolver(editApplicationSchema(t)),
    defaultValues,
    values: defaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const subscription = watch((value) => {
      onValuesChange(value as EditApplicationFormValues);
    });
    return () => subscription.unsubscribe();
  }, [watch, onValuesChange]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{t('applications.edit.title')}</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        {serverError && (
          <Alert severity="error" className={styles.dialogAlert}>
            {serverError}
          </Alert>
        )}
        {loading && !details ? (
          <Box className={styles.loadingState}>
            <CircularProgress size={32} />
          </Box>
        ) : (
          <>
            <TextField
              label={t('applications.form.keyLabel')}
              value={applicationKey ?? ''}
              size="small"
              fullWidth
              disabled
            />
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('applications.form.nameLabel')}
                  size="small"
                  required
                  fullWidth
                  inputProps={{ maxLength: nameMaxLength }}
                  helperText={errors.name?.message}
                  error={Boolean(errors.name)}
                />
              )}
            />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth size="small">
                  <InputLabel id="edit-type-label">{t('applications.form.typeLabel')}</InputLabel>
                  <Select
                    {...field}
                    labelId="edit-type-label"
                    label={t('applications.form.typeLabel')}
                    value={field.value}
                    onChange={(event) => field.onChange(event.target.value as ApplicationType)}
                  >
                    {typeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('applications.form.descriptionLabel')}
                  size="small"
                  multiline
                  minRows={2}
                  fullWidth
                  inputProps={{ maxLength: descriptionMaxLength }}
                  helperText={errors.description?.message}
                  error={Boolean(errors.description)}
                />
              )}
            />
            <Controller
              name="releaseType"
              control={control}
              render={({ field }) => (
                <FormControl component="fieldset">
                  <Typography variant="subtitle2">
                    {t('applications.releaseTypes.label')}
                  </Typography>
                  <RadioGroup
                    row
                    value={field.value}
                    onChange={(event) => field.onChange(event.target.value as ReleaseType)}
                  >
                    {releaseTypeOptions.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio size="small" />}
                        label={option.label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
            <Typography variant="body2" color="text.secondary">
              {nextVersionLabel}
            </Typography>
            <Controller
              name="releaseNotes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('applications.edit.releaseNotes')}
                  size="small"
                  multiline
                  minRows={3}
                  fullWidth
                  helperText={errors.releaseNotes?.message}
                  error={Boolean(errors.releaseNotes)}
                />
              )}
            />
            <Box className={styles.iconSection}>
              <Box className={styles.iconPreviewWrapper}>
                {iconDataUrl ? (
                  <img src={iconDataUrl} alt="icon preview" className={styles.iconPreview} />
                ) : (
                  <Box className={styles.iconPlaceholder}>{t('applications.edit.noIcon')}</Box>
                )}
              </Box>
              <Box className={styles.iconActions}>
                <Typography variant="subtitle2">{t('applications.edit.iconLabel')}</Typography>
                <Box className={styles.iconButtons}>
                  <Button variant="outlined" onClick={onIconSelect}>
                    {iconDataUrl
                      ? t('applications.edit.replaceIcon')
                      : t('applications.edit.selectIcon')}
                  </Button>
                  {iconDataUrl && (
                    <Button color="error" onClick={onIconClear}>
                      {t('applications.edit.removeIcon')}
                    </Button>
                  )}
                </Box>
                {iconFileName && (
                  <Typography variant="body2" color="text.secondary">
                    {iconFileName}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box
              className={`${styles.dropZone} ${dropZoneActive ? styles.dropZoneActive : ''}`}
              onDragEnter={onArchiveDragOver}
              onDragOver={onArchiveDragOver}
              onDragLeave={onArchiveDragLeave}
              onDrop={onArchiveDrop}
            >
              <CloudUploadIcon color="primary" />
              <Box className={styles.dropZoneContent}>
                <Typography variant="subtitle2">
                  {archiveFile
                    ? t('applications.import.fileReady')
                    : dropZoneActive
                      ? t('applications.import.dropActive')
                      : t('applications.edit.archiveLabel')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {archiveFile
                    ? t('applications.import.fileSelectedDetailed', {
                        name: archiveFile.name,
                        size: formatFileSize(archiveFile.size),
                      })
                    : t('applications.import.supportedFormats')}
                </Typography>
                <Box className={styles.dropZoneActions}>
                  <Button variant="outlined" onClick={onArchiveButtonClick}>
                    {archiveFile
                      ? t('applications.import.replaceFile')
                      : t('applications.import.selectFile')}
                  </Button>
                </Box>
              </Box>
            </Box>
            {archiveError && (
              <Typography variant="body2" color="error">
                {archiveError}
              </Typography>
            )}
            <Box className={styles.historySection}>
              <Typography variant="subtitle2">{t('applications.edit.historyTitle')}</Typography>
              {details?.versionHistory?.length ? (
                <List dense className={styles.historyList}>
                  {details.versionHistory
                    .slice()
                    .reverse()
                    .map((entry) => (
                      <ListItem key={`${entry.version}-${entry.createdAt}`}>
                        <ListItemText
                          primary={
                            <Box className={styles.historyEntryHeader}>
                              <Typography variant="body2">
                                {t('applications.list.version', { version: entry.version })}
                              </Typography>
                              {entry.version === details.version && (
                                <Chip
                                  size="small"
                                  color="success"
                                  label={t('applications.edit.currentVersion')}
                                />
                              )}
                            </Box>
                          }
                          secondary={
                            <Box className={styles.historyEntryContent}>
                              <Typography variant="body2" color="text.secondary">
                                {t('applications.edit.historyStatus', {
                                  status: t(`applications.status.${entry.status}`),
                                })}
                                {entry.createdAt ? ` • ${formatDate(entry.createdAt)}` : ''}
                              </Typography>
                              {entry.releaseNotes && (
                                <Typography variant="body2">{entry.releaseNotes}</Typography>
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {t('applications.edit.historyEmpty')}
                </Typography>
              )}
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {t('ui.cancel')}
        </Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={loading || !details}>
          {loading ? <CircularProgress size={18} /> : t('applications.edit.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicationEditDialog;
