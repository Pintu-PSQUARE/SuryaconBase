import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { useVersion } from '../../useVersion';
import { logo } from '../assests';

const DownloadResource: React.FC = () => {
  const progress = useRef(new Animated.Value(0)).current;
  const { 
    progress: updateProgress, 
    isUpdateAvailable, 
    checkForUpdates, 
    startUpdate 
  } = useVersion();

  useEffect(() => {
    checkForUpdates(); // Automatically check for updates on mount
  }, []);

  useEffect(() => {
    if (isUpdateAvailable) {
      startUpdate(); // Automatically start the update if available
    }
  }, [isUpdateAvailable]);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: updateProgress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [updateProgress]);

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.contentContainer}>
        <Text style={styles.percentage}>
          {updateProgress > 0 
            ? `Updating: ${updateProgress}%` 
            : 'Checking for updates...'}
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, { width: progressBarWidth }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingBottom: 40,
  },
  logo: {
    width: 250,
    height: 250,
    marginTop: 20,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  percentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default DownloadResource;