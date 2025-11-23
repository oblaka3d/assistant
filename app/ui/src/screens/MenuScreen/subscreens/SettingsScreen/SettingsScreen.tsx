import ImageIcon from '@mui/icons-material/Image';
import LanguageIcon from '@mui/icons-material/Language';
import PaletteIcon from '@mui/icons-material/Palette';
import LightModeIcon from '@mui/icons-material/LightMode';
import VideocamIcon from '@mui/icons-material/Videocam';
import SpeedIcon from '@mui/icons-material/Speed';
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

import ScreenHeader from '../../../../components/ScreenHeader';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  setVolume,
  setModelPath,
  setSceneName,
  setEnableToonShader,
  setLightIntensity,
  setCameraDistance,
  setAnimationSpeed,
} from '../../../../store/slices/settingsSlice';
import styles from '../../MenuScreen.module.css';

interface SettingsScreenProps {
  onBack: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const dispatch = useAppDispatch();
  const volume = useAppSelector((state) => state.settings.volume);
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
        console.log('Available models loaded:', models);
        
        // Если текущая модель не найдена в списке, выбираем первую доступную
        if (models.length > 0) {
          const currentModelName = modelScene.modelPath.split('/').pop() || '';
          if (!models.includes(currentModelName)) {
            const firstModel = models[0];
            dispatch(setModelPath(`./assets/models/${firstModel}`));
            console.log(`Current model "${currentModelName}" not found, switching to "${firstModel}"`);
          }
        }
      } catch (error) {
        console.error('Error loading model list:', error);
        setAvailableModels([]);
      } finally {
        setLoadingModels(false);
      }
    };

    loadModels();

    // Загружаем список сцен
    const loadScenes = async () => {
      if (!window.api) {
        console.error('Electron API not available');
        setLoadingScenes(false);
        return;
      }

      try {
        setLoadingScenes(true);
        const scenes = await window.api.getSceneList();
        setAvailableScenes(scenes);
        console.log('Available scenes loaded:', scenes);
      } catch (error) {
        console.error('Error loading scene list:', error);
        setAvailableScenes([]);
      } finally {
        setLoadingScenes(false);
      }
    };

    loadScenes();
  }, [dispatch, modelScene.modelPath]);

  return (
    <Box className={styles.container}>
      <ScreenHeader title="Настройки" onBack={onBack} />

      <Box className={styles.content}>
        <Paper elevation={3} className={styles.settingPaper}>
          <Box className={styles.settingHeader}>
            <VolumeUpIcon className={styles.settingIcon} />
            <Typography variant="h6">Громкость</Typography>
          </Box>
          <Box sx={{ px: 2 }}>
            <Slider
              value={volume}
              onChange={(_, value) => dispatch(setVolume(value as number))}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              className={styles.slider}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
              {volume}%
            </Typography>
          </Box>
        </Paper>

        <Paper elevation={3} className={styles.settingPaper}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LanguageIcon className={styles.settingIcon} />
              <Typography variant="h6">Язык интерфейса</Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Русский
          </Typography>
        </Paper>

        {/* Секция "Модель и сцена" */}
        <Paper elevation={3} className={styles.settingPaper} sx={{ mt: 2 }}>
          <Box className={styles.settingHeader}>
            <ImageIcon className={styles.settingIcon} />
            <Typography variant="h6">Модель и сцена</Typography>
          </Box>

          <Box sx={{ px: 2, pb: 2 }}>
            {/* Выбор модели */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Модель персонажа
              </Typography>
              {loadingModels ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} />
                  <Typography variant="body2" color="text.secondary">
                    Загрузка списка моделей...
                  </Typography>
                </Box>
              ) : (
                <FormControl fullWidth size="small">
                  <InputLabel id="model-select-label">Выберите модель</InputLabel>
                  <Select
                    labelId="model-select-label"
                    id="model-select"
                    value={modelScene.modelPath.split('/').pop() || availableModels[0] || ''}
                    label="Выберите модель"
                    onChange={(e) => {
                      const selectedModel = e.target.value;
                      if (selectedModel) {
                        const modelPath = `./assets/models/${selectedModel}`;
                        dispatch(setModelPath(modelPath));
                      }
                    }}
                    sx={{ color: 'text.primary' }}
                  >
                    {availableModels.length === 0 ? (
                      <MenuItem disabled value="">
                        <Typography variant="body2" color="text.secondary">
                          Модели не найдены
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
              {availableModels.length > 0 && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Найдено моделей: {availableModels.length}
                </Typography>
              )}
            </Box>

            {/* Выбор сцены */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Сцена окружения
              </Typography>
              {loadingScenes ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} />
                  <Typography variant="body2" color="text.secondary">
                    Загрузка списка сцен...
                  </Typography>
                </Box>
              ) : (
                <FormControl fullWidth size="small">
                  <InputLabel id="scene-select-label">Выберите сцену</InputLabel>
                  <Select
                    labelId="scene-select-label"
                    id="scene-select"
                    value={modelScene.sceneName || ''}
                    label="Выберите сцену"
                    onChange={(e) => {
                      const selectedScene = e.target.value;
                      if (selectedScene === '') {
                        dispatch(setSceneName(null));
                        console.log('Scene cleared');
                      } else {
                        dispatch(setSceneName(selectedScene));
                        console.log('Scene changed to:', selectedScene);
                      }
                    }}
                    sx={{ color: 'text.primary' }}
                    disabled={loadingScenes}
                  >
                    <MenuItem value="">
                      <Typography variant="body2" color="text.secondary" fontStyle="italic">
                        Сцена не выбрана
                      </Typography>
                    </MenuItem>
                    {availableScenes.length === 0 ? (
                      <MenuItem disabled value="__no_scenes__">
                        <Typography variant="body2" color="text.secondary">
                          Сцены не найдены
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
              {availableScenes.length > 0 && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Найдено сцен: {availableScenes.length}
                </Typography>
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
                    <Typography variant="body2">Toon Shader</Typography>
                  </Box>
                }
              />
            </Box>

            {/* Интенсивность освещения */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LightModeIcon className={styles.settingIcon} sx={{ fontSize: '1rem', mr: 1 }} />
                <Typography variant="body2">Интенсивность освещения</Typography>
              </Box>
              <Slider
                value={modelScene.lightIntensity}
                onChange={(_, value) => dispatch(setLightIntensity(value as number))}
                min={0.5}
                max={5.0}
                step={0.1}
                valueLabelDisplay="auto"
                className={styles.slider}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                {modelScene.lightIntensity.toFixed(1)}
              </Typography>
            </Box>

            {/* Расстояние камеры */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <VideocamIcon className={styles.settingIcon} sx={{ fontSize: '1rem', mr: 1 }} />
                <Typography variant="body2">Расстояние камеры</Typography>
              </Box>
              <Slider
                value={modelScene.cameraDistance}
                onChange={(_, value) => dispatch(setCameraDistance(value as number))}
                min={1.0}
                max={5.0}
                step={0.1}
                valueLabelDisplay="auto"
                className={styles.slider}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                {modelScene.cameraDistance.toFixed(1)}
              </Typography>
            </Box>

            {/* Скорость анимации */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <SpeedIcon className={styles.settingIcon} sx={{ fontSize: '1rem', mr: 1 }} />
                <Typography variant="body2">Скорость анимации</Typography>
              </Box>
              <Slider
                value={modelScene.animationSpeed}
                onChange={(_, value) => dispatch(setAnimationSpeed(value as number))}
                min={0.1}
                max={3.0}
                step={0.1}
                valueLabelDisplay="auto"
                className={styles.slider}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                {modelScene.animationSpeed.toFixed(1)}x
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default SettingsScreen;
