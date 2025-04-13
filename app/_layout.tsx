import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AuthGuard from '@components/auth/AuthGuard';

export default function RootLayout() {
  return (
    <AuthGuard>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: 'Shelter' }} />
        <Stack.Screen name="auth/login" options={{ headerTitle: 'Login', headerBackTitle: 'Back' }} />
        <Stack.Screen name="auth/signup" options={{ headerTitle: 'Sign Up', headerBackTitle: 'Back' }} />
        <Stack.Screen name="property/[id]" options={{ headerTitle: 'Property Details', headerBackTitle: 'Back' }} />
        <Stack.Screen name="property/add" options={{ headerTitle: 'Add Property', headerBackTitle: 'Back' }} />
        <Stack.Screen name="bookings/index" options={{ headerTitle: 'My Bookings', headerBackTitle: 'Back' }} />
        <Stack.Screen name="bookings/my-properties" options={{ headerTitle: 'My Properties', headerBackTitle: 'Back' }} />
      </Stack>
    </AuthGuard>
  );
}
