import ImageIcon from '@mui/icons-material/Image';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import PaletteIcon from '@mui/icons-material/Palette';
import SpeedIcon from '@mui/icons-material/Speed';
import VideocamIcon from '@mui/icons-material/Videocam';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {
  Box,
  Paper,
  Slider,
  Typography,
  Switch,
  FormControlLabel,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../../../components/ScreenHeader';
import ScrollableContent from '../../../../components/ScrollableContent';
import { SETTINGS_RANGES, ASSETS_PATHS } from '../../../../constants/app';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  setVolume,
  setLanguage,
  setModelPath,
  setSceneName,
  setEnableToonShader,
  setLightIntensity,
  setCameraDistance,
  setAnimationSpeed,
} from '../../../../store/slices/settingsSlice';
import { createLogger } from '../../../../utils/logger';
import styles from '../../MenuScreen.module.css';

const log = createLogger('SettingsScreen');

interface SettingsScreenProps {
  onBack: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const volume = useAppSelector((state) => state.settings.volume);
  const language = useAppSelector((state) => state.settings.language);
  const modelScene = useAppSelector((state) => state.settings.modelScene);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [loadingModels, setLoadingModels] = useState<boolean>(true);
  const [availableScenes, setAvailableScenes] = useState<string[]>([]);
  const [loadingScenes, setLoadingScenes] = useState<boolean>(true);

  // Загружаем список моделей при открытии настроек
  useEffect(() => {
    const loadModels = async () => {
      if (!window.api) {
        console.error('Electron API not available');
        setLoadingModels(false);
        return;
      }

      try {
        setLoadingModels(true);
        const models = await window.api.getModelList();
        setAvailableModels(models);
        log.debug('Available models loaded:', models);

        // Если текущая модель не найдена в списке, выбираем первую доступную
        if (models.length > 0) {
          const currentModelName = modelScene.modelPath.split('/').pop() || '';
          if (!models.includes(currentModelName)) {
            const firstModel = models[0];
            dispatch(setModelPath(`${ASSETS_PATHS.MODELS}${firstModel}`));
            log.debug(
              `Current model "${currentModelName}" not found, switching to "${firstModel}"`
            );
          }
        }
      } catch (error) {
        log.error('Error loading model list:', error);
        setAvailableModels([]);
      } finally {
        setLoadingModels(false);
      }
    };

    loadModels();

    // Загружаем список сцен
    const loadScenes = async () => {
      if (!window.api) {
        log.error('Electron API not available');
        setLoadingScenes(false);
        return;
      }

      try {
        setLoadingScenes(true);
        const scenes = await window.api.getSceneList();
        setAvailableScenes(scenes);
        log.debug('Available scenes loaded:', scenes);
      } catch (error) {
        log.error('Error loading scene list:', error);
        setAvailableScenes([]);
      } finally {
        setLoadingScenes(false);
      }
    };

    loadScenes();
  }, [dispatch, modelScene.modelPath]);

