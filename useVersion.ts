import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useCallback, useEffect, useState } from 'react';
import ReactNativeBlobUtil from 'react-native-blob-util';
import hotUpdate from 'react-native-ota-hot-update';
import RNRestart from 'react-native-restart';
import { apiUrl } from './src/config/Env';

interface UpdateHookReturn {
  progress: number;
  isUpdating: boolean;
  isRestarting: boolean;
  currentVersion: number | null;
  isUpdateAvailable: boolean;
  getCurrentVersion: () => Promise<number | null>;
  checkForUpdates: () => Promise<void>;
  startUpdate: (bundleUrl: string) => Promise<void>;
  applyPendingUpdate: () => Promise<void>;
  restartApp: () => void;
}

interface PendingUpdateData {
  bundleUrl: string;
  timestamp: number;
}

const STORAGE_KEYS = {
  LAST_UPDATED_BUNDLE: 'LAST_UPDATED_BUNDLE',
  UPDATE_PENDING: 'UPDATE_PENDING',
};

export const useVersion = (): UpdateHookReturn => {
  const [progress, setProgress] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [currentVersion, setCurrentVersion] = useState<number | null>(null);
  const [isRestarting, setIsRestarting] = useState<boolean>(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState<boolean>(false);

  const restartApp = useCallback((): void => {
    console.log('[HotUpdate] Restarting app...');
    setIsRestarting(true);
    setTimeout(() => {
      RNRestart.Restart();
      setIsRestarting(false);
    }, 500);
  }, []);

  const getCurrentVersion = useCallback(async (): Promise<number | null> => {
    try {
      const version = await hotUpdate.getCurrentVersion();
      setCurrentVersion(version);
      console.log('[HotUpdate] Current Installed Version:', version);
      return version;
    } catch (error) {
      console.error('[HotUpdate] Error fetching current version:', error);
      return null;
    }
  }, []);

  const startUpdate = useCallback(async (bundleUrl: string): Promise<void> => {
    const netInfo = await NetInfo.fetch(); 
    if (!netInfo.isConnected) {
      console.log('[HotUpdate] No internet connection, skipping update.');
      return;
    }

    setIsUpdating(true);
    setProgress(0);
    try {
      console.log('[HotUpdate] Downloading update from:', bundleUrl);
      await AsyncStorage.setItem(STORAGE_KEYS.UPDATE_PENDING, JSON.stringify({ bundleUrl, timestamp: Date.now() }));

      await hotUpdate.downloadBundleUri(ReactNativeBlobUtil, bundleUrl, Date.now(), {
        updateSuccess: async () => {
          console.log('[HotUpdate] Update downloaded successfully');
          await AsyncStorage.setItem(STORAGE_KEYS.LAST_UPDATED_BUNDLE, bundleUrl);
          await AsyncStorage.removeItem(STORAGE_KEYS.UPDATE_PENDING);
          restartApp();
        },
        updateFail: async (message: any) => {
          console.log('[HotUpdate] Update failed:', message);
          await AsyncStorage.removeItem(STORAGE_KEYS.UPDATE_PENDING);
        },
        progress: (received: string, total: string) => {
          if (parseInt(total, 10) <= 0) return;
          const percent = (parseInt(received, 10) / parseInt(total, 10)) * 100;
          setProgress(percent);
        },
        restartAfterInstall: false,
      });
    } catch (error) {
      console.error('[HotUpdate] Update error:', error);
      await AsyncStorage.removeItem(STORAGE_KEYS.UPDATE_PENDING);
    } finally {
      setIsUpdating(false);
    }
  }, [restartApp]);

  const applyPendingUpdate = useCallback(async (): Promise<void> => {
    const netInfo = await NetInfo.fetch();  
    if (!netInfo.isConnected) {
      console.log('[HotUpdate] Skipping pending update: No internet connection');
      return;
    }

    const pendingUpdate = await AsyncStorage.getItem(STORAGE_KEYS.UPDATE_PENDING);
    if (!pendingUpdate) return;

    const { bundleUrl } = JSON.parse(pendingUpdate) as PendingUpdateData;
    if (!bundleUrl) return;

    console.log('[HotUpdate] Applying pending update:', bundleUrl);
    startUpdate(bundleUrl);
  }, [startUpdate]);

  const checkForUpdates = useCallback(async (): Promise<void> => {
    const netInfo = await NetInfo.fetch(); 
    if (!netInfo.isConnected) {
      console.log('[HotUpdate] Skipping update check: No internet connection');
      return;
    }

    console.log('[HotUpdate] Checking for updates...');
    try {
      const response = await fetch(`${apiUrl}/downloaddata/resourcesdownload`);
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const data = await response.json();
      if (!data.data) return;

      const bundleUrl: string = data.data;
      const lastUpdatedBundle = await AsyncStorage.getItem(STORAGE_KEYS.LAST_UPDATED_BUNDLE);

      if (lastUpdatedBundle !== bundleUrl) {
        setIsUpdateAvailable(true);
        startUpdate(bundleUrl);
      }
    } catch (error) {
      console.error('[HotUpdate] Error checking for updates:', error);
    }
  }, [startUpdate]);

  useEffect(() => {
    getCurrentVersion();
    applyPendingUpdate();
    checkForUpdates();
  }, [getCurrentVersion, applyPendingUpdate, checkForUpdates]);

  return {
    progress,
    isUpdating,
    isRestarting,
    currentVersion,
    isUpdateAvailable,
    getCurrentVersion,
    checkForUpdates,
    startUpdate,
    applyPendingUpdate,
    restartApp,
  };
};