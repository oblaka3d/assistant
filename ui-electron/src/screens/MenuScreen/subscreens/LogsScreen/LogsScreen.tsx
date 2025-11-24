import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../../../components/ScreenHeader';
import ScrollableContent from '../../../../components/ScrollableContent';
import styles from '../../MenuScreen.module.css';

interface LogFileInfo {
  size: number;
  path: string | null;
  lineCount: number;
}

interface LogsScreenProps {
  onBack: () => void;
}

const LogsScreen: React.FC<LogsScreenProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [logInfo, setLogInfo] = useState<LogFileInfo | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const logsEndRef = useRef<HTMLDivElement>(null);

  const loadLogs = async () => {
    if (!window.api) {
      setError('Electron API не доступен');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Загружаем логи и информацию о файле
      const [logsData, info] = await Promise.all([
        window.api.getLogs(),
        window.api.getLogFileInfo(),
      ]);

      setLogs(logsData);
      setLogInfo(info);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`${t('logs.error')}: ${errorMessage}`);
      console.error('Failed to load logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearLogs = async () => {
    if (!window.api) {
      setError('Electron API не доступен');
      return;
    }

    if (!confirm(t('logs.confirmClear'))) {
      return;
    }

    try {
      await window.api.clearLogs();
      await loadLogs(); // Перезагружаем логи после очистки
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`${t('logs.clearError')}: ${errorMessage}`);
      console.error('Failed to clear logs:', err);
    }
  };

  useEffect(() => {
    loadLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Автопрокрутка к концу при загрузке новых логов
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Фильтрация логов
  const filteredLogs = filterText
    ? logs.filter((line) => line.toLowerCase().includes(filterText.toLowerCase()))
    : logs;

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <Box className={styles.container}>
      <ScreenHeader title={t('logs.title')} onBack={onBack} />

      <ScrollableContent screenId="logs">
        {/* Информация о файле логов */}
        {logInfo && (
          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {t('logs.fileSize')}: {formatFileSize(logInfo.size)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('logs.lines')}: {logInfo.lineCount.toLocaleString()}
                </Typography>
                {logInfo.path && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mt: 0.5 }}
                  >
                    {t('logs.path')}: {logInfo.path}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={loadLogs} color="primary" title={t('logs.refresh')}>
                  <RefreshIcon />
                </IconButton>
                <IconButton onClick={handleClearLogs} color="error" title={t('logs.clear')}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        )}

        {/* Фильтр */}
        <Paper elevation={2} sx={{ p: 1, mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder={t('logs.filter')}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            InputProps={{
              startAdornment: <DescriptionIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
          {filterText && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
              {t('logs.shown')}: {filteredLogs.length} {t('logs.of')} {logs.length}
            </Typography>
          )}
        </Paper>

        {/* Сообщение об ошибке */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Логи */}
        <Paper elevation={2} sx={{ p: 2, height: 'calc(100vh - 400px)', overflow: 'auto' }}>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <CircularProgress />
            </Box>
          ) : filteredLogs.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              {t('logs.empty')}
            </Typography>
          ) : (
            <Box
              component="pre"
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                color: 'text.primary',
              }}
            >
              {filteredLogs.map((line, index) => {
                // Подсветка разных уровней логов
                let lineColor = 'text.primary';
                if (line.includes('[ERROR]')) {
                  lineColor = 'error.main';
                } else if (line.includes('[WARN]')) {
                  lineColor = 'warning.main';
                } else if (line.includes('[INFO]')) {
                  lineColor = 'info.main';
                } else if (line.includes('[DEBUG]')) {
                  lineColor = 'text.secondary';
                }

                return (
                  <Box
                    key={index}
                    component="span"
                    sx={{
                      color: lineColor,
                      display: 'block',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    {line}
                  </Box>
                );
              })}
              <div ref={logsEndRef} />
            </Box>
          )}
        </Paper>
      </ScrollableContent>
    </Box>
  );
};

export default LogsScreen;
