// Import the nuclear patch first - before ANY other imports
import './src/utils/SafeAreaPatch';

// Initialize Firebase early
import { auth, db } from './src/utils/firebaseConfig';

// Main app entry point
import 'expo-router/entry';
import { LogBox } from 'react-native';

// Completely ignore ALL log messages but keep the Firebase ones for debugging
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('Firebase')) {
    originalWarn(...args);
  }
};

// Turn off the YellowBox
if (console.disableYellowBox !== undefined) {
  console.disableYellowBox = true;
}

// Override error reporting for the topInsetsChange issue
const originalConsoleError = console.error;
console.error = function(...args) {
  // Still show Firebase errors
  if (args[0] && typeof args[0] === 'string' && args[0].includes('Firebase')) {
    return originalConsoleError.apply(this, args);
  }
  
  const message = args.join(' ');
  if (message.includes('topInsetsChange') || 
      message.includes('NativeEventEmitter') || 
      message.includes('EventEmitter')) {
    return;
  }
  return originalConsoleError.apply(this, args);
};

// Allow log messages for Firebase
LogBox.ignoreLogs([
  'Unsupported top level event type "topInsetsChange" dispatched',
  'Native module RNFBAppModule not found', // Ignore React Native Firebase module missing
]);

// Prevent this error from showing up
if (global.ErrorUtils) {
  const originalErrorHandler = global.ErrorUtils.reportFatalError;
  global.ErrorUtils.reportFatalError = function(error) {
    if (error && error.message && error.message.includes('topInsetsChange')) {
      console.log('Suppressed fatal error involving topInsetsChange');
      return;
    }
    return originalErrorHandler.apply(this, arguments);
  };
}

// Default export required by Expo/React Native
export default function App() {
  return null; // The actual app is rendered by Expo Router
} 