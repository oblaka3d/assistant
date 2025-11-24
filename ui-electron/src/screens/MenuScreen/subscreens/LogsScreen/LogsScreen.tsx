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
import React from 'react';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../../../components/ScreenHeader';
import ScrollableContent from '../../../../components/ScrollableContent';
import styles from '../../MenuScreen.module.css';

import { formatFileSize, useLogs } from './hooks/useLogs';
import screenStyles from './LogsScreen.module.css';

interface LogsScreenProps {
  onBack: () => void;
}

const LogsScreen: React.FC<LogsScreenProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const {
    logs,
    loading,
    error,
    logInfo,
    filterText,
    filteredLogs,
    setFilterText,
    loadLogs,
    handleClearLogs,
    logsEndRef,
  } = useLogs();

  return (
    <Box className={styles.container}>
      <ScreenHeader title={t('logs.title')} onBack={onBack} />

      <ScrollableContent screenId="logs" className={screenStyles.content}>
        {/* Информация о файле логов */}
        {logInfo && (
          <Paper elevation={2} className={screenStyles.infoPaper}>
            <Box className={screenStyles.infoContent}>
              <Box>
                <Typography variant="body2" className={screenStyles.infoText}>
                  {t('logs.fileSize')}: {formatFileSize(logInfo.size)}
                </Typography>
                <Typography variant="body2" className={screenStyles.infoText}>
                  {t('logs.lines')}: {logInfo.lineCount.toLocaleString()}
                </Typography>
                {logInfo.path && (
                  <Typography variant="caption" className={screenStyles.infoPath}>
                    {t('logs.path')}: {logInfo.path}
                  </Typography>
                )}
              </Box>
              <Box className={screenStyles.infoActions}>
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
        <Paper elevation={2} className={screenStyles.filterPaper}>
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
            <Typography variant="caption" className={screenStyles.filterText}>
              {t('logs.shown')}: {filteredLogs.length} {t('logs.of')} {logs.length}
            </Typography>
          )}
        </Paper>

        {/* Сообщение об ошибке */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => {}}>
            {error}
          </Alert>
        )}

        {/* Логи */}
        <Paper elevation={2} className={screenStyles.logsPaper}>
          {loading ? (
            <Box className={screenStyles.loadingContainer}>
              <CircularProgress />
            </Box>
          ) : filteredLogs.length === 0 ? (
            <Typography variant="body2" className={screenStyles.emptyState}>
              {t('logs.empty')}
            </Typography>
          ) : (
            <Box component="pre" className={screenStyles.logsContainer}>
              {filteredLogs.map((line, index) => {
                let colorClass = '';
                if (line.includes('[ERROR]')) {
                  colorClass = screenStyles.logLineError;
                } else if (line.includes('[WARN]')) {
                  colorClass = screenStyles.logLineWarn;
                } else if (line.includes('[INFO]')) {
                  colorClass = screenStyles.logLineInfo;
                } else if (line.includes('[DEBUG]')) {
                  colorClass = screenStyles.logLineDebug;
                }

                return (
                  <Box
                    key={index}
                    component="span"
                    className={`${screenStyles.logLine} ${colorClass}`}
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
