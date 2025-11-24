import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ModelSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  loading: boolean;
  emptyMessage: string;
  id?: string;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  label,
  value,
  onChange,
  options,
  loading,
  emptyMessage,
  id,
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {label}
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CircularProgress size={20} />
          <Typography variant="body2" color="text.secondary">
            {t('ui.loadingModels')}
          </Typography>
        </Box>
      ) : (
        <FormControl fullWidth size="small">
          <InputLabel id={`${id}-label`}>{label}</InputLabel>
          <Select
            labelId={`${id}-label`}
            id={id}
            value={value}
            label={label}
            onChange={(e) => onChange(e.target.value)}
            className="select-setting"
          >
            {options.length === 0 ? (
              <MenuItem disabled value="">
                <Typography variant="body2" color="text.secondary">
                  {emptyMessage}
                </Typography>
              </MenuItem>
            ) : (
              options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};
