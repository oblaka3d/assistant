import { zodResolver } from '@hookform/resolvers/zod';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { TFunction } from 'i18next';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import styles from '../../ApplicationsScreen.module.css';
import { ImportApplicationFormValues, KeyAvailabilityStatus } from '../../types';

import { importApplicationSchema } from './schema';

type ApplicationImportDialogProps = {
  open: boolean;
  loading: boolean;
  serverError: string | null;
  defaultValues: ImportApplicationFormValues;
  importFile: File | null;
  isDragActive: boolean;
  keyStatus: KeyAvailabilityStatus;
  helperText?: string;
  keyMaxLength: number;
  onClose: () => void;
  onSubmit: (values: ImportApplicationFormValues) => void;
  onValuesChange: (values: ImportApplicationFormValues) => void;
  onFileButtonClick: () => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  formatFileSize: (bytes: number) => string;
  t: TFunction;
};

const ApplicationImportDialog: React.FC<ApplicationImportDialogProps> = ({
  open,
  loading,
  serverError,
  defaultValues,
  importFile,
  isDragActive,
  keyStatus,
  helperText,
  keyMaxLength,
  onClose,
  onSubmit,
  onValuesChange,
  onFileButtonClick,
  onDragOver,
  onDragLeave,
  onDrop,
  formatFileSize,
  t,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ImportApplicationFormValues>({
    resolver: zodResolver(importApplicationSchema(t)),
    defaultValues,
    values: defaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const subscription = watch((values) => onValuesChange(values as ImportApplicationFormValues));
    return () => subscription.unsubscribe();
  }, [watch, onValuesChange]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const resolvedHelper = errors.key?.message ?? helperText;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('applications.import.dialogTitle')}</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <Typography variant="body2" color="text.secondary">
          {t('applications.import.dialogDescription')}
        </Typography>
        {serverError && (
          <Alert severity="error" className={styles.dialogAlert}>
            {serverError}
          </Alert>
        )}
        <Controller
          name="key"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('applications.import.idLabel')}
              size="small"
              required
              fullWidth
              inputProps={{ maxLength: keyMaxLength }}
              helperText={resolvedHelper}
              error={Boolean(errors.key) || keyStatus === 'taken'}
            />
          )}
        />
        <Box
          className={`${styles.dropZone} ${isDragActive ? styles.dropZoneActive : ''}`}
          onDragEnter={onDragOver}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <CloudUploadIcon color="primary" />
          <Box className={styles.dropZoneContent}>
            <Typography variant="subtitle2">
              {importFile
                ? t('applications.import.fileReady')
                : isDragActive
                  ? t('applications.import.dropActive')
                  : t('applications.import.dropHint')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {importFile
                ? t('applications.import.fileSelectedDetailed', {
                    name: importFile.name,
                    size: formatFileSize(importFile.size),
                  })
                : t('applications.import.supportedFormats')}
            </Typography>
            <Box className={styles.dropZoneActions}>
              <Button variant="outlined" onClick={onFileButtonClick}>
                {importFile
                  ? t('applications.import.replaceFile')
                  : t('applications.import.selectFile')}
              </Button>
            </Box>
            {loading && <LinearProgress className={styles.dropZoneProgress} />}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {t('ui.cancel')}
        </Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={loading}>
          {loading ? <CircularProgress size={18} /> : t('applications.import.submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicationImportDialog;
