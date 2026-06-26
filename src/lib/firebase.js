import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:000000000000:web:0000000000000000',
};

let app;
let auth;
let db;
let storage;
let googleProvider;
let firebaseInitialized = false;

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

try {
  if (!apiKey || apiKey === 'your_api_key_here' || apiKey === 'demo-api-key') {
    throw new Error('Valid Firebase configuration missing. Running in Demo Mode.');
  }
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  googleProvider = new GoogleAuthProvider();
  firebaseInitialized = true;
} catch (error) {
  console.warn('Firebase initialization failed:', error.message);
  console.warn('The app will run in demo mode without backend connectivity.');
}

export { auth, db, storage, googleProvider, firebaseInitialized };
export default app;
