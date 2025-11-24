import { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { closeSubScreen } from '../../../../../store/slices/uiSlice';
import { clearError } from '../../../../../store/slices/userSlice';
import { getOAuthUrl } from '../../../../../utils/api';

type OAuthProvider = 'google' | 'yandex' | 'github' | null;

interface UseOAuthReturn {
  oauthProvider: OAuthProvider;
  setOAuthProvider: (provider: OAuthProvider) => void;
  handleOAuthClick: (provider: 'google' | 'yandex' | 'github') => void;
  handleCancel: () => void;
}

export const useOAuth = (): UseOAuthReturn => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const [oauthProvider, setOAuthProvider] = useState<OAuthProvider>(null);

  // Закрываем экран после успешной авторизации
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(closeSubScreen());
      setTimeout(() => {
        setOAuthProvider(null);
      }, 0);
    }
  }, [isAuthenticated, dispatch]);

  // Переход на OAuth URL
  useEffect(() => {
    if (oauthProvider) {
      window.location.href = getOAuthUrl(oauthProvider);
    }
  }, [oauthProvider]);

  const handleOAuthClick = (provider: 'google' | 'yandex' | 'github') => {
    dispatch(clearError());
    setOAuthProvider(provider);
  };

  const handleCancel = () => {
    setOAuthProvider(null);
    dispatch(clearError());
  };

  return {
    oauthProvider,
    setOAuthProvider,
    handleOAuthClick,
    handleCancel,
  };
};
