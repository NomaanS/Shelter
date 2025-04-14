import React from 'react';
import { StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { ThemedView } from '../../../components/ThemedView';
import { ThemedText } from '../../../components/ThemedText';

export default function PropertyNotFound() {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <ThemedText style={styles.title}>Property Not Found</ThemedText>
      <ThemedText style={styles.message}>
        The property you're looking for doesn't exist or has been removed.
      </ThemedText>
      <Link href="/properties" style={styles.link}>
        <ThemedText style={styles.linkText}>View All Properties</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.7,
  },
  link: {
    padding: 15,
    backgroundColor: '#4a90e2',
    borderRadius: 8,
  },
  linkText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 