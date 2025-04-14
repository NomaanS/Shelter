import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Colors } from '../../constants/Colors';

// Default TabBarBackground for Android and web
export default function TabBarBackground() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].tabBackground;

  return <View style={[styles.background, { backgroundColor }]} />;
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