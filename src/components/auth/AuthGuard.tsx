import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { router, useSegments } from 'expo-router';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../../utils/firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';

const PROTECTED_SEGMENTS = ['property/add', 'bookings'];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (loading) return;

    const inProtectedRoute = PROTECTED_SEGMENTS.some(segment => 
      segments.includes(segment)
    );

    if (!user && inProtectedRoute) {
      router.replace('/auth/login');
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#f4511e" />
      </SafeAreaView>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
