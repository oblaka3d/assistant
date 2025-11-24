import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SelectSettingProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  id?: string;
}

export const SelectSetting: React.FC<SelectSettingProps> = ({
  label,
  value,
  onChange,
  options,
  id,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ px: 2, pb: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          value={value}
          label={label}
          onChange={handleChange}
          className="select-setting"
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.icon ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {option.icon}
                  {option.label}
                </Box>
              ) : (
                option.label
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
