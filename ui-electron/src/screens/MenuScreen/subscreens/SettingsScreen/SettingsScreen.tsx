import DarkModeIcon from '@mui/icons-material/DarkMode';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ImageIcon from '@mui/icons-material/Image';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import PaletteIcon from '@mui/icons-material/Palette';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import SpeedIcon from '@mui/icons-material/Speed';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import VideocamIcon from '@mui/icons-material/Videocam';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ColorPicker } from '../../../../components/ColorPicker';
import { ModelSelector } from '../../../../components/ModelSelector';
import ScreenHeader from '../../../../components/ScreenHeader';
import ScrollableContent from '../../../../components/ScrollableContent';
import { SelectSetting } from '../../../../components/SelectSetting';
import { SettingSection } from '../../../../components/SettingSection';
import { SliderSetting } from '../../../../components/SliderSetting';
import { DEFAULT_WELCOME_TITLE, SETTINGS_RANGES, ASSETS_PATHS } from '../../../../constants/app';
import IdleScreen from '../../../../screens/IdleScreen';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  setVolume,
  setLanguage,
  setTheme,
  setAccentColorLight,
  setAccentColorDark,
  setModelPath,
  setSceneName,
  setEnableToonShader,
  setLightIntensity,
  setCameraDistance,
  setAnimationSpeed,
  setWelcomeTitle,
  setIdleTimeoutSeconds,
  setIdleMode,
  setIdleCustomImagePath,
  setIdleRemoteEndpoint,
  resetSettings,
} from '../../../../store/slices/settingsSlice';
import { saveSettings } from '../../../../store/thunks';
import { createLogger } from '../../../../utils/logger';
import styles from '../../MenuScreen.module.css';

const log = createLogger('SettingsScreen');

interface SettingsScreenProps {
  onBack: () => void;
}

