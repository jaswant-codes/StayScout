import { createContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalAuthError, setGlobalAuthError] = useState(null);

  useEffect(() => {
    // Set persistence
    setPersistence(auth, browserLocalPersistence).catch(console.error);

    // Check for redirect result on mount
    getRedirectResult(auth).catch((error) => {
      console.error("Redirect flow error:", error);
      setGlobalAuthError(error);
    });

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.emailVerified || user.providerData.some(p => p.providerId === 'google.com')) {
          setCurrentUser(user);
        } else {
          // Unverified users are not set in the active session context.
          // (signUp handles its own temporary sign-in to send the verification email and sign out)
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update profile with name
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: '', // Empty for email users as requested
      });
      await sendEmailVerification(userCredential.user);
      await firebaseSignOut(auth); // Sign them out immediately
    }
    return userCredential.user;
  };

  const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Refresh user data from Firebase to get latest emailVerified status
    await userCredential.user.reload();
    
    if (!userCredential.user.emailVerified && !userCredential.user.providerData.some(p => p.providerId === 'google.com')) {
      await firebaseSignOut(auth);
      const error = new Error('Please verify your email before logging in.');
      error.code = 'auth/unverified-email';
      throw error;
    }
    return userCredential.user;
  };

  const forgotPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email);
  };

  const resendVerification = async (email, password) => {
    // Need to sign in briefly to send the verification email, then sign back out
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    await firebaseSignOut(auth);
  };

  const signInWithGoogle = () => {
    // Return the Promise directly to ensure synchronous execution of the popup in UI handlers
    return signInWithPopup(auth, googleProvider)
      .then(cred => cred.user)
      .catch(error => {
        // Automatically fallback to redirect if popup is blocked or closed
        if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
          console.warn("Popup blocked or closed by user, falling back to redirect...");
          // Call signInWithRedirect and return a promise that never resolves ONLY if redirect initiates successfully.
          // If redirect fails, the error will propagate up and clear the loading state.
          return signInWithRedirect(auth, googleProvider).then(() => {
            return new Promise(() => {}); 
          });
        }
        throw error;
      });
  };

  const logout = async () => {
    await firebaseSignOut(auth);
  };

  const value = {
    currentUser,
    loading,
    globalAuthError,
    setGlobalAuthError,
    isAuthenticated: !!currentUser,
    signUp,
    signIn,
    forgotPassword,
    signInWithGoogle,
    logout,
    resendVerification,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
