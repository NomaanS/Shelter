// app/auth/login.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { signIn } from '@utils/authService';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={() => router.push('/auth/signup')}>Don't have an account? Sign up</Text>
    </View>
  );
}