const IDLE_TIMEOUT_MINUTES = [0, 5, 10, 15, 20, 25, 30];

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const volume = useAppSelector((state) => state.settings.volume);
  const language = useAppSelector((state) => state.settings.language);
  const theme = useAppSelector((state) => state.settings.theme);
  const accentColorLight = useAppSelector((state) => state.settings.accentColorLight);
  const accentColorDark = useAppSelector((state) => state.settings.accentColorDark);
  const modelScene = useAppSelector((state) => state.settings.modelScene);
  const welcomeTitle = useAppSelector((state) => state.settings.welcomeTitle);
  const idleTimeoutSeconds = useAppSelector((state) => state.settings.idleTimeoutSeconds);
  const idleMode = useAppSelector((state) => state.settings.idleMode);
  const idleCustomImagePath = useAppSelector((state) => state.settings.idleCustomImagePath);
  const idleRemoteEndpoint = useAppSelector((state) => state.settings.idleRemoteEndpoint);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [loadingModels, setLoadingModels] = useState<boolean>(true);
  const [availableScenes, setAvailableScenes] = useState<string[]>([]);
  const [loadingScenes, setLoadingScenes] = useState<boolean>(true);
  const [resetDialogOpen, setResetDialogOpen] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewRefreshKey, setPreviewRefreshKey] = useState(0);

  // Ref для debounce таймера
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Флаг для отслеживания первой загрузки настроек
  const isInitialLoadRef = useRef<boolean>(true);

  const idleTimeoutOptions = useMemo(
    () =>
      IDLE_TIMEOUT_MINUTES.map((minutes) => ({
        value: (minutes * 60).toString(),
        label:
          minutes === 0
            ? t('settings.idleTimeoutDisabled')
            : t('settings.idleTimeoutMinutes', { minutes }),
      })),
    [t]
  );

  const handlePreviewIdle = () => {
    setPreviewRefreshKey((prev) => prev + 1);
    setShowPreview(true);
  };

  // Сохранение настроек на сервер с debounce (1 секунда)
  useEffect(() => {
    // Пропускаем сохранение при первой загрузке или если не авторизован
    if (!isAuthenticated || isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      return;
    }

    // Очищаем предыдущий таймер
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Устанавливаем новый таймер
    saveTimeoutRef.current = setTimeout(() => {
      dispatch(
        saveSettings({
          volume,
          language,
          theme,
          accentColorLight,
          accentColorDark,
          welcomeTitle,
          idleTimeoutSeconds,
          idleMode,
          idleCustomImagePath,
          idleRemoteEndpoint,
          modelScene,
        })
      ).catch((error) => {
        log.error('Failed to save settings:', error);
      });
    }, 1000);

    // Очистка при размонтировании
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [
    volume,
    language,
    theme,
    accentColorLight,
    accentColorDark,
    welcomeTitle,
    idleTimeoutSeconds,
    idleMode,
    idleCustomImagePath,
    idleRemoteEndpoint,
    modelScene,
    isAuthenticated,
    dispatch,
  ]);

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

  const handleResetSettings = () => {
    setResetDialogOpen(true);
  };

  const handleConfirmReset = () => {
    // Сбрасываем настройки в Redux
    dispatch(resetSettings());

    // Удаляем флаг приветственного экрана из localStorage
    localStorage.removeItem('welcomeScreenShown');

    // Закрываем диалог
    setResetDialogOpen(false);

    log.info('Settings reset to default values');

    // Перезагружаем страницу, чтобы показать приветственный экран
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleCancelReset = () => {
    setResetDialogOpen(false);
  };

  return (
    <Box className={styles.container}>
      <ScreenHeader title={t('settings.title')} onBack={onBack} />

      <ScrollableContent screenId="settings">
        {/* Громкость */}
        <SettingSection icon={<VolumeUpIcon />} title={t('settings.volume')}>
          <SliderSetting
            value={volume}
            onChange={(value) => dispatch(setVolume(value))}
            min={SETTINGS_RANGES.VOLUME.min}
            max={SETTINGS_RANGES.VOLUME.max}
            step={SETTINGS_RANGES.VOLUME.step}
            label={`${volume}%`}
          />
        </SettingSection>

        {/* Язык */}
        <SettingSection icon={<LanguageIcon />} title={t('settings.language')}>
          <SelectSetting
            id="language-select"
            label={t('settings.language')}
            value={language}
            onChange={(value) => dispatch(setLanguage(value))}
            options={[
              { value: 'ru', label: t('app.russian') },
              { value: 'en', label: t('app.english') },
              { value: 'zh', label: t('app.chinese') },
            ]}
          />
        </SettingSection>

        {/* Тема */}
        <SettingSection icon={<SettingsBrightnessIcon />} title={t('settings.theme')}>
          <SelectSetting
            id="theme-select"
            label={t('settings.theme')}
            value={theme}
            onChange={(value) => dispatch(setTheme(value as 'light' | 'dark' | 'system'))}
            options={[
              {
                value: 'light',
                label: t('settings.themeLight'),
                icon: <LightModeIcon fontSize="small" />,
              },
              {
                value: 'dark',
                label: t('settings.themeDark'),
                icon: <DarkModeIcon fontSize="small" />,
              },
              {
                value: 'system',
                label: t('settings.themeSystem'),
                icon: <SettingsBrightnessIcon fontSize="small" />,
              },
            ]}
          />
        </SettingSection>

        {/* Экран ожидания */}
        <SettingSection icon={<HourglassEmptyIcon />} title={t('settings.idleScreenSection')}>
          <SelectSetting
            id="idle-timeout-select"
            label={t('settings.idleTimeout')}
            value={idleTimeoutSeconds.toString()}
            onChange={(value) => dispatch(setIdleTimeoutSeconds(Number(value)))}
            options={idleTimeoutOptions}
          />
          <Typography variant="caption" sx={{ px: 2, pb: 2 }}>
            {t('settings.idleTimeoutDescription')}
          </Typography>
          <SelectSetting
            id="idle-mode-select"
            label={t('settings.idleMode')}
            value={idleMode}
            onChange={(value) => dispatch(setIdleMode(value as 'api' | 'custom'))}
            options={[
              { value: 'api', label: t('settings.idleModeApi') },
              { value: 'custom', label: t('settings.idleModeCustom') },
            ]}
          />
          <Typography variant="caption" sx={{ px: 2, color: 'text.secondary' }}>
            {idleMode === 'api'
              ? t('settings.idleModeApiHelper')
              : t('settings.idleModeCustomHelper')}
          </Typography>
          <Box sx={{ px: 2, pt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label={t('settings.idleCustomImagePath')}
              placeholder={t('settings.idleCustomImagePathDescription')}
              value={idleCustomImagePath}
              disabled={idleMode !== 'custom'}
              onChange={(event) => dispatch(setIdleCustomImagePath(event.target.value))}
              helperText={t('settings.idleCustomImageHelper')}
            />
          </Box>
          <Box sx={{ px: 2, pt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label={t('settings.idleRemoteEndpoint')}
              placeholder={t('settings.idleTopicPlaceholder')}
              value={idleRemoteEndpoint}
              disabled={idleMode !== 'api'}
              onChange={(event) => dispatch(setIdleRemoteEndpoint(event.target.value))}
              helperText={t('settings.idleRemoteEndpointDescription')}
            />
          </Box>
          <Box sx={{ px: 2, pt: 2, pb: 1 }}>
            <Button variant="outlined" onClick={handlePreviewIdle} disabled={showPreview} fullWidth>
              {t('settings.previewIdle')}
            </Button>
          </Box>
        </SettingSection>

        {/* Заголовок приветственного экрана */}
        <SettingSection icon={<TextFieldsIcon />} title={t('settings.welcomeTitleSection')}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label={t('settings.welcomeTitle')}
            placeholder={DEFAULT_WELCOME_TITLE}
            value={welcomeTitle}
            onChange={(event) => dispatch(setWelcomeTitle(event.target.value))}
            helperText={t('settings.welcomeTitleDescription')}
            multiline
            minRows={2}
          />
        </SettingSection>

        {/* Акцентный цвет */}
        <SettingSection icon={<PaletteIcon />} title={t('settings.accentColor')}>
          <Box className={styles.colorPickerContainer}>
            <ColorPicker
              label={t('settings.accentColorLight')}
              value={accentColorLight}
              onChange={(color) => dispatch(setAccentColorLight(color))}
              theme="light"
            />
            <ColorPicker
              label={t('settings.accentColorDark')}
              value={accentColorDark}
              onChange={(color) => dispatch(setAccentColorDark(color))}
              theme="dark"
            />
          </Box>
        </SettingSection>

        {/* Модель и сцена */}
        <SettingSection
          icon={<ImageIcon />}
          title={t('settings.modelAndScene')}
          className={styles.modelSceneSection}
        >
          <Box className={styles.modelSceneContent}>
            {/* Выбор модели */}
            <ModelSelector
              id="model-select"
              label={t('settings.model')}
              value={modelScene.modelPath.split('/').pop() || availableModels[0] || ''}
              onChange={(value) => {
                if (value) {
                  const modelPath = `${ASSETS_PATHS.MODELS}${value}`;
                  dispatch(setModelPath(modelPath));
                  log.debug('Model changed to:', modelPath);
                }
              }}
              options={availableModels}
              loading={loadingModels}
              emptyMessage={t('ui.noModels')}
            />

            {/* Выбор сцены */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {t('settings.scene')}
              </Typography>
              {loadingScenes ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {t('ui.loadingScenes')}
                  </Typography>
                </Box>
              ) : (
                <SelectSetting
                  id="scene-select"
                  label={t('settings.scene')}
                  value={modelScene.sceneName || ''}
                  onChange={(value) => {
                    if (value === '') {
                      dispatch(setSceneName(null));
                      log.debug('Scene cleared');
                    } else {
                      dispatch(setSceneName(value));
                      log.debug('Scene changed to:', value);
                    }
                  }}
                  options={[
                    { value: '', label: t('ui.sceneNotSelected') },
                    ...(availableScenes.length === 0
                      ? [{ value: '__no_scenes__', label: t('ui.noScenes') }]
                      : availableScenes.map((scene) => ({ value: scene, label: scene }))),
                  ]}
                />
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
                <LightModeIcon sx={{ fontSize: '1rem', mr: 1, color: 'var(--primary-color)' }} />
                <Typography variant="body2">{t('settings.lightIntensity')}</Typography>
              </Box>
              <SliderSetting
                value={modelScene.lightIntensity}
                onChange={(value) => dispatch(setLightIntensity(value))}
                min={SETTINGS_RANGES.LIGHT_INTENSITY.min}
                max={SETTINGS_RANGES.LIGHT_INTENSITY.max}
                step={SETTINGS_RANGES.LIGHT_INTENSITY.step}
                label={modelScene.lightIntensity.toFixed(1)}
              />
            </Box>

            {/* Расстояние камеры */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <VideocamIcon sx={{ fontSize: '1rem', mr: 1, color: 'var(--primary-color)' }} />
                <Typography variant="body2">{t('settings.cameraDistance')}</Typography>
              </Box>
              <SliderSetting
                value={modelScene.cameraDistance}
                onChange={(value) => dispatch(setCameraDistance(value))}
                min={SETTINGS_RANGES.CAMERA_DISTANCE.min}
                max={SETTINGS_RANGES.CAMERA_DISTANCE.max}
                step={SETTINGS_RANGES.CAMERA_DISTANCE.step}
                label={modelScene.cameraDistance.toFixed(1)}
              />
            </Box>

            {/* Скорость анимации */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <SpeedIcon sx={{ fontSize: '1rem', mr: 1, color: 'var(--primary-color)' }} />
                <Typography variant="body2">{t('settings.animationSpeed')}</Typography>
              </Box>
              <SliderSetting
                value={modelScene.animationSpeed}
                onChange={(value) => dispatch(setAnimationSpeed(value))}
                min={SETTINGS_RANGES.ANIMATION_SPEED.min}
                max={SETTINGS_RANGES.ANIMATION_SPEED.max}
                step={SETTINGS_RANGES.ANIMATION_SPEED.step}
                label={`${modelScene.animationSpeed.toFixed(1)}x`}
              />
            </Box>
          </Box>
        </SettingSection>

        {/* Сброс настроек */}
        <SettingSection icon={<RefreshIcon />} title={t('settings.resetSettings')}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t('settings.resetSettingsDescription')}
            </Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<RefreshIcon />}
              onClick={handleResetSettings}
              fullWidth
            >
              {t('settings.resetSettings')}
            </Button>
          </Box>
        </SettingSection>
      </ScrollableContent>
      {showPreview && (
        <IdleScreen
          key={previewRefreshKey}
          mode={idleMode}
          customImagePath={idleCustomImagePath}
          remoteEndpoint={idleRemoteEndpoint}
          refreshKey={previewRefreshKey}
          onResume={() => {
            setShowPreview(false);
          }}
        />
      )}

      {/* Диалог подтверждения сброса */}
      <Dialog open={resetDialogOpen} onClose={handleCancelReset}>
        <DialogTitle>{t('settings.resetSettingsConfirmTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('settings.resetSettingsConfirmMessage')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelReset} color="inherit">
            {t('ui.cancel')}
          </Button>
          <Button onClick={handleConfirmReset} color="error" variant="contained">
            {t('settings.resetSettings')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SettingsScreen;
