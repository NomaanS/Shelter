import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';

// Sign up with email and password
export const signUp = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    // Handle Firebase auth error codes
    const errorMessage = getErrorMessage(error);
    throw new Error(errorMessage);
  }
};

// Sign in with email and password
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    // Handle Firebase auth error codes
    const errorMessage = getErrorMessage(error);
    throw new Error(errorMessage);
  }
};

// Aliases for backward compatibility
export const signup = signUp;
export const login = signIn;

// Sign out
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error('Failed to sign out');
  }
};

// Alias for backward compatibility
export const logout = logOut;

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Get user-friendly error message from Firebase error
 */
const getErrorMessage = (error: any): string => {
  const errorCode = error.code;

  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Invalid email address format.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use a stronger password.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful login attempts. Please try again later.';
    case 'auth/operation-not-allowed':
      return 'This operation is not allowed.';
    default:
      return error.message || 'An unexpected error occurred. Please try again.';
  }
};
