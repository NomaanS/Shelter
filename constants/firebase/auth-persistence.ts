import { Auth } from 'firebase/auth';

// Local in-memory storage as fallback (doesn't persist app restarts)
let localUserData: any = null;

// Type definition for MockAuth that matches the one in firebaseConfig.ts
type MockAuth = {
  currentUser: null;
  onAuthStateChanged: (callback: (user: any) => void) => () => void;
};

/**
 * Setup minimal persistence for Firebase auth in React Native
 * Uses in-memory storage instead of AsyncStorage to avoid Expo Go directory issues
 * 
 * @param auth Firebase Auth instance or MockAuth
 */
export async function setupAuthPersistence(auth: Auth | MockAuth) {
  try {
    console.log('Setting up memory-only auth persistence...');
    
    // Use a simple auth state listener to keep track of the user
    auth.onAuthStateChanged((user) => {
      if (user) {
        // Store user info in memory
        localUserData = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
        };
        console.log('User authenticated, storing in memory');
      } else {
        // Clear data if user signs out
        localUserData = null;
        console.log('User signed out, cleared from memory');
      }
    });
    
    console.log('Auth persistence setup completed (memory only)');
  } catch (error) {
    console.warn('Could not set up auth persistence:', error);
  }
}

/**
 * Check if there's a persisted user in memory
 */
export async function checkPersistedAuth(): Promise<{
  uid: string;
  email: string;
  displayName?: string;
} | null> {
  // Just return whatever is in memory
  return localUserData;
} 