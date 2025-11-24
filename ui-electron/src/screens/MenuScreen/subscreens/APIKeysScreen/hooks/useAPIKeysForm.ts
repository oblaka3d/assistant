import { useState, useEffect, useCallback } from 'react';

import { getProvidersByCategory } from '../../../../../constants/apiProviders';
import { useApiKeys } from '../../../../../hooks/useApiKeys';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import {
  setSTTProviderName,
  setLLMProviderName,
  setLLMModel,
  setTTSProviderName,
} from '../../../../../store/slices/settingsSlice';
import { saveSettings } from '../../../../../store/thunks/settingsThunks';

interface UseAPIKeysFormReturn {
  localKeys: Record<string, string>;
  visibleKeys: Record<string, boolean>;
  saveSuccess: boolean;
  handleKeyChange: (keyName: string, value: string) => void;
  handleSave: () => Promise<void>;
  toggleKeyVisibility: (keyName: string) => void;
  handleProviderChange: (category: 'stt' | 'llm' | 'tts', providerId: string) => void;
  handleModelChange: (modelId: string) => void;
  getSelectedProvider: (category: 'stt' | 'llm' | 'tts') => string | null;
}

export const useAPIKeysForm = (): UseAPIKeysFormReturn => {
  const dispatch = useAppDispatch();
  const { keys: remoteKeys, saveAPIKeys } = useApiKeys();
  const { sttProviderName, llmProviderName, llmModel, ttsProviderName } = useAppSelector(
    (state) => state.settings
  );

  const [localKeys, setLocalKeys] = useState<Record<string, string>>({});
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Синхронизируем значения из сервера
  useEffect(() => {
    // Используем setTimeout для избежания предупреждения о синхронном setState
    const timer = setTimeout(() => {
      setLocalKeys(remoteKeys || {});
    }, 0);
    return () => clearTimeout(timer);
  }, [remoteKeys]);

  // Автоматически выбираем первую модель, если провайдер выбран, но модель не выбрана
  useEffect(() => {
    if (llmProviderName && !llmModel) {
      const provider = getProvidersByCategory('llm').find((p) => p.id === llmProviderName);
      if (provider?.models && provider.models.length > 0) {
        dispatch(setLLMModel(provider.models[0].id));
      }
    }
  }, [llmProviderName, llmModel, dispatch]);

  const handleKeyChange = useCallback((keyName: string, value: string) => {
    setLocalKeys((prev) => ({
      ...prev,
      [keyName]: value,
    }));
    setSaveSuccess(false);
  }, []);

  const handleSave = useCallback(async () => {
    const success = await saveAPIKeys(localKeys);
    if (success) {
      await dispatch(
        saveSettings({
          sttProviderName,
          llmProviderName,
          llmModel,
          ttsProviderName,
        })
      ).unwrap();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  }, [
    localKeys,
    saveAPIKeys,
    dispatch,
    sttProviderName,
    llmProviderName,
    llmModel,
    ttsProviderName,
  ]);

  const toggleKeyVisibility = useCallback((keyName: string) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [keyName]: !prev[keyName],
    }));
  }, []);

  const handleProviderChange = useCallback(
    (category: 'stt' | 'llm' | 'tts', providerId: string) => {
      const newProviderId = providerId === '' ? null : providerId;
      if (category === 'stt') {
        dispatch(setSTTProviderName(newProviderId));
      } else if (category === 'llm') {
        dispatch(setLLMProviderName(newProviderId));
        if (newProviderId === null) {
          dispatch(setLLMModel(null));
        } else {
          const provider = getProvidersByCategory('llm').find((p) => p.id === newProviderId);
          if (provider?.models && provider.models.length > 0) {
            dispatch(setLLMModel(provider.models[0].id));
          }
        }
      } else if (category === 'tts') {
        dispatch(setTTSProviderName(newProviderId));
      }
      setSaveSuccess(false);
    },
    [dispatch]
  );

  const handleModelChange = useCallback(
    (modelId: string) => {
      const newModelId = modelId === '' ? null : modelId;
      dispatch(setLLMModel(newModelId));
      setSaveSuccess(false);
    },
    [dispatch]
  );

  const getSelectedProvider = useCallback(
    (category: 'stt' | 'llm' | 'tts'): string | null => {
      if (category === 'stt') return sttProviderName;
      if (category === 'llm') return llmProviderName;
      if (category === 'tts') return ttsProviderName;
      return null;
    },
    [sttProviderName, llmProviderName, ttsProviderName]
  );

  return {
    localKeys,
    visibleKeys,
    saveSuccess,
    handleKeyChange,
    handleSave,
    toggleKeyVisibility,
    handleProviderChange,
    handleModelChange,
    getSelectedProvider,
  };
};
