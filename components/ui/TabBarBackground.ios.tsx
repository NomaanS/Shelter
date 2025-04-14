import React from 'react';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useColorScheme } from '../../hooks/useColorScheme';

// iOS-specific TabBarBackground with BlurView
export default function TabBarBackground() {
  const colorScheme = useColorScheme();
  const blurIntensity = 50;
  
  return (
    <BlurView 
      intensity={blurIntensity}
      style={styles.background}
      tint={colorScheme === 'dark' ? 'dark' : 'light'}
    />
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}); 