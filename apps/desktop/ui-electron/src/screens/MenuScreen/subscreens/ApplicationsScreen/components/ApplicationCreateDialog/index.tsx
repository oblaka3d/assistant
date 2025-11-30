import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { TFunction } from 'i18next';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { ApplicationType } from '../../../../../../utils/api';
import styles from '../../ApplicationsScreen.module.css';
import {
  ApplicationTypeOption,
  CreateApplicationFormValues,
  KeyAvailabilityStatus,
} from '../../types';

import { createApplicationSchema } from './schema';

type ApplicationCreateDialogProps = {
  open: boolean;
  loading: boolean;
  serverError: string | null;
  defaultValues: CreateApplicationFormValues;
  keyStatus: KeyAvailabilityStatus;
  typeOptions: ApplicationTypeOption[];
  helperText?: string;
  keyMaxLength: number;
  nameMaxLength: number;
  descriptionMaxLength: number;
  onClose: () => void;
  onSubmit: (values: CreateApplicationFormValues) => void;
  onValuesChange: (values: CreateApplicationFormValues) => void;
  t: TFunction;
};

const ApplicationCreateDialog: React.FC<ApplicationCreateDialogProps> = ({
  open,
  loading,
  serverError,
  defaultValues,
  keyStatus,
  typeOptions,
  helperText,
  keyMaxLength,
  nameMaxLength,
  descriptionMaxLength,
  onClose,
  onSubmit,
  onValuesChange,
  t,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<CreateApplicationFormValues>({
    resolver: zodResolver(createApplicationSchema(t)),
    defaultValues,
    values: defaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const subscription = watch((value) => {
      onValuesChange(value as CreateApplicationFormValues);
    });
    return () => subscription.unsubscribe();
  }, [watch, onValuesChange]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const resolvedHelper = errors.key?.message ?? helperText;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('applications.menu.createTitle')}</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <Typography variant="body2" color="text.secondary">
          {t('applications.menu.createDescription')}
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
              label={t('applications.form.keyLabel')}
              size="small"
              required
              fullWidth
              helperText={resolvedHelper}
              error={Boolean(errors.key) || keyStatus === 'taken'}
              inputProps={{ maxLength: keyMaxLength }}
            />
          )}
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
              helperText={errors.name?.message}
              error={Boolean(errors.name)}
              inputProps={{ maxLength: nameMaxLength }}
            />
          )}
        />
        <Controller
          name="version"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('applications.form.versionLabel')}
              size="small"
              required
              fullWidth
              helperText={errors.version?.message}
              error={Boolean(errors.version)}
            />
          )}
        />
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth size="small">
              <InputLabel id="create-type-label">{t('applications.form.typeLabel')}</InputLabel>
              <Select
                {...field}
                labelId="create-type-label"
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
              helperText={errors.description?.message}
              error={Boolean(errors.description)}
              inputProps={{ maxLength: descriptionMaxLength }}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {t('ui.cancel')}
        </Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={loading}>
          {loading ? <CircularProgress size={18} /> : t('applications.form.submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicationCreateDialog;
