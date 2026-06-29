import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const configuredAuthDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dummy-project.firebaseapp.com";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForDevelopment1234567890",
  authDomain: configuredAuthDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dummy-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dummy-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:1234567890abcdef123456"
};

// ================= DEBUG LOGS =================
console.log("=======================================");
console.log("🔥 FIREBASE CONFIG LOADED");
console.log("=======================================");
console.log("firebaseConfig =", firebaseConfig);
console.log("API KEY =", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("AUTH DOMAIN =", firebaseConfig.authDomain);
console.log("PROJECT ID =", import.meta.env.VITE_FIREBASE_PROJECT_ID);
console.log("STORAGE BUCKET =", import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);
console.log("MESSAGING SENDER ID =", import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID);
console.log("APP ID =", import.meta.env.VITE_FIREBASE_APP_ID);
console.log("=======================================");
// ==============================================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

const firebaseInitialized = true;

export {
  app,
  auth,
  db,
  storage,
  googleProvider,
  firebaseInitialized,
};

export default app;