  return (
    <Box className={styles.container}>
      <ScreenHeader title={t('settings.title')} onBack={onBack} />

      <ScrollableContent screenId="settings">
        <Paper elevation={3} className={styles.settingPaper}>
          <Box className={styles.settingHeader}>
            <VolumeUpIcon className={styles.settingIcon} />
            <Typography variant="h6">{t('settings.volume')}</Typography>
          </Box>
          <Box sx={{ px: 2 }}>
            <Slider
              value={volume}
              onChange={(_, value) => dispatch(setVolume(value as number))}
              min={SETTINGS_RANGES.VOLUME.min}
              max={SETTINGS_RANGES.VOLUME.max}
              step={SETTINGS_RANGES.VOLUME.step}
              valueLabelDisplay="auto"
              className={styles.slider}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
              {volume}%
            </Typography>
          </Box>
        </Paper>

        <Paper elevation={3} className={styles.settingPaper}>
          <Box className={styles.settingHeader}>
            <LanguageIcon className={styles.settingIcon} />
            <Typography variant="h6">{t('settings.language')}</Typography>
          </Box>
          <Box sx={{ px: 2, pb: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="language-select-label">{t('settings.language')}</InputLabel>
              <Select
                labelId="language-select-label"
                id="language-select"
                value={language}
                label={t('settings.language')}
                onChange={(e) => {
                  dispatch(setLanguage(e.target.value));
                }}
                sx={{ color: 'text.primary' }}
              >
                <MenuItem value="ru">{t('app.russian')}</MenuItem>
                <MenuItem value="en">{t('app.english')}</MenuItem>
                <MenuItem value="zh">{t('app.chinese')}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>

        {/* Секция "Модель и сцена" */}
        <Paper elevation={3} className={styles.settingPaper} sx={{ mt: 2 }}>
          <Box className={styles.settingHeader}>
            <ImageIcon className={styles.settingIcon} />
            <Typography variant="h6">{t('settings.modelAndScene')}</Typography>
          </Box>

          <Box sx={{ px: 2, pb: 2 }}>
            {/* Выбор модели */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {t('settings.model')}
              </Typography>
              {loadingModels ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} />
                  <Typography variant="body2" color="text.secondary">
                    {t('ui.loadingModels')}
                  </Typography>
                </Box>
              ) : (
                <FormControl fullWidth size="small">
                  <InputLabel id="model-select-label">{t('settings.model')}</InputLabel>
                  <Select
                    labelId="model-select-label"
                    id="model-select"
                    value={modelScene.modelPath.split('/').pop() || availableModels[0] || ''}
                    label={t('settings.model')}
                    onChange={(e) => {
                      const selectedModel = e.target.value;
                      if (selectedModel) {
                        const modelPath = `${ASSETS_PATHS.MODELS}${selectedModel}`;
                        dispatch(setModelPath(modelPath));
                        log.debug('Model changed to:', modelPath);
                      }
                    }}
                    sx={{ color: 'text.primary' }}
                  >
                    {availableModels.length === 0 ? (
                      <MenuItem disabled value="">
                        <Typography variant="body2" color="text.secondary">
                          {t('ui.noModels')}
                        </Typography>
                      </MenuItem>
                    ) : (
                      availableModels.map((model) => (
                        <MenuItem key={model} value={model}>
                          {model}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              )}
            </Box>

            {/* Выбор сцены */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {t('settings.scene')}
              </Typography>
              {loadingScenes ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} />
                  <Typography variant="body2" color="text.secondary">
                    {t('ui.loadingScenes')}
                  </Typography>
                </Box>
              ) : (
                <FormControl fullWidth size="small">
                  <InputLabel id="scene-select-label">{t('settings.scene')}</InputLabel>
                  <Select
                    labelId="scene-select-label"
                    id="scene-select"
                    value={modelScene.sceneName || ''}
                    label={t('settings.scene')}
                    onChange={(e) => {
                      const selectedScene = e.target.value;
                      if (selectedScene === '') {
                        dispatch(setSceneName(null));
                        log.debug('Scene cleared');
                      } else {
                        dispatch(setSceneName(selectedScene));
                        log.debug('Scene changed to:', selectedScene);
                      }
                    }}
                    sx={{ color: 'text.primary' }}
                    disabled={loadingScenes}
                  >
                    <MenuItem value="">
                      <Typography variant="body2" color="text.secondary" fontStyle="italic">
                        {t('ui.sceneNotSelected')}
                      </Typography>
                    </MenuItem>
                    {availableScenes.length === 0 ? (
                      <MenuItem disabled value="__no_scenes__">
                        <Typography variant="body2" color="text.secondary">
                          {t('ui.noScenes')}
                        </Typography>
                      </MenuItem>
                    ) : (
                      availableScenes.map((scene) => (
                        <MenuItem key={scene} value={scene}>
                          {scene}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              )}
            </Box>

            {/* Toon Shader */}
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={modelScene.enableToonShader}
                    onChange={(e) => dispatch(setEnableToonShader(e.target.checked))}
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PaletteIcon sx={{ mr: 1, fontSize: '1rem' }} />
                    <Typography variant="body2">{t('settings.enableToonShader')}</Typography>
                  </Box>
                }
              />
            </Box>

            {/* Интенсивность освещения */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LightModeIcon className={styles.settingIcon} sx={{ fontSize: '1rem', mr: 1 }} />
                <Typography variant="body2">{t('settings.lightIntensity')}</Typography>
              </Box>
              <Slider
                value={modelScene.lightIntensity}
                onChange={(_, value) => dispatch(setLightIntensity(value as number))}
                min={SETTINGS_RANGES.LIGHT_INTENSITY.min}
                max={SETTINGS_RANGES.LIGHT_INTENSITY.max}
                step={SETTINGS_RANGES.LIGHT_INTENSITY.step}
                valueLabelDisplay="auto"
                className={styles.slider}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, textAlign: 'center' }}
              >
                {modelScene.lightIntensity.toFixed(1)}
              </Typography>
            </Box>

            {/* Расстояние камеры */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <VideocamIcon className={styles.settingIcon} sx={{ fontSize: '1rem', mr: 1 }} />
                <Typography variant="body2">{t('settings.cameraDistance')}</Typography>
              </Box>
              <Slider
                value={modelScene.cameraDistance}
                onChange={(_, value) => dispatch(setCameraDistance(value as number))}
                min={SETTINGS_RANGES.CAMERA_DISTANCE.min}
                max={SETTINGS_RANGES.CAMERA_DISTANCE.max}
                step={SETTINGS_RANGES.CAMERA_DISTANCE.step}
                valueLabelDisplay="auto"
                className={styles.slider}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, textAlign: 'center' }}
              >
                {modelScene.cameraDistance.toFixed(1)}
              </Typography>
            </Box>

            {/* Скорость анимации */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <SpeedIcon className={styles.settingIcon} sx={{ fontSize: '1rem', mr: 1 }} />
                <Typography variant="body2">{t('settings.animationSpeed')}</Typography>
              </Box>
              <Slider
                value={modelScene.animationSpeed}
                onChange={(_, value) => dispatch(setAnimationSpeed(value as number))}
                min={SETTINGS_RANGES.ANIMATION_SPEED.min}
                max={SETTINGS_RANGES.ANIMATION_SPEED.max}
                step={SETTINGS_RANGES.ANIMATION_SPEED.step}
                valueLabelDisplay="auto"
                className={styles.slider}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, textAlign: 'center' }}
              >
                {modelScene.animationSpeed.toFixed(1)}x
              </Typography>
            </Box>
          </Box>
        </Paper>
      </ScrollableContent>
    </Box>
  );
};

export default SettingsScreen;
