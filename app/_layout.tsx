import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Suppress warnings in a way that's safe
// Even if LogBox isn't available, we don't want to crash
try {
  const { LogBox } = require('react-native');
  if (LogBox) {
    LogBox.ignoreAllLogs(true);
  }
} catch (e) {
  console.warn('Could not suppress logs');
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="home" />
          <Stack.Screen 
            name="auth/login" 
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen 
            name="auth/signup" 
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 