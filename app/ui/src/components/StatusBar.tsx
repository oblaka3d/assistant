import { Box } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import BluetoothDisabledIcon from '@mui/icons-material/BluetoothDisabled';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import Battery90Icon from '@mui/icons-material/Battery90';
import Battery80Icon from '@mui/icons-material/Battery80';
import Battery60Icon from '@mui/icons-material/Battery60';
import Battery50Icon from '@mui/icons-material/Battery50';
import Battery30Icon from '@mui/icons-material/Battery30';
import Battery20Icon from '@mui/icons-material/Battery20';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import React, { useState, useEffect } from 'react';

import styles from './StatusBar.module.css';

interface StatusBarProps {
  className?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ className }) => {
  const [wifiConnected, setWifiConnected] = useState(true);
  const [bluetoothConnected, setBluetoothConnected] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    // Проверка статуса WiFi
    if ('connection' in navigator) {
      const updateConnection = () => {
        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
        if (connection) {
          setWifiConnected(connection.effectiveType !== 'none' && connection.type !== 'none');
        }
      };
      
      updateConnection();
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (connection) {
        connection.addEventListener('change', updateConnection);
        return () => connection.removeEventListener('change', updateConnection);
      }
    }

    // Проверка статуса батареи
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBattery = () => {
          setBatteryLevel(Math.round(battery.level * 100));
          setIsCharging(battery.charging);
        };
        
        updateBattery();
        battery.addEventListener('chargingchange', updateBattery);
        battery.addEventListener('levelchange', updateBattery);
        
        return () => {
          battery.removeEventListener('chargingchange', updateBattery);
          battery.removeEventListener('levelchange', updateBattery);
        };
      }).catch(() => {
        // Если getBattery не поддерживается, используем заглушку
        setBatteryLevel(100);
      });
    } else {
      // Заглушка, если батарея не доступна
      setBatteryLevel(100);
    }
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
          {bluetoothConnected ? (
            <BluetoothIcon className={styles.icon} />
          ) : (
            <BluetoothDisabledIcon className={styles.icon} />
          )}
          
          {/* Battery */}
          {getBatteryIcon()}
          {batteryLevel !== null && (
            <span className={styles.batteryLevel}>{batteryLevel}%</span>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default StatusBar;
