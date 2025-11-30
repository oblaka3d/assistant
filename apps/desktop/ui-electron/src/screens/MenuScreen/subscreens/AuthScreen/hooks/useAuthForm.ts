import { useState, useCallback } from 'react';

type TabValue = 'login' | 'register' | 'forgot-password' | 'reset-password';

interface UseAuthFormReturn {
  tab: TabValue;
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  validationError: string | null;
  setTab: (tab: TabValue) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setName: (name: string) => void;
  setConfirmPassword: (password: string) => void;
  setValidationError: (error: string | null) => void;
  validateForm: () => boolean;
  resetForm: () => void;
}

export const useAuthForm = (): UseAuthFormReturn => {
  const [tab, setTab] = useState<TabValue>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateForm = useCallback((): boolean => {
    setValidationError(null);

    if (!email || !email.includes('@')) {
      setValidationError('Please enter a valid email address');
      return false;
    }

    if (!password || password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return false;
    }

    if (tab === 'register') {
      if (!name || name.trim().length === 0) {
        setValidationError('Please enter your name');
        return false;
      }

      if (password !== confirmPassword) {
        setValidationError('Passwords do not match');
        return false;
      }
    }

    return true;
  }, [email, password, name, confirmPassword, tab]);

  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setValidationError(null);
  }, []);

  const handleTabChange = useCallback(
    (newTab: TabValue) => {
      setTab(newTab);
      resetForm();
    },
    [resetForm]
  );

  return {
    tab,
    email,
    password,
    name,
    confirmPassword,
    validationError,
    setTab: handleTabChange,
    setEmail,
    setPassword,
    setName,
    setConfirmPassword,
    setValidationError,
    validateForm,
    resetForm,
  };
};
