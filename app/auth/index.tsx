import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { auth, signIn, signUp } from '../../constants/firebase/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../_layout';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Auth } from 'firebase/auth';

// Create a function to generate validation schema based on isSignUp parameter
const getValidationSchema = (isSignUp: boolean) => {
  const baseSchema = {
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  };

  if (isSignUp) {
    return Yup.object({
      ...baseSchema,
      displayName: Yup.string().required('Name is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required')
    });
  }

  return Yup.object(baseSchema);
};

// Define a mock user type that's compatible with our AppUser type
interface MockUser {
  uid: string;
  email: string;
  displayName: string | null;
  emailVerified: boolean;
  // Add whatever other fields needed for compatibility
  isAnonymous: boolean;
  metadata: {
    creationTime?: string;
    lastSignInTime?: string;
  };
  providerId: string;
  phoneNumber: string | null;
  photoURL: string | null;
  [key: string]: any; // Allow any additional properties
}

export default function AuthPage() {
  const { user, setManualUser } = useContext(AuthContext);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [networkTested, setNetworkTested] = useState(false);

  // Test Firebase connection on mount
  React.useEffect(() => {
    async function testConnection() {
      try {
        // Try to get current user - this will test the connection
        const currentUser = auth.currentUser;
        console.log("Firebase connection test successful", currentUser ? "User exists" : "No user");
        setNetworkTested(true);
      } catch (err) {
        console.error("Firebase connection test failed:", err);
        setError("Unable to connect to authentication service. Please check your internet connection.");
      }
    }
    
    testConnection();
  }, []);

  // If already authenticated, redirect to home
  React.useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);

  const handleAuth = async (values: { email: string; password: string; displayName?: string; confirmPassword?: string }) => {
    setLoading(true);
    setError('');
    
    try {
      // Demo account special handling for both login and signup
      if (values.email === 'demo@example.com') {
        console.log('Using demo account');
        
        // Create a demo user
        const demoUser = {
          uid: 'demo-123',
          email: 'demo@example.com',
          displayName: isLogin ? 'Demo User' : (values.displayName || 'Demo User'),
          emailVerified: true,
          isAnonymous: false,
          metadata: {
            creationTime: new Date().toISOString(),
            lastSignInTime: new Date().toISOString()
          },
          providerId: 'demo',
          phoneNumber: null,
          photoURL: null
        };
        
        // Only continue with demo login if password is correct
        if (isLogin && values.password !== 'password123') {
          throw { code: 'auth/wrong-password' };
        }
        
        // Manually set the user in context
        setManualUser(demoUser);
        
        // Navigate to home screen after a short delay
        setTimeout(() => {
          router.replace('/');
        }, 100);
        
        return;
      }
      
      // Regular Firebase auth for login/signup
      if (isLogin) {
        console.log('Attempting real Firebase sign in with:', values.email);
        try {
          await signInWithEmailAndPassword(auth as Auth, values.email, values.password);
          console.log('Sign in successful');
        } catch (authError: any) {
          console.error('Firebase auth error:', authError.code);
          if (authError.code === 'auth/configuration-not-found') {
            setError('Firebase is not configured properly. Try demo@example.com with password123');
          } else {
            throw authError; // Re-throw to be caught by outer catch
          }
        }
      } else {
        console.log('Attempting real Firebase sign up with:', values.email);
        try {
          const userCredential = await createUserWithEmailAndPassword(auth as Auth, values.email, values.password);
          console.log('Account creation successful');
          
          // Update profile with display name if provided
          if (values.displayName && userCredential.user) {
            try {
              await updateProfile(userCredential.user, {
                displayName: values.displayName
              });
              console.log('Profile update successful');
            } catch (profileError) {
              console.warn('Profile update failed, but continuing:', profileError);
            }
          }
        } catch (authError: any) {
          console.error('Firebase auth error:', authError.code);
          if (authError.code === 'auth/configuration-not-found') {
            setError('Firebase is not configured properly. Try demo@example.com instead');
          } else {
            throw authError; // Re-throw to be caught by outer catch
          }
        }
      }
      
    } catch (err: any) {
      // Regular error handling for Firebase auth errors
      console.error('Authentication error:', err);
      
      // Handle specific Firebase auth errors with user-friendly messages
      let errorMessage = 'An error occurred during authentication';
      
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password must be at least 6 characters';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please try demo@example.com with password123';
      } else if (err.code === 'auth/configuration-not-found') {
        errorMessage = 'Try demo@example.com with password123 for offline mode';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getInitialValues = () => {
    return isLogin 
      ? { email: '', password: '' }
      : { email: '', password: '', confirmPassword: '', displayName: '' };
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <ThemedView style={styles.content}>
            <View style={styles.headerContainer}>
              <ThemedText style={styles.title}>Shelter</ThemedText>
              <ThemedText style={styles.subtitle}>
                {isLogin ? 'Welcome back!' : 'Create your account'}
              </ThemedText>
            </View>

            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <Formik
              initialValues={getInitialValues()}
              validationSchema={getValidationSchema(!isLogin)}
              onSubmit={handleAuth}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.form}>
                  {!isLogin && (
                    <>
                      <Text style={styles.label}>Full Name</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        onChangeText={handleChange('displayName')}
                        onBlur={handleBlur('displayName')}
                        value={values.displayName}
                        autoCapitalize="words"
                      />
                      {touched.displayName && errors.displayName ? (
                        <Text style={styles.errorText}>{errors.displayName}</Text>
                      ) : null}
                    </>
                  )}

                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                  {touched.email && errors.email ? (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  ) : null}

                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                  />
                  {touched.password && errors.password ? (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  ) : null}

                  {!isLogin && (
                    <>
                      <Text style={styles.label}>Confirm Password</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Confirm your password"
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry
                      />
                      {touched.confirmPassword && errors.confirmPassword ? (
                        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                      ) : null}
                    </>
                  )}

                  <TouchableOpacity
                    style={styles.authButton}
                    onPress={() => handleSubmit()}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.authButtonText}>
                        {isLogin ? 'Login' : 'Sign Up'}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            <TouchableOpacity 
              style={styles.switchButton} 
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text style={styles.switchButtonText}>
                {isLogin 
                  ? "Don't have an account? Sign Up" 
                  : "Already have an account? Login"}
              </Text>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  authButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  authButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  switchButtonText: {
    color: '#4a90e2',
    fontWeight: '500',
  },
}); 