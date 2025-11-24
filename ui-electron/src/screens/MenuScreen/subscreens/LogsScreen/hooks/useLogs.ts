import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface LogFileInfo {
  size: number;
  path: string | null;
  lineCount: number;
}

interface UseLogsReturn {
  logs: string[];
  loading: boolean;
  error: string | null;
  logInfo: LogFileInfo | null;
  filterText: string;
  filteredLogs: string[];
  setFilterText: (text: string) => void;
  loadLogs: () => Promise<void>;
  handleClearLogs: () => Promise<void>;
  logsEndRef: React.RefObject<HTMLDivElement>;
}

export const useLogs = (): UseLogsReturn => {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [logInfo, setLogInfo] = useState<LogFileInfo | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const logsEndRef = useRef<HTMLDivElement>(null);

  const loadLogs = useCallback(async () => {
    if (!window.api) {
      setError('Electron API не доступен');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

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
  }, [t]);

  const handleClearLogs = useCallback(async () => {
    if (!window.api) {
      setError('Electron API не доступен');
      return;
    }

    if (!confirm(t('logs.confirmClear'))) {
      return;
    }

    try {
      await window.api.clearLogs();
      await loadLogs();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`${t('logs.clearError')}: ${errorMessage}`);
      console.error('Failed to clear logs:', err);
    }
  }, [t, loadLogs]);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

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

  return {
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
  };
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export const getLogLineColor = (line: string): string => {
  if (line.includes('[ERROR]')) return 'error.main';
  if (line.includes('[WARN]')) return 'warning.main';
  if (line.includes('[INFO]')) return 'info.main';
  if (line.includes('[DEBUG]')) return 'text.secondary';
  return 'text.primary';
};
