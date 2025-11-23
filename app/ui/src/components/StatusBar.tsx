import Battery20Icon from '@mui/icons-material/Battery20';
import Battery30Icon from '@mui/icons-material/Battery30';
import Battery50Icon from '@mui/icons-material/Battery50';
import Battery60Icon from '@mui/icons-material/Battery60';
import Battery80Icon from '@mui/icons-material/Battery80';
import Battery90Icon from '@mui/icons-material/Battery90';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import BluetoothDisabledIcon from '@mui/icons-material/BluetoothDisabled';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';

import styles from './StatusBar.module.css';

interface StatusBarProps {
  className?: string;
}

interface NetworkConnection {
  effectiveType?: string;
  type?: string;
  addEventListener: (event: string, handler: () => void) => void;
  removeEventListener: (event: string, handler: () => void) => void;
}

interface BatteryManager {
  level: number;
  charging: boolean;
  addEventListener: (event: string, handler: () => void) => void;
  removeEventListener: (event: string, handler: () => void) => void;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkConnection;
  mozConnection?: NetworkConnection;
  webkitConnection?: NetworkConnection;
  getBattery?: () => Promise<BatteryManager>;
}

const StatusBar: React.FC<StatusBarProps> = ({ className }) => {
  const [wifiConnected, setWifiConnected] = useState(true);
  const [_bluetoothConnected] = useState(false); // Пока не используется, но оставлен для будущего использования
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const nav = navigator as NavigatorWithConnection;
    let connection: NetworkConnection | undefined;
    let battery: BatteryManager | undefined;

    // Проверка статуса WiFi
    if ('connection' in navigator) {
      connection = nav.connection || nav.mozConnection || nav.webkitConnection;
      if (connection) {
        const updateConnection = () => {
          setWifiConnected(connection?.effectiveType !== 'none' && connection?.type !== 'none');
        };

        updateConnection();
        connection.addEventListener('change', updateConnection);
      }
    }

    // Проверка статуса батареи
    if (nav.getBattery) {
      nav
        .getBattery()
        .then((batt) => {
          battery = batt;
          const updateBattery = () => {
            if (battery) {
              setBatteryLevel(Math.round(battery.level * 100));
              setIsCharging(battery.charging);
            }
          };

          updateBattery();
          battery.addEventListener('chargingchange', updateBattery);
          battery.addEventListener('levelchange', updateBattery);
        })
        .catch(() => {
          // Если getBattery не поддерживается, используем заглушку
          // Используем setTimeout для асинхронной установки состояния
          setTimeout(() => {
            setBatteryLevel(100);
          }, 0);
        });
    } else {
      // Заглушка, если батарея не доступна
      // Используем setTimeout для асинхронной установки состояния
      setTimeout(() => {
        setBatteryLevel(100);
      }, 0);
    }

    return () => {
      if (connection) {
        const updateConnection = () => {
          setWifiConnected(connection?.effectiveType !== 'none' && connection?.type !== 'none');
        };
        connection.removeEventListener('change', updateConnection);
      }
      if (battery) {
        const updateBattery = () => {
          if (battery) {
            setBatteryLevel(Math.round(battery.level * 100));
            setIsCharging(battery.charging);
          }
        };
        battery.removeEventListener('chargingchange', updateBattery);
        battery.removeEventListener('levelchange', updateBattery);
      }
    };
  }, []);

  const getBatteryIcon = () => {
    if (isCharging) {
      return <BatteryChargingFullIcon className={styles.icon} />;
    }

    if (batteryLevel === null) {
      return <BatteryFullIcon className={styles.icon} />;
    }

    if (batteryLevel >= 90) {
      return <BatteryFullIcon className={styles.icon} />;
    } else if (batteryLevel >= 80) {
      return <Battery90Icon className={styles.icon} />;
    } else if (batteryLevel >= 60) {
      return <Battery80Icon className={styles.icon} />;
    } else if (batteryLevel >= 50) {
      return <Battery60Icon className={styles.icon} />;
    } else if (batteryLevel >= 30) {
      return <Battery50Icon className={styles.icon} />;
    } else if (batteryLevel >= 20) {
      return <Battery30Icon className={styles.icon} />;
    } else {
      return <Battery20Icon className={styles.icon} />;
    }
  };

  return (
    <Box className={`${styles.statusBar} ${className || ''}`}>
      <Box className={styles.statusBarContent}>
        <Box className={styles.statusBarRight}>
          {/* WiFi */}
          {wifiConnected ? (
            <WifiIcon className={styles.icon} />
          ) : (
            <WifiOffIcon className={styles.icon} />
          )}

          {/* Bluetooth */}
          {_bluetoothConnected ? (
            <BluetoothIcon className={styles.icon} />
          ) : (
            <BluetoothDisabledIcon className={styles.icon} />
          )}

          {/* Battery */}
          {getBatteryIcon()}
          {batteryLevel !== null && <span className={styles.batteryLevel}>{batteryLevel}%</span>}
        </Box>
      </Box>
    </Box>
  );
};

export default StatusBar;
