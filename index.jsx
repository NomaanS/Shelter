// Import the nuclear patch first - before ANY other imports
import './src/utils/SafeAreaPatch';

import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { auth } from './src/utils/firebaseConfig';
import { View, ActivityIndicator, StyleSheet, LogBox, YellowBox } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

// Disable ALL console errors and warnings
console.disableYellowBox = true;

// Suppress all logs completely
LogBox.ignoreAllLogs(true);

// Clear any existing patches to ensure our nuclear patch is the only one running
if (global.__REACT_NATIVE_SAFE_AREA_EMITTER__) {
  // Clear out the old patched listener to avoid conflicts
  global.__REACT_NATIVE_SAFE_AREA_EMITTER__ = null;
}

export default function Index() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#f4511e" />
      </SafeAreaView>
    );
  }
  
  if (user) {
    return <Redirect href="/(home)" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});