import { Box, Slider, Typography } from '@mui/material';
import React from 'react';

import styles from './SliderSetting.module.css';

interface SliderSettingProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  label?: string;
  formatValue?: (value: number) => string;
}

export const SliderSetting: React.FC<SliderSettingProps> = ({
  value,
  onChange,
  min,
  max,
  step,
  label,
  formatValue = (v) => v.toString(),
}) => {
  return (
    <Box className={styles.sliderContainer}>
      <Slider
        value={value}
        onChange={(_, val) => onChange(val as number)}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
        className={styles.slider}
      />
      {label && (
        <Typography variant="body2" className={styles.sliderLabel}>
          {formatValue(value)}
        </Typography>
      )}
    </Box>
  );
};
