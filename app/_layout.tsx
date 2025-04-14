import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import 'react-native-reanimated';
import { auth } from '../constants/firebase/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useColorScheme } from 'react-native';
import { View } from 'react-native';
import { setupAuthPersistence } from '../constants/firebase/auth-persistence';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
console.log("DEBUG: SplashScreen.preventAutoHideAsync called");

// Force hide splash screen after 3 seconds in case something goes wrong
setTimeout(async () => {
  try {
    console.log("DEBUG: Forcing splash screen hide after timeout");
    await SplashScreen.hideAsync();
  } catch (e) {
    console.log("DEBUG: Error force hiding splash screen:", e);
  }
}, 3000);

// Auth context to manage user state globally
import { createContext } from 'react';

// Define a type that can be either a Firebase User or our mock user
type AppUser = User | {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  [key: string]: any; // Allow any additional properties
};

type AuthContextType = {
  user: AppUser | null;
  isLoading: boolean;
  setManualUser: (user: AppUser) => void; // Updated to use AppUser type
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  setManualUser: () => {}
});

// In-memory storage for the demo user
let demoUser: AppUser | null = null;

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  // Function to manually set user (for demo purposes)
  const setManualUser = (mockUser: AppUser) => {
    console.log("Manually setting user for demo mode:", mockUser);
    
    // Store in memory
    demoUser = mockUser;
    setUser(mockUser);
    
    // Update loading state
    setIsLoading(false);
  };

  // Setup auth persistence when the component mounts
  useEffect(() => {
    console.log("DEBUG: AuthProvider useEffect running");
    
    // Set user from saved demo user first (if exists)
    if (demoUser) {
      console.log("Using existing demo user");
      setUser(demoUser);
      setIsLoading(false);
      return;
    }
    
    // Otherwise set up Firebase auth
    // Note: The auth parameter is already handled by auth-persistence.ts
    setupAuthPersistence(auth).catch(error => {
      console.error('Failed to setup auth persistence:', error);
    });
    
    // Note: onAuthStateChanged works with both real Auth and MockAuth
    const unsubscribe = onAuthStateChanged(auth as any, (authUser) => {
      console.log("DEBUG: Auth state changed", authUser ? "user exists" : "no user");
      
      // Only update if not using a demo user
      if (!demoUser) {
        setUser(authUser);
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log("DEBUG: Routing useEffect running, isLoading:", isLoading);
    if (isLoading) return;

    // Only redirect after loading is complete
    const inAuthGroup = segments[0] === 'auth';
    console.log("DEBUG: inAuthGroup:", inAuthGroup, "user:", user ? "exists" : "null");
    
    if (!user && !inAuthGroup) {
      // Redirect to the auth screen if there's no user
      console.log("DEBUG: Redirecting to /auth");
      router.replace('/auth');
    } else if (user && inAuthGroup) {
      // Redirect to the main app if there is a user
      console.log("DEBUG: Redirecting to /(tabs)");
      router.replace('/(tabs)');
    }
  }, [user, segments, isLoading, router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, setManualUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  // Skip font loading entirely to avoid issues with cache
  const loaded = true;
  const fontError = false;
  
  console.log("DEBUG: Skipping font loading to avoid errors");
  
  const onLayoutRootView = useCallback(async () => {
    console.log("DEBUG: Hiding splash screen");
    try {
      await SplashScreen.hideAsync();
    } catch (e) {
      console.log("DEBUG: Error hiding splash screen:", e);
    }
  }, []);

  console.log("DEBUG: Rendering RootLayout");
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Slot />
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </View>
  );
}
