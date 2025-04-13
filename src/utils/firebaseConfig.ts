/**
 * Firebase configuration for the app
 * Using Firebase Web SDK for Expo compatibility
 */
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzqu6LLUUXnoGT7iglJ3TwM82Ct_Sxhek",
  authDomain: "shelter-f0221.firebaseapp.com",
  projectId: "shelter-f0221",
  storageBucket: "shelter-f0221.appspot.com",
  messagingSenderId: "561273796804",
  appId: "1:561273796804:web:4d040bdb204d399589f191"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const db = getFirestore(firebase);
const storage = getStorage(firebase);

// Setup auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    AsyncStorage.setItem('authUser', JSON.stringify({
      uid: user.uid,
      email: user.email
    }));
    console.log('User is signed in:', user.uid);
  } else {
    AsyncStorage.removeItem('authUser');
    console.log('User is signed out');
  }
});

// Export initialized services
export { auth, db, storage };
export default firebase; 