import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '@/src/styles/colors';

export const LoadingSpinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
