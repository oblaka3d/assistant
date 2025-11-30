import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  theme: 'light' | 'dark';
  presetColors?: string[];
}

const DEFAULT_PRESET_COLORS = [
  '#4a90e2',
  '#e74c3c',
  '#27ae60',
  '#f39c12',
  '#9b59b6',
  '#1abc9c',
  '#e67e22',
  '#3498db',
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  theme,
  presetColors = DEFAULT_PRESET_COLORS,
}) => {
  const ThemeIcon = theme === 'light' ? LightModeIcon : DarkModeIcon;

  return (
    <Box sx={{ mb: theme === 'light' ? 3 : 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <ThemeIcon fontSize="small" />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
      </Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            label={label}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              style: { height: '40px' },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {presetColors.map((color) => (
              <IconButton
                key={color}
                onClick={() => onChange(color)}
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: color,
                  border: value === color ? '2px solid' : '1px solid',
                  borderColor: value === color ? 'primary.main' : 'divider',
                  '&:hover': {
                    backgroundColor: color,
                    opacity: 0.8,
                  },
                }}
                title={color}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
