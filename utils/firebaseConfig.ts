import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAzqu6LLUUXnoGT7iglJ3TwM82Ct_Sxhek",
  authDomain: "shelter-f0221.firebaseapp.com",
  projectId: "shelter-f0221",
  storageBucket: "shelter-f0221.appspot.com",
  messagingSenderId: "561273796804",
  appId: "1:561273796804:web:4d040bdb204d399589f191"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
