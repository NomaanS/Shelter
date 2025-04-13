import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router, useSegments } from 'expo-router';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@utils/firebaseConfig';

const AuthGuard: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user && segments[0] !== 'auth') {
      router.replace('/auth');
    }
  }, [user, segments]);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;