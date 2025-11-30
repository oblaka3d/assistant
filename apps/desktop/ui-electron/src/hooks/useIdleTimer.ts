import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Управляет таймером бездействия и состоянием IdleScreen.
 * Логику вынесено из AppContent, чтобы уменьшить размер компонента.
 */
interface UseIdleTimerParams {
  idleTimeoutSeconds: number;
  enabled: boolean;
}

export function useIdleTimer({ idleTimeoutSeconds, enabled }: UseIdleTimerParams) {
  const [isIdle, setIsIdle] = useState(false);
  const [idleRefreshKey, setIdleRefreshKey] = useState(0);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const stopIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  const scheduleIdleTimer = useCallback(() => {
    stopIdleTimer();

    if (!enabled || idleTimeoutSeconds <= 0) {
      return;
    }

    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true);
      setIdleRefreshKey((prev) => prev + 1);
    }, idleTimeoutSeconds * 1000);
  }, [enabled, idleTimeoutSeconds, stopIdleTimer]);

  const resetIdleTimer = useCallback(() => {
    setIsIdle(false);
    scheduleIdleTimer();
  }, [scheduleIdleTimer]);

  useEffect(() => {
    if (!enabled || idleTimeoutSeconds <= 0) {
      stopIdleTimer();
      return;
    }

    const handleActivity = () => {
      resetIdleTimer();
    };

    const events: (keyof WindowEventMap)[] = [
      'mousemove',
      'mousedown',
      'touchstart',
      'keydown',
      'scroll',
      'wheel',
    ];

    events.forEach((event) => window.addEventListener(event, handleActivity));
    scheduleIdleTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
      stopIdleTimer();
    };
  }, [enabled, idleTimeoutSeconds, resetIdleTimer, scheduleIdleTimer, stopIdleTimer]);

  return { isIdle, idleRefreshKey, resetIdleTimer };
}
