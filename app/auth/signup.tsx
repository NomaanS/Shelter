// app/auth/signup.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { signUp } from '@utils/authService';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await signUp(email, password);
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <View>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign Up" onPress={handleSignup} />
      <Text onPress={() => router.push('/auth/login')}>Already have an account? Log in</Text>
    </View>
  );
}
